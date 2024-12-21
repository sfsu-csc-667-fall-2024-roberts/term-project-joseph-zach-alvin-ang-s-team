import bcrypt from "bcrypt";
import db from "../connection";
import {
  FIND_BY_USERNAME_SQL,
  CREATE_GAME,
  ADD_PLAYER,
  AVAILABLE_GAMES,
  GET_PLAYER_COUNT,
  INSERT_INITIAL_TILES,
  DEAL_TILES,
  AVAILABLE_TILES_FOR_GAME,
  UPDATE_TURN,
  IS_CURRENT,
  GET_PLAYER_HAND,
  GET_LAST_TURN,
  UPDATE_PLAYER_TURN,
} from "./sql";
import { StringLiteral } from "typescript";

enum Shape {
  Lion,
  Deer,
  Camel,
  Triangle,
  Circle,
  Square,
}

type Tile = {
  tile_id: number;
  color: number;
  shape: Shape;
  hand_id: number;
};

type hand_id = {
  hand_id: number;
  player_id: number;
};

type grid_cell = {
  grid_cell_id: number;
  grid_tile_id: number;
  x: number;
  y: number;
};

type player = {
  lobby_id: number;
  player_id: number;
  turn_number: number;
  points: number;
  Account: number;
};

type cameraview = {
  player_id: number;
  cameraview_id: number;
  topx: number;
  topy: number;
  bottomx: number;
  bottomy: number;
};

type game = {
  game_id: number;
  player_id: number;
  tile_bag_id: number;
  grid_id: number;
  status: number;
};

type lobby = {
  lobby_id: number;
  game_id: number;
  lobby_password: number;
  player_count: number;
};

const createNewGame = async (account_id: number): Promise<lobby> => {
  const { lobby_id } = await db.one(CREATE_GAME); //gets lobby id to send to join
  return await join(lobby_id, account_id); //send in both for the dude whos hosting
};

//lobby_id is automatic for host
//for ppl joining get it somehow from something set in lobby
const join = async (lobby_id: number, account_id: number) => {
  const gameDescription = await db.one<lobby>(ADD_PLAYER, [
    lobby_id,
    account_id,
  ]);

  // Pile 0 is the player's hand
  // await db.any(DEAL_TILES, [playerId, 0, gameId, 7]);
  // Pile -1 is the player's play pile
  // await db.any(DEAL_TILES, [playerId, -1, gameId, 20]);

  return gameDescription;
};

const availableGames = async (
  limit: number = 20,
  offset: number = 0,
): Promise<
  {
    id: number;
    players: number;
    currentPlayerIsMember?: boolean;
  }[]
> => {
  return db.any(AVAILABLE_GAMES, [limit, offset]);
};

//update game status
//0 is not started
//1 is started
const startGame = async (gameId: number) => {
  return db.none("UPDATE game SET status = 1 WHERE id = $1", gameId);
};

const getPlayerCount = async (lobby_id: number): Promise<number> => {
  return db.one(GET_PLAYER_COUNT, [lobby_id]);
};

const drawTile = async (gameId: number, userId: number) => {
  const availableTiles = parseInt(
    (await db.one<{ count: string }>(AVAILABLE_TILES_FOR_GAME, gameId)).count,
  );

  const tile = db.one<{ tile_id: string }>(DEAL_TILES, [userId, 0, gameId, 1]);

  await db.none(UPDATE_TURN, [gameId, userId]);

  return tile;
};

// updated
const incrementTurn = async (gameId: number) => {
  return db.none(
    "UPDATE game SET total_turns = total_turns + 1 WHERE id = $1",
    gameId,
  );
};

// updated
const getTurn = async (gameId: number) => {
  return db.one("SELECT current_turn FROM game WHERE id = $1", gameId);
};

// user_id: -1 for top of discard pile, -2 for bottom of discard pile
// N: -3, E: -4, S: -5, W: -6
const playCard = async () =>
  // playerId: number,
  // gameId: number,
  // cardId: string,
  // pile: number
  {};

const playerGames = async (
  playerId: number,
): Promise<Record<number, boolean>> => {
  return (
    await db.any("SELECT game_id FROM game_users WHERE user_id=$1", playerId)
  ).reduce((memo, game) => ({ ...memo, [game.game_id]: true }), {});
};

const get = async (gameId: number, playerId: number) => {
  const currentSeat = await db.one(
    "SELECT current_seat FROM games WHERE id=$1",
    gameId,
  );
  //const players = await getPlayers(gameId);
  const playerHand = await db.any(GET_PLAYER_HAND, [playerId, gameId, 0, 8]);

  return {
    currentSeat,
    //players,
    playerHand,
  };
};

const isCurrentPlayer = async (
  gameId: number,
  userId: number,
): Promise<{ is_current_player: boolean }> => {
  return await db.one(IS_CURRENT, [gameId, userId]);
};

const getPlayerHand = async (gameId: number, playerId: number) => {
  return await db.any(GET_PLAYER_HAND, [playerId, gameId, 0]);
};

const getLastTurn = async (
  gameId: number,
  userId: number,
): Promise<{ last_turn: number }> => {
  return await db.one(GET_LAST_TURN, [gameId, userId]);
};

const updatePlayerTurn = async (gameId: number, userId: number) => {
  return db.none(UPDATE_PLAYER_TURN, [gameId, userId]);
};

export default {
  createNewGame,
  join,
  availableGames,
  startGame,
  getPlayerCount,
  drawTile,
  incrementTurn,
  getTurn,
  playCard,
  playerGames,
  get,
  isCurrentPlayer,
  getPlayerHand,
  getLastTurn,
  updatePlayerTurn,
};
