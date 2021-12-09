import { prepareBeerStock } from "./beer-stock";
import { prepareTapStatus } from "./beer-tap";
import { refresh_rate } from "../modules/settings";
import { setBeerGradient } from "../modules/set-beer-color";
import { countRevenue } from "../inventory/revenue";
import { changeTimestampToHour, changeTimestampToTime } from "../modules/time-counting.js";
import { build } from "vite";

// import { addData } from "./graph.js";
// import { PrepareGraph } from "./graph.js";

window.addEventListener("DOMContentLoaded", init);

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
  countRevenue(data.serving, data.timestamp);
  resetLocalStorage(data.timestamp);
  // showOrdersToday();
}

async function loop() {
  const data = await getData();
  showData(data);
  setTimeout(loop, refresh_rate);
}

function resetLocalStorage(timestamp) {
  let currentTime = changeTimestampToHour(timestamp);
  if (currentTime === "22") {
    localStorage.clear();
    console.log("closing time- reset");
  } else {
    console.log("not resetting");
  }
}
