import Image from "next/image"
import { montserrat } from "@/styles/fonts"

import web3 from "@/services/web3"

export default function Home() {
  return (
    <main className={`${montserrat.className} w-full h-full flex justify-center items-center`}>
      <p className='text-blue-500 text-[76px] font-bold'>F U Z Z E</p>
      <button onClick={web3.connect}>Conectar wallet</button>
    </main>
  )
}
