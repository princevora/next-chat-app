import { z } from "zod";

export const userSchema = z.object({
    email: z.string().email("The provided value is not an email"),
    password: z.string().min(8),
    username: z.string().nonempty("Username can't be empty")
});