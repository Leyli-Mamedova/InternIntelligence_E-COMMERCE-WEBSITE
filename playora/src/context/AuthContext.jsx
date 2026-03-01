import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Состояние текущего пользователя из localStorage
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("authState")) || null
    );

    const DB_URL = '/InternIntelligence_E-COMMERCE-WEBSITE/db.json';

    // Получаем список пользователей: из файла + те, что зарегистрировались локально
    const getUsers = async () => {
        try {
            const response = await axios.get(DB_URL);
            const defaultUsers = response.data.users || [];
            
            // Добавляем "виртуальных" пользователей из localStorage
            const localUsers = JSON.parse(localStorage.getItem("local_registered_users")) || [];
            
            return [...defaultUsers, ...localUsers];
        } catch (error) {
            console.error("Error fetching users:", error);
            return JSON.parse(localStorage.getItem("local_registered_users")) || [];
        }
    };

    const login = async (formData) => {
        // Очищаем старые данные (по желанию)
        localStorage.removeItem('favs');
        
        const users = await getUsers();
        
        // Поиск пользователя по имени и паролю
        const user = users.find(
            x => x.username === formData.name && x.password === formData.password
        );

        if (user) {
            localStorage.setItem("authState", JSON.stringify(user));
            setCurrentUser(user);
            return user.id;
        }

        return false;
    };

    const register = async (formData) => {
        const users = await getUsers();
        
        // Проверяем, существует ли уже такой ник
        const exists = users.find(x => x.username === formData.userName);
        
        if (!exists) {
            // На GitHub Pages мы не можем сделать axios.post в файл.
            // Вместо этого сохраняем нового пользователя в localStorage
            const localUsers = JSON.parse(localStorage.getItem("local_registered_users")) || [];
            
            const newUser = {
                id: Date.now(), // Генерируем временный ID
                username: formData.userName,
                password: formData.password,
                // добавьте другие поля, если они есть (email и т.д.)
            };

            localUsers.push(newUser);
            localStorage.setItem("local_registered_users", JSON.stringify(localUsers));
            
            return true;
        }
        return false;
    };

    useEffect(() => {
        if (currentUser) {
            console.log("Logged in as:", currentUser.username);
        }
    }, [currentUser]);

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem("favs");
        localStorage.removeItem("authState");
        // Мы не удаляем local_registered_users, чтобы "аккаунты" сохранялись после логаута
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);