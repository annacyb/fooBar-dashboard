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
    console.log(data.orders.queue);
    data.orders.queue.forEach((order) => {
        // create some template etc... and append to queueContainer
        // let queue_template;
        console.log(order);
        queueContainer.innerHTML =
            queueContainer.innerHTML + `<div>${JSON.stringify(order)}</div>`;
        // setupEventListener(queue_template)
        // setting event listeners on templates won't work unfortunately (it must be DOM object not Template object)
        // solution? create new loop on queueContainer childrens and add event listeners there
        console.log("COSSS ", countOrders);
        countOrders = countOrders + 1;
        console.log("CO ", countOrders);
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
