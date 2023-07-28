import "@/styles/globals.css"
import { Toaster } from "react-hot-toast"

export const metadata = {
  title: "Fuzze",
  description: "owo",
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className='w-screen h-screen'>{children}</body>
      <Toaster />
    </html>
  )
}
