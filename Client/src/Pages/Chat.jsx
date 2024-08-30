import React from 'react'
import Navbar from '../Components/Navbar'
import { IoIosSend } from "react-icons/io";

const Chat = () => {
    return (
        <>
            <div className='flex'>
                <div className='w-[20%] h-[100vh] bg-[#242424] rounded-r-sm'></div>
                <form className='w-full mx-6 my-4 '>
                    <Navbar />
                    <input type="text" name='text' placeholder="Enter Message" className='w-[60%] p-3 rounded-lg absolute bottom-0 ml-40 mb-8 outline-none text-semibold' />
                    <IoIosSend className=' text-[#fff] absolute bottom-0 right-[11%] text-4xl mb-10 cursor-pointer' />
                </form>
            </div>
        </>
    )
}

export default Chat
