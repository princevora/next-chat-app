"use client";

import { socket } from "@/app/socket";
import { useMessageContext } from "@/context/message";
import { useEffect, useRef } from "react";

export default function Chat() {
    const { allMessages } = useMessageContext();
    const chatContainerRef = useRef();

    useEffect(() => {
        if (!socket) {
            return;
        }

        socket.on("recive-message", (msg) => {
            console.log("Message: Recived ,", msg);
        })

        return () => {
            socket.off("recive-message");
        }
    }, []);

    return (
        <ul className="space-y-5 px-10">
            {allMessages.map((message, index) => {
                return <li key={index} className="flex ms-auto gap-x-2 sm:gap-x-4">
                    <div className="grow text-end space-y-3">
                        <div className="inline-flex flex-col justify-end">
                            {/* Card */}
                            <div className="inline-block bg-blue-600 rounded-2xl p-4 shadow-sm">
                                <p className="text-sm text-white">{message}</p>
                            </div>
                            {/* End Card */}
                            <span className="mt-1.5 ms-auto flex items-center gap-x-1 text-xs text-gray-500 dark:text-neutral-500">
                                <svg
                                    className="flex-shrink-0 size-3"
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
                                    <path d="M18 6 7 17l-5-5" />
                                    <path d="m22 10-7.5 7.5L13 16" />
                                </svg>
                                Sent
                            </span>
                        </div>
                    </div>
                    <span className="flex-shrink-0 inline-flex items-center justify-center size-[38px] rounded-full bg-gray-600">
                        <span className="text-sm font-medium text-white leading-none">AZ</span>
                    </span>
                </li>
            })}
            <div ref={chatContainerRef}></div>
        </ul>
    )
}
