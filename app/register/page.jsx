"use client"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import axios from "axios"
import useWallet from "@/hooks/useWallet"

export default function Register() {
  const router = useRouter()
  const wallet = useWallet()

  const handleUsernameSubmit = async e => {
    e.preventDefault()
    try {
      const userBody = {
        publicKey: wallet.publicKey,
        username: document.getElementById("usernameInput").value,
      }
      const response = await axios.post("/api/users", userBody)
      console.log(response.data)
      toast.success("Registered!")
      router.replace("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='w-full flex justify-center'>
      <form onSubmit={handleUsernameSubmit} className='text-white flex flex-col gap-4 items-center'>
        <label htmlFor='usernameInput' className='mb-4'>
          Register your username:
        </label>
        <input
          type='text'
          id='usernameInput'
          placeholder='Username'
          required
          className='bg-transparent p-2 px-4 border-none outline-none text-foreground border-b-1 border-b-primary w-full active:border-b-2 focus:border-b-2'
        />
        <button type='submit' className=' p-3 bg-primary text-foreground p-x-8 rounded-md'>
          Ok
        </button>
      </form>
    </div>
  )
}
