import express from "express";

const router = express.Router();

router.get("/", async (_request, response) => {
  response.render("lobbyfinder", { title: "Welcome" });
});

export default router;
