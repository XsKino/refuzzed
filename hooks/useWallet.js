import { useState, useEffect } from "react"
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

  const getBalance = async () => {
    if (!publicKey) return
    const balance = await web3.getBalance(publicKey)
    setBalance(balance)
  }

  useEffect(() => {
    getBalance()
    setConnected(!!publicKey)
  }, [publicKey])

  return {
    publicKey,
    connected,
    balance,
    connect: connectWallet,
    disconnect: disconnectWallet,
  }
}

export default useWallet
