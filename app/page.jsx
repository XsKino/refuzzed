import DrinkCatalogue from "@/components/DrinkCatalogue"
import LootBoxShop from "@/components/LootBoxShop"

export default async function Home() {
  return (
    <div className='flex gap-4'>
      <div className='bg-primary bg-opacity-50 p-4 grid '>
        <LootBoxShop className='flex flex-col gap-4' />
      </div>
      <div className='bg-primary bg-opacity-50 p-4 grid '>
        <DrinkCatalogue className='flex flex-col gap-4' />
      </div>
    </div>
  )
}
