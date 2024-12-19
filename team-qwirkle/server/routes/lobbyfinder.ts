import express from "express";
import { request } from "http";
import { Lobby } from "../db/dbmanifest";

const router = express.Router();

router.post("/", async (_request, response) => {
  response.render("lobbyfinder", { title: "Welcome" });
});

router.get("/", async (request, response) => {
  const { lobbyPassword } = request.body;

  try {
    // const lobby = Lobby.
  } catch (error) {}

  response.render("lobbyfinder", { title: "Welcome" });
});

export default router;
