function init() {
    var w = 500;
    var h = 150; 
    var padding = 1;

    function barchart(data) {
        var svg = d3.select("#chart")
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h);

        svg.selectAll("rect")
           .data(wombatSightings)
           .enter()
           .append("rect")
           .attr("x", function(d, i) {
               return i * (w / wombatSightings.length);
           })
           .attr("y", function(d) {
               return h - (d.wombats * 4);  
           })
           .attr("width", (w / wombatSightings.length))
           .attr("height", function(d) {
               return d.wombats * 4;  
           })
           .attr("fill", function(d) {
               return "rgb(0, 0, " + Math.min(d.wombats * 10, 255) + ")";
           });

        
    }

    d3.csv("Task_2.4_data.csv").then(function(data){
        console.log(data)
        wombatSightings = data;
        barchart(wombatSightings);
    });
}

window.onload = init

