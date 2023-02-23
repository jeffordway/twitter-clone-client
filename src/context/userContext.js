import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';


export const UserContext = createContext();

export const authHeader = { Authorization: `Bearer ${localStorage.getItem('myTrumpeterToken')}` };

export const UserProvider = ({ children }) => {

    const [users, setUsers] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState('');
    const [currentUser, setCurrentUser] = useState({});
    const [usersQueryResults, setUsersQueryResults] = useState([]);
    const [userQueryParams, setUserQueryParams] = useState('');

    const baseUrl = "http://localhost:3000/api/users/";


    useEffect(() => {
        async function fetchData() {
            setIsLoggedIn(localStorage.getItem('myTrumpeterToken'));
            verifyCurrentUser();
        }
        fetchData()
    }, []);

const getAllUsers = async () => {
    try {
        const response = await axios.get(baseUrl, { headers: authHeader });
        console.log(response.data);
        return setUsers(response.data);
    }
    catch (error) {
        return await new Promise((reject) => reject(error.response.statusText));
    }
}

const getUser = async (id) => {
    const singleItemUrl = `${baseUrl}${id}`
    try {
        const response = await axios.get(singleItemUrl, { headers: authHeader });
        console.log(response.data);
        return await new Promise(resolve => resolve(response.data));
    }
    catch (error) {
        return await new Promise((reject) => reject(error.response.statusText));
    }
}

const findUsers = async () => {
    const queryURL = `${baseUrl}search/${userQueryParams}`
    try {
        const response = await axios.get(queryURL, { headers: authHeader });
        return setUsersQueryResults(response.data);
    }
    catch (error) {
        return await new Promise((reject) => reject(error.response.statusText));
    }

}

const createUser = async (newUser) => {
    try {
        const response = await axios.post(baseUrl, newUser);
        return await new Promise(resolve => resolve(response.data));
    }
    catch (error) {
        return await new Promise((reject) => reject(error.response.statusText));
    }
}

async function loginUser(usernameOrEmail, password) {
    let user = { usernameOrEmail, password };

    const response = await axios.post(`${baseUrl}login`, user);
    localStorage.setItem('myTrumpeterToken', response.data.token);
    return await new Promise(resolve => resolve(response.data));
}



const logoutUser = async () => {
    localStorage.removeItem('myTrumpeterToken');
    setCurrentUser({});
    setIsLoggedIn('')
}

const verifyCurrentUser = async () => {
    let decoded = await jwt_decode(localStorage.getItem('myTrumpeterToken'));
    return setCurrentUser(decoded);

}

const updateUser = async (user) => {
    const singleItemUrl = `${baseUrl}${user.userId}`
    try {
        const response = await axios.put(singleItemUrl, user, { headers: authHeader });
        await getAllUsers();
        return await new Promise(resolve => resolve(response.data));
    }
    catch (error) {
        return await new Promise((reject) => reject(error.response.statusText));
    }
}


return (
    <UserContext.Provider value={{
        users,
        usersQueryResults,
        isLoggedIn,
        currentUser,
        setCurrentUser,
        setIsLoggedIn,
        setUserQueryParams,
        getAllUsers,
        findUsers,
        getUser,
        createUser,
        loginUser,
        logoutUser,
        verifyCurrentUser,
        updateUser
    }}>
        {children}
    </UserContext.Provider>
)
}