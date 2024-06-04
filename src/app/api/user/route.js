import { NextResponse } from "next/server";
import prisma from "../../../../prisma/db.config";

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

        const user = await prisma.user.findUnique({
            where: {
                id
            }, select: {
                email: true,
                username: true,
                id: true
            }
        });

        prisma.$disconnect();

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

