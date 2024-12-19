import express from "express";

const router = express.Router();

router.post("/", async (_request, response) => {
  response.render("lobbyfinder", { title: "Welcome" });
});

router.get("/", async (_request, response) => {
  response.render("lobbyfinder", { title: "Welcome" });
});

export default router;
