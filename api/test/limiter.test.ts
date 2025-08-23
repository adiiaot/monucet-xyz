import { test, expect } from 'bun:test'

import { Limiter } from '../src/limiter'

test('limiter', async () => {
  const limiter = new Limiter(100)

  expect(limiter.isSendable('alice', 'aliceWallet')).toBe(0)
  await new Promise((res) => setTimeout(res, 50))
  expect(limiter.isSendable('alice', 'aliceWallet')).toBe(1)
  expect(limiter.isSendable('bob', 'aliceWallet')).toBe(1)

  await new Promise((res) => setTimeout(res, 50))
  expect(limiter.isSendable('alice', 'aliceWallet')).toBe(0)
})
