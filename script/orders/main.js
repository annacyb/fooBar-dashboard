import { tabs } from "../modules/tabs.js";
import { refresh_rate } from "../modules/settings.js";
import { get_orders, get_beers } from "../modules/api.js";
import { showQueue } from "./queue.js";
import { showOrders } from "./orders.js";

window.addEventListener("DOMContentLoaded", start);

const data = {
    beers: {},
    orders: {},
};

async function start() {
    // tabs();
    setupEventListeners();
    loop();
}

function setupEventListeners() {
    // TODO
}

async function loadData() {
    data.beers = await get_beers();
    data.orders = await get_orders();
}

function showData() {
    showQueue(data);
    showOrders(data);
}

async function loop() {
    await loadData();
    showData();

    setTimeout(loop, refresh_rate);
}
