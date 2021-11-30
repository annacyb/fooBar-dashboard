const queueContainer = document.getElementById("queue-wrapper");

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
    data.orders.queue.forEach((order) => {
        // create some template etc... and append to queueContainer
        // let queue_template;
        queueContainer.innerHTML =
            queueContainer.innerHTML + `<div>${JSON.stringify(order)}</div>`;
        // setupEventListener(queue_template)
    });
}

function showMissingData() {
    queueContainer.innerHTML = "<p>No orders in queue to show</p>";
}

function showQueue(data) {
    clearQueue();
    if (data.orders.queue.length == 0) {
        showMissingData();
    } else {
        showData(data);
    }
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
