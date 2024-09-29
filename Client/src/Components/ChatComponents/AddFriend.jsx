import React, { useState , useContext} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../../Context/UserContext'
import Navbar from '../Navbar'
import '../../App.css'
import { BsChatFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import axios from 'axios';

const AddFriend = () => {
    const [ userData , setUserData] = useState({username:''})
    const { userInfo } = useContext(UserContext);

    const handleChange = (e) =>{
        setUserData({...userData,[e.target.name]:e.target.value})
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        if(!userData.username){
            toast.error('Please enter username')
            return;
        }
        try {
            const res = await axios.post(`/user/conversation/${userInfo?.otherDetails?._id}` , userData);
            if(res.data.msg.trim() === 'Friends are added successfully'){
                toast.success(res.data.msg)
                setUserData({username:''})
            }else{
                toast.error(res.data.msg)
                console.log(res.data.msg)
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (

        <>
            {/* {left side all user} */}
          
            <div className='flex relative'>
                <div className=' sm:basis-[20%] basis-[24%] flex flex-col sm:pl-8  pl-0 pt-4 text-black  bg-[#242424] h-screen rounded-r-xl'>
                    <div>
                        <h1 className='text-4xl font-bold text-white'>Add Friend</h1>
                        <Link to="/">
                            <button className="btn text-2xl w-[9%] h-[8%] text-white absolute top-[40%] left-[5%] "><BsChatFill />
                                Chat
                            </button>
                        </Link>
                    </div>
                </div>
                {/* {right side chat body} */}
                <div className='basis-[80%] text-black Gradient'>
                    <Navbar />
                    <div className='flex justify-center items-center'>
                        <div className='w-[70vw] h-[80vh] bg-[#242424] rounded-2xl mt-20'>
                            <form className='w-[40vw] h-[60vh] flex flex-col justify-center ml-[24%] px-10 py-8'>
                                <label htmlFor="username" className='text-white text-2xl font-semibold'>Username</label>
                                <input type="text" name='username' id='username' placeholder='Enter Username' className=" w-[90%] py-3 px-4 mt-3 bg-white text-black rounded-lg" required  onChange={handleChange}/>

                                <button className='btn btn-primary text-black w-[28%] mt-5 font-semibold text-[20px] ' onClick={handleSubmit} >Add Friends</button>
                            </form>
                            <ToastContainer/>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default AddFriend
