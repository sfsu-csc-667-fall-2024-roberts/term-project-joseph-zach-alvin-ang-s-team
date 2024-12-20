import bcrypt from "bcrypt";
import db from "../connection";
import { FIND_BY_USERNAME_SQL, REGISTER_SQL } from "./sql";

function getSQLTimestamp(): string {
  const now: Date = new Date();
  const year: number = now.getFullYear();
  const month: string = String(now.getMonth() + 1).padStart(2, "0");
  const day: string = String(now.getDate()).padStart(2, "0");
  const hours: string = String(now.getHours()).padStart(2, "0");
  const minutes: string = String(now.getMinutes()).padStart(2, "0");
  const seconds: string = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const sqlTimestamp: string = getSQLTimestamp();

type User = {
  username: string;
  password: string;
  created: string;
  account_id: number;
};

const register = async (
  username: string,
  clearTextPassword: string,
): Promise<User> => {
  const password = await bcrypt.hash(clearTextPassword, 10);
  const created = getSQLTimestamp();
  const id = -1;
  console.log("index debug");
  return await db.one(REGISTER_SQL, [username, password, created, id]);
};

const login = async (username: string, clearTextPassword: string) => {
  const user = await findbyUsername(username);

  const isValid = await bcrypt.compare(clearTextPassword, user.password);
  if (isValid) {
    return user;
  } else {
    throw new Error("Invalid credentials provided");
  }
};

const findbyUsername = async (username: string): Promise<User> => {
  return await db.one(FIND_BY_USERNAME_SQL, [username]);
};

export default {
  register,
  login,
  findbyUsername,
};
