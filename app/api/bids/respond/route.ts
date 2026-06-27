import { NextRequest, NextResponse } from "next/server";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { db, TABLES } from "@/lib/dynamodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = session.user as any;
  if (user.role !== "hospital") return NextResponse.json({ error: "Only hospital admins can respond to bids" }, { status: 403 });

  try {
    const { shiftId, doctorId, action, responseNote } = await req.json();
    if (!shiftId || !doctorId || !action) return NextResponse.json({ error: "Missing required fields" }, { status: 400 });

    const newStatus = action === "accept" ? "Accepted" : "Rejected";

    await db.send(new UpdateCommand({
      TableName: TABLES.BIDS,
      Key: { shiftId, doctorId },
      UpdateExpression: "SET #st = :s, responseNote = :n, respondedAt = :t",
      ExpressionAttributeNames: { "#st": "status" },
      ExpressionAttributeValues: {
        ":s": newStatus,
        ":n": responseNote ?? "",
        ":t": new Date().toISOString(),
      },
    }));

    // If accepted, update shift status to Filled
    if (action === "accept") {
      const hospitalId = user.hospitalId ?? "demo-hospital";
      await db.send(new UpdateCommand({
        TableName: TABLES.SHIFTS,
        Key: { hospitalId, shiftId },
        UpdateExpression: "SET #st = :filled, seatsLeft = :zero",
        ExpressionAttributeNames: { "#st": "status" },
        ExpressionAttributeValues: { ":filled": "Filled", ":zero": 0 },
      }));
    }

    return NextResponse.json({ success: true, newStatus });
  } catch (err) {
    console.error("Respond bid error:", err);
    return NextResponse.json({ error: "Failed to update bid" }, { status: 500 });
  }
}
