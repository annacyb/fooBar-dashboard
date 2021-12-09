import { changeTimestampToTime } from "../modules/time-counting.js";

let indenticalBeersCounter = {};
const queueContainer = document.querySelector("#queue-orders-place");

function clearQueue() {
    queueContainer.innerHTML = "";
}

async function showQueueData(data) {
    let countOrders = 0;

    data.orders.queue.forEach(async (orderElement) => {
        // counting orders in a queue
        countOrders = countOrders + 1;

        //grab the template for order in a queue
        const queue_order_template = document.querySelector(
            "template.queue-order-template"
        ).content;

        //clone it
        const myCopy = queue_order_template.cloneNode(true);

        //change content
        myCopy.querySelector(".order-id").textContent = "#" + orderElement.id;
        const orderTimestamp = orderElement.startTime;
        const orderTime = changeTimestampToTime(orderTimestamp);
        myCopy.querySelector(".order-time").textContent = orderTime;

        orderElement.order.forEach(async (beer) => {
            // count the same beers
            countIdenticalBeers(beer);
        });

        // ------------------------------

        //grab the template for order details
        const queue_order_details_template = document.querySelector(
            "template.queue-order-details-template"
        ).content;

        //clone it
        const orderDetailsCopy = queue_order_details_template.cloneNode(true);

        //change content
        // TO DO - wpisanie beer do template dla beers i nadanie ilosci sztuk
        Object.entries(indenticalBeersCounter).forEach(([key, value]) => {
            const orderDetailsBeerCopy = orderDetailsCopy
                .querySelector(".order-details-row")
                .cloneNode(true);

            orderDetailsBeerCopy.querySelector(
                ".order-details-row-name"
            ).textContent = key;

            orderDetailsBeerCopy.querySelector(
                ".order-details-row-nr"
            ).textContent = value + " x ";

            // grab parent
            const parent = orderDetailsCopy;

            // append
            parent.appendChild(orderDetailsBeerCopy);
        });

        //grab parent
        const orderContainer = myCopy.querySelector(".order-details-place");

        //append order details
        orderContainer.appendChild(orderDetailsCopy);

        // ------------------------------
        // APPEND TEMPLATE COPY FOR ORDER

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
