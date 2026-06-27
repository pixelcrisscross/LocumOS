import { NextRequest, NextResponse } from "next/server";
import { PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { db, TABLES } from "@/lib/dynamodb";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const { role, name, email, password, orgName, city, specialty, yearsExp, mciNumber } = await req.json();

    if (!role || !name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if email already exists
    const existing = await db.send(new ScanCommand({
      TableName: TABLES.USERS,
      FilterExpression: "email = :e",
      ExpressionAttributeValues: { ":e": email },
    }));
    if (existing.Items && existing.Items.length > 0) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const userId = uuid();
    const now = new Date().toISOString();

    // Create hospital record if needed
    let hospitalId: string | undefined;
    if (role === "hospital" && orgName) {
      hospitalId = uuid();
      await db.send(new PutCommand({
        TableName: TABLES.HOSPITALS,
        Item: { hospitalId, name: orgName, city, adminEmail: email, plan: "free", createdAt: now },
      }));
    }

    // Create user
    await db.send(new PutCommand({
      TableName: TABLES.USERS,
      Item: {
        userId,
        email,
        name,
        role,
        passwordHash,
        ...(hospitalId ? { hospitalId } : {}),
        ...(specialty ? { specialty } : {}),
        ...(yearsExp ? { yearsExp: Number(yearsExp) } : {}),
        ...(mciNumber ? { mciNumber } : {}),
        createdAt: now,
      },
    }));

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
