export function prepareTapStatus(tapStock) {
  // Resets the list
  const list = document.querySelector(".tap-list");
  list.innerHTML = "";

  // Show updated list
  tapStock.forEach((beer) => {
    showTapStatus(beer);
  });
}

function showTapStatus(beerObject) {
  const list = document.querySelector(".tap-list");
  const template = document.querySelector(".template-tap").content.cloneNode(true);
  // const color = settings.beerColors[beerObject.name];
  const { level, capacity, beer } = beerObject;

  template.querySelector(".tap-name").textContent = Math.round((level / capacity) * 100) + "%";

  template.querySelector(".tap-amount").textContent = beer;
  // template.querySelector(".beer-stock__name").innerHTML = name;

  list.append(template);
}
