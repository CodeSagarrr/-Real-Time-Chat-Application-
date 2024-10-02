import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './Pages/Register'
import Login from './Pages/Login';
import Chat from './Components/ChatComponents/Chat';
import Userprofile from './Pages/Userprofile';
import AddFriend from './Components/ChatComponents/AddFriend';

function App() {

  return (
    <>
    <Router>
        <Routes>
          <Route exact path="/" Component={<Chat/>} />
          <Route exact path="/profile" Component={<><Userprofile/></>} />
          <Route exact path="/register" Component={<Register/>} />
          <Route exact path="/login" Component={<Login/>} />
          <Route exact path="/adduser" Component={<AddFriend/>} />
        </Routes>
    </Router>
     </>
  )
}

export default App
