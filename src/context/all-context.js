"use client"

import MessageContextProvider from "./message";
import UserContextProvider from "./user";

const UseAllContext = ({ children }) => {
    return (
        <MessageContextProvider>
            <UserContextProvider>
                {children}
            </UserContextProvider>
        </MessageContextProvider>
    )
}

export default UseAllContext;