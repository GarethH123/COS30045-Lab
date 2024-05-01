function init() {
    var w = 700;
    var h = 350; 
    var padding = 54;
    
    var dataset;

    d3.csv("Unemployment_78-95.csv", function(d) {
        return {
          date: new Date(+d.year, +d.month-1),
          number: +d.number
        };
      }).then(function(data) {
        dataset = data;
        lineChart(dataset);
      });
      
      function lineChart(dataset) {
        var xScale = d3.scaleTime()
                    .domain([
                        d3.min(dataset, function(d) { return d.date; }), 
                        d3.max(dataset, function(d) { return d.date; })
                    ])
                    .range([padding, w - padding]);

        var yScale = d3.scaleLinear()
                    .domain([0, d3.max(dataset, function(d) { return d.number; })
                    ])
                    .range([h - padding, padding]);

        line = d3.line()
                    .x(function(d) { return xScale(d.date); })
                    .y(function(d) {return yScale(d.number); });

            area = d3.area()
                    .x(function(d) { return xScale(d.date); })
                    .y0(function() { return yScale.range()[0]; })
                    .y1(function(d) { return yScale(d.number); });
                
        
        var svg = d3.select("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

        svg.append("path")
                .datum(dataset)
                .attr("class","area")
                .attr("d", area)
                .style("fill", "slategray");

        var xAxis = d3.axisBottom()
            .scale(xScale)
            .ticks(8)
        
        var yAxis = d3.axisLeft()
        .scale(yScale)
        .ticks(10)

        svg.append("g")
        .attr("transform", "translate(0," + (h - padding) + ")")
        .call(xAxis);

        svg.append("g")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis);

        svg.append("line")
                .attr("class", "line halfMilMark")
                .attr("x1", padding)
                .attr("y1", yScale(500000))
                .attr("x2", w)
                .attr("y2", yScale(500000));

        svg.append("text")
                .attr("class", "halfMilLabel")
                .attr("x", padding + 10)
                .attr("y", yScale(500000) - 7)
                .attr("fill", "red")
                .text("Half a million unemployed");
                };
                
}

window.onload = init

