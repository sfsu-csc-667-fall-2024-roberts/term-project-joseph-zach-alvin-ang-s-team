export const CREATE_LOBBY = `
INSERT INTO Lobby (game_id, lobby_password, player_count)
VALUES ($1,$2,1)
RETURNING *`;

export const FIND_LOBBY_BY_PASSWORD = `
SELECT lobby_id, game_id 
FROM Lobby
WHERE lobby_password = $1`;

export const CREATE_GAME = `
INSERT INTO game (tile_bag_id, grid_id, status, total_turns, current_turn)
VALUES ($1, $2, 1, 0, 0)
RETURNING *,
`;

export const CREATE_GRID = `
INSERT INTO grid (cameraview_id)
($1)
RETURNING *
`;

export const CREATE_CAMERAVIEW = `
INSERT INTO cameraview (topx, topy, bottomx, bottomy)
VALUES(50,58,58,50)
RETURNING *`;

export const CREATE_TILE_BAG = `
INSERT INTO tile_bag (tile_amount)
VALUES (108)
RETURNING *
`;

export const ADD_PLAYER = `
INSERT INTO player (lobby_id, turn_number, points, account_id)
VALUES ($1, 0, 0, $2)
RETURNING *`;
