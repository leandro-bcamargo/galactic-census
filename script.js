async function fetchPlanets() {
  const data = await fetch('https://swapi.dev/api/planets/');
  const planets = await data.json();

  return planets.results;
}

async function displayPlanets() {
  const planets = await fetchPlanets();
  planets.forEach(planet => {
    const planetList = document.querySelector('.planet-list');
    const planetListItem = document.createElement('li');
    const button = document.createElement('button');
    button.innerHTML = planet.name;
    button.onclick = () => displayPlanetInfo(planet, planetListItem);
    planetListItem.appendChild(button);
    planetList.appendChild(planetListItem);
  })
}

function displayPlanetInfo({name, climate, population, terrain}, planetListItem) {
  const planetInfoList = document.createElement('ul');
  const planetInfoItems = 
  `
    <li>Name: ${name}</li>
    <li>Climate: ${climate}</li>
    <li>Population: ${population}</li>
    <li>Terrain: ${terrain}</li>
  `
  planetInfoList.innerHTML = planetInfoItems;
  planetListItem.append(planetInfoList);
}


