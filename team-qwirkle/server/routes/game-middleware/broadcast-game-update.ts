import { NextFunction, Request, Response } from "express";
import { Game } from "../../db/dbmanifest";

export const broadcastGameUpdate = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  /*
  const gameId = parseInt(request.params.gameId, 10);

  const playerData = await Game.getPlayers(gameId);

  const socket = request.app.get("io");

  for (let index = 0; index < playerData.length; index++) {
    const player = playerData[index];

    socket.to(`user-${player.id}`).emit(`game:${gameId}:updated`, {
      players: playerData.filter((p) => p.id !== player.id),
      player: {
        ...playerData.find((p) => p.id === player.id),
        hand: await Game.getPlayerHand(gameId, player.id),
      },
    });
  }
    */

  next();
};
