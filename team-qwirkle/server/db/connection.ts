import pgp from "pg-promise";
require("dotenv").config();

const connection = pgp();

const db = connection({
  user: process.env.usernameDB,
  host: process.env.DATABASE_URL,
  database: process.env.database,
  password: process.env.password,
  port: Number(process.env.port),
});

export default db;
