"use client"

import axios from "axios"
import { useEffect, useState } from "react"
export default function Home() {
  const [data, setData] = useState({ hits: [] })

  const fetchData = async () => {
    const result = await axios.get("/api/users")
    setData(result.data)
    console.log(result.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return <div className='outline outline-blue-500'>holi</div>
}
