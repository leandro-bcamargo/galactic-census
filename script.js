async function fetchPlanets() {
  const data = await fetch('https://swapi.dev/api/planets/');
  const planets = await data.json();

  return planets.results;
}

async function displayPlanets() {
  const planets = await fetchPlanets();
  planets.forEach(planet => {
    const planetList = document.querySelector('.planet-list');
    const listItem = document.createElement('li');
    const button = document.createElement('button');
    button.innerHTML = planet.name;
    listItem.appendChild(button);
    planetList.appendChild(listItem);
  })
}


