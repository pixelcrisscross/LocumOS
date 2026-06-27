import { NextRequest, NextResponse } from "next/server";
import { PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { db, TABLES } from "@/lib/dynamodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// POST /api/bids/place
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = session.user as any;
  if (user.role !== "doctor") return NextResponse.json({ error: "Only doctors can place bids" }, { status: 403 });

  try {
    const { shiftId, bidRate, hospitalId } = await req.json();
    if (!shiftId || !bidRate) return NextResponse.json({ error: "Missing shiftId or bidRate" }, { status: 400 });

    const now = new Date().toISOString();

    // Write bid
    await db.send(new PutCommand({
      TableName: TABLES.BIDS,
      Item: {
        shiftId,
        doctorId: user.userId,
        doctorName: user.name,
        doctorEmail: user.email,
        specialty: user.specialty ?? "General",
        bidRate: Number(bidRate),
        status: "Pending",
        submittedAt: now,
      },
    }));

    // Increment bidsCount on shift
    if (hospitalId) {
      await db.send(new UpdateCommand({
        TableName: TABLES.SHIFTS,
        Key: { hospitalId, shiftId },
        UpdateExpression: "SET bidsCount = if_not_exists(bidsCount, :zero) + :one",
        ExpressionAttributeValues: { ":zero": 0, ":one": 1 },
      }));
    }

    return NextResponse.json({ success: true, submittedAt: now }, { status: 201 });
  } catch (err) {
    console.error("Place bid error:", err);
    return NextResponse.json({ error: "Failed to place bid" }, { status: 500 });
  }
}
