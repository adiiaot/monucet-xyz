export class Limiter {
  #idsToTime: Map<string, number>
  #addressesToTime: Map<string, number>
  #limit: number

  constructor(limit: number) {
    this.#idsToTime = new Map()
    this.#addressesToTime = new Map()
    this.#limit = limit
  }

  isSendable(id: string, address: string): number {
    const now = Date.now()
    const idTime = this.#idsToTime.get(id)
    const addressTime = this.#addressesToTime.get(address)

    if (idTime === undefined && addressTime === undefined) {
      this.#idsToTime.set(id, now)
      this.#addressesToTime.set(address, now)
      return 0
    }

    if (idTime && now < idTime + this.#limit) {
      return Math.ceil((idTime + this.#limit - now) / (60 * 60 * 1000))
    }

    if (addressTime && now < addressTime + this.#limit) {
      return Math.ceil((addressTime + this.#limit - now) / (60 * 60 * 1000))
    }

    this.#idsToTime.set(id, now)
    this.#idsToTime.set(address, now)
    return 0
  }
}
