import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './ChatBox.css'
import { format } from 'timeago.js'
import { BsFillSendFill } from "react-icons/bs";
import InputEmoji from 'react-input-emoji'

function ChatBox({ chat, currentUser }) {
  const [userChatData, setUserChatData] = useState('');
  const [getMessages, setGetMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  // get the conversation from server
  useEffect(() => {
    if (!chat) return;
    // find the other user id in the conversation members array from server
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getChatData = async () => {
      try {
        const res = await axios.get(`/user/chat/${userId}`) // get other user in members array 
        setUserChatData(res.data);
      } catch (error) {
        console.log(error.message);
      }
    }
    if (chat !== null) getChatData();
  }, [chat, currentUser])

  // get message from  server and fetch data
  useEffect(() => {
    if (!chat) return;
    const MsgId = chat?.members?.find((id) => id !== currentUser);
    const fetchMessage = async () => {
      try {
        const msgRes = await axios.get(`/user/chatuser/${MsgId}`)
        setGetMessages(msgRes.data);
        console.log(msgRes.data);
      } catch (error) {
        console.log(error.message)
      }
    }
    if (chat !== null) fetchMessage();
  }, [chat, currentUser])

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  return (
    <>
    { chat ? (<>
      <div className=' w-[76vw] h-[92vh] mt-4 mx-10 text-white bg-[#434343] rounded-lg'>
          <div className='flex gap-x-3 py-4'>
            <div>
              <img src={userChatData?.profilePicture} className='w-[60px] h-[60px] rounded-[50%] ml-10' />
            </div>
            <div className='flex flex-col justify-center'>
              <p className='font-bold text-white'>{userChatData?.username}</p>
            </div>
          </div>
            <hr style={{ width: '95%', border: '0.1px solid #ececec', marginLeft: '2rem' }} />

            <div className="chat chat-end chat-body">

              {
                getMessages.map((msg, index) => (
                  <div className="chat-bubble chat-bubble-success">
                    <>
                      <p key={index} className='font-semibold '>{msg.text}</p>
                      <p className='text-black text-[12px]'>{format(msg.createdAt)}</p>
                    </>
                  </div>
                ))
              }

            </div>

            <div className='absolute bottom-0 w-[44vw] mb-5 ml-64 '>
              <InputEmoji
                value={newMessage}
                onChange={handleChange}
                placeholder="Type here ..." />
            </div>
            
            <button className="btn absolute bottom-0 right-[21rem] mb-6"><BsFillSendFill className='text-[22px]' /></button>

      </div> </>)
      :
      <div className='flex justify-center items-center h-[92vh] w-[76vw] mx-10 text-white bg-[#434343] rounded-lg'>
        <p className='font-bold text-xl text-center'>Select a conversation to start chatting.</p>
      </div>}
      
    </>
  )
}

export default ChatBox

{/* <input
            type="text"
            value={newMessage}
            onChange={handleChange}
            placeholder="Type here"
            className="input input-bordered input-primary absolute bottom-0 w-full max-w-[38rem] mb-6" /> */}