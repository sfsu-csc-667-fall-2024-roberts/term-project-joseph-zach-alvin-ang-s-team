import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import httpErrors from "http-errors";
import morgan from "morgan";
import * as path from "path";
import rootRoutes from "./routes/root";

import connectLiveReload from "connect-livereload";
import livereload from "livereload";

require("dotenv").config();

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(process.cwd(), "src", "public")));
app.use(cookieParser());
app.set("views", path.join(process.cwd(), "team-qwirkle", "server", "views"));
app.set("view engine", "ejs");
app.use("/", rootRoutes);
app.use((_request, _response, next) => {
  next(httpErrors(404));
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const staticPath = path.join(process.cwd(), "src", "public");
app.use(express.static(staticPath));
console.log("working\n");

if (process.env.MODES === "development") {
  const reloadServer = livereload.createServer();
  reloadServer.watch(staticPath);
  reloadServer.server.once("connection", () => {
    setTimeout(() => {
      reloadServer.refresh("/");
    }, 100);
  });
  app.use(connectLiveReload());
} else {
  console.log("not in dev environment! pages will not auto update\n");
}
