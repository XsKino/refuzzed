"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import Image from "next/image"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

export default function DrinkCatalogue({ className }) {
  const getDrinks = async () => {
    const res = await axios.get(`/api/drinks`)
    const sorted = res.data.drinks.sort((a, b) => b.rarity - a.rarity)
    return sorted
  }

  const [drinks, setDrinks] = useState([])

  useEffect(() => {
    ;(async () => {
      setDrinks(await getDrinks())
    })()
  }, [])

  return (
    <>
      <h1 className='text-2xl font-semibold text-center pb-4'>Flavor Catalogue</h1>

      <ul className={className}>
        {!drinks.length && (
          <i className='animate-spin'>
            <AiOutlineLoading3Quarters />
          </i>
        )}
        {drinks.map(drink => (
          <li
            key={drink.name}
            className='flex items-center gap-4 hoverScaleParent cursor-pointer'
            onClick={() => {}}>
            <div className='min-h-20 m ax-h-20 min-w-10 max-w-10 grid place-content-center'>
              <Image
                alt='drink'
                src={`/img/drinks/${drink.name.toLowerCase().replaceAll(" ", "_")}.png`}
                height={100}
                width={100}
                className='h-full aspect-square hoverScaleChildren'
              />
            </div>
            <div>
              <h3 className='font-bold'>{drink.name}</h3>
              <p>{"⭐⭐⭐⭐⭐".slice(0, drink.rarity)}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
