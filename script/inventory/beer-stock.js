export function prepareBeerStockStatusObjects(beersInStock) {
  // Resets the list
  const list = document.querySelector(".beer-stock-status-list");
  list.innerHTML = "";

  // Show updated list
  beersInStock.forEach((beer) => {
    showBeerStockStatus(beer);
  });
}

function showBeerStockStatus(beerObject) {
  const list = document.querySelector(".beer-stock-status-list");
  const template = document.querySelector(".t-beer-stock").content.cloneNode(true);
  // const color = settings.beerColors[beerObject.name];
  const { name, amount } = beerObject;

  template.querySelector(".beer-stock__name").textContent = name;

  template.querySelector(".beer-stock__amount").textContent = amount;
  // template.querySelector(".beer-stock__name").innerHTML = name;

  list.append(template);
}
