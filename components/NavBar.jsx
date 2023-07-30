"use client"

export default function NavBar() {
  return (
    <nav className='flex justify-between items-center'>
      <div className='flex items-center'>
        <div className='flex items-center'>
          <img src='/logo.png' alt='logo' className='h-8 w-8' />
          <h1 className='text-2xl font-bold ml-2'>Fuzze</h1>
        </div>
      </div>
      <div className='flex items-center'>
        <button className='btn btn-primary'>Connect</button>
      </div>
    </nav>
  )
}
