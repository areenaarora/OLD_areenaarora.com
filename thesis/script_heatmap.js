// set the dimensions and margins of the graph
var margin = { top: 80, right: 15, bottom: 30, left: 150 },
  width = 1200 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3
  .select("#heatmap")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("rainNYC.csv", function (data) {
  // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
  var myGroups = d3
    .map(data, function (d) {
      return d.year;
    })
    .keys();
  var myVars = d3
    .map(data, function (d) {
      return d.month;
    })
    .keys();

  // Build X scales and axis:
  var x = d3.scaleBand().range([0, width]).domain(myGroups).padding(0.08);
  svg
    .append("g")
    .style("font-size", 15)
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSize(0))
    .select(".domain")
    .remove();

  // Build Y scales and axis:
  var y = d3.scaleBand().range([height, 0]).domain(myVars).padding(0.05);
  svg
    .append("g")
    .style("font-size", 15)
    .call(d3.axisLeft(y).tickSize(0))
    .select(".domain")
    .remove();

  // Build color scale
  var myColor = d3
    .scaleSequential()
    .interpolator(d3.interpolateBlues)
    .domain([0, 20]);

  // create a tooltip
  var tooltip = d3
    .select("#heatmap")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "3px")
    .style("padding", "5px");

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function (d) {
    tooltip.style("opacity", 1);
    d3.select(this).style("stroke", "green").style("opacity", 1);
  };
  var mousemove = function (d) {
    var date = new Date(d.year, d.month - 1, 1).toLocaleString("default", {
      month: "long", year:"numeric"
    });
    tooltip
      // .html("In " + d.month + ", " + d.year + " it rained:" + d.rain_inches + " inches")
      .html(`In ${date}, it rained ${parseFloat(d.rain_inches).toFixed(2)} inches`)
      .style("left", d3.mouse(this)[0] + 70 + "px")
      .style("top", d3.mouse(this)[1] + "px");
  };
  var mouseleave = function (d) {
    tooltip.style("opacity", 0);
    d3.select(this).style("stroke", "none").style("opacity", 0.8);
  };

  // add the squares
  svg
    .selectAll()
    .data(data, function (d) {
      return d.year + ":" + d.month;
    })
    .enter()
    .append("rect")
    .attr("x", function (d) {
      return x(d.year);
    })
    .attr("y", function (d) {
      return y(d.month);
    })
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("width", x.bandwidth())
    .attr("height", y.bandwidth())
    .style("fill", function (d) {
      return myColor(d.rain_inches);
    })
    .style("stroke-width", 4)
    .style("stroke", "none")
    .style("opacity", 0.8)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave);
});

// Add title to graph
svg
  .append("text")
  .attr("x", 0)
  .attr("y", -50)
  .attr("text-anchor", "left")
  .style("font-size", "22px")
  // .text("Rainfall in New York City!");

// Add subtitle to graph
svg
  .append("text")
  .attr("x", 0)
  .attr("y", -20)
  .attr("text-anchor", "left")
  .style("font-size", "14px")
  .style("fill", "grey")
  .style("max-width", 400);
