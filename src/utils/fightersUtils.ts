import axios from "axios";
import * as fightersRepository from "../repositories/fightersRepository.js";

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

function countStars(repos: any) {
  let stars = 0;
  repos.forEach((repo: any) => {
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
  let result = {
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
