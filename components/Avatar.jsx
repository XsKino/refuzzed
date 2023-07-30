"use client"

import useWallet from "@/hooks/useWallet"
import { useEffect } from "react"
import toast from "react-hot-toast"
import axios from "axios"

const getUser = async publicKey => {
  const res = await axios.get(`/api/users?api=${publicKey}`)
  const user = await res.json()
  return user
}

export default function Avatar() {
  // TEMPORARY
  useEffect(() => {}, [])

  const wallet = useWallet()

  // return ()
}
