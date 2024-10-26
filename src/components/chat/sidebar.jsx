"use client"

import { useUserContext } from '@/context/user'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import ChatsSkeleton from '../skeletons/chats'

export default function Sidebar({ isActive = false, username = null }) {
    const [user, setUser] = useState();
    const context = useUserContext();

    useEffect(() => {
        if (context.userStatus == 1) {
            console.log(context.chats);
            setUser(context?.userData?.username)
        }
    }, [context.userStatus]);

    const handleLogOut = async (e) => {
        // prevent Default
        e.preventDefault();

        try {
            // Logout of the session
            await signOut({
                redirect: true
            })

        } catch (error) {
            toast.error("Unable to logout")
        }
    }

    return (
        <div
            id="application-sidebar"
            className="hs-overlay [--auto-close:lg] hs-overlay-open:translate-x-0 -translate-x-full duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700"
        >
            <nav
                className="hs-accordion-group size-full flex flex-col"
                data-hs-accordion-always-open=""
            >
                <div className="flex items-center justify-between pt-4 pe-4 ps-7">
                    {!user ? <p className="h-4 bg-gray-200 rounded-full dark:bg-neutral-700 animate-pulse" style={{ width: "40%" }}></p> : user}
                </div>
                <div className="h-full">
                    {/* List */}
                    <ul className="space-y-1.5 p-4">
                        <li>
                            <Link
                                className="flex items-center gap-x-3 py-2 px-3 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300"
                                href="/u/chats/add-chat"
                            >
                                <svg
                                    className="flex-shrink-0 size-4"
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
                                    <path d="M5 12h14" />
                                    <path d="M12 5v14" />
                                </svg>
                                New chat
                            </Link>
                        </li>
                        {
                            !context.userStatus
                                ? <ChatsSkeleton />
                                : context.chats.length > 0 && (
                                    context.chats.map((chat) => {
                                        const username = chat.added_username;

                                        return <li key={chat.id} className='hover:bg-gray-700 hover:text-black rounded-md duration-500'>
                                            <Link
                                                className="flex items-center gap-x-3 py-2 px-3 text-sm text-gray-200 rounded-lg "
                                                href={`../../u/chats/${username}`}
                                            >
                                                <span className="flex-shrink-0 inline-flex items-center justify-center size-[28px] rounded-full bg-gray-600">
                                                    <span className="text-sm uppercase font-normal text-white leading-none">
                                                        {username.substring(0, 2)}
                                                    </span>
                                                </span>
                                                {username}
                                            </Link>
                                        </li>
                                    })
                                )
                        }
                    </ul>
                    {/* End List */}
                </div>
                {/* Footer */}
                <div className="mt-auto">
                    <div className="py-2.5 px-7">
                        <p className="inline-flex items-center gap-x-2 text-xs text-green-600">
                            <span className="block size-1.5 rounded-full bg-green-600" />
                            Active 12,320 people
                        </p>
                    </div>
                    <div className="p-4 border-t border-gray-200 dark:border-neutral-700">
                        <Link
                            onClick={handleLogOut}
                            className="flex justify-between items-center gap-x-3 py-2 px-3 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300"
                            href="#"
                        >
                            Log Out
                            <svg
                                className="flex-shrink-0 size-4"
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
                                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                <polyline points="10 17 15 12 10 7" />
                                <line x1={15} x2={3} y1={12} y2={12} />
                            </svg>
                        </Link>
                    </div>
                </div>
                {/* End Footer */}
            </nav>
        </div>
    )
}
