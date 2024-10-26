"use client";

import { socket } from "@/app/socket";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const UserContext = createContext();

export const useUserContext = () => {
    return useContext(UserContext);
}

const UserContextProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [userStatus, setUserStatus] = useState(false);
    const [chats, setChats] = useState([]);
    const { data, status } = useSession();
    const pathname = usePathname();

    const emitConnection = () => {
        if (userData !== null) {
            socket.emit("user_connected", userData.username)
        }
    }

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
            fetchData()
                .then((rsp) => {
                    const { user, chats } = rsp;

                    console.log(user);
                    // Set user
                    setUserData(user);

                    // Set chats
                    setChats(chats);

                    // Set user status
                    setUserStatus(true) //success
                })
                .catch(() => {

                    // return error if anything goes wrong
                    toast.error("Unable to fetch user data please refresh.")
                })
        }
    }, [status]);

    useEffect(() => {
        if(userData && socket && pathname.startsWith("/u/")){
            return emitConnection();
        }
    })

    return (
        <UserContext.Provider value={{ userData, userStatus, chats, setChats, emitConnection }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;