import Chart from "chart.js/auto";
import { editedDataForChart } from "./revenue";
import { dataForChart } from "./revenue";

const ctx = document.getElementById("myChart");

// console.log("GRAFFFF", values);

const myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [0],
    datasets: [
      {
        label: "Revenue",
        data: [0],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  },
});

export function addData() {
  const values = dataForChart.map((x) => x.price);

  const labels = dataForChart.map((x) => x.time);
  // console.log(labels[labels.length - 1]);
  if (labels.length > 1) {
    if (labels[labels.length - 1] != labels[labels.length - 2]) {
      myChart.data.labels.push(labels[labels.length]);
    } else {
      console.log("nie dodaje");
    }
  } else {
    myChart.data.labels.push(labels);
  }

  // myChart.data.push(sumall);
  // console.log("adding new data to chart");

  myChart.data.datasets.forEach((dataset) => {
    dataset.data.push(values);
  });
  myChart.update();
}
