import express from "express";
import { Game } from "../db/dbmanifest";

const router = express.Router();

router.post("/create", async (request, response) => {
  // TODO in client code, disconnect socket prior to submitting creation form
  // @ts-expect-error TODO: Define the session type for the user object
  const { id: user_id } = request.session.user;
  /* REPLACE WITH LINED UP CODE

  const game = await Game.createNewGame(user_id!);

  request.app.get("io").emit("game-created", game);

  response.redirect(`/games/${game.id}`); */
});

router.post("/join/:gameId", async (request, response, next) => {
  /*
    const gameId = parseInt(request.params.gameId, 10);
    // @ ts-expect-error TODO: Define the session type for the user object
    const { id: userId } = request.session.user;

    const playerCount = await Game.getPlayerCount(gameId);

    if (playerCount === 2) {
      response.redirect("/lobby");
      return;
    }

    await Game.join(gameId, userId);

    next();
  },
  // broadcastGameUpdate,
  (request, response) => {
    const gameId = parseInt(request.params.gameId, 10);

    response.redirect(`/games/${gameId}`); */
});

router.get("/:gameId", async (request, response) => {
  const { gameId } = request.params;
  // @ts-expect-error TODO: Define the session type for the user object
  const { id: userId } = request.session.user;

  const game = await Game.get(parseInt(gameId, 10), userId);

  response.render("games/game", {
    title: `Game ${gameId}`,
    gameId,
    game,
    userId,
  });
});

/*
router.post(
  "/:gameId/draw",
  isPlayersTurn,
  canPlayerDraw,
  async (request, _response, next) => {
    const gameId = parseInt(request.params.gameId, 10);
    // @ ts-expect-error TODO: Define the session type for the user object
    const { id: userId } = request.session.user;

    await Games.drawCard(gameId, userId);
    await Games.updatePlayerDrawTurn(gameId, userId);

    next();
  },
  broadcastGameUpdate,
  (_request, response) => {
    response.sendStatus(200);
  },
);

router.get("/:gameId/update", broadcastGameUpdate, (_request, response) => {
  response.sendStatus(200);
});
*/
export default router;
