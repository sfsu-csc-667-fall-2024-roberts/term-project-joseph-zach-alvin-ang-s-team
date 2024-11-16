import connectLiveReload from "connect-livereload";
import type { Express } from "express";
import livereload from "livereload";
const configureLiveReload = (app: Express, staticPath: string) => {
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
};
export default configureLiveReload;
