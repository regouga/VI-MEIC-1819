// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// parse the date / time
var parseTime = d3.timeParse("%d/%b/%y");

// set the ranges
var x = d3.scaleOrdinal().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);



// define the line
var valueline = d3.line()
    .x(function(d) { return x(d.Date); })
    .y(function(d) { return y(d.Streams); });


// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
// Get the data
d3.csv("line_chart/ar.csv", function(error, data) {

  if (error) throw error;

  // format the data
  var i = 0;
  var dates_new = [];
  var current_date = null;
  console.log("#############");
  selec_dates.forEach(function(d){
    current_date = selec_dates[i++].toLocaleDateString("pt-PT");
    console.log(current_date);
    data.forEach(function(d) {
      if(d.Date == current_date){

        dates_new.push({date:current_date, Streams:d.Streams});
        console.log("%%%%%%%%");
        console.log(current_date);
        console.log(d.Streams);
        dates_new.forEach(function(d){console.log(d.date);});
        dates_new.forEach(function(d){console.log(d.Streams);});

        console.log("%%%%%%%%");
      }
        
    });
  });
  
  // Scale the range of the data
  debugger;
  //x.domain(d3.extent(dates_new, function(d) { return d.date; }));


  x.domain(dates_new.map(function(d){return d.date;}));
  y.domain([0, d3.max(dates_new, function(d) { return d.Streams; })]);
console.log(x);
  // Add the valueline path.
  svg.append("path")
      .data(dates_new)
      .attr("class", "line")
      .attr("d", valueline);

console.log("oiiii");  

// Add the X Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // Add the Y Axis
  svg.append("g")
      .call(d3.axisLeft(y));

});