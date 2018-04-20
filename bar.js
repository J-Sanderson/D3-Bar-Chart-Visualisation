d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json", function(data){
  
  var w = 900;
  var h = 400;
  var paddingBottom = 20;
  var paddingLeft = 50;
  var paddingTop = 10;
  
  var svg = d3.select("#main")
    .attr("width", w)
    .attr("height", h);
  
  //get gdp + date values from nested array
  var values = [];
  var dates = [];
  data.data.forEach(function(item) {
    values.push(item[1]);
    dates.push(item[0]);
  });
  
  var xScale = d3.scaleTime()
    .domain([
      new Date(d3.min(dates)),
      new Date(d3.max(dates))
    ])
    .rangeRound([paddingLeft, w - paddingBottom]);
  
  var yScale = d3.scaleLinear()
    .domain([0, d3.max(values)])
    .range([paddingBottom, h - paddingTop]);
  
  var yAxisScale = d3.scaleLinear()
    .domain([d3.max(values), 0])
    .range([paddingBottom, h - paddingTop]);
  
  var xAxis = d3.axisBottom(xScale)
    .ticks(5);
  
  var yAxis = d3.axisLeft(yAxisScale);
  
  svg.selectAll("rect")
    .data(data.data)
    .enter()
    .append("rect")
    .attr("y", function(d){
      return h - yScale(d[1])
    })
    .attr("x", function(d, i) {
      return i * ((w - (paddingBottom + paddingLeft)) / data.data.length) + paddingLeft
    })
    .attr("height", function(d) {
      return yScale(d[1]) - paddingBottom;
    })
    .attr("width", ((w - paddingLeft) / data.data.length) + 1)
    .attr("fill", "green");
  
  svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (h - paddingBottom) + ")")
    .call(xAxis);
  
  svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + paddingLeft + ",-" + paddingTop + ")")
    .call(yAxis);
  
});