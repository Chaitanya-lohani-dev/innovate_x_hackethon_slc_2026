import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Application from "@/models/applications";
export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		await connectDB();

		const application = await Application.findById(params.id);
		if (!application) {
			return NextResponse.json(
				{ error: "Application not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({ data: application }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to fetch application" },
			{ status: 500 }
		);
	}
}
