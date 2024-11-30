import express from "express";

const router = express.Router();

router.get("/", async (_request, response) => {
  response.render("register", { title: "Welcome" });
});

export default router;
