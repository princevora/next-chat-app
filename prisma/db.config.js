import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log: ["error"]
})

export const findFirstUser = async (userId) => {
    const userName = await prisma.user.findFirst({
        where: {
            id: userId
        }
    })

    return userName;
}

export default prisma;