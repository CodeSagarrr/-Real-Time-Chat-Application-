import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { IoIosSend } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import socketIO from 'socket.io-client'
const Chat = () => {
    const redirect = useNavigate();
    const [user, setUser] = useState('');
    const getData = async () => {
        try {
            const response = await axios.get('/user/chat');
            console.log(response.data)
            setUser(response.data);
            if (response.ok) {
                redirect('/')
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                redirect('/login');
            }
        }
    }
    useEffect(() => {
        getData();
    }, [])
    // socket connection
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'http://localhost:8080/user/chat';
    const socket = socketIO(ENDPOINT , {transports:['websocket']})

    useEffect(() => {
        socket.on('connect', () => {
            setMessages((prevMessages) => [...prevMessages, message])
        });

        socket.emit('join',(socket)=>{
            console.log('User connected:', socket.id);
        })

        return () => {
            socket.off('message');
        };
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                'http://localhost:8080/user/chat',
                {message : message, receiver: 'oL7oHqL5IZuUuKLiAABo' }
            );
            socket.emit('message', { receiver: 'oL7oHqL5IZuUuKLiAABo', message });
            setMessage('');
        } catch (error) {
            console.error('Message send error:', error);
        }
    };


    return (
        <>
            <div className='flex'>
                <div className='w-[20%] h-[100vh] bg-[#242424] rounded-r-sm'></div>
                <form className='w-full mx-6 my-4  '>
                    <div className="chat-window">
                        {messages.map((msg, index) => (
                            <p key={index}>{msg}</p>
                        ))}
                    </div>
                    <Navbar />
                    <input type="text" name='text' placeholder="Enter Message" className='w-[60%] p-3 rounded-lg absolute bottom-0 ml-40 mb-8 outline-none text-semibold' />
                    <IoIosSend className=' text-[#fff] absolute bottom-0 right-[11%] text-4xl mb-10 cursor-pointer' onClick={handleSubmit}/>
                </form>
            </div>
        </>
    )
}

export default Chat
