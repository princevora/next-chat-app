import { NextResponse } from "next/server";
import Users from "../../../../DB/models/Users";
import Chats from "../../../../DB/models/Chats";

const { z } = require("zod");

const requestSchema = z.object({
    userId: z.number(),
    userChatId: z.number(),
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

        // Get userId and userchat id from data
        const { userChatId, userId } = response.data;

        // Check if user exists
        const exists = await new Users()
            .whereIn("id", [userId, userChatId])
            .exists();

        if (!exists) {
            return NextResponse.json({
                result: false,
                message: "No user found."
            })
        }

        // check if the user already have the chats
        const chatExists = await new Chats()
            .where("added_by", "=", userId)
            .where("added_to", "=", userChatId)
            .orWhere("added_by", "=", userChatId)
            .orWhere("added_to", "=", userId)
            .exists()

        if (chatExists) {
            return NextResponse.json({
                result: false,
                message: "User already have this chat."
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                status: 400
            })
        }

        const chat = await new Chats()
            .create({
                added_by: userId,
                added_to: userChatId
            })
            .save();

        if (!chat) {
            return NextResponse.json({
                result: false,
                message: "Unable to add the chat"
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                status: 409
            })
        }

        // Return user
        return NextResponse.json({ result: true, message: "Chat added successfully" }, {
            headers: {
                "Content-Type": "application/json",
            },
            status: 200
        })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Invalid data provided or something went wrong",
            status: 400
        }, {
            status: 400
        });
    }
}

