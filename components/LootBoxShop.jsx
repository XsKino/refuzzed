"use client"

import { useEffect, useState } from "react"
import useWallet from "@/hooks/useWallet"
import { FUZZE_WALLET_ADRESS } from "@/public/constants"
import axios from "axios"
import toast from "react-hot-toast"

axios.defaults.headers["Content-Type"] = "application/json"
axios.defaults.responseType = "json"

export default function LootBoxShop({ className }) {
  const wallet = useWallet()

  const getLootboxes = async () => {
    const res = await axios.get(`/api/lootboxes`)
    const sorted = res.data.lootBoxes.sort((a, b) => a.price - b.price)
    return sorted
  }

  const [lootBoxes, setLootBoxes] = useState([])
  const [selectedLootbox, setSelectedLootbox] = useState(null)

  useEffect(() => {
    ;(async () => {
      setLootBoxes(await getLootboxes())
    })()
  }, [])

  return (
    <ul className={className}>
      {lootBoxes.map(
        lootBox =>
          lootBox.price >= 0 && (
            <li
              key={lootBox.name}
              className='bg-neutral shadow-md flex flex-col gap-2 rounded-lg overflow-hidden'>
              <div className=' m-4 mb-0 grid place-content-center w-24 aspect-square border border-red-300 rounded-lg'>
                img
              </div>
              <div className='px-4'>
                <h3 className='text-lg font-semibold'>{lootBox.name}</h3>
                <p className=''>{lootBox.price / 1000} SOL</p>
              </div>

              <button
                onClick={() => {
                  window.purchase.showModal()
                  setSelectedLootbox(lootBox)
                }}
                className='transition-colors bg-secondary w-full p-2 hover:bg-accent'>
                Buy
              </button>
            </li>
          )
      )}
      <dialog
        id='purchase'
        className='bg-transparent bg-grad from-[#fff5] to-[#fff2] shadow-md backdrop-blur backdrop-brightness-90 text-foreground rounded-md p-4 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-12 min-w-[12rem]'>
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
                window.purchase.close()
              }}>
              Cancel
            </button>
            <button
              className='bg-green-500 p-4 rounded-md'
              onClick={() => {
                ;async () => {
                  try {
                    const amount = document.getElementById("lootboxPurchaseAmount").value
                    const solAmount = (selectedLootbox.price / 1000) * amount
                    const transaction = await wallet.send(FUZZE_WALLET_ADRESS, solAmount)
                    console.log(transaction)
                    window.purchase.close()
                    toast.success(`Purchased ${amount} ${selectedLootbox.name} lootboxes`)
                  } catch {
                    toast.error("Something went wrong")
                  }
                }
              }}>
              Purchase
            </button>
          </div>
        </div>
      </dialog>
    </ul>
  )
}
