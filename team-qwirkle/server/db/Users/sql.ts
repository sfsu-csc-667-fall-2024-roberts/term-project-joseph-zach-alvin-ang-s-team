export const REGISTER_SQL = `
INSERT INTO account (username, password, created)
VALUES ($1, $2, $3)
RETURNING username, password, created, account_id
`;

export const FIND_BY_USERNAME_SQL = `
SELECT username,password,created,account_id FROM account WHERE username = $1
`;
