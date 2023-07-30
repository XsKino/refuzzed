import "@/styles/globals.css"
import { Toaster } from "react-hot-toast"
import NavBar from "@/components/NavBar"

export const metadata = {
  title: "Fuzze",
  description: "owo",
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className='bg-neutral text-foreground'>
        <main className='lg:px-[20%]'>
          <NavBar />
          <hr className='opacity-20' />
          {children}
        </main>
        <Toaster position='top-center' />
      </body>
    </html>
  )
}
