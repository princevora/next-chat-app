"use client";

import UserLoginSkeleton from "@/components/skeletons/register";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { signIn, useSession } from "next-auth/react"
import toast from "react-hot-toast";

export default function Login() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [userDetail, setUserDetail] = useState({
        email: "",
        password: ""
    });

    const { status } = useSession();
    const linkRef = useRef();
    const homeLinkRef = useRef();

    useEffect(() => {
        const tmId = setTimeout(() => {
            setIsLoaded(true);
        }, 900);

        return () => {
            clearTimeout(tmId);
        }
    }, []);

    useEffect(() => {
        console.log("Status: ", status);
    }, [status]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUserDetail(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (event) => {
        // Prevent default the event (reload) when the button clicked or form submited
        event.preventDefault();

        // Check if the user email or password is empty.
        const { email, password } = userDetail;

        // Check if the user email or password is empty
        if (!email || !password) {
            toast.error("Please provide valid Email and password, fields can't be empty");
            return;
        }

        const response = await signIn("credentials", {
            email,
            password,
            redirect: false,
        })

        if (response.error) {
            toast.error(response.error);
            return;
        }

        toast.success("Logged in successfully");

        const tmId = setTimeout(() => {
            homeLinkRef.current.click();
        }, 500);

        return () => {
            clearTimeout(tmId);
        }
    }

    return (
        isLoaded ?
            <div className="flex justify-center items-center h-screen">
                <div className="mx-auto">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col  bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                            <div className="flex justify-between items-center border-b rounded-t-xl py-3 px-4 md:px-5 dark:border-neutral-700">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                                    Login TO Conitnue
                                </h3>
                            </div>
                            <div className="relative min-w-[31vw] p-1">
                                <input type="email" name="email" onChange={handleChange} id="hs-floating-input-email-value rounded-md" className="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                                    placeholder="you@email.com"
                                />
                                <label htmlFor="hs-floating-input-email-value" className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:scale-90 peer-focus:translate-x-0.5 peer-focus:-translate-y-1.5 peer-focus:text-gray-500 dark:peer-focus:text-neutral-500 peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:translate-x-0.5 peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500">
                                    Email
                                </label>
                            </div>
                            <hr className="rounded-sm" />
                            <div className="relative min-w-[31vw] p-1">
                                <input type="password" name="password" onChange={handleChange} id="hs-floating-input-email-value rounded-md" className="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                                    placeholder="you@email.com"
                                />
                                <label htmlFor="hs-floating-input-email-value" className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:scale-90 peer-focus:translate-x-0.5 peer-focus:-translate-y-1.5 peer-focus:text-gray-500 dark:peer-focus:text-neutral-500 peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:translate-x-0.5 peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500">
                                    Password
                                </label>
                            </div>
                        </div>
                        <button type="submit" className="py-3 mt-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 w-full rounded-lg">
                            Login
                            <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14"></path>
                                <path d="m12 5 7 7-7 7"></path>
                            </svg>
                        </button>
                    </form>

                    <Link hidden href="/u/home/" ref={homeLinkRef}>
                        {/* Hidden */}
                    </Link>

                    <div className="py-4">
                        <Link href="/register" ref={linkRef} className="hs-tooltip-toggle">
                            <small className="text-purple-800">Don't Have an Account?</small>
                        </Link>
                    </div>
                </div>
            </div > : <UserLoginSkeleton />
    )
}
