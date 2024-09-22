import React, { useContext, useEffect, useRef, useState } from 'react'
import Navbar from '../Navbar'
import { UserContext } from './../../Context/UserContext.jsx'
import axios from 'axios'
import Conversation from './Conversation.jsx'
import ChatBox from './ChatBox.jsx'
import { io } from 'socket.io-client'
import { Link } from 'react-router-dom'

function Chat() {
    // get user login information from uerContext
    const { getData, userInfo } = useContext(UserContext)
    const [chats, setChats] = useState([])
    // currentChat state for chatBox
    const [currentChat, setCurrentChat] = useState([]);
    const [onlineUser, setOnlineUser] = useState([]);
    const [sendMessage, setSendMessage] = useState(null); // message send direct socket
    const [recievedMessage, setRecievedMessage] = useState(null); // get message from other user connect socket
    const socket = useRef()

    // protect user rotes
    useEffect(() => {
        getData();
    }, [])
    // send data to socket server 
    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit('send-Message', sendMessage)
        }
    }, [sendMessage])

    // socket state for chatBox
    useEffect(() => {
        socket.current = io('http://localhost:8080/')
        socket.current.emit('new-user-add', userInfo?.otherDetails?._id)
        socket.current.on('get-users', (users) => {
            setOnlineUser('get-users', users)
        })
    }, [userInfo])

    // get data from ther user from socket server

    useEffect(() => {
        socket.current.on('recieved-message', (userData) => {
            setRecievedMessage(userData)
        })
    })

    // get user members information from server
    useEffect(() => {
        const getChats = async () => {
            try {
                const chatsRes = await axios.get(`/user/conversation/${userInfo.otherDetails?._id}`)
                setChats(chatsRes.data);

            } catch (error) {
                console.log(error)
            }
        }
        getChats();
    }, [userInfo])


    return (
        <>
            {/* {left side all user} */}
            <div className='flex relative'>
                <div className=' sm:basis-[20%] basis-[24%] flex flex-col sm:pl-8  pl-0 pt-10 text-black  bg-[#242424] h-screen rounded-r-xl'>
                    <input
                        type="text"
                        placeholder="Search Friends..."
                        className="input input-bordered input-primary w-full max-w-[90%]" />
                    <div className='mt-4 '>
                        {
                            chats.map((c, i) => (
                                <div key={i} onClick={() => setCurrentChat(c)}>
                                    <Conversation key={i} Conversation={c} currentUserId={userInfo.otherDetails._id} />
                                </div>
                            ))
                        }
                    </div>
                    <Link to="/profile">
                    <div className='w-full flex flex-col absolute bottom-10  ml-2'>
                    <img src={userInfo?.otherDetails?.profilePicture} 
                         className='w-[60px] h-[60px] rounded-[50%] bg-center bg-cover '/>
                    <p className='text-white text-2xl font-semibold'>Profile</p>
                    </div>
                        
                    </Link>
                </div>
                {/* {right side chat body} */}
                <div className='basis-[80%] text-black '>
                    <Navbar />
                    <div>
                        <ChatBox chat={currentChat} currentUser={userInfo?.otherDetails?._id} setSendMessage={setSendMessage} recievedMessage={recievedMessage} />
                    </div>
                </div>

            </div>
        </>
    )
}

export default Chat
