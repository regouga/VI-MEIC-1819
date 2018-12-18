
var data;
var streamsInCountry = [];
var dias = []
var colors_availa=["blue", "green","red", "purple","orange", "yellow"];

var margin = {top: 20,right: 20,bottom: 30,left: 60};

var width = 400 - margin.left - margin.right,height = 400 - margin.top - margin.bottom;

var xScale = d3.scaleTime()
    .range([0, width])
    .domain(d3.extent(selec_dates, function(d) { return d; }));


d3.csv("line_chart/exemplo.csv", function(csvdata) {
    data = csvdata;
    for (var j = 0; j < selec_dates.length; j++) {
        var current_date = selec_dates[j].toLocaleDateString("pt-PT");
        if (!dias.includes(current_date)){
            dias.push(current_date);
        }
        data.forEach(function(d) {
            if (current_date == d.Date) {
                streamsInCountry.push(d);
            }
        });
    }

    
    

/*********************** Plot Below *********************/
    var yScale = d3.scaleLinear()
        .range([height, 0])
        .domain(d3.extent(streamsInCountry, function(d) {
            return d.Streams;
        })).nice();
    // Set colour Scale
    let colour = d3.scaleOrdinal(d3.schemeCategory20);

    var xAxis = d3.axisBottom()
        .scale(xScale)
        .ticks(selec_dates.length)
      .tickFormat(d3.timeFormat("%d %b"));
      
    var yAxis = d3.axisLeft().scale(yScale);

    var ticks = xScale.ticks(selec_dates.length);
    console.log("ticks")
    console.log(ticks)
    var nonDuplicateTickValues = [];

    var formatter = function(d){
        var format = d3.timeFormat("%d %b");
        return format(d);
    }

    var tickAlreadyExists = function(tickValIn){
        for(var i=0;i<nonDuplicateTickValues.length;i++)
        {
            var t = nonDuplicateTickValues[i];
            var formattedTickValIn = formatter(tickValIn);
            var formattedTickVal = formatter(t);
            if(formattedTickValIn == formattedTickVal)
                {return true;}

        }
        return false;
    };

    var removeDuplicateTicks = function(){
        for(var i=0;i<ticks.length;i++)
        { 
            var tickVal = ticks[i];
            if(!tickAlreadyExists(tickVal))
            {
                nonDuplicateTickValues.push(tickVal);
            }
        }
    };

    
    removeDuplicateTicks()
    
    xAxis.tickValues(nonDuplicateTickValues);

    var plotLine = d3.line()
    .curve(d3.curveMonotoneX)
    .x(function(d) {
        for (var j = 0; j < selec_dates.length; j++) {
            if (selec_dates[j].toLocaleDateString("pt-PT") == d.Date) {
                break;
                }
            }
        return (xScale(j) + (-xScale(0))) +j * width/(selec_dates.length-1);
    })
    .y(function(d) {
        return yScale(d.Streams);
    });
    // Nest the entries by name
    var dataNest = d3.nest()
        .key(function (d) {
            return d.Country;
        })
        .entries(streamsInCountry);

    var svg = d3.select("#plot").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

      svg.append("g")
        .attr("class", "x axis ")
        .attr('id', "axis--x")
        .attr("transform", "translate(" + margin.left + "," + (height + margin.top) + ")")
        .call(xAxis);

      svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr('id', "axis--y")
        .call(yAxis);

        // text label for the y axis
  

        var line = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var dot = svg.append("g")
            .attr("id", "scatter")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        dataNest.forEach(function (d, i) {
        // Add line plot

            line.append("g")
                .attr("id", "line-" + i)
                .attr("clip-path", "url(#clip)")
                .append("path")
                .datum(d.values)
                .attr("class", "pointlines")
                .attr("d", plotLine)
                .style("fill", "none")
                .style("stroke", function () {

                    return d.colour = colors_availa[i];
                });
      
            dot.append("g")
              .attr("id", "scatter-" + i)
              .attr("clip-path", "url(#clip)")
              .selectAll(".dot")
              .data(d.values)
                .enter().append("circle")
                .attr("class", "dot")
                .attr("r", 5)
                .attr("cx", function(d) {
                  for (var j = 0; j < selec_dates.length; j++) {
                    if (selec_dates[j].toLocaleDateString("pt-PT") == d.Date) {
                        break;
                    }
                  }
                  return (xScale(j) + (-xScale(0))) +j * width/(selec_dates.length-1);
                })
                .attr("cy", function(d) {
                  return yScale(d.Streams);
                })
                .attr("stroke-width", "2px")
                .style("fill", function() {
                  return d.colour = colors_availa[i];
                });
        }); // End data nest loop

   
});




