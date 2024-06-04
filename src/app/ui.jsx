import React from 'react'

export function IconRight() {
    return (
        <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
        </svg>
    )
}

export function Spinner() {
    return (
        <div className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-gray-400 rounded-full" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
        </div>
    )
}

export function IconLeft() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
    )
}