import { changeTimestampToTime } from "../modules/time-counting.js";

let indenticalBeersCounter = {};
const queueContainer = document.querySelector("#queue-orders-place");

function clearQueue() {
    queueContainer.innerHTML = "";
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
            orderDetailsCopy.querySelector(
                ".order-details-row-name"
            ).textContent = orderName;

            //grab parent
            const orderContainer = myCopy.querySelector(".order-details-place");

            //append order details
            orderContainer.appendChild(orderDetailsCopy);

            // count the same beers
            indenticalBeersCounter = countIdenticalBeers(orderName);
        });

        //grab parent
        const parent = document.querySelector("#queue-orders-place");

        //append
        parent.appendChild(myCopy);

        //counting the same beers reset
        console.log(indenticalBeersCounter);
        indenticalBeersCounter = {};
    });
    showOrderNr(countOrders);
}

function countIdenticalBeers(beer) {
    // hasOwnProperty - checks if key of beer exists in object
    if (indenticalBeersCounter.hasOwnProperty(beer)) {
        indenticalBeersCounter[beer] += 1;
    } else {
        indenticalBeersCounter[beer] = 1;
    }
    return indenticalBeersCounter;
}

function showQueue(data) {
    clearQueue();
    if (data.orders.queue.length == 0) {
        showMissingData();
        indenticalBeersCounter = {};
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
