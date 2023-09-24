import { Card, CardHeader, CardBody } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import NextLink from 'next/link'

import WalletAdvice from '@/components/WalletAdvice'

const cards = [
  {
    title: 'WIN',
    content: 'Win awesome drinks by opening lootboxes',
    image: '/img/header-card-1.png',
    href: '/#shop'
  },
  {
    title: 'REDEEM',
    content:
      "Wouldn't it be amazing if you could exhange your NFT drinks for real drinks with unique flavors?",
    image: '/img/header-card-2.png',
    className: 'lg:mt-4 lg:mb-0',
    href: '/inventory#redeem'
  },
  {
    title: 'TRADE',
    content: 'Trade your drinks with other users to get the ones you want',
    image: '/img/header-card-3.png',
    href: '/market'
  }
]

export default function Header() {
  return (
    <header className='w-full flex flex-col gap-4 p-4'>
      <section className='flex flex-col h-[50svh] lg:flex-row gap-4 pb-4'>
        {cards.map((card, index) => (
          <Card
            as={NextLink}
            href={card.href}
            className={`lg:hover:translate-y-4 group relative flex-1 h-full lg:h-auto lg:mb-4 ${card.className}`}
            key={`card-${index}`}>
            <CardHeader className='absolute z-20 top-1 flex-col items-start'>
              <p className='text-tiny lg:text-lg opacity-70 uppercase font-bold'>{card.title}</p>
              <h4 className='font-medium text-lg lg:text-3xl'>{card.content}</h4>
            </CardHeader>
            <CardBody className='flex-1 z-10 bg-gradient-to-b from-black lg:from-[#000b] to-transparent h-full lg:h-2/3 absolute ' />
            <Image
              removeWrapper
              alt='Card background'
              // darken the image
              className='z-0 w-full h-full object-cover'
              src={card.image}
            />
          </Card>
        ))}
      </section>
      <WalletAdvice />
    </header>
  )
}
