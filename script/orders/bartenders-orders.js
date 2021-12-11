import { changeTimestampToTime } from "../modules/time-counting.js";

function showBartendersOrders(data) {
    clearOrders();
    data.orders.bartenders.forEach((bartender) => {
        showOrders(bartender, data.orders.servings);
    });
}

function clearOrders() {
    const bartenders = ["dannie", "peter", "klaus", "jonas"];
    bartenders.forEach((name) => {
        const bartenderWrapper = document.querySelector(`#bartender-${name}`);
        const templatePlace = bartenderWrapper.querySelector(
            ".queue-orders-place"
        );
        templatePlace.innerHTML = "";
    });
}

function showOrders(bartender, servings) {
    const lowercaseName = bartender.name.toLowerCase();
    const bartenderWrapper = document.querySelector(
        `#bartender-${lowercaseName}`
    );
    const templatePlace = bartenderWrapper.querySelector(".queue-orders-place");
    const orderId = bartender.servingCustomer;

    const matchedOrders = servings.filter((order) => order.id == orderId);
    if (matchedOrders.length == 1) {
        let orderDetails = matchedOrders[0];
        // removing previous order
        templatePlace.innerHTML = "";

        const order_template = document.querySelector(
            "template.bartenders-order-template"
        ).content;

        // clone it
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
    } else if (matchedOrders.length == 0) {
        templatePlace.innerHTML = "<p>No orders to show</p>";
    } else {
        templatePlace.innerHTML = "ERROR CANNOT SERVE MORE THAN 1 ORDER";
    }
}

export { showBartendersOrders };
