import dayjs from "dayjs";
import { get_orders } from "./api.js";

async function getCurrentTime() {
    let ordersData = await get_orders();
    let timestamp = ordersData.timestamp;

    let time = dayjs(timestamp);

    // showing time for each element that has class "current-time-place"
    showTimeOnPage(time.format("HH:mm:ss"));

    showTimeTillClosing(ordersData, time);
}

function showTimeOnPage(time) {
    const timePlaces = document.querySelectorAll(".current-time-place");
    let timePlacesArray = [...timePlaces];

    timePlacesArray.forEach((element) => {
        element.innerHTML = "";
        element.innerHTML = time;
    });
}

function showTimeTillClosing(ordersData, currentTime) {
    // get closing time from database (it is only hour not timestamp)
    const closingHour = ordersData.bar.closingTime;
    const dateNow = dayjs().format("MM-DD-YYYY");
    console.log("now", dateNow);
    const closingTime = dayjs(
        `${dateNow} ${closingHour}`,
        "MM-DD-YYYY H:mm:SS"
    ); // library works with USA date system

    console.log(closingTime);
    console.log(currentTime);

    // calculating inspired by:
    // https://stackoverflow.com/questions/24936855/get-time-difference-in-hours-minutes-and-seconds

    let diff = closingTime.diff(currentTime, "second");
    let hours = Math.floor(diff / 3600);
    let minute = Math.floor((diff - hours * 3600) / 60);
    let seconds = Math.floor(diff - hours * 3600 - minute * 60);

    console.log("CHECK ", hours, minute, seconds);

    // show in HTML
}

setInterval(getCurrentTime, 1000);
