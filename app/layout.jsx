import "styles/globals.css"
import { Inter } from "next/font/google"

const font = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Fuzze",
  description: "owo",
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={font.className}>{children}</body>
    </html>
  )
}
