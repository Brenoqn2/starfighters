import axios from "axios";
import * as fightersRepository from "../repositories/fightersRepository.js";

interface BattleResult {
  winner: String | null;
  loser: String | null;
  draw: boolean;
}

async function getUserRepositories(user: String) {
  try {
    const { data } = await axios.get(
      `https://api.github.com/users/${user}/repos`
    );
    return data;
  } catch (err) {
    return undefined;
  }
}

function countStars(repos: Array<Object>) {
  let stars = 0;
  repos.forEach((repo: { stargazers_count: number }) => {
    stars += repo.stargazers_count;
  });
  return stars;
}

async function isFirstTime(user: String) {
  const userExists = await fightersRepository.getUser(user);
  return userExists.rows.length === 0;
}

async function checkWinner(
  firstUser: String,
  secondUser: String,
  firstUserStars: Number,
  secondUserStars: Number
) {
  let result: BattleResult = {
    winner: null,
    loser: null,
    draw: true,
  };

  if (firstUserStars > secondUserStars) {
    result.winner = firstUser;
    result.loser = secondUser;
    result.draw = false;
  } else if (firstUserStars < secondUserStars) {
    result.winner = secondUser;
    result.loser = firstUser;
    result.draw = false;
  }

  return result;
}

export { getUserRepositories, countStars, isFirstTime, checkWinner };
