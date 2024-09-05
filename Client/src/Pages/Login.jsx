import React, { useState } from 'react'
import '../App.css'
import {Link , useNavigate } from 'react-router-dom'
import { FaLock } from "react-icons/fa6";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login() {
  const navigate = useNavigate();
  const [userLogin , setUserLogin] = useState({username:'' , password:''});

  const handleChange =(e) =>{
    setUserLogin({...userLogin , [e.target.name]:e.target.value});
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try {
      const res = await axios.post('/user/login',userLogin);
      if(res.data.msg ==='User are login'){
        toast.success(res.data.msg);
        setUserLogin({username:'',password:''})
        setTimeout(()=>{
          navigate('/');
        },3000);
      }else{
        toast.error(res.data.msg);   
      }
    } catch (error) {
      toast.error(error);
    }
  }
  return (
    <>
         <div className='flex w-full justify-center items-center h-[100vh] Gradient'>
        <div className='md:w-[32%] w-[100%] mx-10 h-[65vh] border  rounded-3xl '>
         <FaLock className='text-6xl text-white ml-[17rem] mt-8'/>

          <form className='flex flex-col justify-center h-[66%] w-[90%] mx-12  '>
            <label className='font-bold text-xl mt-1 mb-1 text-white'>Username</label>
            <input className='w-[90%] h-[10%]  rounded-md p-2 outline-none' type='text' placeholder='Name' name='username'  onChange={handleChange}  required />

            <label className='font-bold text-xl mt-5 mb-1 text-white'>Password</label>
            <input className='w-[90%] h-[10%]  rounded-md p-2  outline-none' type='password' placeholder='Password' name='password' onChange={handleChange} required />

            <Link to='/emailVerify' className='text-white font-bold text-xl my-2 '>Forgot Password ?</Link>
            <button className='w-[90%] h-[10%] rounded-md mt-2 bg-[#277b18] text-white  outline-none'required onClick={handleSubmit}>Login</button>
          </form>
          <ToastContainer/>
          <div className=' flex w-full  md:ml-36 ml-24'>
            <p className='text-white font-bold md:text-xl text-[18px]'>Create an account !</p> <a className='text-white font-bold text-xl ml-2' href='/register'>Sign Up</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
