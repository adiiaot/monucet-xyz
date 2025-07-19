import { Elysia } from 'elysia'

const api = new Elysia().get('/', () => 'Gmonad!').listen(4000)

console.log(`🦊 Elysia is running at ${api.server?.hostname}:${api.server?.port}`)

export type Api = typeof api
