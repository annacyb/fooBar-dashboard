import dayjs from "dayjs";
import { get_orders } from "./api.js";

async function getCurrentTime() {
    let ordersData = await get_orders();
    let timestamp = ordersData.timestamp;

    let time = dayjs(timestamp).format("HH:mm:ss");

    console.log("TIME: ", time);
}

setInterval(getCurrentTime, 1000);
