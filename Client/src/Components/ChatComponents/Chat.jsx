import React, { useContext, useEffect, useRef, useState } from 'react'
import Navbar from '../Navbar'
import { UserContext } from './../../Context/UserContext.jsx'
import axios from 'axios'
import Conversation from './Conversation.jsx'
import ChatBox from './ChatBox.jsx'
import {io} from 'socket.io-client'

function Chat() {
    // get user login information from uerContext
    const {  getData,userInfo } = useContext(UserContext)
    const [chats, setChats] = useState([])
    // currentChat state for chatBox
    const [currentChat, setCurrentChat] = useState([]);
    const [onlineUser , setOnlineUser ] = useState([]);
    const [sendMessage , setSendMessage] = useState(null); // message send direct socket
    const [recievedMessage , setRecievedMessage] = useState(null); // get message from other user connect socket
    const socket = useRef()

    // socket state for chatBox
    useEffect(()=>{
        socket.current = io('http://localhost:8080/')
        socket.current.emit('new-user-add',userInfo?.otherDetails?._id)
        socket.current.on('get-users',(users)=>{
            setOnlineUser('get-users',users)
        })
    },[userInfo])
    // protect user rotes
    useEffect(() => {
        getData();
    }, [])
    // send data to socket server 
    useEffect(()=>{
        if(sendMessage !== null){
            socket.current.emit('send-Message', sendMessage)
        }
    },[sendMessage])
    // get data from ther user from socket server

    useEffect(()=>{
        socket.current.on('recieved-message',(userData)=>{
            setRecievedMessage(userData)
        })
    },[])

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
                {/* {right side chat body} */}
                <div className='basis-[80%] text-black '>
                    <Navbar />
                    <div>
                        <ChatBox chat={currentChat} currentUser={userInfo?.otherDetails?._id} setSendMessage={setSendMessage} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat
