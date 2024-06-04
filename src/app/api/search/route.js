import { NextResponse } from "next/server";
import prisma from "../../../../prisma/db.config";
import { getSession } from "next-auth/react";

const { z } = require("zod");

const requestSchema = z.object({
    value: z.string(),
})

export async function POST(request) {

    const session = await getSession({ req: request });
    const userid = session?.user?.id;

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
        const users = await prisma.user.findMany({
            where: {
                NOT: {
                    id: userid
                },
                username: {
                    startsWith: value
                }
            },
            select: {
                username: true,
                id: true
            }
        });

        prisma.$disconnect();

        if (!users) {
            return NextResponse.json({ result: false }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }

        // Return user
        return NextResponse.json({ result: true, users }, {
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

