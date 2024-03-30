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

function displayPlanetInfo({name, climate, population, terrain}, planetListItem) {
  const existingPlanetInfoList = planetListItem.querySelector('ul');
  if (existingPlanetInfoList) {
    planetListItem.removeChild(existingPlanetInfoList)
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
}

async function searchPlanets() {
  const searchedName = document.querySelector('#planet-search').value.toLowerCase();
  const planets = await fetchPlanets();
  const searchedPlanets = planets.filter(planet => planet.name.toLowerCase().includes(searchedName));
  displayPlanets(searchedPlanets);
}


