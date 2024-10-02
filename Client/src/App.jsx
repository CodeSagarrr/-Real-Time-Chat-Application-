import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './Pages/Register.jsx'
import Login from './Pages/Login.jsx';
import Chat from './Components/ChatComponents/Chat.jsx';
import Userprofile from './Pages/Userprofile.jsx';
import AddFriend from './Components/ChatComponents/AddFriend.jsx';

function App() {

  return (
    <>
    <Router>
        <Routes>
          <Route  path="/" Component={<Chat/>} />
          <Route  path="/profile" Component={<><Userprofile/></>} />
          <Route  path="/register" Component={<Register/>} />
          <Route  path="/login" Component={<Login/>} />
          <Route  path="/adduser" Component={<AddFriend/>} />
        </Routes>
    </Router>
     </>
  )
}

export default App
