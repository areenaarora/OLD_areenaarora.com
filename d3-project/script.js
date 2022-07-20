// set the dimensions and margins of the graph
var margin = { top: 30, right: 0, bottom: 100, left: 80 },
  width = 1000 - margin.left - margin.right,
  height = 580 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3
  .select("#dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("overtime_by_agency.csv", function (data) {
  // X axis
  var x = d3
    .scaleBand()
    .range([0, width])
    .domain(
      data.map(function (d) {
        return d.agency_name;
      })
    )
    .padding(0.5);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("class", "axis x-axis")
    .attr("transform", "translate(-8,8)rotate(-40)")
    .style("text-anchor", "end");

  // Add Y axis
  var y = d3.scaleLinear().domain([0, 500000000]).range([height, 0]);
  svg.append("g").call(d3.axisLeft(y));

  // Bars
  svg
    .selectAll("mybar")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function (d) {
      return x(d.agency_name);
    })
    .attr("y", function (d) {
      return y(d.total_ot_paid);
    })
    .attr("width", x.bandwidth())
    .attr("height", function (d) {
      return height - y(d.total_ot_paid);
    })
    .attr("fill", "#69b3a2");
});