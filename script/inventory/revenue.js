import { changeTimestampToTime } from "../modules/time-counting.js";
import { changeTimestampToHour } from "../modules/time-counting.js";
import { prepareChartData } from "./graph";
let newestOrder = [0];

// const today = new Date();

// const date = today.getDate();
// const month = today.getUTCMonth();
// const monthString = JSON.stringify(month);
// const dateString = JSON.stringify(date);
// let data = dateString;
// data += monthString;
// console.log("THE day IS", data);

// localStorage.setItem(date, 13);

const Order = {
  time: "",
  price: "",
};

export let dataForChart = [];
export let editedDataForChart = [];

export function countRevenue(orders) {
  //check if theres some orders that are being served

  if (orders.length > 0) {
    // if yes check if it's a new order or the old one
    // get the last element in an array
    let newestCustomer = orders.slice(-1)[0].id;
    console.log("last order id", newestCustomer);

    //update the newest order id
    if (newestCustomer > newestOrder[0]) {
      newestOrder.unshift(newestCustomer);
      console.log("new order:", newestOrder[0]);
      orderDetails(newestCustomer, orders);
    }
    //if not NO NEW ORDERS
    else {
      console.log("no new orders");
    }
  } else {
    console.log("empty queue");
  }
}

//DO THIS ONLY IF IT'S A NEW ORDER

async function orderDetails(orderObject, orders) {
  //find the order by it's id
  let foundOrder = orders.find((x) => x.id === orderObject);

  //count the price of the order
  const orderPrice = countPrice(foundOrder.order);
  console.log(orderPrice);
  //get the time of the order
  const orderTimestamp = foundOrder.startTime;
  const orderTime = changeTimestampToHour(orderTimestamp);

  createOrderObject(orderPrice, orderTime);
  prepareChartData(editedDataForChart);
  showTheNumbers(foundOrder.order);
}

function countPrice(order) {
  // console.log(order.length);
  return order.length * 40;
}

// function getLength(order) {
//   console.log(order.length);
//   return order.length;
// }

function createOrderObject(orderPrice, orderTime) {
  const addOrder = Object.create(Order);
  addOrder.price = orderPrice;
  addOrder.time = orderTime;

  dataForChart.unshift(addOrder);
  // console.log(dataForChart);
  combineObject();
}

function showTheNumbers(order) {
  const orderLength = order.length;

  if (localStorage.servedCount) {
    localStorage.servedCount = Number(localStorage.servedCount) + 1;
    showOrdersToday();
  } else {
    localStorage.servedCount = 1;
  }

  if (localStorage.servedBeers) {
    localStorage.servedBeers = Number(localStorage.servedBeers) + orderLength;
    showBeersToday();
  } else {
    localStorage.servedBeers = 1;
  }
}

function showOrdersToday() {
  document.querySelector(".nr-served-today").textContent = localStorage.servedCount;
}

function showBeersToday() {
  document.querySelector(".beer-served-today").textContent = localStorage.servedBeers;
}

//SUMING UP THE PRICES WITH THAT HAVE THE  SAME TIME

function combineObject() {
  const grouped = dataForChart.reduce((all, { time: c, price: a }) => ({ ...all, [c]: (all[c] || 0) + a }), {});

  editedDataForChart = Object.keys(grouped).map((k) => ({ time: k, price: grouped[k] }));

  //   console.log(editedDataForChart);
}
