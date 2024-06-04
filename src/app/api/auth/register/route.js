import prisma from "../../../../../prisma/db.config";
import { userSchema } from "../request-schema";
import { NextResponse } from "next/server";
import bcrypt, { hash } from "bcrypt";

export async function POST(req, res) {
    const data = await req.json()

    const schemaResponse = userSchema.safeParse(data);

    // Return failed when the user is not found
    if (!schemaResponse.success) {
        return new NextResponse(JSON.stringify({
            success: false,
            message: "Please provide valid User details. use password of minimum length - 8"
        }), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 401
        })
    }

    // Get data from the schema response
    const { email, password, username } = schemaResponse.data;

    // Hash the password 
    let hashPassword = await bcrypt.hash(password, 10);

    // check if the user already exists.
    const exists = await prisma.user.findFirst({
        where: {
            OR: [
                { email: email },
                { username: username }
            ]
        }
    });

    if (exists) {
        return new NextResponse(JSON.stringify({ success: false, message: "A user with this email or username aleready exists." }), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 409
        });
    }

    try {
        // Create user
        await prisma.user.create({
            data: {
                password: hashPassword,
                email,
                username
            }
        })

        prisma.$disconnect();

        // return success when the user is created.
        return new NextResponse(JSON.stringify({ success: true, message: "User has been registered" }), { status: 200 });
    } catch (error) {
        console.log(error);
        // return error
        return new NextResponse(JSON.stringify({ success: false, message: "Unable to create user" }), { status: 401 });
    }
}