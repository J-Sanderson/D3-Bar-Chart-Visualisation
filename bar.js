d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json", function(data){
  
  var w = 900;
  var h = 400;
  var paddingBottom = 20;
  var paddingLeft = 50;
  var paddingTop = 10;
  var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  
  var svg = d3.select("#main")
    .attr("width", w)
    .attr("height", h);
  
  var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);
  
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
    .attr("width", Math.ceil((w - paddingLeft) / data.data.length))
    .attr("class", "bar")
    .on("mouseover", function(d, i) {
      div.transition()		
        .duration(0)		
        .style("opacity", 0.9);	
      div.html("<strong>" +
               d[1] + 
               " billion USD</strong><br>" + 
               months[new Date(d[0]).getMonth()] +
               " " +
               new Date(d[0]).getFullYear()
               )
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY + "px")
    })
    .on("mouseout", function(d) {		
      div.transition()		
        .duration(500)		
        .style("opacity", 0);	
    });
  
  svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (h - paddingBottom) + ")")
    .call(xAxis);
  
  svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + paddingLeft + ",-" + paddingTop + ")")
    .call(yAxis);

});