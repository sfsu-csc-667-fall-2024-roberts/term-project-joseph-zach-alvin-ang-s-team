import bcrypt from "bcrypt";
import db from "../connection";
import { FIND_BY_EMAIL_SQL, REGISTER_SQL } from "./sql";

type User = {
  id: number;
  username: string;
  email: string;
};

type UserWithPassword = User & {
  password: string;
};

const register = async (
  username: string,
  email: string,
  clearTextPassword: string,
): Promise<User> => {
  const password = await bcrypt.hash(clearTextPassword, 10);
  return await db.one(REGISTER_SQL, [username, email, password]);
};

const login = async (email: string, clearTextPassword: string) => {
  const user = await findByEmail(email);

  const isValid = await bcrypt.compare(clearTextPassword, user.password);
  if (isValid) {
    return user;
  } else {
    throw new Error("Invalid credentials provided");
  }
};

const findByEmail = async (email: string): Promise<UserWithPassword> => {
  return await db.one(FIND_BY_EMAIL_SQL, [email]);
};

export default { register, login, findByEmail };
