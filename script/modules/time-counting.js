import dayjs from "dayjs";
import { get_orders } from "./api.js";

async function getCurrentTime() {
    let ordersData = await get_orders();
    let timestamp = ordersData.timestamp;

    let time = dayjs(timestamp).format("HH:mm:ss");

    // showing time for each element that has class "current-time-place"
    showTimeOnPage(time);
}

function showTimeOnPage(time) {
    const timePlaces = document.querySelectorAll(".current-time-place");
    let timePlacesArray = [...timePlaces];

    timePlacesArray.forEach((element) => {
        element.innerHTML = "";
        element.innerHTML = time;
    });
}

setInterval(getCurrentTime, 1000);
