import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";
import Users from "../../../../DB/models/Users";
import { getToken } from "next-auth/jwt";
import { DB } from "tspace-mysql";

const { z } = require("zod");

const requestSchema = z.object({
    value: z.string(),
})

export async function POST(request) {

    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    const userid = token?.id;

    try {
        const json = await request.json();
        const response = requestSchema.safeParse(json);

        if (!response.success) {
            return NextResponse.json({
                message: response.error.message,
                success: false
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                status: 400
            })
        }

        // Get value from data
        const { value } = response.data;

        // Find user
        const users = await new DB("users")
            .where("username", "LIKE", `%${value}%`)
            .where("id", "!=", userid)
            .select("username", "id")
            .get();

        if (!users) {
            return NextResponse.json({ result: false }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }

        // Return user
        return NextResponse.json({ result: true, users: users }, {
            headers: {
                "Content-Type": "application/json",
            },
            status: 200
        })

    } catch (error) {
        return NextResponse.json({
            message: "Invalid data provided or something went wrong",
            status: 400
        }, {
            status: 400
        });
    }
}

