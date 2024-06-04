import { NextResponse } from "next/server";
import prisma from "../../../../prisma/db.config";
import { getSession } from "next-auth/react";

const { z } = require("zod");

const requestSchema = z.object({
    username: z.string().nonempty({ message: 'Username must not be empty or just spaces' }).refine(val => val.trim() !== '', {
        message: 'Username must not be empty or just spaces',
    }),
    id: z.number(),
})

export async function POST(request) {
    try {
        const json = await request.json();
        const response = requestSchema.safeParse(json);

        if (response.error) {
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

        const { id, username } = response.data;

        const user = await prisma.user.update({
            data: {
                username
            },
            where: {
                id
            }
        });

        prisma.$disconnect();

        if (!user) {
            return NextResponse.json({
                message: "Unable to Update user",
                success: false
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                status: 400
            })
        }

        // // Update the user..
        // const session = await getSession({ req: request});

        // console.log(session);

        // // Validate session
        // if (session) {
        //     session.user.username = username
        // }
        // console.log(session);
        
        // Return user
        return NextResponse.json({
            message: "User updated successfully",
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
        });
    }
}

