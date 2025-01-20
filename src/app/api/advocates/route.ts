import { NextRequest } from "next/server";
import { sql } from "drizzle-orm";
import { and, desc, asc, SQL } from "drizzle-orm";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { SPECIALTIES, DEGREES } from "../../constants/advocates";

type SortField = "name" | "experience" | "city" | "degree";
type SortOrder = "asc" | "desc";
type ExperienceRange = "0-2" | "3-5" | "6-10" | "10+";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const limit = Math.min(
    50,
    Math.max(1, Number(searchParams.get("limit")) || 10)
  );
  const offset = (page - 1) * limit;

  const searchTerm = searchParams.get("search")?.toLowerCase() || "";
  const specialties = searchParams.getAll("specialties");
  const cities = searchParams.getAll("cities");
  const degrees = searchParams.getAll("degrees");
  const experienceRange = searchParams.get(
    "experienceRange"
  ) as ExperienceRange;

  const sortBy = (searchParams.get("sortBy") as SortField) || "name";
  const sortOrder = (searchParams.get("sortOrder") as SortOrder) || "asc";

  try {
    const conditions: SQL[] = [];

    if (searchTerm) {
      conditions.push(
        sql`(
          LOWER(${advocates.firstName} || ' ' || ${
          advocates.lastName
        }) LIKE ${`%${searchTerm}%`} OR
          LOWER(${advocates.city}) LIKE ${`%${searchTerm}%`} OR
          LOWER(${advocates.degree}) LIKE ${`%${searchTerm}%`} OR
          ${advocates.specialties}::text ILIKE ${`%${searchTerm}%`}
        )`
      );
    }

    if (cities.length > 0) {
      conditions.push(sql`${advocates.city} = ANY(${cities})`);
    }

    if (degrees.length > 0) {
      conditions.push(sql`${advocates.degree} = ANY(${degrees})`);
    }

    if (specialties.length > 0) {
      conditions.push(sql`${advocates.specialties} ?| ${specialties}`);
    }

    if (experienceRange) {
      const experienceCondition = (() => {
        switch (experienceRange) {
          case "0-2":
            return sql`${advocates.yearsOfExperience} <= 2`;
          case "3-5":
            return sql`${advocates.yearsOfExperience} BETWEEN 3 AND 5`;
          case "6-10":
            return sql`${advocates.yearsOfExperience} BETWEEN 6 AND 10`;
          case "10+":
            return sql`${advocates.yearsOfExperience} > 10`;
          default:
            return undefined;
        }
      })();
      if (experienceCondition) {
        conditions.push(experienceCondition);
      }
    }

    const baseQuery = db
      .select()
      .from(advocates)
      .where(conditions.length ? and(...conditions) : undefined);

    const [{ count }] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(advocates)
      .where(conditions.length ? and(...conditions) : undefined);

    const queryWithSort = (() => {
      switch (sortBy) {
        case "name":
          return baseQuery.orderBy(
            sortOrder === "asc"
              ? advocates.firstName
              : desc(advocates.firstName),
            sortOrder === "asc" ? advocates.lastName : desc(advocates.lastName)
          );
        case "experience":
          return baseQuery.orderBy(
            sortOrder === "asc"
              ? advocates.yearsOfExperience
              : desc(advocates.yearsOfExperience)
          );
        case "city":
          return baseQuery.orderBy(
            sortOrder === "asc" ? advocates.city : desc(advocates.city)
          );
        case "degree":
          return baseQuery.orderBy(
            sortOrder === "asc" ? advocates.degree : desc(advocates.degree)
          );
        default:
          return baseQuery.orderBy(advocates.firstName, advocates.lastName);
      }
    })();

    const data = await queryWithSort.limit(limit).offset(offset);

    const [filterOptions] = await db
      .select({
        cities: sql<string[]>`ARRAY_AGG(DISTINCT ${advocates.city})`,
      })
      .from(advocates);

    return Response.json({
      data,
      pagination: {
        total: Number(count),
        page,
        limit,
        totalPages: Math.ceil(Number(count) / limit),
      },
      filters: {
        searchTerm: searchTerm || undefined,
        specialties: specialties.length > 0 ? specialties : undefined,
        cities: cities.length > 0 ? cities : undefined,
        degrees: degrees.length > 0 ? degrees : undefined,
        experienceRange: experienceRange || undefined,
      },
      sort: {
        field: sortBy,
        order: sortOrder,
      },
      filterOptions: {
        ...filterOptions,
        allSpecialties: SPECIALTIES,
        allDegrees: DEGREES,
      },
    });
  } catch (error) {
    console.error("Search error:", error);
    return Response.json(
      { error: "Failed to fetch advocates" },
      { status: 500 }
    );
  }
}
