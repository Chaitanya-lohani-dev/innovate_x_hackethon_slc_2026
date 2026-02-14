import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 60_000;
const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

function getClientIp(request: any) {
    if (request.ip) {
        return request.ip;
    }

    const forwardedFor = request.headers.get("x-forwarded-for");
    if (forwardedFor) {
        return forwardedFor.split(",")[0]?.trim() || "unknown";
    }

    return request.headers.get("x-real-ip") || "unknown";
}

async function redisCommand(args: Array<string | number>) {
    if (!UPSTASH_URL || !UPSTASH_TOKEN) {
        return null;
    }

    const response = await fetch(UPSTASH_URL, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${UPSTASH_TOKEN}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(args),
        cache: "no-store",
    });

    if (!response.ok) {
        return null;
    }

    const data = (await response.json()) as { result?: number };
    return data.result ?? null;
}

export async function middleware(request: NextRequest) {
    if (!UPSTASH_URL || !UPSTASH_TOKEN) {
        return NextResponse.next();
    }

    const ip = getClientIp(request);
    const now = Date.now();
    const windowStart = now - RATE_WINDOW_MS;
    const token = `${now}-${crypto.randomUUID()}`;
    const key = `rate:${request.nextUrl.pathname}:${ip}`;

    await redisCommand(["ZREMRANGEBYSCORE", key, 0, windowStart]);
    await redisCommand(["ZADD", key, now, token]);
    const count = await redisCommand(["ZCARD", key]);
    await redisCommand(["PEXPIRE", key, RATE_WINDOW_MS]);

    if (typeof count === "number" && count > RATE_LIMIT) {
        return NextResponse.json(
            { error: "Too many requests" },
            {
                status: 429,
                headers: {
                    "Retry-After": String(Math.ceil(RATE_WINDOW_MS / 1000)),
                },
            }
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/api/jobs/student/application/:path*"],
};
