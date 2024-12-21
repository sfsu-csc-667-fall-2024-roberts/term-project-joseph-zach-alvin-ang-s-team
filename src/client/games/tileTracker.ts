import { stringify } from "querystring";
import { Game } from "../../../team-qwirkle/server/db/dbmanifest";
const tilebagtracker = document.getElementById("tile-bag-info")!;

const gameId = window.location.pathname.split("/").pop()!;

window.socket.on(`game:${gameId}:updated`, (game) => {
  const gameIdParsed = Number.parseInt(gameId);
  const tileAmount = Game.getTileBagInfo(gameIdParsed);

  //idk how to fix that Promise<string> cant be type string error thing
  //tilebagtracker.textContent = tileAmount;
});
