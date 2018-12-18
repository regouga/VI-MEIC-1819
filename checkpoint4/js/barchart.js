

var teste = [];
var str70 = "bar_chart/bar_chart.csv"

var data;




d3.csv(str70, function(data1){
	console.log("PUTA DEITA-TE");
	console.log(data1);
	
	data1.forEach(function(d) {
		if (d.Country == "ar") {
			teste.push(d);
		} 
	});
	
    data = teste;
						//sort bars based on value
					data = data.sort(function (a, b) {
						return d3.ascending(a.Streams, b.Streams);
					})

					//set up svg using margin conventions - we'll need plenty of room on the left for labels
					var margin = {
						top: 15,
						right: 60,
						bottom: 15,
						left: 60
					};

					var width = 300 - margin.left - margin.right,
						height = 300 - margin.top - margin.bottom;

					var svg = d3.select("#graphic").append("svg")
						.attr("width", width + margin.left + margin.right)
						.attr("height", height + margin.top + margin.bottom)
						.append("g")
						.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

					var x = d3.scale.linear()
											.domain([0, d3.max(teste, function (d) {
							return d.Streams * 1.1;
						})])
						.range([0, width]);


					var y = d3.scale.ordinal()
						.rangeRoundBands([height, 0], .1)
						.domain(data.map(function (d) {
							return d.weather;
						}));

				//	make y axis to show bar names
					var yAxis = d3.svg.axis()
						.scale(y)
						//no tick marks
						.tickSize(0)
						.orient("left")

					var gy = svg.append("g")
						.attr("class", "y axis")
						.call(yAxis)

					var bars = svg.selectAll(".bar")
						.data(data)
						.enter()
						.append("g")

					//append rects
					bars.append("rect")
						.attr("class", "bar")
						.attr("y", function (d) {
							return y(d.weather);
						})
						.attr("height", y.rangeBand())
						.attr("x", 0)
						.attr("width", function (d) {
							return x(d.Streams);
						});

					//add a value label to the right of each bar
					bars.append("text")
						.attr("class", "label")
						//y position of the label is halfway down the bar
						.attr("y", function (d) {
							return y(d.weather) + y.rangeBand() / 2 + 4;
						})
						//x position is 3 pixels to the right of the bar
						.attr("x", function (d) {
							return x(d.Streams) + 3;
						})
						.text(function (d) {
							return Math.floor(d.Streams / 100000);
						});
	
	
	
});



//var data = [{
//							"name": "Sun",
//							"value": 20,
//					},
//						{
//							"name": "Fog",
//							"value": 12,
//					},
//						{
//							"name": "Rain",
//							"value": 19,
//					},
//						{
//							"name": "Thunder",
//							"value": 5,
//					},
//						{
//							"name": "Limes",
//							"value": 16,
//					},
//						{
//							"name": "Oranges",
//							"value": 26,
//					},
//						{
//							"name": "Pears",
//							"value": 30,
//					}];

