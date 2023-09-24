import fuzzeDB from '@/lib/fuzzeDB'

const Requiem = async () => {
  const drinks = await fuzzeDB.getDrinks()
  const lootboxes = await fuzzeDB.getLootboxes()
  const users = await fuzzeDB.getUsers()

  return (
    <div className='bg-blue-100 min-h-screen flex flex-col items-center justify-center'>
      <h1 className='text-3xl font-bold mb-4 text-red-600'>Has llegado a mi pagina de test</h1>
      <div className='text-black'>
        <div className='mb-8'>
          <h2 className='text-2xl font-semibold mb-4'>Drinks:</h2>
          {drinks.map((drink, index) => (
            <div key={index} className='mb-4'>
              <p>
                <strong>Name:</strong> {drink.name}
              </p>
              <p>
                <strong>Description:</strong> {drink.description}
              </p>
              <p>
                <strong>Rarity:</strong> {drink.rarity}
              </p>
            </div>
          ))}
        </div>
        <div className='mb-8'>
          <h2 className='text-2xl font-semibold mb-4'>LootBoxes:</h2>
          {lootboxes.map((lootBox, index) => (
            <div key={index} className='mb-4'>
              <p>
                <strong>Name:</strong> {lootBox.name}
              </p>
              <p>
                <strong>Price:</strong> {lootBox.price}
              </p>
              <h3 className='text-xl font-semibold'>Loot Table:</h3>
              <ul>
                {lootBox.lootTable.map((item, idx) => (
                  <li key={idx} className='mb-2'>
                    <p>
                      <strong>Granted:</strong> {item.granted}
                    </p>
                    <p>
                      <strong>Probability:</strong> {item.probability}
                    </p>
                    <p>
                      <strong>Rarity:</strong> {item.rarity}
                    </p>
                    <p>
                      <strong>Rolls:</strong> {item.rolls}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div>
          <h2 className='text-2xl font-semibold mb-4'>Users:</h2>
          {users.map((user, index) => (
            <div key={index} className='mb-4'>
              <p>
                <strong>Username:</strong> {user.username}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Requiem
