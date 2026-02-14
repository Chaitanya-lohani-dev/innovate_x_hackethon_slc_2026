import jwt from "jsonwebtoken";
import crypto from "crypto";

export function generateTokens(user: { _id: string, email: string, role: string }) {
    const accessToken = jwt.sign(
        { _id: user._id, email: user.email, role: user.role },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
        { _id: user._id },
        process.env.REFRESH_TOKEN_SECRET!,
        { expiresIn: "30d" }
    );
    return { accessToken, refreshToken };
}

export function HashToken(token: string) {
    return crypto.createHash("sha256").update(token).digest("hex");
}