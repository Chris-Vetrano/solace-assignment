const { drizzle } = require("drizzle-orm/postgres-js");
const { migrate } = require("drizzle-orm/postgres-js/migrator");
const postgres = require("postgres");
const { config } = require("dotenv");

config();

const runMigration = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  console.log(process.env.DATABASE_URL);

  const sql = postgres(process.env.DATABASE_URL, { max: 1 });
  const db = drizzle(sql);

  try {
    await migrate(db, { migrationsFolder: "drizzle" });
    await sql.end();
    console.log("Successfully ran migration.");
    process.exit(0);
  } catch (error) {
    console.error("Failed to run migration.");
    console.error(error);
    await sql.end();
    process.exit(1);
  }
};

runMigration();
