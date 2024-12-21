import "express-session";

declare module "express-session" {
  interface SessionData {
    lobby: {
      lobby_id: number;
      game_id: number;
      lobby_password: string;
      player_count: number;
    };

    gameplay: {
      game_id: number;
      tile_bag_id: number;
      grid_id: number;
      status: number;
      total_turns: number;
      current_turn: number;
    };

    grid: {
      grid_id: number;
      cameraview_id: number;
    };

    tileBag: {
      tile_bag_id: number;
      tile_amount: number;
    };

    players: {
      id: number;
      players: number;
      player_count: number;
    };
  }
}
