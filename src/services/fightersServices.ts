import axios from "axios";

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

async function battle(firstUser: String, secondUser: String) {
  const firstUserRepos = await getUserRepositories(firstUser);
  const secondUserRepos = await getUserRepositories(secondUser);

  if (firstUserRepos === undefined || secondUserRepos === undefined) {
    throw {
      type: "error_notGitHubUser",
      message: `invalid github user`,
    };
  }

  const firstUserStars = countStars(firstUserRepos);
  const secondUserStars = countStars(secondUserRepos);

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

export { battle };
