import { changeTimestampToTime } from "../modules/time-counting.js";

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

function showQueueData(data) {
    let countOrders = 0;

    data.orders.queue.forEach((element) => {
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

        // myCopy.querySelector(".order-details-row-name").src = element[0];

        element.order.forEach((orderName) => {
            const random = Math.floor(Math.random() * 100) + 1;
            console.log("ORDER ", random, orderName);

            //grab the template for order details
            const queue_order_details_template = document.querySelector(
                "template#queue-order-details-template"
            ).content;

            //clone it
            const orderDetailsCopy =
                queue_order_details_template.cloneNode(true);

            //change content

            // TO DO
            //setting colour of circles for every beer
            const beerColor = setBeerMainColor(orderName);

            orderDetailsCopy.querySelector(
                ".order-details-row-color"
            ).style.backgroundColor = "red";

            //TO DO
            // orderDetailsCopy.querySelector(
            //     ".order-details-row-color"
            // ).style.backgroundColor = beerColor;

            orderDetailsCopy.querySelector(
                ".order-details-row-name"
            ).textContent = orderName;

            //grab parent
            // const orderContainer = document.querySelector(
            //     ".order-details-place"
            // );

            // CHECKING IF TEMPLATE IS APPENDING SOMEWHERE
            const orderContainer = document.querySelector("#bartender-jonas");

            //append order details
            orderContainer.appendChild(orderDetailsCopy);

            // TO DO
            // count the same beers
        });

        //grab parent
        const parent = document.querySelector("#queue-orders-place");

        //append
        parent.appendChild(myCopy);

        // const orderContainer = document.querySelector(".order-details-place");
        // orderContainer.appendChild(orderDetailsCopy);
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

function setBeerMainColor(beerName) {
    // TO DO
    // return BeerColor;
}

export { showQueue };

// let data3 = []

// data.forEach(a => {
//     data2.forEach(b => {
//         if (a.id == b.id) {
//             data3.push({'a_something': a.element, 'b_something': b.name})
//         }
//     })
// })
