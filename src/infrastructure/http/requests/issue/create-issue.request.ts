import z from "zod";

export const createIssueRequest = z.object({
    type: z.enum(['issues', 'feature_request']),
    platform: z.string().min(1, "Platform is required"),
    message: z.string().min(1, "Message is required"),
    email: z.string().email("Invalid email address"),
});
