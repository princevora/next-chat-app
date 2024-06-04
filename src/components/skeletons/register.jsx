import React from 'react'

export default function UserLoginSkeleton() {
    return (
        <div className="flex justify-center items-center h-screen animate-pulse">
            <div className="mx-auto">
                <div className="flex flex-col  bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                    <div className="flex justify-between items-center border-b rounded-t-xl py-3 px-4 md:px-5 dark:border-neutral-700">
                        {/* <h3 className="text-lg font-bold text-gray-800 dark:text-white"> */}
                        <p className="h-4 bg-gray-200 rounded-full dark:bg-neutral-700 w-[50%]" ></p>
                        {/* </h3> */}
                    </div>
                    <div className="relative min-w-[31vw] p-1">
                        <div className="p-4">
                            <p className="h-4 bg-gray-200 rounded-full dark:bg-neutral-700 w-full p-3" ></p>
                        </div>
                    </div>
                    <hr className="rounded-sm" />
                    <div className="relative min-w-[31vw] p-1">
                        <div className="p-4">
                            <p className="h-4 bg-gray-200 rounded-full dark:bg-neutral-700 w-full p-3" ></p>
                        </div>
                    </div>
                </div>
                <button type="button" className="py-3 flex justify-center mt-3 px-4 gap-x-2 text-sm font-medium border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 w-full rounded-lg">
                    <p className="h-4 bg-gray-200  rounded-full dark:bg-neutral-700 w-full p-3" ></p>
                </button>
            </div>
        </div>
    )
}
