import { NextRequest, NextResponse } from "next/server";
import { QueryCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { db, TABLES } from "@/lib/dynamodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = session.user as any;
  const url = new URL(req.url);
  const shiftId = url.searchParams.get("shiftId");

  try {
    if (shiftId) {
      // Hospital view: all bids for a specific shift
      const result = await db.send(new QueryCommand({
        TableName: TABLES.BIDS,
        KeyConditionExpression: "shiftId = :s",
        ExpressionAttributeValues: { ":s": shiftId },
      }));
      return NextResponse.json({ bids: result.Items ?? [] });
    }

    if (user.role === "doctor") {
      // Doctor view: my bids via GSI BidsByDoctor
      const result = await db.send(new QueryCommand({
        TableName: TABLES.BIDS,
        IndexName: "BidsByDoctor",
        KeyConditionExpression: "doctorId = :d",
        ExpressionAttributeValues: { ":d": user.userId },
        ScanIndexForward: false,
      }));
      return NextResponse.json({ bids: result.Items ?? [] });
    }

    // Hospital: all bids across their shifts
    if (user.hospitalId) {
      // Scan bids (or join with shifts — for hackathon a scan is fine)
      const result = await db.send(new ScanCommand({ TableName: TABLES.BIDS }));
      return NextResponse.json({ bids: result.Items ?? [] });
    }

    return NextResponse.json({ bids: [] });
  } catch (err) {
    console.error("List bids error:", err);
    return NextResponse.json({ error: "Failed to fetch bids" }, { status: 500 });
  }
}
