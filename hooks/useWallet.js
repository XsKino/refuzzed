import { useState, useEffect, useCallback } from "react"
import useLocalStorage from "@/hooks/useLocalStorage"
import web3 from "@/lib/web3"

const useWallet = () => {
  const [publicKey, setPublicKey] = useLocalStorage("publicKey", null)
  const [connected, setConnected] = useState(false)
  const [balance, setBalance] = useState(0)

  const connectWallet = async () => {
    const { publicKey } = await web3.connect()
    setPublicKey(publicKey.toString())
    setConnected(true)
  }

  const disconnectWallet = () => {
    setPublicKey(null)
    setConnected(false)
  }

  const getBalance = useCallback(async () => {
    if (!publicKey) return
    const balance = await web3.getBalance(publicKey)
    setBalance(balance)

    setTransactionFee(await web3.getTransactionFee())
  })

  useEffect(() => {
    getBalance()
    setConnected(!!publicKey)
  }, [getBalance, publicKey])

  const addTransaction = ({ txid, slot }) => {
    const latest = {
      txid,
      slot,
      solanaExplorerLink: `https://explorer.solana.com/tx/${txid}?cluster=${web3.SOLANA_NETWORK}`,
    }
    setLatestTransaction(latest)
    setTransactionHistory([latest, ...transactionHistory])
  }

  const clearTransactionHistory = () => {
    setTransactionHistory([])
    setLatestTransaction(null)
  }

  const send = async (toPublicKey, solAmount) => {
    if (!publicKey) throw new Error("Wallet not connected")

    const { txid, slot } = await web3.send({
      fromPublicKey: publicKey,
      toPublicKey,
      solAmount,
    })

    addTransaction({ txid, slot })
    getBalance()
  }

  return {
    publicKey,
    connected,
    balance,
    connect: connectWallet,
    disconnect: disconnectWallet,
  }
}

export default useWallet
