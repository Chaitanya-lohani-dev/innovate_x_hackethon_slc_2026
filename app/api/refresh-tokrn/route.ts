import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/user";
import { verifyToken, generateTokens, HashToken } from "@/lib/generateTokens";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        await connectDB();

        const cookieStore = await cookies();
        const refreshToken = cookieStore.get("refreshToken")?.value;

        if (!refreshToken) {
            return NextResponse.json({ error: "Refresh token missing" }, { status: 401 });
        }

        const payload = verifyToken(refreshToken, "refresh");
        if (!payload || typeof payload !== "object" || !("_id" in payload)) {
            return NextResponse.json({ error: "Invalid refresh token" }, { status: 401 });
        }

        const userId = String((payload as { _id: string })._id);
        const user = await User.findById(userId);

        if (!user || !user.refreshToken) {
            return NextResponse.json({ error: "Invalid refresh token" }, { status: 401 });
        }

        const hashedRefreshToken = HashToken(refreshToken);
        if (hashedRefreshToken !== user.refreshToken) {
            return NextResponse.json({ error: "Invalid refresh token" }, { status: 401 });
        }

        const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);
        const newHashedRefreshToken = HashToken(newRefreshToken);
        await User.findByIdAndUpdate(user._id, { refreshToken: newHashedRefreshToken });

        cookieStore.set("refreshToken", newRefreshToken, {
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

        return NextResponse.json({ message: "Token refreshed" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
