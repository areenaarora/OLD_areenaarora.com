// set the dimensions and margins of the graph
var margin = { top: 30, right: 0, bottom: 50, left: 80 },
  width = 800 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg_new = d3
  .select("#scatterplot")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("FINALhundredK.csv", function (data) {
  // Add X axis
  var x_new = d3.scaleLinear().domain([0, 280000]).range([0, width]);
  svg_new
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x_new));

  // Add Y axis
  var y_new = d3.scaleLinear().domain([0, 250000]).range([height, 0]);
  svg_new.append("g").call(d3.axisLeft(y_new));

  // Color scale: give me a specie name, I return a color
  var color = d3
    .scaleOrdinal()
    .domain(["MANHATTAN", "QUEENS", "BROOKLYN", "BRONX"])
    .range(["#440154ff", "#21908dff", "#fde725ff", "#FF00FF"]);

  // Add dots
  svg_new
    .append("g")
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return x_new(d.regular_gross_paid);
    })
    .attr("cy", function (d) {
      return y_new(d.total_ot_paid);
    })
    .attr("r", 2.5)
    .style("stroke-width", "0.5")
    .style("opacity", 0.5)
    .style("fill", "#F4DF30")
    // .style("fill", function (d) {
    //   return color(d.work_location_borough);
    // });
});
