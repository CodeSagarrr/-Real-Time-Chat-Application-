import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Conversation({ Conversation, currentUserId }) {
    // store the conversation in useState
    const [userChatData, setUserChatData] = useState('');

    // get the conversation from server
    useEffect(() => {
        // find the other user id in the conversation members array from server
        const userId = Conversation.members.find((id) => id !== currentUserId);
        const getChatData = async () => {
        try {
            const res = await axios.get(`/user/chat/${userId}`) // get other user in members array 
            setUserChatData(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    getChatData();
    }, [])


    return (
        <>
            <div className='flex sm:flex-row flex-col  items-center sm:gap-x-4 gap-y-2 pt-4 hover:bg-[#545454] pb-4 sm:pl-4 pl-2 sm:mr-7 mr-1 rounded-xl cursor-pointer'>
                <div>
                    <img src={userChatData?.profilePicture} className='w-[60px] h-[60px] rounded-[50%] bg-center bg-cover' />
                </div>
                <div className='flex flex-col sm:justify-center items-center'>
                    <p className='font-bold text-white'>{userChatData?.username}</p>
                    <p className='text-white'>Online</p>
                </div>
            </div>
        </>
    )
}

export default Conversation

// "https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png"