// set the dimensions and margins of the graph
var margin = { top: 20, right: 20, bottom: 30, left: 80 },
  width = 680 - margin.left - margin.right,
  height = 450 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg_scatter = d3
  .select("#my_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("latest_df.csv", function (data) {
  // Add X axis
  var x = d3.scaleLinear().domain([0, 55]).range([0, width]);
  svg_scatter
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear().domain([0, 3000]).range([height, 0]);
  svg_scatter.append("g").call(d3.axisLeft(y));

  // Add a scale for bubble size
  var z = d3.scaleLinear().domain([0, 250000]).range([4, 40]);

  // Add a scale for bubble color
  var myColor = d3
    .scaleOrdinal()
    .domain([
      "POLICE DEPARTMENT",
      "FIRE DEPARTMENT",
      "DEPARTMENT OF SANITATION",
    ])
    .range(d3.schemeSet2);

  // -1- Create a tooltip div that is hidden by default:
  var tooltip = d3
    .select("#my_dataviz")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "black")
    .style("border-radius", "5px")
    .style("width", "150px")
    .style("padding", "8px")
    .style("color", "white");

  // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
  var showTooltip = function (d) {
    tooltip.transition().duration(200);
    tooltip
      .style("opacity", 0.8)
      .html("Overtime earned: " + d.total_ot_paid)
      .style("left", d3.mouse(this)[0] + 10 + "px")
      .style("top", d3.mouse(this)[1] + 10 + "px");
  };
  
  var moveTooltip = function (d) {
    tooltip
      .style("left", d3.mouse(this)[0] + 30 + "px")
      .style("top", d3.mouse(this)[1] + 30 + "px");
  };
  var hideTooltip = function (d) {
    tooltip.transition().duration(200).style("opacity", 0);
  };

  // Add dots
  svg_scatter
    .append("g")
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "bubbles")
    .attr("cx", function (d) {
      return x(d.tenure_years);
    })
    .attr("cy", function (d) {
      return y(d.ot_hours);
    })
    .attr("r", function (d) {
      return z(d.total_ot_paid);
    })
    .style("fill", function (d) {
      return myColor(d.agency_name);
    })
    .style("stroke-width", "0.5")

    // -3- Trigger the functions
    .on("mouseover", showTooltip)
    .on("mousemove", moveTooltip)
    .on("mouseleave", hideTooltip);
});