import axios from 'axios';
import React, { useEffect, useState } from 'react'

function ChatBox({chat , currentUser}) {
    const [userChatData, setUserChatData] = useState('');
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
    if (chat !==null) getChatData();
    }, [chat,currentUser])
  return (
    <>
      <div className=' w-[76vw] h-[92vh] mt-4 mx-10 text-white bg-[#434343] rounded-lg'>
        {/* <img src={userChatData.profilePicture}  />
        <p>{userChatData.username}</p> */}
      </div>
    </>
  )
}

export default ChatBox
