// This is for view result after check using algorithm rabin-karp
// Load google charts
google.charts.load("current", { packages: ["corechart"] });

// Draw the chart and set the chart values
function drawChart(result) {
  var unique = 100 - result;

  var data = google.visualization.arrayToDataTable([
    ["Status", "Percentage"],
    ["Similar", result],
    ["Unique", unique],
  ]);

  // Optional; add a title and set the width and height of the chart
  var options = {
    title: "Result",
    width: 550,
    height: 400,
    slices: { 0: { color: "red" }, 1: { color: "green" } },
    pieHole: 0.4,
  };

  // Display the chart inside the <div> element with id="piechart"
  var chart = new google.visualization.PieChart(
    document.getElementById("piechart")
  );
  chart.draw(data, options);
}
