export const REGISTER_SQL = `
INSERT INTO account (account_id, player_id, username, password, created)
VALUES ($1, $2, $3, $4, $5)
RETURNING account_id, player_id, username, password, created
`;

export const FIND_BY_USERNAME_SQL = `
SELECT * FROM account WHERE username = $1
`;
