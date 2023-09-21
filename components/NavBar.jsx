/* eslint-disable no-unused-vars */
'use client'

// import Avatar from "@/components/Avatar"
import NextLink from 'next/link'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem
} from '@nextui-org/navbar'
import { Link } from '@nextui-org/link'
import { Button, ButtonGroup } from '@nextui-org/react'
import { Divider } from '@nextui-org/divider'

const links = [
  { href: '#', label: 'Market' },
  { href: '#', label: 'Inventory' }
]

export default function NavBar({ className }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    // <nav className='flex justify-between items-center pt-4 backdrop-blur pl-6 lg:px-[20%]'>
    //   <div className='flex gap-2'>
    //     <NextLink className='mr-6 saturate-50 hover:saturate-100 hover:brightness-125' href='/'>
    //       <Image
    //         alt='icon'
    //         src='/favicon.ico'
    //         placeholder='blur'
    //         blurDataURL='/favicon.ico'
    //         width={64}
    //         height={64}
    //         className='h-12 w-auto'
    //       />
    //     </NextLink>

    //     {links.map(({ href, label }) => (
    //       <button
    //         key={label}
    //         className='px-6 py-4 opacity-75 hover:opacity-100'
    //         onClick={() => {
    //           toast.error('WIP')
    //         }}>
    //         {label}
    //       </button>
    //     ))}
    //   </div>
    //   <WalletMultiButton />
    // </nav>

    <Navbar isBlurred className={`font-medium ${className}`}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='sm:hidden'
          onChange={() => setIsMenuOpen(!isMenuOpen)}
        />
        <NavbarBrand href='/' className='font-bold text-xl cursor-pointer group' as={NextLink}>
          <Image
            alt='icon'
            src='/favicon.ico'
            placeholder='blur'
            blurDataURL='/favicon.ico'
            width={64}
            height={64}
            className='h-12 w-auto'
          />
          <div className='flex flex-col w-min'>
            <p className='bg-clip-text transition-all translate-y-1 group-hover:translate-y-0 group-hover:text-transparent bg-gradient-to-br from-primary to-secondary'>
              REFUZZED
            </p>
            <div className='w-full h-[2px] scale-x-0 transition-transform group-hover:scale-x-100 bg-gradient-to-r from-primary to-secondary' />
          </div>
        </NavbarBrand>
        {/* <NavbarContent className='hidden sm:flex' justify='start'>
          <ThemeSwitch />
        </NavbarContent> */}
      </NavbarContent>

      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <ButtonGroup variant='light' color='foreground'>
          {links.map((item, index) => (
            <Button key={`${item.href}-${index}`} as={NextLink} href={item.href}>
              {item.label}
            </Button>
          ))}
        </ButtonGroup>
      </NavbarContent>
      <NavbarContent className='hidden sm:flex gap-4' justify='end'>
        <WalletMultiButton />
      </NavbarContent>

      <NavbarMenu>
        <h2 className='text-xl font-semibold opacity-50 pt-3'>Sections</h2>
        <Divider />
        {links.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link color='foreground' className='w-full' href={item.href} size='lg' as={NextLink}>
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
        <h2 className='text-xl font-semibold opacity-50 pt-3'>Wallet</h2>
        <Divider />
        <WalletMultiButton />
      </NavbarMenu>
    </Navbar>
  )
}
