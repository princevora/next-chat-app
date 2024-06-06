import { NextResponse } from "next/server";
import Users from "../../../../DB/models/Users";

const { z } = require("zod");

const requestSchema = z.object({
    id: z.number()
})

export async function POST(request) {

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

        const { id } = response.data;

        const user = await new Users()
            .select('email', 'username', 'id')
            .where("id", "=", id)
            .firstOrError();

        if (!user) {
            return NextResponse.json({
                message: "Unable to find user",
                success: false
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                status: 400
            })
        }

        // Return user
        return NextResponse.json({
            user,
            success: true
        }, {
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

