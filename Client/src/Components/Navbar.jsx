import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <div className='flex '>
        <div className='ml-10 mt-4 basis-[40%]'>
          <h1 className='text-3xl font-bold text-[#ffff]'>Chat-App</h1>
        </div>
        <div className='basis-[50%] pr-12 mt-4'>
          <ul className='flex justify-end'>

            <Link to="/register"><li className='text-2xl mx-4 font-bold text-[#ffff] cursor-pointer'>Sign up</li></Link>
                <li className='text-2xl mx-4 font-bold text-[#ffff] cursor-pointer'>Logout</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Navbar
