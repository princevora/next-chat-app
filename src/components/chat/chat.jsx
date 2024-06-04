"use client";

import React, { useEffect, useRef } from 'react';
import MessageInput from '../message-input';
import { socket } from "@/app/socket";
import { useMessageContext } from "@/context/message";

export default function Chat() {
    const { allMessages } = useMessageContext();
    const chatContainerRef = useRef(null);
    const bottomRef = useRef(null);  // Reference for the bottom marker

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [allMessages]); // Automatically scroll when messages update

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (msg) => {
            console.log("Message Received:", msg);
            // Update state here if needed
        };

        socket.on("receive-message", handleNewMessage);

        return () => {
            socket.off("receive-message", handleNewMessage);
        };
    }, [socket]);

    return (
        <div className="relative h-screen w-full lg:ps-64 overflow-hidden">
            <div className="py-10 lg:py-14 h-screen  overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                <ul className="mt-16 space-y-5" ref={chatContainerRef}>
                    {/* Chat Bubble */}

                    {allMessages.map((message, index) => {
                        return <li key={index} className="py-2 sm:py-4">
                            <div className="max-w-4xl px-4 sm:px-6 lg:px-8 mx-auto">
                                <div className="max-w-2xl flex gap-x-2 sm:gap-x-4">
                                    <span className="flex-shrink-0 inline-flex items-center justify-center size-[38px] rounded-full bg-gray-600">
                                        <span className="text-sm font-medium text-white leading-none">
                                            AZ
                                        </span>
                                    </span>
                                    <div className="grow mt-2 space-y-3">
                                        <p className="text-gray-800 dark:text-neutral-200">
                                            {message}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    })}

                    <div ref={bottomRef} />
                </ul>
            </div>
            {/* Textarea */}
            <footer className="max-w-4xl mx-auto sticky bottom-0 z-10 p-3 sm:py-6">
                <div className="lg:hidden flex justify-end mb-2 sm:mb-3">
                    {/* Sidebar Toggle */}
                    <button
                        type="button"
                        className="p-2 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                        data-hs-overlay="#application-sidebar"
                        aria-controls="application-sidebar"
                        aria-label="Toggle navigation"
                    >
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
                            <line x1={3} x2={21} y1={6} y2={6} />
                            <line x1={3} x2={21} y1={12} y2={12} />
                            <line x1={3} x2={21} y1={18} y2={18} />
                        </svg>
                        <span>Sidebar</span>
                    </button>
                    {/* End Sidebar Toggle */}
                </div>
                {/* Input */}
                <MessageInput />
                {/* End Input */}
            </footer>
            {/* End Textarea */}
        </div>
    )
}
