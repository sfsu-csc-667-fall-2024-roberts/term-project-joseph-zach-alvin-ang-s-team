import bcrypt from "bcrypt";
import db from "../connection";
import { FIND_BY_USERNAME_SQL, REGISTER_SQL } from "./sql";
import { StringLiteral } from "typescript";

type User = {
  account_id: number;
  player_id: number;
  username: string;
  password: string;
  created: string;
};

type UserWithPassword = User & {
  password: string;
};

const register = async (
  username: string,
  clearTextPassword: string,
): Promise<User> => {
  const password = await bcrypt.hash(clearTextPassword, 10);
  const account_id = await bcrypt.hash(clearTextPassword + username, 25);
  const player_id = await bcrypt.hash(clearTextPassword + username, 30);
  const created = 0;
  console.log("index debug");
  return await db.one(REGISTER_SQL, [
    account_id,
    player_id,
    username,
    password,
    created,
  ]);
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

const findbyUsername = async (username: string): Promise<UserWithPassword> => {
  return await db.one(FIND_BY_USERNAME_SQL, [username]);
};

export default { register, login, findbyUsername };
