import axios from 'axios';
import React, { useEffect, useState } from 'react'

function ChatBox({ chat, currentUser }) {
  const [userChatData, setUserChatData] = useState('');
  const [getMessages , setGetMessages] = useState([]);
  // get the conversation from server
  useEffect(() => {
    // find the other user id in the conversation members array from server
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getChatData = async () => {
      try {
        const res = await axios.get(`/user/chat/${userId}`) // get other user in members array 
        console.log(res.data);
        setUserChatData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    if (chat !== null) getChatData();
  }, [chat, currentUser])

  // get message from  server and fetch data
  useEffect(()=>{
    const fetchMessage = async() =>{
      try {
        
      } catch (error) {
        console.log(error)
      }
    }
  },[])
  return (
    <>
      <div className=' w-[76vw] h-[92vh] mt-4 mx-10 text-white bg-[#434343] rounded-lg'>
        {/* {user profile} */}
        <div className='flex gap-x-3 py-4'>
          <div>
            <img src={userChatData?.profilePicture} className='w-[60px] h-[60px] rounded-[50%] ml-10' />
          </div>
          <div className='flex flex-col justify-center'>
            <p className='font-bold text-white'>{userChatData?.username}</p>
          </div>
        </div>
        <hr style={{ width: '95%', border: '0.1px solid #ececec', marginLeft: '2rem' }} />
      </div>
    </>
  )
}

export default ChatBox
