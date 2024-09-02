import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from './Pages/Chat';
import Register from './Pages/Register';
import Login from './Pages/Login';
import socketIO from 'socket.io-client';

const ENDPOINT = 'http://localhost:8080/'
const socket = socketIO(ENDPOINT , {transports:['websocket']})
function App() {

  return (
    <>
    <Router>
        <Routes>
          <Route exact path="/" element={<Chat/>} />
          <Route exact path="/register" element={<Register/>} />
          <Route exact path="/login" element={<Login/>} />
        </Routes>
    </Router>
      
    </>
  )
}

export default App
