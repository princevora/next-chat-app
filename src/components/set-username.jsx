"use client"

import { useUserContext } from '@/context/user'
import SetUserSkeleton from './skeletons/set-user';
import { useEffect, useRef, useState } from 'react';
import { IconRight, Spinner } from "@/app/ui";
import toast from 'react-hot-toast';
import { getToken } from 'next-auth/jwt';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

function SetUsername({ handleChange, handleSubmit, isPending, userDetails }) {

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col  bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                <div className="flex justify-between items-center border-b rounded-t-xl py-3 px-4 md:px-5 dark:border-neutral-700">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                        Choose Your Username
                    </h3>
                </div>
                <div className="relative min-w-[40vw]">
                    <input type="text" id="hs-floating-input-email-value" name='username' className="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                        placeholder="iam_rock"
                        onChange={handleChange}
                    />
                    <label htmlFor="hs-floating-input-email-value" className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:scale-90 peer-focus:translate-x-0.5 peer-focus:-translate-y-1.5 peer-focus:text-gray-500 dark:peer-focus:text-neutral-500 peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:translate-x-0.5 peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500">
                        Username
                    </label>
                </div>
            </div>
            <button type="submit" disabled={!userDetails.username || isPending} className="py-3 mt-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
                Set Username

                {isPending ? <Spinner /> : <IconRight />}
            </button>
        </form>
    )
}

export default SetUsername;