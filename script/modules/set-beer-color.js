async function getBeerMainColors() {
  const response = await fetch("././beer-colors.json");
  return await response.json();
}

export async function setBeerMainColor(beerName) {
  // fetch data
  const dataWithColors = await getBeerMainColors();

  // find the same beer name in JSON file and find it's color
  let found = dataWithColors.beers.filter((beer) => beer.name == beerName);
  if (found.length == 0) {
    console.log("Beer not found");
  }
  return found[0].color;
}

export async function setBeerGradient(beerName) {
  // fetch data
  const dataWithColors = await getBeerMainColors();

  // find the same beer name in JSON file and find it's color
  let found = dataWithColors.beers.filter((beer) => beer.name == beerName);
  if (found.length == 0) {
    console.log("Beer not found");
  }
  return found[0].gradient;
}
