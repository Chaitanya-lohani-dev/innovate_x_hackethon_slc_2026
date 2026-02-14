import { NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from "bcrypt";
import { loginSchema } from "@/lib/validation";
import connectDB from "@/lib/db";
import { generateTokens , HashToken } from "@/lib/generateTokens";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        await connectDB();
        let { email, password } = await request.json();
        const validatedData = loginSchema.safeParse({ email, password });
    
        if (!validatedData.success) {
            return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
        }
        const user = await User.findOne({ email: validatedData.data.email });
    
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 401 });
        }
        const passwordValid = await bcrypt.compare(password, user.password);
    
        if (!passwordValid) {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }
    
        const { accessToken, refreshToken } = generateTokens(user);
        const hashedRefreshToken = HashToken(refreshToken);
        await User.findByIdAndUpdate(user._id, { refreshToken: hashedRefreshToken });
    
        const cookieStore = await cookies();
        cookieStore.set("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60, 
            path: "/"
        });
        cookieStore.set("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 15 * 60,
            path: "/"
        });
        return NextResponse.json({ message: "Login successful" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}   