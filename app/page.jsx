import DrinkCatalogue from '@/components/DrinkCatalogue'
import Header from '@/components/Header'
import LootBoxShop from '@/components/LootBoxShop'

export default async function Home() {
  return (
    <div className='flex flex-col items-center p-4 gap-4'>
      <Header />
      <div className='bg-primary flex-1 bg-opacity-30 p-4 mt-4 rounded-lg transition-opacity hover:bg-opacity-50'>
        <LootBoxShop className='flex flex-wrap gap-4' />
      </div>
      <div className='bg-primary flex-1 bg-opacity-30 p-4 flex-grow mt-4 rounded-lg transition-opacity hover:bg-opacity-50'>
        <DrinkCatalogue className='flex flex-col gap-4' />
      </div>
    </div>
  )
}
