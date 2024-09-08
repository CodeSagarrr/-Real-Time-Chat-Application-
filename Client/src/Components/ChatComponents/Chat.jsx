import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Navbar' 
import {UserContext} from './../../Context/UserContext.jsx'
import axios from 'axios'

function Chat() {
    const {getData , userInfo} = useContext(UserContext)
    const [chats , setChats] = useState([])

    useEffect(()=>{
        const getChats = async() =>{
            try {
                const chatsRes = await axios.get(`/user/chat/${userInfo.otherDetails._id}`)
                setChats(chatsRes.data)
                console.log(chatsRes.data)
            } catch (error) {
                console.log(error)
            }
        }
    getChats();
    },[userInfo])

    useEffect(()=>{
        getData();
    },[])
    return (
        <>
            <div className='flex'>
                <div className='basis-[20%] flex justify-center pt-10 text-black  bg-[#242424] h-screen rounded-r-xl'>
                    <input
                        type="text"
                        placeholder="Search ..."
                        className="input input-bordered input-primary w-full max-w-xs" />
                </div>
                <div className='basis-[80%] text-black '>
                    <Navbar/>
                </div>
            </div>
        </>
    )
}

export default Chat
