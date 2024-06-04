"use client";
import React, { useEffect, useRef, useState } from 'react';
import { socket } from '@/app/socket';
import { useMessageContext } from '@/context/message';

function MessageInput() {
    const [message, setMessage] = useState("");
    const messageContext = useMessageContext();
    const buttonRef = useRef();
    const formRef = useRef();
    const inputRef = useRef();

    const handleKeyDown = (e) => {

        if(e.ctrlKey && e.key == "/"){
            // focus the input 
            inputRef.current.focus();
        }

        if (e.keyCode === 27 || e.key === 'Escape') {
            // unfoucs or blur the input on escape
            inputRef.current.blur();
        }
    }

    useEffect(() => {

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }

    }, []);

    const handleChangeInput = (e) => {
        setMessage(e.target.value);
    }

    const handleSendMessage = (e) => {

        // Prevent default the event
        e.preventDefault();

        if(!message){
            return;
        }

        // reset the form
        formRef.current.reset();

        // reset the input
        setMessage("");
    
        // const messageObject = {
        //     message,
            
        // }

        socket.emit("send-message", );
        messageContext.setAllMessages(prev => [...prev,message]);
    }

    return (
        <div className="w-full sticky bottom-0">
            <div className="relative">
                <form onSubmit={handleSendMessage} ref={formRef}>
                    <input
                        ref={inputRef}
                        onChange={handleChangeInput}
                        type="text"
                        className="p-4 block w-full border-gray-200 rounded-full text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 dark:focus:ring-opacity-50"
                        placeholder="Chat.."
                    />
                    <div className="absolute top-1/2 right-2 -translate-y-1/2">
                        <button
                            disabled={!message}
                            ref={buttonRef}
                            type="button"
                            className="h-10 w-10 inline-flex justify-center items-center text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:text-gray-800 bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-white dark:bg-neutral-800"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default MessageInput;