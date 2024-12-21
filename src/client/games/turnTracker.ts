import { Game } from "../../../team-qwirkle/server/db/dbmanifest";

const turncounter = document.getElementById("turn-number")!;
const turnplayer = document.getElementById("current-turn")!;

const gameId = window.location.pathname.split("/").pop()!;

window.socket.on(`game:${gameId}:updated`, (game) => {
  const gameIdParsed = Number.parseInt(gameId);
  const currentTurn = Game.getTurn(gameIdParsed);
  const totalTurns = Game.getTotalTurns(gameIdParsed);

  //idk how to fix that Promise<string> cant be type string error thing
  //turncounter.textContent = totalTurns;
  //turnplayer.textContent = currentTurn;
});
