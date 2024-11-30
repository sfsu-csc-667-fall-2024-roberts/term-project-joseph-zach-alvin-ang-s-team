import express from "express";

const router = express.Router();

router.get("/", async (_request, response) => {
  response.render("login", { title: "Welcome" });
});

export default router;
