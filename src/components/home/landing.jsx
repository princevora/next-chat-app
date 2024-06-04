import { IconRight } from '@/app/ui'
import Link from 'next/link'
import React from 'react'

export default function LandingPage() {
    return (
        <div className='h-screen overflow-hidden'>
            <div className="dark:bg-neutral-900">
                <div className="h-screen px-4 py-40">
                    <div className="relative w-full md:max-w-2xl md:mx-auto text-center">
                        <h1 className="font-bold text-gray-400 text-xl sm:text-2xl md:text-5xl leading-tight mb-6">
                            Start chatting Now
                        </h1>
                        <div className="text-gray-600 md:text-xl md:px-18 flex gap-4 justify-center">
                            <Link href="/register" type="button" className="bg-slate-700 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none  dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
                                Signup free
                                <IconRight />
                            </Link>
                        </div>
                        <div className="hidden md:block h-40 w-40 rounded-full bg-blue-800 absolute right-0 bottom-0 -mb-64 -mr-48" />
                        <div className="hidden md:block h-5 w-5 rounded-full bg-yellow-500 absolute top-0 right-0 -mr-40 mt-32" />
                    </div>
                </div>
                <svg
                    className="fill-current bg-gray-200 text-white hidden md:block"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                >
                    <path
                        fillOpacity={1}
                        d="M0,64L120,85.3C240,107,480,149,720,149.3C960,149,1200,107,1320,85.3L1440,64L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
                    />
                </svg>
            </div>
        </div>
    )
}
