import axios from 'axios'
import React from 'react'
import { Link , useNavigate } from 'react-router-dom'
import {  toast  } from 'react-toastify';

const Navbar = () => {
const navigate = useNavigate();

const handleLogout = async() =>{
    try {
      const res = await axios.get('/user/logout');
      toast.success(res.data.msg);
      setTimeout(()=>{
        navigate('/login'); 
      },3000)
           
    } catch (error) {
      toast.error(error)
    }
          
  }
  return (
    <>
      <div className='flex '>
        <div className='ml-10 mt-4 basis-[40%]'>
          <h1 className='text-3xl font-bold text-[#ffff]'>Chat-App</h1>
        </div>
        <div className='basis-[50%] pr-12 mt-4'>
          <ul className='flex justify-end'>

            <Link to="/register"><li className='text-2xl mx-4 font-bold text-[#ffff] cursor-pointer'>Sign up</li></Link>
                <li className='text-2xl mx-4 font-bold text-[#ffff] cursor-pointer' onClick={handleLogout}>Logout</li>
          </ul>
        </div>
      </div>
      
    </>
  )
}

export default Navbar
