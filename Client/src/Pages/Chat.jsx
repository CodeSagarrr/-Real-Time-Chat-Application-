import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { IoIosSend } from "react-icons/io";
import axios from 'axios';
import socketIO from 'socket.io-client'
import Conversation from '../Pages/Conversion'
const Chat = ({ getData, user }) => {
    let userId = '66d0861e352dd62ede2a91a0'
    const [conversation, setConversation] = useState([])
    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        const conversation = async () => {
            try {
                const response = await axios.get(`/user/conversation/` + userId);
                setConversation(response.data)
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        conversation();
    }, [])


    return (
        <>
            <div className='flex'>
                <div className='w-[22%] h-[100vh] bg-[#242424] rounded-r-sm pt-6'>
                    <div>
                        <div className='ml-4 mr-2'>
                            <input type="text" placeholder="Search friends ..." className="input input-bordered input-primary w-full max-w-xs" />
                        </div>
                        {
                            conversation.map((c,i) => (
                                <Conversation key={i} conversation={c} currentUser={userId}/>
                            ))
                        };

                    </div>
                </div>

                <div className='w-full flex flex-col'>
                    <Navbar />
                    <div className=''>
                        <div className="chat chat-end">
                            <div className="chat-bubble chat-bubble-info">Calm down, Anakin.</div>
                        </div>
                    </div>
                    <div className=' w-[90%] mt-10 ml-10 mr-10'>
                        <input
                            type="text"
                            placeholder="Type here ..."
                            className="input input-bordered input-primary w-[40vw] max-w-[50rem] absolute bottom-0 mb-12 translate-x-[40%]" />
                        <button className="btn absolute bottom-0 right-96 mb-12" ><IoIosSend className='text-3xl text-white' /></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat
