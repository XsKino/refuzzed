"use client"
import Image from "next/image"
import { montserrat } from "@/styles/fonts"
import useWallet from "@/hooks/useWallet"
import toast from "react-hot-toast"

export default function Home() {
  const wallet = useWallet()

  const handleConnect = async () => {
    const msg = wallet.connected ? "Wallet Refreshed" : "Wallet Connected"
    try {
      await wallet.connect()
      toast.dismiss()
      toast.success(msg)
    } catch (error) {
      toast.error("Phantom wallet not installed")
      setTimeout(() => {
        window.open("https://phantom.app/", "_blank")
      }, 1500)
    }
  }

  const handleDisconnect = () => {
    wallet.disconnect()
    toast.dismiss()
    toast.success("Wallet disconnected")
  }

  return (
    <main
      className={`${montserrat.className} w-full h-full flex flex-col gap-8 justify-center items-center`}>
      <div className='flex flex-col justify-evenly h-1/2 items-center'>
        <p className=' text-blue-500 text-[76px] font-bold'>F U Z Z E</p>
        <div className='flex gap-8'>
          <button
            className='rounded-md bg-blue-500 font-bold text-white p-8 hover:bg-blue-700 active:bg-blue-900'
            onClick={handleConnect}>
            {wallet.connected ? "Refresh wallet" : "Connect wallet"}
          </button>
          {wallet.connected && (
            <button
              className='rounded-md bg-blue-500 font-bold text-white p-8 hover:bg-blue-700 active:bg-blue-900'
              onClick={handleDisconnect}>
              Disconnect wallet
            </button>
          )}
        </div>

        <div className='h-32'>
          <div className='bg-blue-500 rounded-md p-4 min-w-[40vw] flex flex-col gap-4 h-min'>
            <div className='flex items-center justify-between'>
              <p className=' text-white text-lg font-bold'>
                Your Wallet <span className='text-xs opacity-50'>(DEVNET)</span>
              </p>
              <p
                className={`h-4 aspect-square rounded-full  transition-all ${
                  wallet.connected
                    ? "bg-lime-400 shadow-lime-200 shadow-[0_0_0.6rem]"
                    : "bg-blue-500 shadow-blue-600 shadow-[inset_0_0_0.6rem]"
                }`}></p>
            </div>
            <div
              className={`grid grid-rows-2 gap-x-4 grid-cols-[auto_1fr] transition-all ${
                wallet.connected ? "opacity-1 translate-x-0" : "opacity-0 translate-x-16 "
              }`}>
              <p className=' text-blue-200 font-bold'>Your Public Key:</p>
              <p className=' text-white font-bold'>{wallet.publicKey}</p>
              <p className=' text-blue-200 font-bold'>Your Balance:</p>
              <p className=' text-white font-bold'>{wallet.balance} SOL </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
