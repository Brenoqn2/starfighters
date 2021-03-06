import db from "../database.js";

interface User {
  id: number;
  username: string;
  wins: number;
  losses: number;
  draws: number;
}

type UserWithoutId = Omit<User, "id">;

function getUser(username: String) {
  return db.query<User>(
    `
        SELECT * FROM fighters
        WHERE username = $1
    `,
    [username]
  );
}

function createUser(username: String) {
  return db.query(
    `
    INSERT INTO fighters (username,wins,losses,draws)
    VALUES ($1,0,0,0)
    `,
    [username]
  );
}

function updateUser(username: String, field: String, value: Number) {
  return db.query(
    `
    UPDATE fighters
    SET ${field} = ${field} + ${value}
    WHERE username = $1
    `,
    [username]
  );
}

function getRanking() {
  return db.query<UserWithoutId>(
    `
        SELECT username,wins,losses,draws FROM fighters
        ORDER BY wins DESC, draws DESC, losses ASC
        `
  );
}

export { getUser, createUser, updateUser, getRanking };
