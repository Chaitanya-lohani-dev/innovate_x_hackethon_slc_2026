import { randomUUID } from "crypto";
import { createClient } from "redis";

let redisClientPromise: Promise<ReturnType<typeof createClient>> | null = null;
let redisClient: ReturnType<typeof createClient> | null = null;

export async function getRedisClient() {
    if (redisClient?.isOpen) {
        return redisClient;
    }

    if (redisClientPromise) {
        return redisClientPromise;
    }

    const client = createClient({
        url: process.env.REDIS_URL,
    });

    client.on("error", (error) => {
        console.log("Redis error:", error);
    });

    redisClientPromise = client
        .connect()
        .then(() => {
            console.log("Redis connected successfully");
            redisClient = client;
            return client;
        })
        .catch((error) => {
            console.log("Redis connection failed:", error);
            redisClientPromise = null;
            throw error;
        });

    return redisClientPromise;
}

export type SlidingWindowResult = {
    allowed: boolean;
    remaining: number;
    resetAt: number;
};

export async function slidingWindowCounter(
    key: string,
    limit: number,
    windowMs: number
): Promise<SlidingWindowResult> {
    const client = await getRedisClient();
    const now = Date.now();
    const windowStart = now - windowMs;
    const token = `${now}-${randomUUID()}`;

    const pipeline = client.multi();
    pipeline.zRemRangeByScore(key, 0, windowStart);
    pipeline.zAdd(key, [{ score: now, value: token }]);
    pipeline.zCard(key);
    pipeline.pExpire(key, windowMs);

    const results = await pipeline.exec();
    const count = Number(results?.[2] ?? 0);
    const remaining = Math.max(limit - count, 0);

    return {
        allowed: count <= limit,
        remaining,
        resetAt: now + windowMs,
    };
}