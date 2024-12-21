import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import * as path from "path";
import * as configuration from "./config";
import * as routes from "./routes";
import * as middleware from "./middleware";
import { Server } from "socket.io";
import { createServer } from "node:http";
import favicon from "serve-favicon";

dotenv.config();

const app = express();
const server = createServer();
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  console.log("a user connected");
});
//const flash = require("express-flash");
//const session = require("express-session");

const PORT = process.env.PORT || 3000;
const PORTB = 5001;

const staticPath = path.join(process.cwd(), "src", "public");
app.use(express.static(staticPath));

configuration.configureLiveReload(app, staticPath);
configuration.configureSession(app);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(process.cwd(), "src", "public")));
app.use(express.static(path.join(__dirname, "client")));
app.use(cookieParser());
app.use(favicon(path.join(process.cwd(), "favicon.ico")));
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

app.get("/favicon.ico", (req, res) => {
  res.sendFile(path.join(process.cwd(), "favicon.ico"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.listen(PORTB, () => {
  console.log(`Socket server running on port ${PORTB}`);
});
