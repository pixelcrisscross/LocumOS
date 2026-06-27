import { NextRequest, NextResponse } from "next/server";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { db, TABLES } from "@/lib/dynamodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = session.user as any;

  try {
    const result = await db.send(new ScanCommand({
      TableName: TABLES.USERS,
      FilterExpression: "userId = :id",
      ExpressionAttributeValues: { ":id": user.userId },
    }));

    const profile = result.Items?.[0];
    if (!profile) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Never return password hash
    const { passwordHash, ...safeProfile } = profile;
    return NextResponse.json({ user: safeProfile });
  } catch (err) {
    console.error("Get user error:", err);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}
