import { NextRequest, NextResponse } from "next/server";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { db, TABLES } from "@/lib/dynamodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { v4 as uuid } from "uuid";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { specialty, date, time, duration, location, payRate, urgency } = body;

    if (!specialty || !date || !time || !location || !payRate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const user = session.user as any;
    const hospitalId = user.hospitalId ?? "demo-hospital";
    const shiftId = uuid();
    const now = new Date().toISOString();

    const shift = {
      hospitalId,
      shiftId,
      specialty,
      date,
      time,
      duration: duration ?? "8 hr",
      location,
      payRate: Number(payRate),
      urgency: urgency ?? "normal",
      status: "Open",
      seatsLeft: 1,
      bidsCount: 0,
      createdAt: now,
      postedBy: user.email,
    };

    await db.send(new PutCommand({ TableName: TABLES.SHIFTS, Item: shift }));

    return NextResponse.json({ success: true, shiftId, shift }, { status: 201 });
  } catch (err) {
    console.error("Create shift error:", err);
    return NextResponse.json({ error: "Failed to create shift" }, { status: 500 });
  }
}
