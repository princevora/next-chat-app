import React from 'react'

export default function SetUserSkeleton() {
    return (
        <div className="flex justify-center items-center h-screen animate-pulse">
            <div className="mx-auto">
                <div className="flex flex-col  bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                    <div className="border-b rounded-t-xl py-3 px-4 md:px-5 dark:border-neutral-700">
                        <p className="h-4 bg-gray-200 rounded-full dark:bg-neutral-700 w-full"></p>
                        {/* <h3 className="text-lg font-bold text-gray-800 dark:text-white"> */}
                        {/* </h3> */}
                    </div>
                    <div className="p-3 relative min-w-[40vw]">
                        <p className="p-4 h-4 bg-gray-200 rounded-md dark:bg-neutral-700 w-full"></p>
                    </div>
                </div>
                <p className="py-5 mt-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 p-4 h-4 w-[25%]"></p>
            </div>
        </div>
    )
}
