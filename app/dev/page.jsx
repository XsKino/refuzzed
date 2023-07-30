"use client"
import Link from "next/link"
import { montserrat } from "@/styles/fonts"
import useWallet from "@/hooks/useWallet"
import toast from "react-hot-toast"

import { FaWallet } from "react-icons/fa"
import { TbCurrencySolana } from "react-icons/tb"
import { BiTransfer } from "react-icons/bi"
import { MdSend } from "react-icons/md"
import { BsFillArrowUpSquareFill } from "react-icons/bs"
import { CgArrowsExpandUpRight } from "react-icons/cg"
import { IoCopy } from "react-icons/io5"

export default function Home() {
  const $ = element => document.querySelector(element)

  const wallet = useWallet()

  const handleConnect = async () => {
    const msg = wallet.connected ? "Wallet Refreshed" : "Wallet Connected"
    try {
      await wallet.connect()
      toast.dismiss()
      toast.success(msg)
    } catch (error) {
      toast.error(error.message)
      if (!wallet.phantomIsInstalled) {
        setTimeout(() => {
          window.open("https://phantom.app/", "_blank")
        }, 1500)
      }
    }
  }

  const handleDisconnect = () => {
    wallet.disconnect()
    toast.dismiss()
    toast.success("Wallet disconnected")
  }

  const handleSendTransaction = async () => {
    try {
      await wallet.send($("#toWallet").value, $("#solAmount").value)
      toast.success("Transaction sent")
      $("#toWallet").value = ""
      $("#solAmount").value = ""
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <main
      className={`${montserrat.className} w-full min-h-[100svh] flex flex-col gap-8 items-center bg-blue-500`}>
      <div className='flex flex-col gap-8 min-h-[100svh] min-w-1/2 px-8 pt-[25svh] items-center bg-white'>
        <p className=' text-blue-500 text-[76px] font-bold'>F U Z Z E</p>
        <p className=' text-blue-300 text-[32px] font-bold'>useWallet Showcase</p>
        <Link href='/dev/lootboxes' className='p-4 px-6 bg-blue-500 text-white rounded-md'>
          purchase Lootbox
        </Link>
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
            <p className=' text-white font-bold flex items-center gap-2'>
              {wallet.balance}
              {wallet.balance !== 0 && (
                <i>
                  <TbCurrencySolana />
                </i>
              )}
            </p>
          </div>
        </div>

        <div
          className={`grid grid-cols-[1fr_auto_2fr_auto] gap-4 transition-all ${
            wallet.connected ? "translate-y-0 opacity-1" : "translate-y-24 opacity-0"
          }`}>
          <div className='flex  bg-blue-500 rounded-md p-2 gap-2'>
            <i className='text-white h-full text-2xl'>
              <TbCurrencySolana />
            </i>
            <input
              disabled={wallet.maxBalanceForTransaction <= 0}
              id='solAmount'
              placeholder='SOL Amount'
              type='text'
              className='p-2 flex-1 text-white bg-transparent border-b-2 border-white placeholder:text-[#fff8] focus-visible:outline-none'
            />
            <button
              className='text-white hover:text-[#fffd] active:text-[#fffa]'
              title='max'
              onClick={() => {
                $("#solAmount").value = wallet.maxBalanceForTransaction
              }}>
              <i className=' h-full text-2xl'>
                <BsFillArrowUpSquareFill />
              </i>
            </button>
          </div>
          <i className='text-blue-500 h-full text-2xl'>
            <BiTransfer />
          </i>
          <div className='flex bg-blue-500 rounded-md p-2 gap-2'>
            <i className='text-white h-full text-2xl'>
              <FaWallet />
            </i>
            <input
              id='toWallet'
              placeholder='To Wallet address'
              type='text'
              className='p-2 flex-1 text-white bg-transparent border-b-2 border-white placeholder:text-[#fff8] focus-visible:outline-none'
            />
          </div>
          <button
            disabled={wallet.maxBalanceForTransaction <= 0}
            onClick={handleSendTransaction}
            title='Send SOL'
            className='aspect-square h-14 bg-blue-500 hover:bg-blue-700 active:bg-blue-900 rounded-md'>
            <i className='text-white h-full w-full text-2xl'>
              <MdSend />
            </i>
          </button>
          {wallet.maxBalanceForTransaction <= 0 && (
            <div className=''>
              <p className='text-red-500 text-sm font-bold'>You don't have enough SOL to send</p>
            </div>
          )}
        </div>

        {wallet.transactionHistory && (
          <div className='w-full flex flex-col gap-4 pb-4'>
            {wallet.transactionHistory.map((transaction, index) => (
              <div key={index} className='rounded-md bg-blue-500 text-white'>
                <div className='p-4 text-lg text-bold'>
                  Transaction #{wallet.transactionHistory.length - index}
                </div>
                <div className='flex flex-col gap-4 p-4'>
                  <div className='flex-1 flex flex-col gap-2'>
                    <p className='text-sm font-bold'>Slot:</p>
                    <p className='text-sm'>{transaction.slot}</p>
                  </div>
                  <div className='flex-1 flex flex-col gap-2'>
                    <p className='text-sm font-bold'>Signature:</p>
                    <p className='text-sm'>{transaction.txid}</p>
                  </div>
                </div>
                <div className='flex'>
                  <a
                    title='View on Solana Explorer'
                    href={transaction.solanaExplorerLink}
                    target='_blank'
                    className='flex-1 flex justify-center items-center text-xl p-2 hover:bg-blue-600 active:bg-blue-700 rounded-bl-md'>
                    <i>
                      <CgArrowsExpandUpRight />
                    </i>
                  </a>
                  <button
                    title='Copy signature to clipboard'
                    className='flex-1 flex justify-center items-center text-xl p-2 hover:bg-blue-600 active:bg-blue-700 rounded-br-md'
                    onClick={() => {
                      navigator.clipboard.writeText(transaction.txid)
                      toast.success("Transaction signature copied to clipboard")
                    }}>
                    <i>
                      <IoCopy />
                    </i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
