import "express-session";

declare module "express-session" {
  interface SessionData {
    user: {
      username: string;
      password: string;
      created: string;
      account_id: number;
    };
  }
}

export {};
