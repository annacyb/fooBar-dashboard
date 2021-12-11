import { changeTimestampToTime } from "../modules/time-counting.js";

const bartendersCurrentOrder = {
    dannie: "",
    jonas: "",
    klaus: "",
    peter: "",
};

function showBartendersOrders(data) {
    const bartenders = data.orders.bartenders;
    bartenders.forEach((bartender) => {
        if (bartender.status === "WORKING") {
            // names are in order of elements created in html in "section#bartenders-wrapper"
            showOrders(bartender, "Dannie", data);
            showOrders(bartender, "Jonas", data);
            showOrders(bartender, "Klaus", data);
            showOrders(bartender, "Peter", data);
        }
    });
}

function showOrders(bartender, name, data) {
    if (bartender.name === name) {
        const lowercaseName = name.toLowerCase();
        const bartenderWrapper = document.querySelector(
            `#bartender-${lowercaseName}`
        );
        const templatePlace = bartenderWrapper.querySelector(
            ".queue-orders-place"
        );
        const orderId = bartender.servingCustomer;

        data.orders.serving.forEach((orderDetails) => {
            if (
                orderDetails.id === orderId &&
                orderDetails.id != bartendersCurrentOrder[lowercaseName]
            ) {
                //removing previous order
                templatePlace.innerHTML = "";

                //grab the template for order in a queue
                const order_template = document.querySelector(
                    "template.bartenders-order-template"
                ).content;

                //clone it
                const myCopy = order_template.cloneNode(true);

                //change content
                myCopy.querySelector(".order-id").textContent = "#" + orderId;
                const orderTimestamp = orderDetails.startTime;
                const orderTime = changeTimestampToTime(orderTimestamp);
                myCopy.querySelector(".order-time").textContent = orderTime;

                // TO DO
                // orderDetails.order.forEach((beer) => {}
                // const indenticalBeersCounter = countIdenticalBeers(orderElement.order);
                // createOrderDetailsView(indenticalBeersCounter, myCopy);

                //grab parent
                const parent = templatePlace;

                //append
                parent.appendChild(myCopy);

                //NEW
                bartendersCurrentOrder[lowercaseName] = orderId;

                // add += 1 do counting orders per bartender
            } else {
                // TO DO
                templatePlace.innerHTML = "<p>No orders to show</p>";
            }
        });
    }
}

export { showBartendersOrders };
