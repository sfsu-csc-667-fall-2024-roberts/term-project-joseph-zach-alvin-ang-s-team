export const REGISTER_SQL = `
INSERT INTO account (account_id, player_id, username, password, created)
VALUES ($1, $2, $3, $4, $5)
RETURNING account_id, player_id, username, password, created
`;

export const FIND_BY_USERNAME_SQL = `
SELECT * FROM account WHERE username = $1
`;

export const CREATE_GAME = `
INSERT INTO games DEFAULT VALUES RETURNING *, 1 as players
`;

export const ADD_PLAYER = `
INSERT INTO game_users (game_id, user_id, seat)
VALUES ($1, $2, (SELECT COUNT(*) FROM game_users WHERE game_id = $1) + 1)
RETURNING 
  game_id AS id, 
  (SELECT COUNT(*) FROM game_users WHERE game_id = $1) AS players,
  (SELECT player_count FROM games WHERE id = $1) AS player_count
`;

export const AVAILABLE_GAMES = `
SELECT *, 
  (SELECT COUNT(*) FROM game_users WHERE games.id=game_users.game_id) AS players 
FROM games WHERE id IN 
  (SELECT game_id FROM game_users GROUP BY game_id HAVING COUNT(*) < 4)
LIMIT $1
OFFSET $2
`;

export const GET_PLAYER_COUNT = `
  SELECT COUNT(*) FROM game_users WHERE game_id = $1
`;

export const INSERT_INITIAL_TILES = `
INSERT INTO game_cards (game_id, card_id, user_id, position, pile)
SELECT $1, id, 0, uuid_generate_v4(), -1 FROM cards
`;

export const DEAL_TILES = `
UPDATE game_cards 
SET user_id = $1, pile = $2 WHERE game_id = $3 AND user_id = 0 AND position IN (
  SELECT position FROM game_cards WHERE game_id = $3 AND user_id = 0 ORDER BY position LIMIT $4
) RETURNING card_id`;

export const AVAILABLE_TILES_FOR_GAME = `
SELECT COUNT(*) FROM game_cards WHERE game_id = $1 AND user_id = 0
`;

export const UPDATE_DRAW_TURN = `
UPDATE game_users 
SET last_draw_turn = (SELECT turn FROM games WHERE id = $1) 
WHERE game_id = $1 AND user_id = $2`;

export const IS_CURRENT = `
  SELECT games.current_seat = game_users.seat AS is_current_player
    FROM games, game_users
    WHERE games.id = $1
    AND game_users.user_id = $2
    AND game_users.game_id = games.id`;

// Cards in hand
export const GET_PLAYER_HAND = `
SELECT * FROM game_cards, cards 
WHERE game_cards.user_id=$1 
  AND game_cards.game_id=$2 
  AND game_cards.card_id=cards.id 
  AND pile=$3
ORDER BY position DESC
`;

export const GET_LAST_DRAW_TURN = `
SELECT last_draw_turn 
FROM game_users 
WHERE game_id=$1 
  AND user_id=$2`;

export const UPDATE_PLAYER_DRAW_TURN = `
UPDATE game_users 
SET last_draw_turn = (SELECT turn FROM games WHERE id=$1) 
WHERE game_id=$1 
  AND user_id=$2`;
