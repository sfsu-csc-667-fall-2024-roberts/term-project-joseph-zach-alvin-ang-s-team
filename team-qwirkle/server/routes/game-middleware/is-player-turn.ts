import { NextFunction, Request, Response } from "express";
import { Game } from "../../db/dbmanifest";

export const canPlayerDraw = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const gameId = parseInt(request.params.gameId, 10);
  // @ts-expect-error TODO: Define the session type for the user object
  const { id: userId } = request.session.user;

  // modify these functions
  const { turn: currentGameTurn } = await Game.getTurn(gameId);
  const { last_draw_turn: lastDrawTurn } = await Game.getLastDrawTurn(
    gameId,
    userId,
  );
  const socket = request.app.get("io");

  if (currentGameTurn === lastDrawTurn) {
    response.status(401);

    socket.to(`user-${userId}`).emit(`message:${gameId}`, {
      message: "It is not currently your turn",
      sender: "system",
      timestamp: new Date(),
    });

    return;
  } else {
    next();
  }
};
