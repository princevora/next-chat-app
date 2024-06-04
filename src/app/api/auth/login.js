import prisma from "../../../../prisma/db.config";
import { userSchema } from "./request-schema";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export function login(email, password) {

    return new Promise(async (resolve, reject) => {

        // check if the user already exists.
        const user = await prisma.user.findUnique({
            where: {
                email,
            }
        });

        prisma.$disconnect();

        if (!user) {
            reject(ObjectResponse("No user found with this provided email", 401, true));
        }

        try {

            // Get user password to compare to hash
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                reject(ObjectResponse("The provided password did not match", 401, true));
            }
            // return success when the user is created.
            resolve({
                id: user.id,
                email: user.email,
                username: user.username,
                success: true
            });

        } catch (error) {
            // return error
            reject(ObjectResponse("Unable to create user", 401, true));
        }
    })
}

function ObjectResponse(message, status, isError = false) {
    const response = {
        success: !isError,
        message,
        status
    }

    return response;
}