/****************** Update Below **************************/
d3.select("#update").on('click', update);
var g = 0;
function newRandom(samples) {
  var data = [];

  for (i = 0; i < samples; i++) {
    data.push({
      x: g+g*Math.random(),
      y: Math.sin(Math.random()),
      name: "group-3"
    });
    
    g++;
  }

  data.sort(function(a, b) {
    return a.x - b.x;
  })
  return data;
}

function update() {

  let newData = newRandom(15);
  data = data.concat(newData);
  
  data.sort(function(a,b) {
  	return a.x - b.x;
  });
  
  // Nest the entries by name
  dataNest = d3.nest()
  .key(function (d) {
      return d.Country;
  })
  .entries(data);

  xScale.domain(d3.extent(data, function(d) {
    return d.Date;
  })).nice();
  
  yScale.domain(d3.extent(data, function(d) {
    return d.Streams;
  })).nice();
  
  yAxis.scale(yScale);
  xAxis.scale(xScale);
  
 	svg.transition().duration(1000).select('.y.axis').call(yAxis);
  svg.transition().duration(1000).select('.x.axis').call(xAxis);

dataNest.forEach(function (d, i) {
	if(d3.select("#line-"+i).empty()) {
        //add new charts
        // Add line plot
      line.append("g")
          .attr("id", "line-" + i)
          .attr("clip-path", "url(#clip)")
            .append("path")
            .datum(d.values)
            .attr("class", "pointlines")
            .attr("d", plotLine)
            .style("fill", "none")
            .style("stroke", function () {
                return d.colour = colour(d.key);
            });;

      dot.append("g")
        .attr("id", "scatter-" + i)
        .attr("clip-path", "url(#clip)")
        .selectAll(".dot")
        .data(d.values)
          .enter().append("circle")
          .attr("class", "dot")
          .attr("r", 5)
          .attr("cx", function(d) {
            return xScale(d.Date);
          })
          .attr("cy", function(d) {
            return yScale(d.Streams);
          })
          .attr("stroke", "white")
          .attr("stroke-width", "2px")
          .style("fill", function() {
            return d.colour = colour(d.Country);
          });
  } else {
      line.select("#line-"+i).select("path").data([d.values])
        .transition().duration(750)
        .attr("d", plotLine);

      //Update all circles
      dot.select("#scatter-"+i).selectAll("circle")
        .data(d.values)
        .transition()
        .duration(750)
        .attr("cx", function(d) {
          return xScale(d.x);
        })
        .attr("cy", function(d) {
          return yScale(d.y);
        })
        .attr("stroke", "white")
        .attr("stroke-width", "2px")
        .style("fill", function() {
        	return d.colour = colour(d.key);
         });

      //Enter new circles
      dot.select("#scatter-"+i).selectAll("circle")
        .data(d.values)
        .enter()
        .append("circle")
          .attr("cx", function(d) {
            return xScale(d.x);
          })
          .attr("cy", function(d) {
            return yScale(d.y);
          })
          .attr("r", 5)
          .attr("stroke", "white")
          .attr("stroke-width", "2px")
          .style("fill", function() {
          	return d.colour = colour(d.key);
          });

      // Remove old
      dot.select("#scatter-"+i).selectAll("circle")
        .data(d.values)
        .exit()
        .remove()
    }
});

}