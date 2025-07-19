export const server = '1036357772826120242'
export const roles = ['1144287729862049903', '1072682201658970112', '1051562453495971941']

export const getToken = async (
  client: string,
  secret: string,
  code: string,
  redirect: string,
): Promise<undefined | string> => {
  try {
    const res = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: client,
        client_secret: secret,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect,
        scope: 'identify guilds guilds.members.read',
      }),
    })

    const body = (await res.json()) as Record<string, any>

    if (!body.access_token) return
    const token: string = body.access_token
    return token
  } catch (error) {
    return
  }
}

export const getMember = async (
  guild: string,
  token: string,
): Promise<{ id: string; roles: Array<string>; joinedAt: string } | undefined> => {
  try {
    const res = await fetch(`https://discord.com/api/users/@me/guilds/${guild}/member`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const body = (await res.json()) as Record<string, any>

    if (!body.user || !body.roles || !body.joined_at) return

    const id: string = body.user.id
    const roles: Array<string> = body.roles
    const joinedAt: string = body.joined_at

    return { id, roles, joinedAt }
  } catch (error) {
    return
  }
}

export const revokeToken = async (client: string, secret: string, token: string): Promise<void> => {
  try {
    await fetch('https://discord.com/api/oauth2/token/revoke', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: client,
        client_secret: secret,
        token: token,
      }).toString(),
    })
  } catch {}
}
