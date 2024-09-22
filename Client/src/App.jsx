import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './Pages/Register'
import Login from './Pages/Login';
import Chat from './Components/ChatComponents/Chat';
import Userprofile from './Pages/Userprofile';

function App() {

  return (
    <>
    <Router>
        <Routes>
          <Route exact path="/" element={<Chat/>} />
          <Route exact path="/profile" element={<><Userprofile/></>} />
          <Route exact path="/register" element={<Register/>} />
          <Route exact path="/login" element={<Login/>} />
        </Routes>
    </Router>
     </>
  )
}

export default App
