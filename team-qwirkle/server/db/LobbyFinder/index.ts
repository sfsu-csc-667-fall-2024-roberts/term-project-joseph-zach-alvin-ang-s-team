import db from "../connection";
import {
  CREATE_LOBBY,
  FIND_LOBBY_BY_PASSWORD,
  CREATE_GAME,
  CREATE_GRID,
  CREATE_TILE_BAG,
  ADD_PLAYER,
  CREATE_CAMERAVIEW,
} from "./sql";

type Lobby = {
  lobby_id: number;
  game_id: number;
  lobby_password: string;
  player_count: number;
};

type Game = {
  game_id: number;
  tile_bag_id: number;
  grid_id: number;
  status: number;
  total_turns: number;
  current_turn: number;
};

type Grid = {
  grid_id: number;
  cameraview_id: number;
};

type CameraView = {
  playerid: number;
  cameraid: number;
  tx: number;
  ty: number;
  bx: number;
  by: number;
};

type TileBag = {
  tile_bag_id: number;
  tile_amount: number;
};

type Player = {
  id: number;
  players: number;
  player_count: number;
};

const createLobby = async (
  game_id: number,
  lobby_password: string,
): Promise<Lobby> => {
  return await db.one(CREATE_LOBBY, [game_id, lobby_password]);
};

const findLobbyByPassword = async (
  lobby_password: string,
): Promise<Pick<Lobby, "lobby_id" | "game_id">> => {
  return await db.one(FIND_LOBBY_BY_PASSWORD, [lobby_password]);
};

const createGame = async (
  tile_bag_id: number,
  grid_id: number,
): Promise<Game> => {
  return await db.one(CREATE_GAME, [tile_bag_id, grid_id]);
};

const createGrid = async (cameraview_id: number): Promise<Grid> => {
  return await db.one(CREATE_GRID, [cameraview_id]);
};

const createCameraView = async (): Promise<CameraView> => {
  return await db.one(CREATE_CAMERAVIEW);
};

const createTileBag = async (): Promise<TileBag> => {
  return await db.one(CREATE_TILE_BAG);
};

const addPlayer = async (game_id: number, user_id: number): Promise<Player> => {
  return await db.one(ADD_PLAYER, [game_id, user_id]);
};

export default {
  createLobby,
  findLobbyByPassword,
  createGame,
  createGrid,
  createCameraView,
  createTileBag,
  addPlayer,
};
