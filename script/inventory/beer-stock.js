import { setBeerMainColor } from "../modules/set-beer-color";

export function prepareBeerStock(beersInStock) {
  // Resets the list
  const list = document.querySelector(".stock-list");
  list.innerHTML = "";

  // Show updated list
  beersInStock.forEach((beer) => {
    showBeerStock(beer);
  });
}

async function showBeerStock(beerObject) {
  const list = document.querySelector(".stock-list");
  const template = document.querySelector(".template-stock").content.cloneNode(true);
  // const color = settings.beerColors[beerObject.name];
  const { name, amount } = beerObject;
  const beerColor = await setBeerMainColor(name);

  template.querySelector(".stock-name").textContent = name;
  template.querySelector(".stock-amount").textContent = amount;
  template.querySelector(".stock-amount").style.color = beerColor;

  list.append(template);
}
