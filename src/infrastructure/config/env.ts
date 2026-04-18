import { z } from 'zod';

const envSchema = z.object({
    DATABASE_URL: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
    FROM_EMAIL: z.string().email(),
    PORT: z.string().optional().default('3000'),
})

export const env = envSchema.parse(process.env);