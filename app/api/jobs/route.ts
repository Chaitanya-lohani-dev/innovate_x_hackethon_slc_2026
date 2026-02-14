import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Job from "@/models/job";

export async function GET(request: Request) {
    try {
        await connectDB();
        const Jobs = await Job.find();
        return NextResponse.json({data: Jobs},{status: 200});
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
    }
}

