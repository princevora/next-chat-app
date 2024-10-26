import { NextResponse } from "next/server";
import Users from "../../../../DB/models/User";
import Chats from "../../../../DB/models/Chat";
import { DB, Repository } from "tspace-mysql";

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

        const input = new DB().escape(id);

        const chatsQuery = ` SELECT 
            chats.id, 
            chats.adder_user_id, 
            chats.added_user_id, 
            users.username AS added_username, 
            chats.created_at, 
            chats.updated_at 
        FROM 
            chats 
        INNER JOIN 
            users ON chats.added_user_id = users.id 
        WHERE 
            chats.adder_user_id = ${input}
    `;

        const chats = await new DB()
        .rawQuery(chatsQuery);

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
            chats,
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

