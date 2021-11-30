import { tabs } from "../modules/tabs.js";

window.addEventListener("DOMContentLoaded", start);

let listJonas = [];
let listKlaus = [];
let listPeter = [];
let listDannie = [];
let waiting = [];

const Order = {
  id: 0,
  time: 0,
  items: [],
};

const Bartender = {
  name: "",
  status: "",
  statusDetail: "",
  usingTap: 0,
  servingCustomer: 0,
};

async function start() {
  tabs();
  orderController();
}

async function loadJSON() {
  console.log("loadJS");
  const response = await fetch("https://foo-bar-database.herokuapp.com/");
  const jsonData = await response.json();
  console.log(jsonData);
}

async function orderController() {
  console.clear();

  const serverUrl = "https://foo-bar-database.herokuapp.com/";

  // Fetch new data
  const jsonData = await loadJSON(serverUrl);

  setTimeout(orderController, 5000);
}
