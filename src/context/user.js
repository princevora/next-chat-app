"use client";

import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const useUserContext = () => {
    return useContext(UserContext);
}

const UserContextProvider = ({ children }) => {
    const [userData, setUserData] = useState();
    const [userStatus, setUserStatus] = useState();
    const [chats, setChats] = useState();
    const { data, status } = useSession();

    const fetchData = () => new Promise(async (resolve, reject) => {
        const response = await fetch("/api/user", {
            body: JSON.stringify({ id: data?.user?.id }),
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (!response.ok) {
            reject(false)
        }

        const json = await response.json();
        resolve(json);
    })

    useEffect(() => {
        if (status == "authenticated") {
            setUserStatus(0) //pending

            fetchData()
                .then((rsp) => {
                    const { user } = rsp;
                    setUserData(user);
                    setUserStatus(1) //success
                })
        }
    }, [status]);


    return (
        <UserContext.Provider value={{ userData, userStatus }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;