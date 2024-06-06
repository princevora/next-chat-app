"use client";

import { IconRight, Spinner } from '@/app/ui';
import SetUserSkeleton from '@/components/skeletons/set-user';
import UsersList from '@/components/skeletons/users-list';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';

export default function AddChat() {
    const [users, setUsers] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPending, setisPending] = useState({
        state: false,
        userId: null,
    });

    const homeLinkRef = useRef(null);
    const inputRef = useRef(null);
    const apiEndpoint = "http://localhost:3000";
    const { data: session, status } = useSession();

    useEffect(() => {
        const tmid = setTimeout(() => {
            setIsLoaded(true);
        }, 500);
    }, []);

    const getUser = (username) => new Promise(async (resolve, reject) => {
        // Create a request
        const response = await fetch(apiEndpoint + "/api/search", {
            body: JSON.stringify({ value: username }),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        });

        if (!response.ok) {
            reject(false);
        }

        const json = await response.json();
        resolve(json?.users);
    })

    const handleChange = async (e) => {
        setisPending(prev => ({
            ...prev,
            state: true
        }));

        // Get value
        const { value } = e.target;

        if (value == "") {
            setUsers({});
            return;
        }

        const response = await getUser(value);

        if (!response) {
            toast.error("Something went wrong");
        }

        // Set users
        setUsers(response);

        const tmId = setTimeout(() => {
            // set pending to false
            setisPending(prev => ({
                ...prev,
                state: false
            }));
        }, 800);

        return () => {
            clearTimeout(tmId);
        }
    }

    const addChat = (userId, userChatId) => new Promise(async (resolve, reject) => {
        const response = await fetch(apiEndpoint + "/api/add-chat", {
            body: JSON.stringify({
                userId,
                userChatId
            }),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        })

        if (!response.ok) {
            // get json response
            const json = await response.json();

            // reject the response
            reject(json?.message || "Unable to add the chat")
        }

        resolve(true)
    })

    const handleClick = (e, id) => {
        // prevent dedirecting
        e.preventDefault();

        const userId = session?.user?.id;
        const userChatId = id;

        setisPending({
            userId: id,
            state: true
        });

        const response = addChat(userId, userChatId);

        // use toast promise to add 
        toast.promise(response, {
            loading: "Adding user", //Show loading
            success: "Successfully added the user", //Show success
            error: (err) => err //show error
        })

        setisPending({
            userId: id,
            state: false
        });
    }

    return (
        isLoaded  ? <div className="relative flex justify-center items-center h-screen">
            <div className="mx-auto transition delay-150 duration-300 ease-in-out">
                <div className="flex flex-col sticky duration-1000 top-4 bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                    <div className="flex justify-between items-center border-b rounded-t-xl py-3 px-4 md:px-5 dark:border-neutral-700">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                            Enter Username
                        </h3>
                    </div>
                    <div className="relative min-w-[40vw]">
                        <input onChange={handleChange} ref={inputRef} type="text" id="hs-floating-input-email-value" name='username' className="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                            placeholder="iam_rock"
                        />
                        <label htmlFor="hs-floating-input-email-value" className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:scale-90 peer-focus:translate-x-0.5 peer-focus:-translate-y-1.5 peer-focus:text-gray-500 dark:peer-focus:text-neutral-500 peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:translate-x-0.5 peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500">
                            Username
                        </label>
                    </div>
                </div>
                {
                    users.length > 0 &&
                    (
                        <>
                            <div className="h-screen overflow-y-auto">
                                <div className="h-8"></div>
                                {
                                    isPending.state ? <UsersList /> : <ul className="space-y-3 text-sm p-8 mt-4">
                                        {
                                            users.map((user, index) => {
                                                return <li key={index} className="flex space-x-3 p-4 py-2 justify-between">
                                                    <div className="flex gap-2">
                                                        <span className="size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                                                            <svg
                                                                className="flex-shrink-0 size-3.5"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width={24}
                                                                height={24}
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth={2}
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            >
                                                                <polyline points="20 6 9 17 4 12" />
                                                            </svg>
                                                        </span>
                                                        <span className="text-gray-800 dark:text-neutral-400">
                                                            {user.username}
                                                        </span>
                                                    </div>
                                                    <Link href="#" onClick={(e) => handleClick(e, user.id)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                        </svg>
                                                    </Link>
                                                </li>
                                            })
                                        }
                                    </ul>
                                }
                            </div>
                        </>
                    )
                }
            </div>
            <Link hidden ref={homeLinkRef} href="../home" >
                {/* Hidden */}
            </Link>
        </div> : <SetUserSkeleton />
    )
}
