import { NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from "bcrypt";
import { registerSchema } from "@/lib/validation";
import connectDB from "@/lib/db";

export async function POST(request: Request) {
    try {
        await connectDB();
        let { name, email, password, DOB, role, organisation } = await request.json();
        const validatedData = registerSchema.safeParse({name, email, password, DOB, role, organisation });
    
        if (!validatedData.success) {
            return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
        }
        const user = await User.findOne({ email: validatedData.data.email });
    
        if (user) {
            return NextResponse.json({ error: "User already exist" }, { status: 409 });
        }

        const passwordHash = await bcrypt.hash(validatedData.data.password, 10);
        
        const newUser = new User({
            name: validatedData.data.name,
            email: validatedData.data.email,
            password: passwordHash,
            DOB: validatedData.data.DOB,
            role: validatedData.data.role,
            organisation: validatedData.data.organisation,
            registeredAt: Date.now(),
        })
        
        await newUser.save();
        return NextResponse.json({ message: "Registration successful" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
