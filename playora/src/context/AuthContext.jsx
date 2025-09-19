import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import { useFav } from './FavContext'
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("authState")) || null
    )

    const getUsers = async () => {
        const res = await axios.get('http://localhost:3003/users')
        return res.data
    }

    const login = async (formData) => {
        localStorage.removeItem('favs')
        const users = await getUsers()
        const res = users.find(
            x => x.username === formData.name && x.password === formData.password
        )
        if (res) {
            localStorage.setItem("authState", JSON.stringify(res))
            setCurrentUser(res)
            return res.id
        }

        return false
    }

    const register = async (formData) => {
        const users = await getUsers()
        const exists = users.find(x => x.username === formData.userName)
        if (!exists) {
            await axios.post('http://localhost:3003/users', formData)
            return true
        }
        return false
    }
    useEffect(() => {
        console.log(currentUser);
    }, [currentUser])


    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem("favs");
        localStorage.removeItem("authState");
    }

    return (
        <AuthContext.Provider value={{ currentUser, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)