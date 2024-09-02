import './App.css'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Chat from './Pages/Chat';
import Register from './Pages/Register';
import Login from './Pages/Login';
import socketIO from 'socket.io-client';
import { useState } from 'react';
import axios from 'axios';

const ENDPOINT = 'http://localhost:8080/'
const socket = socketIO(ENDPOINT , {transports:['websocket']})
function App() {
  const [user, setUser] = useState('');
  const getData = async () => {
      try {
          const response = await axios.get('/user/chat');
          console.log(response.data)
          setUser(response.data);
          if (response.ok) {
              window.location.href='/';
          }
      } catch (error) {
          if (axios.isAxiosError(error)) {
              window.location.href='/login';
          }
      }
  }

  return (
    <>
    <Router>
        <Routes>
          <Route exact path="/" element={<Chat getData={getData}/>} />
          <Route exact path="/register" element={<Register/>} />
          <Route exact path="/login" element={<Login/>} />
        </Routes>
    </Router>
      
    </>
  )
}

export default App
