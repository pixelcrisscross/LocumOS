import { NextRequest, NextResponse } from "next/server";
import { ScanCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { db, TABLES } from "@/lib/dynamodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const url = new URL(req.url);
    const status = url.searchParams.get("status");
    const specialty = url.searchParams.get("specialty");
    const user = session.user as any;

    let result;

    if (user.role === "hospital" && user.hospitalId) {
      // Query by hospitalId (partition key)
      result = await db.send(new QueryCommand({
        TableName: TABLES.SHIFTS,
        KeyConditionExpression: "hospitalId = :h",
        ExpressionAttributeValues: { ":h": user.hospitalId },
        ScanIndexForward: false, // newest first
      }));
    } else {
      // Doctor: scan all open shifts (optionally filter by specialty)
      const filterParts: string[] = ["#st = :open"];
      const exprValues: Record<string, any> = { ":open": "Open" };
      const exprNames: Record<string, string> = { "#st": "status" };

      if (specialty) {
        filterParts.push("specialty = :sp");
        exprValues[":sp"] = specialty;
      }

      result = await db.send(new ScanCommand({
        TableName: TABLES.SHIFTS,
        FilterExpression: filterParts.join(" AND "),
        ExpressionAttributeValues: exprValues,
        ExpressionAttributeNames: exprNames,
      }));
    }

    const items = result.Items ?? [];

    // Apply status filter
    const filtered = status && status !== "All"
      ? items.filter(s => s.status === status)
      : items;

    return NextResponse.json({ shifts: filtered });
  } catch (err) {
    console.error("List shifts error:", err);
    return NextResponse.json({ error: "Failed to fetch shifts" }, { status: 500 });
  }
}
