import "@/styles/globals.css"
import { Toaster } from "react-hot-toast"

export const metadata = {
  title: "Fuzze",
  description: "owo",
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <NavBar />
        <hr />
        <main className='bg-neutral lg:px-[20%]'>{children}</main>
        <Toaster position='top-center' />
      </body>
    </html>
  )
}
