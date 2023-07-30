"use client"

import { useEffect, useState } from "react"
import axios from "axios"

export default function DrinkCatalogue({ className }) {
  const getDrinks = async () => {
    const res = await axios.get(`/api/drinks`)
    return res.data.drinks
  }

  const [drinks, setDrinks] = useState([])

  useEffect(() => {
    ;(async () => {
      setDrinks(await getDrinks())
    })()
  }, [])

  return (
    <ul className={className}>
      {drinks.map(drink => (
        <li>
          <h3>{drink.name}</h3>
          <p>{"⭐⭐⭐⭐⭐".slice(0, drink.rarity)}</p>
        </li>
      ))}
    </ul>
  )
}
