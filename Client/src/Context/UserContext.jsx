import { createContext  , useEffect, useState } from "react";
import axios from "axios";
export const UserContext = createContext();

export const UserProvider = ({children}) =>{
    const [userInfo, setUserInfo] = useState([]);
    const [user , setUser] = useState([]);

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('userData'));
        if(user){
            setUserInfo(user);
        }
        else{
            window.location.href='/login';
        }
    },[user])

    const userLogin =(userData) =>{
        setUserInfo(userData);
        localStorage.setItem('userData',JSON.stringify(userData));
    };

    const userLogout = ()=>{
        setUserInfo(null);
        localStorage.removeItem('userData');
    };

    const getData = async() =>{
        try {
            const response = await axios.get('/user/chat');
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
        <UserContext.Provider value={{userInfo ,userLogin ,userLogout ,getData }}>
            {children}
        </UserContext.Provider>
    );
}

