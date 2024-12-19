import "express-session";

declare module "express-session" {
  enum Shape {
    Lion,
    Deer,
    Camel,
    Triangle,
    Circle,
    Square,
  }

  interface SessionData {
    Tile: {
      tile_id: number;
      color: number;
      shape: Shape;
      hand_id: number;
    };

    hand_id: {
      hand_id: number;
      player_id: number;
    };

    grid_cell: {
      grid_cell_id: number;
      grid_tile_id: number;
      x: number;
      y: number;
    };

    player: {
      lobby_id: number;
      player_id: number;
      turn_number: number;
      points: number;
      Account: number;
    };

    cameraview: {
      player_id: number;
      cameraview_id: number;
      topx: number;
      topy: number;
      bottomx: number;
      bottomy: number;
    };

    game: {
      game_id: number;
      player_id: number;
      tile_bag_id: number;
      grid_id: number;
      status: number;
    };
  }
}

export {};
