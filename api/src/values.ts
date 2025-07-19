export class Values {
  #values: Array<number>

  constructor() {
    this.#values = []
  }

  get(): number {
    const value = this.#values.pop()

    if (value !== undefined) return value

    this.#values = [
      ...new Array(75).fill(0.1),
      ...new Array(20).fill(0.25),
      ...new Array(4).fill(1),
      ...new Array(1).fill(10),
    ]
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)

    return this.#values.pop()!
  }
}
