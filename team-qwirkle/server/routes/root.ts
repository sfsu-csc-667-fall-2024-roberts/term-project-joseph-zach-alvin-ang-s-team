import express from "express";
const router = express.Router();
router.get("/", (_request, response) => {
  response.render("root", { name: "hi" });
});
router.get("/lobby", (_request, response) => {
  console.log(_request.query.code);
  response.render("lobby", { code: _request.query.code });
});
router.get("/login", (_request, response) => {
  response.render("auth/login");
});
router.get("/register", (_request, response) => {
  response.render("auth/register");
});
router.get("/game", (_request, response) => {
  response.render("game");
});
router.get("/lobbyfinder", (_request, response) => {
  response.render("lobbyfinder");
});
export default router;
