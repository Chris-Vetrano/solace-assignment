import * as dotenv from "dotenv";
dotenv.config();

import { advocates } from "../schema";
import { advocateData } from "./advocates";
import db from "..";

async function main() {
  try {
    console.log("DATABASE_URL:", process.env.DATABASE_URL);
    console.log("DB object:", db);
    console.log("Seeding database...");
    const result = await db.insert(advocates).values(advocateData);
    console.log("Seeding completed");
  } catch (error) {
    console.error("Error seeding:", error);
    process.exit(1);
  }
  process.exit(0);
}

main();
