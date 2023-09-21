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
      <body className='bg-neutral text-foreground'>
        <Providers>
          <div className='sticky top-0'>
            <NavBar />
            <hr className='opacity-20 lg:mx-[20%]' />
          </div>
          <main className='px-6 lg:px-[20%] pb-8'>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
