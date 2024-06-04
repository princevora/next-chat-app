"use client";

import UserLoginSkeleton from "@/components/skeletons/register";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { IconLeft, IconRight, Spinner } from "@/app/ui";
import SetUserSkeleton from "@/components/skeletons/set-user";
import RegisterForm from "../(forms)/register";
import SetUsername from "@/components/set-username";
import { signIn } from "next-auth/react";

export default function Register() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [formType, setFormType] = useState(0);
    const [userDetail, setUserDetail] = useState({
        email: "",
        password: "",
        username: ""
    })

    const [isPending, setIsPending] = useState(false);

    const linkRef = useRef();
    const formRef = useRef();
    const homeLinkRef = useRef();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUserDetail(prev => ({
            ...prev,
            [name]: value
        }))
    }

    useEffect(() => {
        const tmId = setTimeout(() => {
            setIsLoaded(true);
        }, 900);

        return () => {
            clearTimeout(tmId);
        }
    }, []);

    const register = (email, password, username) => new Promise(async (resolve, reject) => {

        const response = await fetch("api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
                username
            })
        });

        // Get json response from api
        const jsonResponse = await response.json();

        // return reject when the request is not okey
        if (!response.ok) {
            reject(jsonResponse?.message || "Unable to register");
        }

        // Return resolve if there is not any error
        resolve(jsonResponse?.message || "ccessfully registered");
    })

    const handleSubmitUserForm = () => {
        // Set as pending
        setIsPending(true);

        // Prevent default the event (reload) when the button clicked or form submited
        event.preventDefault();

        // Check if the user email or password is empty.
        const { email, password } = userDetail;

        if (!email || !password) {
            toast.error("Please provide valid Email and password, fields can't be empty");
        }

        const tmId = setTimeout(() => {
            setIsPending(false)
            setFormType(1);
        }, 300);

        return () => {
            clearTimeout(tmId);
        }
    }

    const handleSubmit = async (event) => {
        // Set as pending
        setIsPending(true);

        // Prevent default the event (reload) when the button clicked or form submited
        event.preventDefault();

        // Check if the user email or password is empty.
        const { email, password, username } = userDetail;
        if (!username) {
            setIsPending(false)

            toast.error("Please provide valid Email and password, fields can't be empty");
            return;
        }

        const response = register(email, password, username);

        // Use toast promise
        toast.promise(response, {
            loading: `Registering User ${userDetail.email}`,
            success: (msg) => {
                // set as pending to fals
                setIsPending(false)

                // return success message
                return msg;
            },
            error: (err) => {
                // set as pending to fals
                setIsPending(false);

                // Return error
                return err;
            }
        })
            .then(async () => {

                return linkRef.current.click();
            })
    }

    const handleChangeFormType = (e) => {
        setFormType(0);
    }

    const params = {
        handleChange,
        isPending,
        userDetails: userDetail,
    }

    return (

        isLoaded ? <div className="flex justify-center items-center h-screen">
            <div className="mx-auto">
                {formType == 1 && (
                    <div className="pr-6 py-4">
                        <Link href="#" onClick={handleChangeFormType}>
                            <IconLeft />
                        </Link>
                    </div>
                )}
                {formType == 0
                    ? (
                        <>
                            <RegisterForm {...params} handleSubmit={handleSubmitUserForm} />
                        </>
                    )
                    : (
                        <SetUsername {...params} handleSubmit={handleSubmit} />
                    )
                }

                <div className="py-4">
                    <Link href="/login" className="hs-tooltip-toggle" ref={linkRef}>
                        <small className="text-purple-800">Already Have an Account?</small>
                    </Link>
                </div>

                <Link href="/u/home" hidden ref={homeLinkRef}>
                    {/* Empty */}
                </Link>
            </div>
        </div > : formType == 0
            ? <UserLoginSkeleton />
            : <SetUserSkeleton />
    )
}
