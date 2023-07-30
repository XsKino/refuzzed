"use client"

import useWallet from "@/hooks/useWallet"
import { useState } from "react"
import toast from "react-hot-toast"
import { FUZZE_WALLET_ADRESS } from "@/public/constants"

import { TbCurrencySolana } from "react-icons/tb"

const lootboxes = [
  {
    id: 1,
    name: "Common",
    price: 100,
    lootTable: [
      {
        rarity: 1,
        granted: 1,
        probability: 0.5,
        rolls: 5,
      },
      {
        rarity: 2,
        granted: 1,
        probability: 0.3,
        rolls: 3,
      },
      {
        rarity: 3,
        probability: 0.1,
        rolls: 2,
      },
    ],
  },
  {
    id: 2,
    name: "Rare",
    price: 400,
    lootTable: [
      {
        rarity: 1,
        granted: 2,
        probability: 0.5,
        rolls: 5,
      },
      {
        rarity: 2,
        granted: 2,
        probability: 0.3,
        rolls: 3,
      },
      {
        rarity: 3,
        probability: 0.1,
        rolls: 2,
      },
      {
        rarity: 4,
        probability: 0.1,
        rolls: 1,
      },
    ],
  },
  {
    id: 3,
    name: "Epic",
    price: 900,
    lootTable: [
      {
        rarity: 2,
        granted: 3,
        probability: 0.5,
        rolls: 3,
      },
      {
        rarity: 3,
        granted: 3,
        probability: 0.3,
        rolls: 2,
      },
      {
        rarity: 4,
        granted: 1,
        probability: 0.2,
        rolls: 2,
      },
      {
        rarity: 5,
        probability: 0.1,
        rolls: 1,
      },
    ],
  },
  {
    id: 4,
    name: "Legendary",
    price: 2000,
    lootTable: [
      {
        rarity: 3,
        granted: 5,
        probability: 0.5,
        rolls: 5,
      },
      {
        rarity: 4,
        granted: 3,
        probability: 0.3,
        rolls: 3,
      },
      {
        rarity: 5,
        granted: 1,
        probability: 0.2,
        rolls: 2,
      },
    ],
  },
]

const drinks = [
  {
    name: "Cherry Blossom",
    rarity: 5,
  },
  {
    name: "RGB-Cola",
    rarity: 5,
  },
  {
    name: "Piano Man",
    rarity: 2,
  },
  {
    name: "Mint mango",
    rarity: 2,
  },
  {
    name: "Moonblast",
    rarity: 3,
  },
  {
    name: "Sparkle Star",
    rarity: 3,
  },
  {
    name: "Fluffy Dream",
    rarity: 1,
  },
  {
    name: "Flaming Moai",
    rarity: 5,
  },
  {
    name: "Iced Caramel Spresso Pop",
    rarity: 1,
  },
  {
    name: "New York Cheesecake Cream",
    rarity: 1,
  },
  {
    name: "Habanero Lime Sparkle",
    rarity: 1,
  },
  {
    name: "Ghost Pepper Berry Burst",
    rarity: 2,
  },
]

export default function PurchaseLootbox() {
  const wallet = useWallet()

  const [selectedLootbox, setSelectedLootbox] = useState(null)

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

  return (
    <div className='flex flex-col p-4 m-auto bg-white w-full max-w-3xl min-h-screen'>
      <h1>lootboxes</h1>
      <ul className='flex p-4 gap-4 max-w-full overflow-x-auto'>
        {lootboxes.map((lootbox, index) => (
          <li key={index}>
            <button
              className='flex flex-col gap-4 p-4 bg-blue-500 rounded-md min-w-[8rem]'
              onClick={() => {
                setSelectedLootbox(lootbox)
                window.lootboxModalPurchase.showModal()
              }}>
              <h2 className='font-semibold'>{lootbox.name}</h2>
              <p className='text-gray-800'>{lootbox.price / 1000} SOL</p>
            </button>
          </li>
        ))}
      </ul>
      <dialog
        id='lootboxModalPurchase'
        className='bg-white outline rounded-md p-4 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-12 min-w-[12rem]'>
        <div className='flex flex-col gap-4'>
          <h2>{selectedLootbox?.name}</h2>
          <p>{selectedLootbox?.price / 1000} SOL</p>
          <input
            type='number'
            name='lootboxPurchaseAmount'
            id='lootboxPurchaseAmount'
            min={1}
            defaultValue={1}
            max={99}
          />
          <div className='flex gap-4'>
            <button
              className='bg-red-500 p-4 rounded-md'
              onClick={() => {
                window.lootboxModalPurchase.close()
              }}>
              Cancel
            </button>
            <button
              className='bg-green-500 p-4 rounded-md'
              onClick={() => {
                try {
                  ;(async () => {
                    const amount = document.getElementById("lootboxPurchaseAmount").value
                    const solAmount = (selectedLootbox.price / 1000) * amount
                    const transaction = await wallet.send(FUZZE_WALLET_ADRESS, solAmount)
                    console.log(transaction)
                    window.lootboxModalPurchase.close()
                    toast.success(`Purchased ${amount} ${selectedLootbox.name} lootboxes`)
                  })()
                } catch (err) {
                  toast.error("Something went wrong")
                }
              }}>
              Purchase
            </button>
          </div>
        </div>
      </dialog>

      <div className='flex flex-col gap-8 min-h-[100svh] min-w-1/2 px-8 pt-[25svh] items-center bg-white'>
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
      </div>
    </div>
  )
}
