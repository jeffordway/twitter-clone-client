import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { authHeader } from "./userContext";

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {

    const [messages, setMessages] = useState([]);
    const [messagesQueryResults, setMessagesQueryResults] = useState([]);
    const [messageQueryParams, setMessageQueryParams] = useState('');

    const baseUrl = "http://localhost:3000/api/messages/";

    useEffect(() => {
        async function fetchData() {
            await getAllMessages();
        }
        fetchData();
    }, []);

    const getAllMessages = async () => {
        try {
            const response = await axios.get(baseUrl);
            return setMessages(response.data);

        }
        catch (error) {
            return await new Promise((reject) => reject(error.response.statusText));
        }
    }

    const getMessage = async (messageId) => {
        const singleItemUrl = `${baseUrl}${messageId}`
        try {
            const response = await axios.get(singleItemUrl);
            return await new Promise(resolve => resolve(response.data));
        }
        catch (error) {
            return await new Promise((reject) => reject(error.response.statusText));
        }
    }

    const findMessages = async () => {
        const queryURL = `${baseUrl}search/${messageQueryParams}`
        try {
            const response = await axios.get(queryURL);
            return setMessagesQueryResults(response.data);
        }
        catch (error) {
            return await new Promise((reject) => reject(error.response.statusText));
        }

    }

    const createMessage = async (newMessage) => {
        try {
            const response = await axios.post(baseUrl, newMessage, { headers: authHeader });
            await getAllMessages();
            return await new Promise(resolve => resolve(response.data));
        }
        catch (error) {
            return await new Promise((reject) => reject(error.response.statusText));
        }
    }

    const updateMessage = async (message) => {
        const singleItemUrl = `${baseUrl}${message.messageId}`
        try {
            const response = await axios.put(singleItemUrl, message, { headers: authHeader });
            await getAllMessages();
            return await new Promise(resolve => resolve(response.data));
        }
        catch (error) {
            return await new Promise((reject) => reject(error.response.statusText));
        }
    }

    const deleteMessage = async (messageId) => {
        const singleItemUrl = `${baseUrl}${messageId}`
        try {
            const response = await axios.delete(singleItemUrl, { headers: authHeader });
            await getAllMessages();
            return await new Promise(resolve => resolve(response.data));
        }
        catch (error) {
            return await new Promise((reject) => reject(error.response.statusText));
        }
    }

    
    return (
        <MessageContext.Provider value={{
            messages,
            messagesQueryResults,
            setMessageQueryParams,
            getAllMessages,
            getMessage,
            findMessages,
            createMessage,
            updateMessage,
            deleteMessage
        }}>
            {children}
        </MessageContext.Provider>
    )
}

