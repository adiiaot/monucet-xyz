import { Hex } from 'viem'

export class Env {
  key: Hex
  siteUri: string
  clientId: string
  clientSecret: string
  redirectUri: string

  constructor() {
    const key = process.env.MONUCET_KEY
    if (!/^0x[a-fA-F0-9]{64}$/.test(key ?? '')) throw Error('Monucet key is not provided.')

    const clientId = process.env.MONUCET_CLIENT_ID
    if (!clientId) throw Error('Monucet client ID is not provided.')

    const clientSecret = process.env.MONUCET_CLIENT_SECRET
    if (!clientSecret) throw Error('Monucet client secret is not provided.')

    const redirectUri = process.env.MONUCET_REDIRECT_URI
    if (!redirectUri) throw Error('Monucet redirect URI is not provided.')

    const siteUri = process.env.MONUCET_SITE_URI
    if (!siteUri) throw Error('Monucet site URI is not provided.')

    this.key = key as Hex
    this.siteUri = siteUri
    this.clientId = clientId
    this.clientSecret = clientSecret
    this.redirectUri = redirectUri
  }
}
