import { prepareBeerStockStatusObjects } from "./beer-stock";

window.addEventListener("DOMContentLoaded", init);

async function init() {
  const data = await getData();

  // console.log(data);

  buildView(data);

  updateView();
}

function buildView(data) {
  const { storage } = data;

  prepareBeerStockStatusObjects(storage);
}

async function updateView() {
  const data = await getData();

  const { storage } = data;

  prepareBeerStockStatusObjects(storage);

  // Call getQueue again, to wait for the next update to the queue
  setTimeout(updateView, 5000);
}

async function getData() {
  let response = await fetch("https://foo-bar-database.herokuapp.com/");

  console.log(response.statusText);
  const json = await response.json();

  return json;
}
