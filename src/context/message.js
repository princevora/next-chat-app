"use client";

import { createContext, useContext, useState } from "react";

const MessageContext = createContext();

export const useMessageContext = () => {
    return useContext(MessageContext);
}

const MessageContextProvider = ({ children }) => {
    const [allMessages, setAllMessages] = useState([]);

    return (
        <MessageContext.Provider value={{allMessages, setAllMessages}}>
            {children}
        </MessageContext.Provider>
    )
} 

export default MessageContextProvider;