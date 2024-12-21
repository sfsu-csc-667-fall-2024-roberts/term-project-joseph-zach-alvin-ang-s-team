export const FIND_BY_USERNAME_SQL = `
SELECT * FROM account WHERE username = $1
`;

export const CREATE_GAME = `
INSERT INTO game
DEFAULT VALUES
RETURNING $1
`;

// check if it works
export const ADD_PLAYER = `
INSERT INTO player (lobby_id, account_id)
VALUES ($1, $5)
RETURNING 
  lobby_id AS id, 
  (SELECT $4 FROM lobby WHERE id = $1) AS player_count,
  UPDATE player_count 
  SET player_count = player_count + 1
`;

export const AVAILABLE_GAMES = `
SELECT *, 
  (SELECT COUNT(*) FROM player WHERE player.lobby_id=lobby.lobby_id) AS players 
FROM lobby WHERE id IN 
  (SELECT lobby_id FROM player GROUP BY lobby_id HAVING COUNT(*) < 6)
LIMIT $1
OFFSET $2
`;

export const GET_PLAYER_COUNT = `
  SELECT COUNT(*) FROM player WHERE lobby_id = $1
`;

//idk if the top var carries over into third line just gonna hope
//just throwing stuff at the wall
export const INSERT_INITIAL_TILES = `
INSERT INTO hand (player_id)
VALUES ($2)
RETURNING
  player_id as pid
  SELECT hand_id FROM hand WHERE hand.player_id = pid AS player_hand
  INSERT INTO tile (player_hand.hand_id)
  VALUES ($4)
`; //puts a singular tile into players hand?
//also tiles are global and arent specific to any of the games they are played in
//so theres only 1 copy of each tile across all games running

export const DEAL_TILES = `
UPDATE game_cards 
SET user_id = $1, pile = $2 WHERE game_id = $3 AND user_id = 0 AND position IN (
  SELECT position FROM game_cards WHERE game_id = $3 AND user_id = 0 ORDER BY position LIMIT $4
) RETURNING card_id
 `;

export const AVAILABLE_TILES_FOR_GAME = `
RETURNING 
  SELECT tile_amount FROM tile_bag WHERE tile_bag.tile_bag_id = game.()
`;

export const UPDATE_TURN = `
UPDATE game_users 
SET last_draw_turn = (SELECT turn FROM games WHERE id = $1) 
WHERE game_id = $1 AND user_id = $2
`;

// wip updating
export const IS_CURRENT = `
  SELECT games.current_turn = game_users.seat AS is_current_player
    FROM games, game_users
    WHERE games.id = $1
    AND game_users.user_id = $2
    AND game_users.game_id = games.id
    `;

// Cards in hand
export const GET_PLAYER_HAND = `
SELECT * FROM game_cards, cards 
WHERE game_cards.user_id=$1 
  AND game_cards.game_id=$2 
  AND game_cards.card_id=cards.id 
  AND pile=$3
ORDER BY position DESC
`;

export const GET_LAST_TURN = `
SELECT last_draw_turn 
FROM game_users 
WHERE game_id=$1 
  AND user_id=$2
`;

export const UPDATE_PLAYER_TURN = `
UPDATE game_users 
SET last_draw_turn = (SELECT turn FROM games WHERE id=$1) 
WHERE game_id=$1 
  AND user_id=$2
`;
