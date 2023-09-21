/* eslint-disable no-unused-vars */
import { WalletNotConnectedError } from '@solana/wallet-adapter-base'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Keypair, SystemProgram, Transaction, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { useCallback } from 'react'

export default function useMyWallet() {
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()

  const send = useCallback(
    async (toPubkey, solAmount) => {
      if (!publicKey) throw new WalletNotConnectedError()

      // 890880 lamports as of 2022-09-01
      const lamports = LAMPORTS_PER_SOL * solAmount

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(toPubkey),
          lamports
        })
      )

      const {
        context: { slot: minContextSlot },
        value: { blockhash, lastValidBlockHeight }
      } = await connection.getLatestBlockhashAndContext()

      const signature = await sendTransaction(transaction, connection, { minContextSlot })

      await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature })
    },
    [publicKey, sendTransaction, connection]
  )

  return { publicKey, send }
}
