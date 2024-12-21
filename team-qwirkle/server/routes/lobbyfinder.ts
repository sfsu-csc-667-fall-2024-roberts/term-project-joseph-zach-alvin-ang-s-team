import express from "express";
import { Lobby, LobbyFinder } from "../db/dbmanifest";
import { SessionData } from "express-session";
import { Session } from "inspector/promises";

const router = express.Router();

router.get("/create", async (_request, response) => {
  response.render("/create/games", { title: "Create a Lobby" });
});

router.post("/create", async (request, response) => {
  const { lobby_id, lobby_password } = request.body;
  try {
    // if(request.session.user2)
    // {
    //   console.log("user ID: "  + request.session.user2.account_id);
    // }
    // let host_player;
    // if(request.session.user2)
    // {
    //    host_player = await LobbyFinder.addPlayer(lobby_id, request.session.user2.account_id);
    // }
    // else
    // {
    //   host_player = {id: 5};
    // }
    const cameraview = await LobbyFinder.createCameraView();
    const grid = await LobbyFinder.createGrid(cameraview.cameraid);
    const newTileBag = await LobbyFinder.createTileBag();
    const game = await LobbyFinder.createGame(
      newTileBag.tile_bag_id,
      grid.grid_id,
    );
    const lobby = await LobbyFinder.createLobby(game.game_id, lobby_password);

    request.session.lobby = {
      lobby_id: lobby.lobby_id,
      game_id: lobby.game_id,
      lobby_password: lobby.lobby_password,
      player_count: lobby.player_count,
    };

    response.redirect(`/lobby/${lobby.lobby_id}`);
  } catch (error) {
    console.error(error);

    console.log("Lobby creation failed.");
    response.redirect("/lobbyfinder");
  }
});

router.get("/", async (request, response) => {
  const { lobby_id } = request.body;

  try {
    const lobby = await LobbyFinder.findLobbyByPassword(lobby_id);

    response.render("lobby/details", {
      title: "Lobby Details",
      lobby,
    });
  } catch (error) {
    console.error(error);

    console.log("Failed to find lobby.");
    response.redirect("/lobbyfinder");
  }
});

export default router;
