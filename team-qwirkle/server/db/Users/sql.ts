export const REGISTER_SQL = `
INSERT INTO account (username, password, created)
VALUES ($1, $2, $3)
RETURNING username, password, created
`;

export const FIND_BY_USERNAME_SQL = `
SELECT username,password,created FROM account WHERE username = $1
`;
