import z from "zod";

export const subscribeRequest = z.object({
    email: z.string().email(),
})