'use client'
import React from 'react'
import useNFTs from '@/hooks/useNTFs'
import useWallet from '@/hooks/useWallet'

function TestPage() {
  const wallet = useWallet()
  const nftList = useNFTs(wallet.publicKey.toString())

  // Función para contar el número de repeticiones de un NFT
  const countRepetitions = nft => {
    const repetitions = nftList.filter(item => item.data.name === nft.data.name)
    return repetitions.length > 1 ? `x${repetitions.length}` : ''
  }

  // Filtrar la lista para mostrar solo una instancia de NFTs repetidos
  const uniqueNFTList = Array.from(new Set(nftList.map(nft => nft.data.name))).map(name => {
    const nft = nftList.find(item => item.data.name === name)
    return {
      ...nft,
      repetitions: countRepetitions(nft)
    }
  })

  return (
    <div className='bg-rose-950 min-h-screen flex flex-col'>
      <div className='flex items-center justify-between p-4'>
        <a
          href='/'
          className='bg-white text-primary px-4 py-2 rounded-full text-lg font-semibold hover:bg-primary hover:text-white transition duration-300'>
          Regresar
        </a>
        <div>
          <button
            className='bg-primary text-white px-4 py-2 rounded-full text-lg font-semibold hover:bg-rose-900 hover:text-primary transition duration-300 mx-2'
            onClick={() => {
              console.log('NFTs de Loretta:', nftList)
            }}>
            Loretta
          </button>
          <button
            className='bg-primary text-white px-4 py-2 rounded-full text-lg font-semibold hover:bg-rose-900 hover:text-primary transition duration-300 mx-2'
            onClick={() => {
              console.log('NFTs de Mori_Test:', nftList)
            }}>
            Mori_Test
          </button>
        </div>
      </div>

      <div className='flex flex-col flex-grow pl-5'>
        <h1 className='text-white text-4xl'>Inventario</h1>

        <div className='grid grid-cols-4 gap-4'>
          {uniqueNFTList.map((nft, index) => (
            <div key={index} className='my-4 flex items-center'>
              <div className='relative'>
                <img src={nft.image} alt={nft.data.name} className='w-20 h-20 mr-2' />
                {nft.repetitions && (
                  <span className='absolute top-0 right-0 bg-red-500 text-white text-xs p-1 rounded-full'>
                    {nft.repetitions}
                  </span>
                )}
              </div>
              <span className='text-white text-lg'>{nft.data.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TestPage
