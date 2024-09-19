import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import axios from 'axios';
import { toast , ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../Context/UserContext.jsx';

function Navbar() {
  // get data from user context
    const {userLogout} = useContext(UserContext)
    // handle logout request from user context and navigate to login page after successful logout operation
    const handleLogout =async() =>{
        try {
            const res = await axios.get('/user/logout')
            toast.success(res.data.msg)
            userLogout();
            setTimeout(()=>{
                 window.location.href = '/login'
            },2000)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <>
     <ToastContainer />
       <div className='flex sm:w-full w-[94%]'>
        <div className='ml-10 mt-4 basis-[40%]'>
          <h1 className='text-3xl font-bold text-[#ffff]'>Chat</h1>
        </div>
        <div className='basis-[60%] mt-4 sm:mr-4 mr-0'>
          <ul className='flex justify-end'>
            <Link to="/login"><li className='text-2xl mx-2 font-bold text-[#ffff] cursor-pointer'>Login</li></Link>
                <li className='text-2xl mx-4 font-bold text-[#ffff] cursor-pointer'><TbLogout onClick={handleLogout} className='text-4xl font-bold'/></li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Navbar
