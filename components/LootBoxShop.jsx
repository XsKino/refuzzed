"use client"

import { useEffect, useState } from "react"
import axios from "axios"

axios.defaults.headers["Content-Type"] = "application/json"
axios.defaults.responseType = "json"

export default function LootBoxShop({ className }) {
  const getLootboxes = async () => {
    const res = await axios.get(`/api/lootboxes`)
    console.log(res.data.lootBoxes)
    return res.data.lootBoxes
  }

  const [lootBoxes, setLootBoxes] = useState([])

  useEffect(() => {
    setLootBoxes(getLootboxes())
  }, [])

  return (
    <ul className={className}>
      <p>{Array.isArray(lootBoxes) ? "si es array" : "noes, es " + typeof lootBoxes}</p>
      <p>{lootBoxes.length}</p>
      {Array.isArray(lootBoxes & lootBoxes.length) &&
        lootBoxes.map(lootBox => (
          <li key={lootBox.name}>
            <h3>{lootBox.name}</h3>
            <p>{lootBox.price / 1000} SOL</p>

            <button>Buy</button>
          </li>
        ))}
    </ul>
  )
}
