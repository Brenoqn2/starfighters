import {
  getUserRepositories,
  countStars,
  checkWinner,
  isFirstTime,
} from "../utils/fightersUtils.js";
import * as fightersRepository from "../repositories/fightersRepository.js";

async function battle(firstUser: String, secondUser: String) {
  const firstUserRepos: Array<Object> | undefined = await getUserRepositories(
    firstUser
  );
  const secondUserRepos: Array<Object> | undefined = await getUserRepositories(
    secondUser
  );

  if (firstUserRepos === undefined || secondUserRepos === undefined) {
    throw {
      type: "error_notGitHubUser",
      message: `invalid github user`,
    };
  }

  const firstUserStars = countStars(firstUserRepos);
  const secondUserStars = countStars(secondUserRepos);

  if (await isFirstTime(firstUser)) {
    await fightersRepository.createUser(firstUser);
  }
  if (await isFirstTime(secondUser)) {
    await fightersRepository.createUser(secondUser);
  }

  const result = await checkWinner(
    firstUser,
    secondUser,
    firstUserStars,
    secondUserStars
  );

  if (result.draw === false) {
    await fightersRepository.updateUser(result.winner, "wins", 1);
    await fightersRepository.updateUser(result.loser, "losses", 1);
  } else {
    await fightersRepository.updateUser(firstUser, "draws", 1);
    await fightersRepository.updateUser(secondUser, "draws", 1);
  }

  return result;
}

async function getRanking() {
  const { rows } = await fightersRepository.getRanking();
  const ranking = {
    fighters: rows,
  };
  return ranking;
}

export { battle, getRanking };
