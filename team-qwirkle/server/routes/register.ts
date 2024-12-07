import express from "express";
import { Users } from "../db/dbmanifest";
import flash from "express-flash";
import session from "express-session";

const router = express.Router();

router.get("/", async (_request, response) => {
  response.render("register", { title: "Welcome" });
});

router.post("/register", async (request, response) => {
  const { username, password } = request.body;

  try {
    const user = await Users.register(username, password);
    // @ts-expect-error TODO: Define the session type for the user object
    request.session.user = user;

    response.redirect("/lobby");
  } catch (error) {
    console.error(error);

    request.flash("error", "Failed to register user");
    response.redirect("/root");
  }
});

export default router;
