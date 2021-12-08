import { prepareBeerStock } from "./beer-stock";
import { prepareTapStatus } from "./beer-tap";
import { refresh_rate } from "../modules/settings";
import { setBeerGradient } from "../modules/set-beer-color";

window.addEventListener("DOMContentLoaded", init);

// async function init() {
//   // const data = await getData();

//   updateView();
// }

// async function updateView() {
//   const data = await getData();

//   const { storage, taps } = data;

//   prepareBeerStock(storage);
//   prepareTapStatus(taps);

//   // call update view every 5 seconds
//   setTimeout(updateView, refresh_rate);
// }

// async function getData() {
//   let response = await fetch("https://foo-bar-database.herokuapp.com/");

//   // console.log(response.statusText);
//   const json = await response.json();

//   return json;
// }

async function init() {
  loop();
}

async function getData() {
  let response = await fetch("https://foo-bar-database.herokuapp.com/");

  // console.log(response.statusText);
  const json = await response.json();

  return json;
}

function showData(data) {
  prepareBeerStock(data.storage);
  prepareTapStatus(data.taps);
}

async function loop() {
  const data = await getData();
  showData(data);
  setTimeout(loop, refresh_rate);
}
