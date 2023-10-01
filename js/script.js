const profileInfo = document.querySelector(".overview");
const username = "asazzam";
const repoList = document.querySelector(".repo-list");
const repoSection = document.querySelector(".repos");
const repoDataSection = document.querySelector(".repo-data");
const backButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

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
  displayRepoInfo(repoData);
};

//Display info about repos
filterInput.classList.remove("hide");
const displayRepoInfo = function (repos) {
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
  }
};

getRepos();

repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    getRepoInfo(repoName);
  }
});

//Get repo info
const getRepoInfo = async function (repoName) {
  const fetchRepoInfo = await fetch(
    `https://api.github.com/repos/${username}/${repoName}`
  );
  const repoInfo = await fetchRepoInfo.json();
  console.log(repoInfo);

  //Get languages
  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();
  console.log(languageData);

  //Languages loop
  const languages = [];
  for (const language in languageData) {
    languages.push(language);
  }
  console.log(languages);
  repoDisplay(repoInfo, languages);
};

//Specific repo info display
const repoDisplay = function (repoInfo, languages) {
  repoDataSection.innerHTML = "";
  const div = document.createElement("div");
  div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${
      repoInfo.html_url
    }" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
  repoDataSection.append(div);
  repoDataSection.classList.remove("hide");
  repoSection.classList.add("hide");
  backButton.classList.remove("hide");
};

//Back button
backButton.addEventListener("click", function () {
  repoSection.classList.remove("hide");
  repoDataSection.classList.add("hide");
  backButton.classList.add("hide");
});

//Input event
filterInput.addEventListener("input", function (e) {
  const searchTextValue = e.target.value;
  /*console.log(searchTextValue);*/
  const repos = document.querySelectorAll(".repo");
  const searchLowerCase = searchTextValue.toLowerCase();

  for (const repo of repos) {
    const lowerCaseRepo = repo.innerText.toLowerCase();

    if (lowerCaseRepo.includes(searchLowerCase)) {
      repo.classList.remove("hide");
    } else {
      repo.classList.add("hide");
    }
  }
});
