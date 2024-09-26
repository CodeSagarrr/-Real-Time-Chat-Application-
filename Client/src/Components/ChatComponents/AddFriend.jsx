import React from 'react'
import Navbar from '../Navbar'
import ChatBox from './ChatBox'

const AddFriend = () => {
    return (

        <>
            {/* {left side all user} */}
            <div className='flex relative'>
                <div className=' sm:basis-[20%] basis-[24%] flex flex-col sm:pl-8  pl-0 pt-10 text-black  bg-[#242424] h-screen rounded-r-xl'>
                    <div>
                        <h1 className='text-4xl font-bold text-white'>Add Friend</h1>
                    </div>
                </div>
                {/* {right side chat body} */}
                <div className='basis-[80%] text-black '>
                    <Navbar />
                    <div className=' sm:w-[76vw] w-[72vw] h-[92vh] mt-4 sm:mx-10 mx-4 text-white bg-[#434343] rounded-lg'>
                            

                    </div>
                </div>

            </div>
        </>
    )
}

export default AddFriend
