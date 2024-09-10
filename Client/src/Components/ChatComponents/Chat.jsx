import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Navbar'
import { UserContext } from './../../Context/UserContext.jsx'
import axios from 'axios'
import Conversation from './Conversation.jsx'
import ChatBox from './ChatBox.jsx'

function Chat() {
    // get user login information from uerContext
    const { getData, userInfo } = useContext(UserContext)
    const [chats, setChats] = useState([])
    // currentChat state for chatBox
    const [currentChat, setCurrentChat] = useState([]);

    // protect user rotes
    useEffect(() => {
        getData();
    }, [])

    // get user members information from server
    useEffect(() => {
        const getChats = async () => {
            try {
                const chatsRes = await axios.get(`/user/conversation/${userInfo.otherDetails._id}`)
                setChats(chatsRes.data);
                console.log(chatsRes.data)
            } catch (error) {
                console.log(error)
            }
        }
        getChats();
    }, [userInfo])


    return (
        <>
            <div className='flex'>
                <div className=' basis-[20%] flex flex-col pl-8 pt-10 text-black  bg-[#242424] h-screen rounded-r-xl'>
                    <input
                        type="text"
                        placeholder="Search Friends..."
                        className="input input-bordered input-primary w-full max-w-xs" />
                    <div className='mt-4'>
                        {
                            chats.map((c, i) => (
                                <div key={i} onClick={() => setCurrentChat(c)}>
                                    <Conversation key={i} Conversation={c} currentUserId={userInfo.otherDetails._id} />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='basis-[80%] text-black '>
                    <Navbar />
                    <div>
                        <ChatBox chat={currentChat} currentUser={userInfo?.otherDetails?._id} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat