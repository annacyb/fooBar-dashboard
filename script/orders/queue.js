import { changeTimestampToTime } from "../modules/time-counting.js";
import { setBeerMainColor } from "../modules/set-beer-color.js";

const queueContainer = document.querySelector("#queue-orders-place");

function clearQueue() {
    queueContainer.innerHTML = "";
}

function setupEventListener(container) {
    // Events for individual queue item
    container.addEventListener("click", () => {
        console.log("hey");
    });
}

async function showQueueData(data) {
    let countOrders = 0;

    data.orders.queue.forEach(async (element) => {
        // counting orders in a queue
        countOrders = countOrders + 1;

        //grab the template for order in a queue
        const queue_order_template = document.querySelector(
            "template.queue-order-template"
        ).content;

        //clone it
        const myCopy = queue_order_template.cloneNode(true);

        //change content
        myCopy.querySelector(".order-id").textContent = "#" + element.id;

        const orderTimestamp = element.startTime;
        const orderTime = changeTimestampToTime(orderTimestamp);
        myCopy.querySelector(".order-time").textContent = orderTime;

        element.order.forEach(async (orderName) => {
            //grab the template for order details
            const queue_order_details_template = document.querySelector(
                "template.queue-order-details-template"
            ).content;

            //clone it
            const orderDetailsCopy =
                queue_order_details_template.cloneNode(true);

            //change content
            //setting colour of circles for every beer

            // TO CHANGE - MAKE IT WORK AGAIN
            // let beerColor = await setBeerMainColor(orderName);
            // orderDetailsCopy.querySelector(
            //     ".order-details-row-color"
            // ).style.backgroundColor = beerColor;

            orderDetailsCopy.querySelector(
                ".order-details-row-name"
            ).textContent = orderName;

            //grab parent
            const orderContainer = myCopy.querySelector(".order-details-place");

            //append order details
            orderContainer.appendChild(orderDetailsCopy);

            // TO DO
            // count the same beers
        });

        //grab parent
        const parent = document.querySelector("#queue-orders-place");

        //append
        parent.appendChild(myCopy);
    });
    showOrderNr(countOrders);
}

function showQueue(data) {
    clearQueue();
    if (data.orders.queue.length == 0) {
        showMissingData();
    } else {
        showQueueData(data);
    }
}

function showMissingData() {
    queueContainer.innerHTML = "<p>No orders in queue to show</p>";
    showOrderNr(0);
}

function showOrderNr(number) {
    const ordersNrCont = document.querySelector("#queue-nr");
    ordersNrCont.innerHTML = number;
}

export { showQueue };
