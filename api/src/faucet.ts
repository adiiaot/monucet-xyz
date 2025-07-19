import { createWalletClient, Hex, http, HttpTransport, PrivateKeyAccount, WalletClient } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { monadTestnet } from 'viem/chains'

export class Faucet {
  wallet: WalletClient<HttpTransport, typeof monadTestnet, PrivateKeyAccount>

  constructor(key: Hex) {
    this.wallet = createWalletClient({
      chain: monadTestnet,
      transport: http(),
      account: privateKeyToAccount(key),
    })
  }

  async send(to: Hex, value: number) {
    try {
      const tx = await this.wallet.sendTransaction({
        to,
        value: BigInt(value * 100) * 10n ** 16n,
      })
      return tx
    } catch (error) {
      return undefined
    }
  }
}
