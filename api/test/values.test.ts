import { test, expect } from 'bun:test'

import { Values } from '../src/values'

test('values', async () => {
  const values = new Values()

  let array = [
    ...new Array<number>(75).fill(0.1),
    ...new Array<number>(20).fill(0.25),
    ...new Array<number>(4).fill(1),
    ...new Array<number>(1).fill(10),
  ]
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

  expect(array.length).toBe(100)

  for (let i = 0; i < 100; i++) {
    const value = values.get()
    expect(value).toBeGreaterThan(0)
    array = array.filter((v, i) => i !== array.findIndex((v) => v === value))
  }

  expect(array.length).toBe(0)
})
