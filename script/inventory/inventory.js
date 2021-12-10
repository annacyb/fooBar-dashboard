import { prepareBeerStock } from "./beer-stock";
import { prepareTapStatus } from "./beer-tap";
import { refresh_rate } from "../modules/settings";
import { setBeerGradient } from "../modules/set-beer-color";
import { countRevenue } from "../inventory/revenue";
import { changeTimestampToTime } from "../modules/time-counting.js";

// import { addData } from "./graph.js";
// import { PrepareGraph } from "./graph.js";

const now = new Date();

const hours = now.getHours();
const date = now.getDate();
const month = now.getUTCMonth();
console.log("THE day IS", date, month);

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
  // resetLocalStorage();
}

async function loop() {
  const data = await getData();
  showData(data);
  setTimeout(loop, refresh_rate);
}

// function resetLocalStorage() {
//   if (hours >= 20 || hours < 9) {
//     console.log("closing time- reset");
//     localStorage.clear();
//   } else {
//     console.log("not resetting");
//   }
// }
