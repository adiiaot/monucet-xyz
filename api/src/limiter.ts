export class Limiter {
  #idsToTime: Map<string, number>
  #limit: number

  constructor(limit: number) {
    this.#idsToTime = new Map()
    this.#limit = limit
  }

  isSendable(id: string): number {
    const now = Date.now()
    const time = this.#idsToTime.get(id)

    if (!time) {
      this.#idsToTime.set(id, now)
      return 0
    }

    if (now > time + this.#limit) {
      this.#idsToTime.set(id, now)
      return 0
    }

    return Math.ceil((time + this.#limit - now) / (60 * 60 * 1000))
  }
}
