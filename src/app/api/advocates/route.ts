import { NextRequest } from "next/server";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const limit = Math.min(
    50,
    Math.max(1, Number(searchParams.get("limit")) || 10)
  );
  const offset = (page - 1) * limit;

  try {
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(advocates);

    const data = await db
      .select()
      .from(advocates)
      .limit(limit)
      .offset(offset)
      .orderBy(advocates.id);

    return Response.json({
      data,
      pagination: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    console.error("Database query error:", error);
    return Response.json(
      { error: "Failed to fetch advocates" },
      { status: 500 }
    );
  }
}
