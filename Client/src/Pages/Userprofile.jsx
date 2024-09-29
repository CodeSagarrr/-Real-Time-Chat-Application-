import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { UserContext } from '../Context/UserContext.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BsChatFill } from "react-icons/bs";
import { FaCheck } from "react-icons/fa6";


function Userprofile() {
  const { userInfo } = useContext(UserContext);
  const [editProfile, setEditProfile] = useState(false);
  const [userData, setUserData] = useState({ username: '', bio: '' })
  const [updateUser, setUpdateUser] = useState([])
  const [profilePic , setProfilePic] = useState(null)


  const handleProfileChange = (e) =>{
    setProfilePic(e.target.files[0])
  }


  const handlePicSubmit = async(e) =>{
    e.preventDefault(); 
    if (!profilePic) {
      toast.error('Please select a picture before submitting');
      return;
    }
    const formData = new FormData();
    formData.append('profilePicture', profilePic);
    try {
      const res = await axios.put(`/user/profilePic/${userInfo?.otherDetails?._id}`, formData, {
        headers: { 'Content-Type':'multipart/form-data' }
      });
      toast.success(res.data.msg)
      setProfilePic(null)
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  // update the user
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userData.username || !userData.bio) {
      toast.error("Please fill out all fields");
      return;
    }
    try {
      const res = await axios.put(`/user/profile/${userInfo?.otherDetails?._id}`, userData);
      toast.success(res.data.msg)
      setUserData({ username: '', bio: '' })
    } catch (error) {
      console.log(error);
    }
  };

  // get the current user profile
  useEffect(() => {
    const userupdate = async () => {
      try {
        const res = await axios.get(`/user/profile/${userInfo?.otherDetails?._id}`)
        setUpdateUser(res.data);
      } catch (error) {
        console.log(error.message);
      }
    }
    userupdate();
  }, [userInfo])



  return (
    <>
      <ToastContainer />
      <div>
        <div className='flex Gradient'>
          <div className=' sm:basis-[20%] basis-[24%] flex flex-col sm:pl-8  pl-0 pt-10 text-black  bg-[#242424] h-screen rounded-r-xl'>
            <h1 className='text-4xl font-bold text-white '>Profile</h1>
            <Link to="/">
              <button className="btn text-2xl w-[9%] h-[8%] text-white absolute top-[40%] left-[5%] "><BsChatFill />
                Chat
              </button>
            </Link>
          </div>
          {/* {right side chat body} */}
          <div className='basis-[80%]'>
            <Navbar />
            <hr style={{ width: '96%', border: '0.1px solid #ececec', marginLeft: '2rem', marginTop: '40px' }} />
            {/* {left photo} */}
            <div className='flex h-[86%]'>
              <div className='basis-[40%] mt-20 flex justify-center items-center flex-col flex-wrap  rounded-2xl ml-8 bg-[#242424] h-[80%] '>
                <img src={updateUser?.profilePicture} className='w-[100px] h-[100px] rounded-[50%]  ' />
                
                <form className='w-[52%] flex justify-center'>
                <input type="file" accept='image/*' name='profilePicture' className="file-input w-full mt-4 max-w-[40%]" onChange={handleProfileChange}/>
                <button className='btn mt-4 ml-4' onClick={handlePicSubmit}><FaCheck/></button>
                </form>
                
                <p className='text-4xl font-bold text-white  mt-2'>{updateUser?.username}</p>

                <p className='text-2xl font-semibold text-white mt-4 ml-6 max-w-[60%]'>{updateUser?.bio}</p>

              </div>


              {/* right bio edit */}
              <div className='basis-[60%] flex justify-center mt-20 '>
                {editProfile === true ? <div className='w-[40vw] h-[62vh] '>
                  <form className='flex flex-col ml-20 px-10 py-8'>
                    <label htmlFor="username" className='text-white text-2xl font-semibold'>Username</label>
                    <input type="text" name='username' id='username' placeholder={updateUser?.username} className=" w-[90%] py-2 px-4 mt-3 bg-white text-black rounded-lg" onChange={handleChange} required />

                    <label htmlFor="bio" className='text-white text-2xl font-semibold mt-6'>Bio</label>
                    <textarea rows='6' name='bio' id='bio' placeholder='Bio' className=" w-[90%] py-2 px-4 mt-3 bg-white text-black rounded-lg" onChange={handleChange} required />

                    <button className='btn btn-primary text-black w-[80%] mt-6 ml-8 font-semibold text-[20px] ' onClick={handleSubmit} >Update</button>
                  </form>
                </div> : ''}

                <div className='flex justify-center items-center mr-24'>
                  <button className="btn btn-primary text-xl" onClick={() => setEditProfile(!editProfile)}>{editProfile === true ? 'Cancel' : 'Edit Profile'}</button>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </>
  )
}

export default Userprofile

{/* <form className='flex flex-col  px-20 py-24'>
                            <label htmlFor="username" className='text-white text-2xl font-semibold'>Username</label>
                            <input type="text" placeholder={userInfo?.otherDetails?.username} className=" w-[100%] py-2 px-4 mt-4 bg-white text-black rounded-lg" />

                        </form> */}
