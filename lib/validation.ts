import z from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const registerSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    DOB:  z.date(),
    password: z.string().min(6),
    role: z.enum(['student', 'HR', 'admin']),
    organisation: z.string().min(1),
});