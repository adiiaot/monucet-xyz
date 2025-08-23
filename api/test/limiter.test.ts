import { test, expect } from 'bun:test'

import { Limiter } from '../src/limiter'

test('limiter', async () => {
  const limiter = new Limiter(100)

  expect(limiter.isSendable('hello', '0x')).toBe(0)
  await new Promise((res) => setTimeout(res, 50))
  expect(limiter.isSendable('hello', '0x')).toBe(1)

  await new Promise((res) => setTimeout(res, 50))
  expect(limiter.isSendable('hello', '0x')).toBe(0)
})
