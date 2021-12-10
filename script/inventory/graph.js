import Chart from "chart.js/auto";
import { editedDataForChart } from "./revenue";
import { dataForChart } from "./revenue";

const ctx = document.getElementById("myChart");

const now = new Date();
const hours = now.getHours();

const labels = [];

const data = [];

for (let i = 0; i < hours; i++) {
  labels.push(i);

  data.push(Math.floor(Math.random() * 1000));
}

console.log(labels, data);

const myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: labels,
    datasets: [
      {
        label: "Revenue",
        data: data,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  },
});

export function prepareChartData(dataForChart) {
  console.log(dataForChart);
  dataForChart.forEach((object) => {
    updateChart(object);
  });
}

function updateChart(object) {
  if (myChart.data.datasets[0].data[Number(object.time)] != null) {
    myChart.data.datasets[0].data[Number(object.time)] = object.price; // Would update the first dataset's value of 'March' to be 50
    myChart.update();
  } else {
    addData(object);
  }
} // }

function addData(object) {
  const { time, price } = object;

  console.log("LABEL", time);
  console.log("PRICE", price);

  myChart.data.labels.push(time);

  myChart.data.datasets.forEach((dataset) => {
    dataset.data.push(price);
  });
  myChart.update();
}
