import express from "express";
import { Users } from "../db/dbmanifest";
import flash from "express-flash";
import session from "express-session";

const router = express.Router();

router.get("/", async (_request, response) => {
  response.render("login", { title: "Welcome" });
});

router.post("/login", async (request, response) => {
  const { email, password } = request.body;

  try {
    const user = await Users.login(email, password);
    // @ts-expect-error TODO: Define the session type for the user object
    request.session.user = user;

    response.redirect("/lobby");
  } catch (error) {
    console.error(error);

    request.flash("error", error as string);
    response.redirect("/login"); // CHANFGE THIS WHEN U DO LOG IN (remove auth)
  }
});

router.get("/logout", (request, response) => {
  request.session.destroy(() => {
    response.redirect("/");
  });
});

export default router;
