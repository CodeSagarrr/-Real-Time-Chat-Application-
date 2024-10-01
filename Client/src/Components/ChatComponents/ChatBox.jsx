import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import './ChatBox.css'
import { format } from 'timeago.js'
import { BsFillSendFill } from "react-icons/bs";
import InputEmoji from 'react-input-emoji'

function ChatBox({ chat, currentUser , setSendMessage , recievedMessage }) {
  const [userChatData, setUserChatData] = useState([]);
  const [getMessages, setGetMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const scroll = useRef();

// recievedMessage from the socket server
  useEffect(()=>{
    if(recievedMessage !== null){
      setGetMessages([...getMessages, recievedMessage]);
    }
  },[recievedMessage])
  // get the conversation from server
  useEffect(() => {
    // find the other user id in the conversation members array from server
    const otherId = chat?.members?.filter((id) => id !== currentUser);
    const getChatData = async () => {
      try {
        const res = await axios.get(`/user/chat/${otherId}`) // get other user in members array 
        setUserChatData(res.data);
      } catch (error) {
        console.log(error.message);
      }
    }
    getChatData();
  }, [chat, currentUser])

  // get message from  server and fetch data
  useEffect(() => {

    const fetchMessage = async () => {
      try {
        const msgRes = await axios.get(`/user/chatuser/${chat?._id}`)
        setGetMessages(msgRes.data);
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchMessage();
  }, [chat, currentUser])

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const message = {
      sender: currentUser,
      text: newMessage,
      chatId: chat._id,
    }  
    // send message to socket server
    const receiverId = chat?.members?.find((id) => id !== currentUser)
    setSendMessage({...message , receiverId})
    try {
       await axios.post('/user/chatuser/', message);
      const newMsg = {
        sender: currentUser,
        text: newMessage,
        chatId: chat._id,
        createdAt: new Date().toISOString(),  // Add the current timestamp
      };
      setGetMessages([...getMessages, newMsg]);
      setNewMessage("")
    } catch (error) {
      console.log(error.message)
    }
  }

  // scroll the last message to the bottom 
  useEffect(()=>{
    scroll.current?.scrollIntoView({behavior: 'smooth'});
  },[getMessages])

  return (
    <>
      {chat ? <>
        <div className=' sm:w-[76vw] w-[72vw] h-[92vh] mt-4 sm:mx-10 mx-4 text-white bg-[#434343] rounded-lg'>
          <div className='flex gap-x-3 py-4 '>
            <div>
              <img src={userChatData.profilePicture} className='w-[60px] h-[60px] rounded-[50%] ml-10' />
            </div>
            <div className='flex flex-col justify-center'>
              <p className='font-bold text-white'>{userChatData.username}</p>
            </div>
          </div>
          <hr style={{ width: '92%', border: '0.1px solid #ececec', marginLeft: '2rem' }} />

          <div className='chat-body'>
              {
                getMessages.map((message , index) =>(
                  <div className={message.sender === currentUser ? 'message own' : 'message '} ref={scroll} key={index}>
                      <p className='font-semibold '>{message.text}</p>
                      <p className='text-black text-[12px]'>{format(message.createdAt)}</p>
                  </div>
                ))
              }
          </div>
     

          <div className='absolute bottom-0 sm:w-[44vw] w-[59vw] mb-5 sm:ml-64 ml-4 '>
            <InputEmoji
              value={newMessage}
              onChange={handleChange}
              placeholder="Type here ..." />
          </div>

          <button className="btn absolute bottom-0 sm:right-[21rem] right-6 mb-6  " onClick={handleSendMessage}><BsFillSendFill className='text-[22px]' /></button>

        </div> </>
        :
        <div className='flex justify-center items-center  h-[92vh] w-[76vw] sm:mt-[10px] mt-[10px] mx-10 text-white bg-[#434343] rounded-lg'>
          <p className='font-bold text-xl text-center'>Select a conversation to start chatting.</p>
        </div> }
    </>
  )
}

export default ChatBox

// {
//   getMessages.map((msg, index) => (
//     <div className={msg.sender == currentUser ? 'message own' : 'message other'}  key={index}>
//       <>
//         <p className='font-semibold '>{msg.text}</p>
//         <p className='text-black text-[12px]'>{format(msg.createdAt)}</p>
//       </>
//     </div>

//   ))
  
// } 