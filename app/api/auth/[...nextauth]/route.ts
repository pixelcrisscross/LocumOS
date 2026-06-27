import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { db, TABLES } from "@/lib/dynamodb";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          // Query user by email via GSI (or scan fallback for now)
          const { ScanCommand } = await import("@aws-sdk/lib-dynamodb");
          const result = await db.send(
            new ScanCommand({
              TableName: TABLES.USERS,
              FilterExpression: "email = :e",
              ExpressionAttributeValues: { ":e": credentials.email },
            })
          );

          const user = result.Items?.[0];
          if (!user) return null;

          const passwordMatch = await bcrypt.compare(credentials.password, user.passwordHash);
          if (!passwordMatch) return null;

          return {
            id: user.userId,
            email: user.email,
            name: user.name,
            role: user.role,
            hospitalId: user.hospitalId ?? null,
            specialty: user.specialty ?? null,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = (user as any).id;
        token.role = (user as any).role;
        token.hospitalId = (user as any).hospitalId;
        token.specialty = (user as any).specialty;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).userId = token.userId;
        (session.user as any).role = token.role;
        (session.user as any).hospitalId = token.hospitalId;
        (session.user as any).specialty = token.specialty;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
