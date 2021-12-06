import { changeTimestampToTime } from "../modules/time-counting.js";

const queueContainer = document.querySelector("#queue-orders");

function clearQueue() {
    queueContainer.innerHTML = "";
}

function setupEventListener(container) {
    // Events for individual queue item
    container.addEventListener("click", () => {
        console.log("hey");
    });
}

function showData(data) {
    let countOrders = 0;

    data.orders.queue.forEach((element) => {
        // create some template etc... and append to queueContainer
        // let queue_template;

        //grab the template
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

        element.order.forEach((order) => {
            console.log("ORDER ", order);
            // TO DO
            // count the same beers
        });

        // TO DO AFTER
        //setting colour of circles for every beer
        // setCirclesForBeers(data, myCopy);

        //grab parent
        const parent = document.querySelector("#queue-orders");
        // console.log(parent)

        //append
        parent.appendChild(myCopy);

        // setupEventListener(queue_template)
        // setting event listeners on templates won't work unfortunately (it must be DOM object not Template object)
        // solution? create new loop on queueContainer childrens and add event listeners there
    });
    showOrderNr(countOrders);
}

function showQueue(data) {
    clearQueue();
    if (data.orders.queue.length == 0) {
        showMissingData();
    } else {
        showData(data);
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

// let data3 = []

// data.forEach(a => {
//     data2.forEach(b => {
//         if (a.id == b.id) {
//             data3.push({'a_something': a.element, 'b_something': b.name})
//         }
//     })
// })
