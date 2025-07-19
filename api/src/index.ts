import { Elysia, t } from 'elysia'
import { getMember, getToken, revokeToken, roles, server } from './discord'
import { Env } from './env'
import { Faucet } from './faucet'
import { Hex } from 'viem'
import { Limiter } from './limiter'
import { Values } from './values'

// env
const env = new Env()

// faucet
const faucet = new Faucet(env.key)

// 8 hours limiter
const limiter = new Limiter(8 * 60 * 60 * 1000)

// values
const values = new Values()

// api
const api = new Elysia()
  .get(
    '/callback',
    async ({ query: { code, state }, redirect }) => {
      const token = await getToken(env.clientId, env.clientSecret, code, env.redirectUri)

      if (!token) return redirect(env.siteUri + '?error=Try again later!')

      const member = await getMember(server, token)

      if (!member) return redirect(env.siteUri + '?error=Discord user error!')

      if (!member.roles.some((r) => roles.includes(r))) return redirect(env.siteUri + '?error=Discord roles error!')

      await revokeToken(env.clientId, env.clientSecret, token)

      const hours = limiter.isSendable(member.id)

      if (hours !== 0) return redirect(env.siteUri + `?error=Wait for ${hours} hours!`)

      const value = values.get()
      const tx = await faucet.send(state as Hex, value)

      if (!tx) return redirect(env.siteUri + '?error=No MON left!')

      return redirect(env.siteUri + `?result=${tx}-${value}`)
    },
    {
      query: t.Object({
        code: t.String(),
        state: t.String(/^0x[a-fA-F0-9]{40}$/),
      }),
    },
  )
  .listen(4000)

export type Api = typeof api

console.log(`🚰 Monucet is running at ${api.server?.hostname}:${api.server?.port}`)
