import {
  Connection,
  SystemProgram,
  Transaction,
  PublicKey,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
} from "@solana/web3.js"

const SOLANA_NETWORK = "devnet"

const phantomIsInstalled = () => window?.phantom?.solana?.isPhantom && window?.solana?.isPhantom

const getProvider = () => window?.phantom?.solana || window?.solana

const getTransactionFee = async () => {
  const connection = new Connection(clusterApiUrl(SOLANA_NETWORK), "confirmed")
  const fee = await connection.getMinimumBalanceForRentExemption(10) // arbitrary dataLegnth
  return fee / LAMPORTS_PER_SOL
}

const connect = async () => {
  const provider = getProvider()
  if (window != null) {
    const { solana } = window
  }

  if (!phantomIsInstalled()) {
    throw new Error("Phantom wallet is not installed")
  }

  let phantom = provider?.isPhantom ? provider : solana

  try {
    return await phantom.connect()
  } catch (error) {
    throw new Error("Access denied")
  }
}

const disconnect = async () => {
  if (window != null) {
    const { solana } = window
    solana.disconnect()
  }
}

const getBalance = async publicKey => {
  try {
    const connection = new Connection(clusterApiUrl(SOLANA_NETWORK), "confirmed")
    const balance = await connection.getBalance(new PublicKey(publicKey))
    return balance / LAMPORTS_PER_SOL
  } catch (error) {
    throw new Error("Failed to balance")
  }
}

const send = async ({ fromPublicKey, toPublicKey, solAmount }) => {
  const fromBalance = await getBalance(fromPublicKey)
  if (fromBalance < solAmount) throw new Error("Insufficient balance")
  try {
    const provider = getProvider()
    const connection = new Connection(clusterApiUrl(SOLANA_NETWORK), "confirmed")

    const fromPubkey = new PublicKey(fromPublicKey)
    const toPubkey = new PublicKey(toPublicKey)

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey,
        toPubkey,
        lamports: solAmount * LAMPORTS_PER_SOL,
      })
    )

    const latestBlockhash = (await connection.getLatestBlockhash()).blockhash
    transaction.recentBlockhash = latestBlockhash
    transaction.feePayer = fromPubkey

    const signature = await provider.signTransaction(transaction)
    const txid = await connection.sendRawTransaction(signature.serialize())
    const confirmation = await connection.confirmTransaction(txid, {
      commitment: "singleGossip",
    })

    const { slot } = confirmation.value
    return { txid, slot }
  } catch (error) {
    throw new Error("Failed to send transaction")
  }
}

const web3 = {
  SOLANA_NETWORK,
  connect,
  disconnect,
  getBalance,
  phantomIsInstalled,
  send,
  getTransactionFee,
}

export default web3
