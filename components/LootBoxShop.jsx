'use client'

import { useEffect, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { FUZZE_WALLET_ADRESS } from '@/public/constants'
import axios from 'axios'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.responseType = 'json'

export default function LootBoxShop({ className }) {
  const getLootboxes = async () => {
    const res = await axios.get(`/api/lootboxes`)
    const sorted = res.data.lootBoxes.sort((a, b) => a.price - b.price)
    return sorted
  }

  const getDrinks = async () => {
    const res = await axios.get(`/api/drinks`)
    const sorted = res.data.drinks.sort((a, b) => b.rarity - a.rarity)
    return sorted
  }

  const getRewards = async lootTable => {
    const drinks = await getDrinks()
    const rewardsRarity1 = drinks.filter(drink => drink.rarity === 1)
    const rewardsRarity2 = drinks.filter(drink => drink.rarity === 2)
    const rewardsRarity3 = drinks.filter(drink => drink.rarity === 3)
    const rewardsRarity4 = drinks.filter(drink => drink.rarity === 4)
    const rewardsRarity5 = drinks.filter(drink => drink.rarity === 5)

    const filteredRewards = [rewardsRarity1, rewardsRarity2, rewardsRarity3, rewardsRarity4, rewardsRarity5]

    const rewards = []
    lootTable.forEach(loot => {
      for (let i = 0; i < loot.granted; i++) {
        rewards.push(
          filteredRewards[loot.rarity - 1][
            Math.floor(Math.random() * filteredRewards[loot.rarity - 1].length)
          ]
        )
      }
      for (let i = 0; i < loot.rolls; i++) {
        if (Math.random() < loot.probability) {
          rewards.push(
            filteredRewards[loot.rarity - 1][
              Math.floor(Math.random() * filteredRewards[loot.rarity - 1].length)
            ]
          )
        }
      }
    })

    // Crea el objeto temporal para contar las repeticiones de cada drink
    const drinkCountMap = {}

    // Recorre el array 'rewards' y cuenta las repeticiones
    rewards.forEach(drink => {
      const drinkName = drink.name // Asume que cada objeto drink tiene un campo 'id' único para identificarlo

      if (!drinkCountMap[drinkName]) {
        drinkCountMap[drinkName] = { ...drink, count: 1 }
      } else {
        drinkCountMap[drinkName].count++
      }
    })

    // Crea el array 'countedRewards' con los objetos 'drink' y 'count'
    const countedRewards = Object.values(drinkCountMap)

    return countedRewards
  }

  const [rewards, setRewards] = useState([])

  const [lootBoxes, setLootBoxes] = useState([])
  const [selectedLootbox, setSelectedLootbox] = useState(null)

  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
  const [showRewardsModal, setShowRewardsModal] = useState(false)

  useEffect(() => {
    ;(async () => {
      setLootBoxes(await getLootboxes())
    })()
  }, [])

  return (
    <>
      <h1 className='text-2xl font-semibold text-center pb-4'>Lootbox Shop</h1>
      <ul className={className}>
        {!lootBoxes.length && (
          <i className='animate-spin w-full grid place-content-center'>
            <AiOutlineLoading3Quarters />
          </i>
        )}
        {lootBoxes.map(
          lootBox =>
            lootBox.price >= 0 && (
              <li
                key={lootBox.name}
                className='bg-neutral shadow-md flex flex-col flex-grow min-w-min gap-2 rounded-lg overflow-hidden'>
                <div className='grid place-content-center'>
                  <div className=' m-4 mb-0 grid place-content-center w-24 aspect-square rounded-lg overflow-hidden'>
                    <Image
                      alt='lootbox'
                      src={`/img/lootboxes/${lootBox.name.toLowerCase().replaceAll(' ', '_')}.png`}
                      placeholder='blur'
                      blurDataURL={`/img/lootboxes/${lootBox.name.toLowerCase().replaceAll(' ', '_')}.png`}
                      height={100}
                      width={100}
                      className='h-full aspect-square hoverScaleChildren'
                    />
                  </div>
                </div>
                <div className='px-4'>
                  <h3 className='text-lg font-semibold text-center'>{lootBox.name}</h3>
                  <p className='text-right opacity-70'>{lootBox.price / 1000} SOL</p>
                </div>

                <button
                  onClick={() => {
                    setSelectedLootbox(lootBox)
                    setShowPurchaseModal(true)
                  }}
                  className='transition-colors bg-secondary w-full p-2 hover:bg-accent'>
                  Buy
                </button>
              </li>
            )
        )}
        {showPurchaseModal && (
          <div
            className='modalOverlay'
            onClick={() => {
              setShowPurchaseModal(false)
            }}>
            <div className='bg-transparent bg-gradient-to-t from-[#fff3] to-[#fff1] shadow-md backdrop-blur backdrop-brightness-90 text-foreground rounded-md p-4 px-12 min-w-[12rem]'>
              <div className='flex flex-col gap-4'>
                <div className='grid place-content-center'>
                  <div className='h-24 aspect-square grid place-content-center rounded-md overflow-hidden'>
                    {selectedLootbox && (
                      <Image
                        alt='lootbox'
                        src={`/img/lootboxes/${selectedLootbox.name.toLowerCase().replaceAll(' ', '_')}.png`}
                        height={100}
                        width={100}
                        className='h-full aspect-square hoverScaleChildren'
                      />
                    )}
                  </div>
                </div>
                <h2 className='text-center text-lg font-semibold'>{selectedLootbox?.name} Box</h2>
                <div className='flex gap-4 items-center'>
                  <p>{selectedLootbox?.price / 1000} SOL</p>
                  {/* <input
              type='number'
              name='lootboxPurchaseAmount'
              id='lootboxPurchaseAmount'
              min={1}
              defaultValue={1}
              max={99}
              className='p-2 px-4 rounded-lg bg-[#0004] outline-none border-none'
            /> */}
                </div>
                <div className='flex gap-4'>
                  <button
                    className='bg-neutral p-4 rounded-md'
                    onClick={() => {
                      setShowPurchaseModal(false)
                    }}>
                    Cancel
                  </button>
                  <button
                    className='bg-primary hover:bg-accent transition-colors p-4 rounded-md'
                    onClick={e => {
                      e.stopPropagation()
                      ;(async () => {
                        try {
                          // const amount = document.getElementById("lootboxPurchaseAmount").value
                          // const solAmount = (selectedLootbox.price / 1000) * amount
                          // eslint-disable-next-line no-unused-vars
                          const solAmount = selectedLootbox.price / 1000
                          // const user = await axios.post(`/api/users`, {
                          //   publicKey: wallet.publicKey,
                          //   lootbox: { name: selectedLootbox.name, amount: amount },
                          // })
                          setShowPurchaseModal(false)
                          toast.success(`Purchased ${selectedLootbox.name} lootbox`)
                          setShowRewardsModal(true)
                          setRewards(await getRewards(selectedLootbox.lootTable))
                        } catch (error) {
                          toast.error(error.message || 'Something went wrong')
                          console.log(error)
                        }
                      })()
                    }}>
                    Purchase
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* rewards */}
        {showRewardsModal && (
          <div className='modalOverlay'>
            <div className='bg-transparent bg-gradient-to-t from-[#fff3] to-[#fff1] shadow-md backdrop-blur backdrop-brightness-90 text-foreground rounded-md p-4 px-12 min-w-[12rem]'>
              <div className='flex flex-col gap-4 '>
                <div className=''>
                  <h2>Your rewards</h2>
                </div>
                <div className='flex wrap gap-3'>
                  {!rewards.length && (
                    <i className='animate-spin'>
                      <AiOutlineLoading3Quarters />
                    </i>
                  )}
                  {rewards.map(reward => (
                    <div key={reward.name} className='flex flex-col gap-2 items-center'>
                      <div
                        className='h-12 aspect-square grid place-content-center rounded-md overflow-hidden bg-gradient-to-t from-[#fff7] to-primary'
                        title={reward.name}>
                        <Image
                          alt='drink'
                          src={`/img/drinks/${reward.name.toLowerCase().replaceAll(' ', '_')}.png`}
                          placeholder='blur'
                          blurDataURL={`/img/drinks/${reward.name.toLowerCase().replaceAll(' ', '_')}.png`}
                          height={100}
                          width={100}
                          className='h-full aspect-square'
                        />
                      </div>
                      {reward.count && (
                        <div className='bg-primary rounded-md p-1 px-2 text-xs'>{reward.count}</div>
                      )}
                    </div>
                  ))}
                </div>
                <div className='flex gap-2 justify-end'>
                  {!!rewards.length && (
                    <button
                      className='rounded-md p-2 bg-primary hover:bg-accent transition-colors'
                      onClick={() => {
                        setShowRewardsModal(false)
                        setRewards([])
                      }}>
                      Aceptar
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </ul>
    </>
  )
}
