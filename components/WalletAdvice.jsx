'use client'

import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { WalletModalButton } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'

export default function WalletAdvice({ className }) {
  const { publicKey } = useWallet()

  return publicKey ? null : (
    <Card className={`bg-warning bg-opacity-20 text-warning-100 flex lg:flex-row ${className}`}>
      <div className='flex-1'>
        <CardHeader className='font-bold'>Warning</CardHeader>
        <CardBody className='py-0 lg:pb-4'>
          <p>
            In order to use Fuzze, you need to be logged into one of the supported Solana wallets, we
            recommend{' '}
            <a href='https://phantom.app/' className='underline inline'>
              Phantom Wallet
            </a>{' '}
            extension.
          </p>
        </CardBody>
      </div>
      <div className='p-4 grid place-items-center'>
        <WalletModalButton />
      </div>
    </Card>
  )
}
