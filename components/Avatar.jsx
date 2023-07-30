"use client"

import Image from "next/image"
import Link from "next/link"
import useWallet from "@/hooks/useWallet"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import axios from "axios"

export default function Avatar() {
  const wallet = useWallet()
  const router = useRouter()

  const [user, setUser] = useState(null)

  const fetchUser = async publicKey => {
    console.log(publicKey)
    const res = await axios.get(`/api/users?publicKey=${publicKey}`)
    setUser(res.data.userExists ? res.data.user : null)
    return res.data.userExists ? res.data.user : null
  }

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

  const handleRegisterClick = async () => {
    const curr = await fetchUser(wallet.publicKey)
    setUser(curr)
    if (!curr) {
      router.push("/register")
    }
  }

  useEffect(() => {
    try {
      wallet.connect()
    } catch (err) {}

    if (wallet.publicKey) {
      fetchUser(wallet.publicKey)
    }
  }, [wallet.publicKey])

  return (
    <div className='flex gap-4 w-36 items-center pb-4 cursor-pointer'>
      {user ? (
        <>
          <Image
            // src={user.avatar}
            src='/img/silly.png'
            alt='avatar'
            width={128}
            height={128}
            className='rounded-full aspect-square h-12 w-12'
          />
          <p className='font-semibold text-lg'>{user.username}</p>
        </>
      ) : wallet.publicKey ? (
        <button
          onClick={handleRegisterClick}
          className='w-full p-3 bg-primary text-foreground'
          href='register'>
          Register
        </button>
      ) : (
        <button className='w-full p-3 bg-secondary text-foreground' onClick={handleConnect}>
          Connect
        </button>
      )}
    </div>
  )
}
