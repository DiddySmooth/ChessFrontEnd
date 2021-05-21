import {useState, createContext } from 'react'
import axios from 'axios'

const UserContext = createContext()


const UserProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const backEnd = process.env.REACT_APP_BACKEND

    const fetchUser = () => {
        const userId = localStorage.getItem('userId')
        if (userId) {
            axios.get(`${backEnd}/users/verify`, {
                headers: {
                    Authorization: userId
                }
            }).then((response) => setUser(response.data.user))
        }
    }

    const state = {
        userState: [user, setUser],
        fetchUser: fetchUser
    }

    
    return (
        <UserContext.Provider value={state}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider}