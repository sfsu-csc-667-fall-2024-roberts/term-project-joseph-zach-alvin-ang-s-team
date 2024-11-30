import express from "express";

const router = express.Router();

router.get("/", async (_request, response) => {
  response.render("lobby", { title: "Welcome" });
});

export default router;
