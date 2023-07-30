import "@/styles/globals.css"
import { Toaster } from "react-hot-toast"
import NavBar from "@/components/NavBar"

export const metadata = {
  title: "Fuzze",
  description: "owo",
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "64x64",
      url: "/icon.png",
    },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className='bg-neutral text-foreground'>
        <div className='sticky top-0'>
          <NavBar />
          <hr className='opacity-20 lg:mx-[20%]' />
        </div>
        <main className='px-6 lg:px-[20%] pb-8'>{children}</main>
        <Toaster position='top-center' />
      </body>
    </html>
  )
}
