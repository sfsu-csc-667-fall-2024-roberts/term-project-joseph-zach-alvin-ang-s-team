import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import httpErrors from "http-errors";
import morgan from "morgan";
import * as path from "path";
import * as configuration from "./config";
import * as routes from "./routes";
import * as middleware from "./middleware";

dotenv.config();

const app = express();
//const flash = require("express-flash");
//const session = require("express-session");
const PORT = process.env.PORT || 3000;

const staticPath = path.join(process.cwd(), "src", "public");
app.use(express.static(staticPath));

configuration.configureLiveReload(app, staticPath);
configuration.configureSession(app);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(process.cwd(), "src", "public")));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
//app.use(flash());
//app.use(session());

app.set("views", path.join(process.cwd(), "team-qwirkle", "server", "views"));
app.set("view engine", "ejs");

app.use("/", routes.root);
app.use("/auth", routes.auth);
app.use("/game", middleware.authentication, routes.game);
app.use("/lobby", middleware.authentication, routes.lobby);
app.use("/lobbyfinder", middleware.authentication, routes.lobbyfinder);
// app.use("/chat", middleware.authentication, routes.chat);

app.use((_request, _response, next) => {
  next(httpErrors(404));
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
