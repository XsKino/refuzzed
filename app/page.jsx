import DrinkCatalogue from "@/components/DrinkCatalogue"
import LootBoxShop from "@/components/LootBoxShop"

export default async function Home() {
  return (
    <div className='flex gap-4'>
      <div className='bg-primary bg-opacity-30 p-4 flex-grow mt-4 rounded-lg transition-opacity hover:bg-opacity-50 max-w-[66%]'>
        <LootBoxShop className='flex flex-wrap gap-4 justify-between' />
      </div>
      <div className='bg-primary bg-opacity-30 p-4 flex-grow mt-4 rounded-lg transition-opacity hover:bg-opacity-50'>
        <DrinkCatalogue className='flex flex-col gap-4' />
      </div>
    </div>
  )
}
