import { prepareBeerStock } from "./beer-stock";
import { prepareTapStatus } from "./beer-tap";
import { refresh_rate } from "../modules/settings";

window.addEventListener("DOMContentLoaded", init);

async function init() {
  const data = await getData();

  // console.log(data);

  buildView(data);
  updateView();
}

function buildView(data) {
  const { storage, taps } = data;

  prepareBeerStock(storage);
  prepareTapStatus(taps);
}

async function updateView() {
  const data = await getData();

  const { storage, taps } = data;

  prepareBeerStock(storage);
  prepareTapStatus(taps);

  // call update view every 5 seconds
  setTimeout(updateView, refresh_rate);
}

async function getData() {
  let response = await fetch("https://foo-bar-database.herokuapp.com/");

  console.log(response.statusText);
  const json = await response.json();

  return json;
}

async function loadData() {
  data.beers = await get_beers();
  data.orders = await get_orders();
}

function showData() {
  showQueue(data);
}

async function loop() {
  await loadData();
  showData();

  setTimeout(loop, refresh_rate);
}
