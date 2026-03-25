import { NextResponse } from 'next/server';

export async function POST(request) {
    const body = await request.json();

    if (!body.firstname || !body.email || !body.message) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    return NextResponse.json({ data: "form submitted successfully" }, { status: 200 });
}
