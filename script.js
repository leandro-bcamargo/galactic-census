window.onload = async function() {
  const planets = await fetchPlanets();
  await displayPlanets(planets);
}

async function fetchPlanets() {
  const data = await fetch('https://swapi.dev/api/planets/');
  const planets = await data.json();

  return planets.results;
}

async function displayPlanets(planets) {
  const planetList = document.querySelector('.planet-list');
  planetList.innerHTML = '';
  planets.forEach(planet => {
    const planetListItem = document.createElement('li');
    const button = document.createElement('button');
    button.innerHTML = planet.name;
    button.onclick = () => displayPlanetInfo(planet, planetListItem);
    planetListItem.appendChild(button);
    planetList.appendChild(planetListItem);
  })
}

function checkForEnter(event) {
  if (event.key === 'Enter') searchPlanets();
}

function displayPlanetInfo({name, climate, population, terrain, residents}, planetListItem) {
  const existingPlanetInfoList = planetListItem.querySelector('ul');
  if (existingPlanetInfoList) {
    planetListItem.removeChild(existingPlanetInfoList);
    return;
  };

  const planetInfoList = document.createElement('ul');
  planetInfoList.innerHTML = 
  `
    <li>Name: ${name}</li>
    <li>Climate: ${climate}</li>
    <li>Population: ${population}</li>
    <li>Terrain: ${terrain}</li>
    </ul>
  `
  planetListItem.append(planetInfoList);
  displayResidents(residents, planetListItem, planetInfoList);
}

async function searchPlanets() {
  const searchedName = document.querySelector('#planet-search').value.toLowerCase();
  const planets = await fetchPlanets();
  const searchedPlanets = planets.filter(planet => planet.name.toLowerCase().includes(searchedName));
  displayPlanets(searchedPlanets);
}

async function fetchResident(url) {
  const data = await fetch(url);
  const resident = await data.json();
  return resident;
}

function displayResidents(residentUrls, planetListItem, planetInfoList) {
  const description = document.createElement('li');
  const existingResidentInfoTable = description.querySelector('table');
  if (existingResidentInfoTable) {
    description.removeChild(existingResidentInfoTable);
    return;
  }
  description.innerHTML = 'Famous Residents';
  planetInfoList.appendChild(description);
  const table = document.createElement('table');
  table.innerHTML = `
    <tr>
      <th>Name</th>
      <th>Birth Year</th>
    </tr>
  `;
  
  residentUrls.forEach(async residentUrl => {
    const resident = await fetchResident(residentUrl)
    const tableRow = document.createElement('tr');
    tableRow.innerHTML = `
      <th>${resident.name}</th>
      <th>${resident.birth_year}</th>
    `
    table.appendChild(tableRow);
  })
  description.append(table);
}


