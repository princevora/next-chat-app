import { userSchema } from "../request-schema";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import Users from "../../../../../DB/models/User";

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
    const exists = await new Users().where("email", "=", email).orWhere("username", '=', username).exists();

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
        await new Users().create({
            password: hashPassword,
            username,
            email,
        }).save(); //Save the user

        // return success when the user is created.
        return new NextResponse(JSON.stringify({ success: true, message: "User has been registered" }), { status: 200 });
    } catch (error) {
        // return error
        return new NextResponse(JSON.stringify({ success: false, message: "Unable to create user" }), { status: 401 });
    }
}