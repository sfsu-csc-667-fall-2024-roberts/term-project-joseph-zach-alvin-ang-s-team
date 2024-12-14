import bcrypt from "bcrypt";
import db from "../connection";
import { FIND_BY_USERNAME_SQL, REGISTER_SQL } from "./sql";
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
