//Profile information div
const profileInfo = document.querySelector(".overview");
const username = "asazzam";
const reposList = document.querySelector(".repo-list");

//Fetch API JSON Data
const getData = async function () {
  const res = await fetch(`https://api.github.com/users/${username}`);
  const data = await res.json();
  console.log(data);
  userData(data);
};

getData();

//Fetch and display user information
const userData = function (data) {
  const div = document.createElement("div");
  div.classList.add("user-info");
  div.innerHTML = `   <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;
  profileInfo.append(div);
};

//Fetch repos
const getRepos = async function () {
  const fetchRepos = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
  );
  const repoData = await fetchRepos.json();
  console.log(repoData);
  repoInfo(repoData);
};

//Display info about repos
const repoInfo = function (repos) {
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    reposList.append(repoItem);
  }
};

getRepos();
