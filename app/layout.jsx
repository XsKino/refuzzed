import "@/styles/globals.css"

export const metadata = {
  title: "Fuzze",
  description: "owo",
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className='w-screen h-screen'>{children}</body>
    </html>
  )
}
