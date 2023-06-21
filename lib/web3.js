import {
  Connection,
  SystemProgram,
  Transaction,
  PublicKey,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
  sendTransactionError,
} from "@solana/web3.js"

const SOLANA_NETWORK = "devnet"

const connect = async () => {
  const provider = window?.phantom?.solana
  const { solana } = window

  if (!provider?.isPhantom || !solana?.isPhantom) {
    throw new Error("Phantom wallet is not installed")
  }

  let phantom = provider?.isPhantom ? provider : solana

  return await phantom.connect()
}

const getBalance = async publicKey => {
  try {
    const connection = new Connection(clusterApiUrl(SOLANA_NETWORK), "confirmed")
    const balance = await connection.getBalance(new PublicKey(publicKey))
    return balance / LAMPORTS_PER_SOL
  } catch (error) {
    throw sendTransactionError("error getting balance")
  }
}

const web3 = {
  connect,
  getBalance,
}

export default web3
