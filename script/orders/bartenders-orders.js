import { changeTimestampToTime } from "../modules/time-counting.js";

const bartenderOrdersCount = {
    dannie: generateRandomOrders(),
    peter: generateRandomOrders(),
    klaus: generateRandomOrders(),
    jonas: generateRandomOrders(),
};

// MAIN FUNCTION

function showBartendersOrders(data) {
    generateRandomOrders(); // that bartenders served before entering the website
    clearOrders();
    data.orders.bartenders.forEach((bartender) => {
        showOrders(bartender, data.orders.serving);
    });
}

function generateRandomOrders() {
    let randomList = [];
    // random number between 50 and 80
    // as it is not possible to know how many orders bartenders did before entering the website without backend
    const randomNumber = Math.floor(Math.random() * 31) + 50;

    for (let i = 0; i < randomNumber; i++) {
        // the same id can be pushed to the array because the lenght of array is important for countBartnederOrder function
        randomList.push("#0");
    }
    return randomList;
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

    // check if there is an order id that has the same id as bartender's servingCustomer id
    const matchedOrders = servings.filter((order) => order.id == orderId);
    if (matchedOrders.length == 1) {
        countBartenderOrder(lowercaseName, bartenderWrapper, orderId);

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
        templatePlace.innerHTML = `<p class="noOrders">No orders to show</p>`;
    } else {
        templatePlace.innerHTML =
            "ERROR - bartender cannot serve more than 1 order at the same time";
    }
}

function countBartenderOrder(lowercaseName, bartenderWrapper, order_id) {
    // so that counter will not grow everytime the website is refreshed but only if there is a new order's id
    if (!bartenderOrdersCount[lowercaseName].includes(order_id)) {
        bartenderOrdersCount[lowercaseName].push(order_id);
    }

    bartenderWrapper.querySelector(".bartender-nr-orders").innerHTML =
        bartenderOrdersCount[lowercaseName].length + " orders";
}

export { showBartendersOrders };
