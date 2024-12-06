import pgp from "pg-promise";

const connection = pgp();

const db = connection({
  user: process.env.username,
  host: process.env.DATABASE_URL,
  database: process.env.database,
  password: process.env.password,
  port: Number(process.env.port),
});

export default db;
