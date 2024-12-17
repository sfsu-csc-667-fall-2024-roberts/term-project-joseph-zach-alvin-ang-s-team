import express from "express";
import { Users } from "../db/dbmanifest";
import { SessionData } from "express-session";

const router = express.Router();

router.get("/register", async (_request, response) => {
  response.render("auth/register", { title: "Welcome" });
});

router.post("/register", async (request, response) => {
  const { username, password } = request.body;

  try {
    const user = await Users.register(username, password);

    // @ts-expect-error TODO
    (request.session as SessionData).user = {
      username: user.username,
      password: user.password,
      created: user.created,
    };

    response.redirect("/lobby");
  } catch (error) {
    console.error(error);

    console.log("Not working:(");
    response.redirect("/register");
  }
});

router.get("/login", async (_request, response) => {
  response.render("auth/login", { title: "Welcome" });
});

router.post("/login", async (request, response) => {
  const { email, password } = request.body;

  try {
    const user = await Users.login(email, password);
    console.log(user);
    // @ts-expect-error TODO
    (request.session as SessionData).user = {
      username: user.username,
      password: user.password,
      created: user.created,
    };

    response.redirect("/lobby");
  } catch (error) {
    console.error(error);

    console.log("Not working:(");
    response.redirect("/login"); // CHANFGE THIS WHEN U DO LOG IN (remove auth)
  }
});

router.get("/logout", (request, response) => {
  request.session.destroy(() => {
    response.redirect("/");
  });
});

export default router;
