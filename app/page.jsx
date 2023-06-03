import Image from "next/image"
import { SignInButton, UserButton, signInButton, userButton } from "@clerk/nextjs"
import { SignedIn, SignedOut } from "@clerk/nextjs"

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center '>
      <SignedIn>
        <UserButton className='w-20 h-20 rounded-full' />
      </SignedIn>
      <SignedOut>
        <SignInButton mode='modal'>
          <button className='w-20 h-20 rounded-full'>sign in</button>
        </SignInButton>
      </SignedOut>
    </main>
  )
}
