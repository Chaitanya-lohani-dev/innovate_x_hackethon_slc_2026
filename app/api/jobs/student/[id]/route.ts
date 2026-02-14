import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Job from "@/models/job";
import Application from "@/models/applications";

export async function GET(request: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const jobId = searchParams.get("jobId");

        if (!jobId) {
            return NextResponse.json({ error: "jobId is required" }, { status: 400 });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return NextResponse.json({ error: "Job not found" }, { status: 404 });
        }

        return NextResponse.json({ data: job }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch job" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();

        const { userId, jobId, resumeUrl } = await request.json();

        if (!userId || !jobId || !resumeUrl) {
            return NextResponse.json(
                { error: "userId, jobId, and resumeUrl are required" },
                { status: 400 }
            );
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return NextResponse.json({ error: "Job not found" }, { status: 404 });
        }

        const existing = await Application.findOne({ userId, jobId });
        if (existing) {
            return NextResponse.json({ error: "Already applied" }, { status: 409 });
        }

        const application = await Application.create({ userId, jobId, resumeUrl });

        return NextResponse.json({ data: application }, { status: 201 });
    } catch (error: any) {
        if (error?.code === 11000) {
            return NextResponse.json({ error: "Already applied" }, { status: 409 });
        }
        return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
    }
}
