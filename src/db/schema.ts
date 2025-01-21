import { sql } from "drizzle-orm";
import {
  pgTable,
  integer,
  text,
  jsonb,
  serial,
  timestamp,
  bigint,
  index,
} from "drizzle-orm/pg-core";

export const advocates = pgTable(
  "advocates",
  {
    id: serial("id").primaryKey(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    city: text("city").notNull(),
    degree: text("degree").notNull(),
    specialties: jsonb("payload").default([]).notNull(),
    yearsOfExperience: integer("years_of_experience").notNull(),
    phoneNumber: bigint("phone_number", { mode: "number" }).notNull(),
    createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    nameIdx: index("advocates_name_idx").on(table.firstName, table.lastName),
    cityIdx: index("advocates_city_idx").on(table.city),
    degreeIdx: index("advocates_degree_idx").on(table.degree),
    yearsExpIdx: index("advocates_years_exp_idx").on(table.yearsOfExperience),
    createdAtIdx: index("advocates_created_at_idx").on(table.createdAt),
  })
);
