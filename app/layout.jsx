import '@/styles/globals.css'
import { Providers } from './providers'
import NavBar from '@/components/NavBar'

export const metadata = {
  title: 'Fuzze',
  description: 'Win Unique Soda Flavor NFTs!',
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '64x64',
      url: '/icon.png'
    }
  ]
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='dark'>
      <body className='bg-background text-foreground'>
        <Providers>
          <NavBar />
          <main className='m-auto w-full max-w-screen-xl pb-8'>{children}</main>
          {/* <Footer /> */}
        </Providers>
      </body>
    </html>
  )
}
