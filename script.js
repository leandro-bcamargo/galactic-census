async function fetchPlanets() {
  const data = await fetch('https://swapi.dev/api/planets/');
  const planets = await data.json();

  console.log(planets.results);
}

