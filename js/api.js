// url api dan api key
const base_url = "https://api.football-data.org/v2/competitions/2003/standings";
const url_team = "https://api.football-data.org/v2/competitions/2003/teams";
const api_key = "887cb1e6009f452e8bb3df38be18d5f0";

//get data
function loadContent() {
  fetch(base_url, {
    method: "GET",
    mode: "cors",
    headers: {
      "X-Auth-Token": api_key,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let standings = data.standings[0].table;
      console.log(standings);

      let placeStanding = standings.map((standings) => {
        return `
        <tr>
            <td class="team-name">
            <span>${standings.position}. </span>
            <figure class="team-logo">
                <img src="${standings.team.crestUrl}" alt="${standings.team.name}">
            </figure>
            <h6 class="grey-text text-darken-4">${standings.team.name}</h6>
            </td>
            <td>${standings.playedGames}</td>
            <td>${standings.won}</td>
            <td>${standings.draw}</td>
            <td>${standings.lost}</td>
            <td>${standings.goalsFor}</td>
            <td>${standings.goalsAgainst}</td>
            <td>${standings.goalDifference}</td>
            <td>${standings.points}</td>
        </tr>
                `;
      });
      document.getElementById("standings").innerHTML = placeStanding.join("");
    })
    .catch((error) => {
      console.error(error);
    });
}

function loadTeam() {
  fetch(url_team, {
    method: "GET",
    mode: "cors",
    headers: {
      "X-Auth-Token": api_key,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let teams = data.teams;

      let placeTeam = teams.map((team) => {
        return `<div class="col s12 m6 l4">
                        <div class="card">
                            <div class="card-image">
                                <img src="${team.crestUrl}" alt="${team.name}" >
                            </div>
                            <div class="card-content">
                                <h6>${team.name}</h6>
                            </div>
                            <button class="waves-effect waves-light deep-purple accent-4 btn add" id="${team.id}"><i class="material-icons left">favorite</i>Favorite</button>
                        </div>
                </div>`;
      });
      document.getElementById("team").innerHTML = placeTeam.join("");

      let saveBtn = document.querySelectorAll(".add");
      saveBtn.forEach((button) => {
        button.onclick = () => {
          console.log("favorite ditambahkan.");
          const id = parseInt(button.id);
          teams.forEach((team) => {
            if (team.id === id) {
              saveTeams(team);
            }
          });
        };
      });
      console.log(placeTeam);
    })
    .catch((error) => {
      console.log(error);
    });
}

function getFavoriteTeam() {
  getAll().then((clubs) => {
    console.log(clubs);

    let favHtml = "";
    clubs.forEach((club) => {
      favHtml += `<div class="col s12 m6 l4">
                        <div class="card">
                            <div class="card-image">
                                <img src="${club.crestUrl}" alt="${club.name}">
                            </div>
                            <div class="card-content">
                                <h6>${club.name}</h6>
                            </div>
                            <btn  class="waves-effect waves-light deep-purple accent-4 btn delete" id="${club.id}"><i class="material-icons left">delete</i>Delete</btn>
                        </div>
                </div>`;
    });
    document.getElementById("favorite").innerHTML = favHtml;

    let deleteBtn = document.querySelectorAll(".delete");
    deleteBtn.forEach((button) => {
      button.onclick = () => {
        console.log("favorite dihapus.");
        const id = parseInt(button.id);
        clubs.forEach((club) => {
          if (club.id === id) {
            deleteTeams(club);
            button.parentElement.parentElement.style.display = "none";
          }
        });
      };
    });
  });
}
