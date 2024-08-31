import React, { useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css'
import { Link , useNavigate} from 'react-router-dom'
import { FaUserLock } from "react-icons/fa";
function Register() {
  const navigate = useNavigate();
  const [userData , setUserData] = useState({username:'',email:'',password:''});

  const handleChange = (e)=>{
    setUserData({...userData , [e.target.name]:e.target.value});
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try {
       const res = await axios.post('/user/register', userData);
       if(res.data.msg ==='user successfully registered'){
        toast.success(res.data.msg);
        setUserData({username:'',email:'',password:''});
        setTimeout(()=>{
          navigate('/login');
        },3000)
       }else{
        toast.error(res.data.msg);
        console.log(res.data.msg);
       }
    } catch(error){
      toast.error(error);
    }
   
  
  }


  return (
    <>
      <div className='flex flex-wrap w-full justify-center items-center h-[100vh]  Gradient'>
        <div className='md:w-[32%] w-[100%] mx-10 h-[65vh] border my-10 rounded-3xl '>
         <FaUserLock className='text-6xl text-white ml-[17rem] mt-6'/>

          <form className='flex flex-col justify-center h-[70%] w-[90%] mx-12 my-2 '>
            <label className='font-bold text-xl mt-5 mb-1 text-white'>Username</label>
            <input className='w-[90%] h-[10%]  rounded-md p-2 outline-none' type='text' placeholder='Name' name='username' onChange={handleChange} />

            <label className='font-bold text-xl mt-5 mb-1 text-white'>Email</label>
            <input className='w-[90%] h-[10%]  rounded-md p-2  outline-none' type='text' placeholder='Email' name='email'  onChange={handleChange} />

            <label className='font-bold text-xl mt-5 mb-1 text-white'>Password</label>
            <input className='w-[90%] h-[10%]  rounded-md p-2  outline-none' type='password' placeholder='Password' name='password'  onChange={handleChange} />

            <button className='w-[90%] h-[10%] rounded-md mt-10 bg-[#277b18] text-white outline-none' onClick={handleSubmit} >Sign Up</button>
          </form>
          <ToastContainer/>
          <div className=' flex w-full my-4 md:ml-32 ml-20'>
            <p className='text-white font-bold md:text-xl text-[18px]'>Already have an account ?</p> 
            <Link  to='/login'><span className='text-white font-bold text-xl ml-2' >Login</span></Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
