import express from "express";

const router = express.Router();

router.get("/", async (_request, response) => {
  response.render("game", { title: "Welcome" });
});

export default router;
