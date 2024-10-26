import React from 'react'

export default function Chats() {
    return (
        <ul className="space-y-1.5 p-4 animate-pulse">
            <li className='flex p-2'>
                <span className="flex-shrink-0 inline-flex items-center justify-center size-[28px] rounded-full dark:bg-neutral-700">
                    <span className="text-sm uppercase font-normal text-white leading-none">
                    </span>
                </span>
                <p
                    className="h-4 bg-gray-200 rounded-full dark:bg-neutral-700 my-1 mx-3 w-full"
                />
            </li>
            <li className='flex p-2'>
                <span className="flex-shrink-0 inline-flex items-center justify-center size-[28px] rounded-full dark:bg-neutral-700">
                    <span className="text-sm uppercase font-normal text-white leading-none">
                    </span>
                </span>
                <p
                    className="h-4 bg-gray-200 rounded-full dark:bg-neutral-700 my-1 mx-3 w-full"
                />
            </li>
            <li className='flex p-2'>
                <span className="flex-shrink-0 inline-flex items-center justify-center size-[28px] rounded-full dark:bg-neutral-700">
                    <span className="text-sm uppercase font-normal text-white leading-none">
                    </span>
                </span>
                <p
                    className="h-4 bg-gray-200 rounded-full dark:bg-neutral-700 my-1 mx-3 w-full"
                />
            </li>
        </ul>
    )
}
