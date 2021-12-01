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

  const { level, capacity, beer } = beerObject;

  //calculate the percentage with level and capacity
  template.querySelector(".tap-amount").textContent = Math.round((level / capacity) * 100) + "%";

  template.querySelector(".tap-name").textContent = beer;

  list.append(template);
}
