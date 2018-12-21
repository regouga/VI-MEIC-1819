function drawLineChart() {
	
	    function transition(path) {
        path.transition()
            .duration(2000)
            .attrTween("stroke-dasharray", tweenDash);
    }
    function tweenDash() {
        var l = this.getTotalLength(),
            i = d3.interpolateString("0," + l, l + "," + l);
        return function (t) { return i(t); };
    }
	
	
	var data;
	var streamsInCountry = [];
	var dias = []
	var colors_availa=["rgb(31, 119, 180)", "rgb(44, 160, 44)", "rgb(214, 39, 40)", "rgb(148, 103, 189)", "rgb(255, 127, 14)", "rgb(255, 187, 120)"];
	
	function get_color_availa(i)  {
		return colors_availa.slice(-(i+1))[0];
	}
	var divisor = 1000;

	var margin = {top: 20,right: 20,bottom: 30,left: 60};

	var width = 300 - margin.left - margin.right,height = 280 - margin.top - margin.bottom;

	var xScale = d3.scaleTime()
		.range([0, width])
		.domain(d3.extent(selec_dates, function(d) { return d; }));
	

	
	d3.dsv(",", "../line_chart/all.csv", function(csvdata) {
		return {
			Date: csvdata.Date,
			Country: csvdata.Country,
			Streams: csvdata.Streams,
			Indicators: csvdata.Indicators
										  
		};
	}).then(function(data) { 
		
	
	
		for (var j = 0; j < selec_dates.length; j++) {
			var current_date = selec_dates[j].toLocaleDateString("pt-PT");
			if (!dias.includes(current_date)){
				dias.push(current_date);
			}
			data.forEach(function(d) {
				for (var l=0; l < selec_countries.length; l++) {
					if (current_date == d.Date &&  d.Country == getCountryISO2(selec_countries[l])) {
						streamsInCountry.push(d);
					}
				}
				
			});
		}
		



	/*********************** Plot Below *********************/
		var yScale = d3.scaleLinear()
			.range([height, 0])
			.domain(d3.extent(streamsInCountry, function(d) {
				return d.Streams/divisor;
			})).nice();
		

		var xAxis = d3.axisBottom()
			.scale(xScale)
			.ticks(selec_dates.length)
		  .tickFormat(d3.timeFormat("%d %b"));

		var yAxis = d3.axisLeft().scale(yScale);

		var ticks = xScale.ticks(selec_dates.length);

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
				return yScale(d.Streams/divisor);
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
            

			var line = svg.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")")


			var dot = svg.append("g")
				.attr("id", "scatter")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			dataNest.forEach(function (d, i) {
			var countryMapping = {
  ar: "Argentina",
  au: "Australia",
  at: "Austria",
  be: "Belgium",
  bo: "Bolivia",
  br: "Brazil",
  ca: "Canada",
  cl: "Chile",
  hk: "China",
  co: "Colombia",
  cr: "Costa Rica",
  cz: "Czech Republic",
  dk: "Denmark",
  do: "Dominican Republic",
  ec: "Ecuador",
  sv: "El Salvador",
  ee: "Estonia",
  fi: "Finland",
  fr: "France",
  de: "Germany",
  gr: "Greece",
  gt: "Guatemala",
  hn: "Honduras",
  hu: "Hungary",
  is: "Iceland",
  id: "Indonesia",
  ie: "Ireland",
  it: "Italy",
  jp: "Japan",
  lv: "Latvia",
  lt: "Lithuania",
  lu: "Luxembourg",
  my: "Malaysia",
  mx: "Mexico",
  nl: "Netherlands",
  nz: "New Zealand",
  no: "Norway",
  pa: "Panama",
  py: "Paraguay",
  pe: "Peru",
  ph: "Philippines",
  pl: "Poland",
  pt: "Portugal",
  sg: "Singapore",
  sk: "Slovakia",
  es: "Spain",
  se: "Sweden",
  ch: "Switzerland",
  tw: "Taiwan",
  tr: "Turkey",
  gb: "United Kingdom",
  us: "United States",
  uy: "Uruguay",
}
				console.log("#legend"+i);
				console.log(get_color_availa(i))
				console.log(countryMapping[d.key])
				var circle = "circle" + i;
				var span = "span" + i;
				$("#legend"+i).append($('<div id='+circle+' style="background-color: '+ get_color_availa(i)+';"></div><span id='+span+' style="font-size: 12px;vertical-align: middle;">'+countryMapping[d.key] + '</span>'));
				

				// Add line plot
				line.append("g")
					.attr("id", "line-" + i)
					.attr("clip-path", "url(#clip)")
					.append("path")
					.attr("data-legend",function() { return d.key;})
					.call(transition)
					.datum(d.values)
					.attr("class", "pointlines")
					.attr("d", plotLine)
					.style("fill", "none")
					.style("stroke", function () {
						return d.colour = get_color_availa(i);
					})
					.on("mouseover", function (d) {                                  
                        d3.select(this).style("stroke-width",'4px');
                    })
                    .on("mouseout", function(d) {        //undo everything on the mouseout
                        d3.select(this).style("stroke-width",'1px');          
                    });

        		svg.append("text")             
        		  	.attr("transform",
        				"translate(" + (width/2 + 60) + " ," + 
        							   (height + margin.top + 30) + ")")
        		  	.style("text-anchor", "middle")
        		  	.text("Date");

        		// text label for the y axis
                    svg.append("text")      		  
            		  .attr("y", +15 )
            		  .attr("x", -height/2 + margin.top/2 -30 )
            		  .attr("transform", "rotate(-90)")
            		  .style("text-anchor", "middle")
            		  .text("Streams (Thousands)");

				function translate(textToTranslate){
				  if (textToTranslate == '0 0 0 0 0 0') {
				    return 'weather_icons/sun.png';
				  }
				  else if (textToTranslate == '0 1 0 0 0 0'){
				    return 'weather_icons/rain.png'
				  }
				  else if (textToTranslate == '1 1 1 0 0 0'){
				    return 'weather_icons/rain.png'
				  }
				  else if (textToTranslate == '1 0 0 0 0 0'){
				    return 'weather_icons/fog.png'
				  }
				  else if (textToTranslate == '1 0 1 0 0 0'){
				    return 'weather_icons/snow.png'
				  }
				  else if (textToTranslate == '0 0 1 0 0 0'){
				    return 'weather_icons/snow.png'
				  }
				  else if (textToTranslate == '0 1 1 0 0 0'){
				    return 'weather_icons/snow.png'
				  }
				  else if (textToTranslate == '0 1 0 0 1 0'){
				    return 'weather_icons/thunder.png'
				  }
				  else if (textToTranslate == '1 1 0 0 0 0'){
				    return 'weather_icons/fog.png'
				  }
				  else if (textToTranslate == '0 1 1 1 1 0'){
				    return 'weather_icons/thunder.png'
				  }
				  else if (textToTranslate == '1 1 1 0 1 0'){
				    return 'weather_icons/thunder.png'
				  }
				  else if (textToTranslate == '0 0 0 0 1 0'){
				    return 'weather_icons/thunder.png'
				  }
				  else if (textToTranslate == '0 1 1 0 1 0'){
				    return 'weather_icons/snow.png'
				  }
				  else if (textToTranslate == '1 1 0 0 1 0'){
				    return 'weather_icons/thunder.png'
				  }
				  else if (textToTranslate == '0 1 1 1 0 0'){
				    return 'weather_icons/hail.png'
				  }
				  else if (textToTranslate == '0 1 0 1 1 0'){
				    return 'weather_icons/thunder.png'
				  }
				  else if (textToTranslate == '0 1 0 1 0 0'){
				    return 'weather_icons/hail.png'
				  }
				  else if (textToTranslate == '0 0 0 0 1 1'){
				    return 'weather_icons/tornado.png'
				  }
				  else if (textToTranslate == '1 0 1 0 0 0'){
				    return 'weather_icons/snow.png'
				  }
				  else if (textToTranslate == '1 1 0 1 1 0'){
				    return 'weather_icons/thunder.png'
				  }
				  else if (textToTranslate == '0 1 0 0 1 1'){
				    return 'weather_icons/tornado.png'
				  }
				  else if (textToTranslate == '1 1 1 1 0 0'){
				    return 'weather_icons/hail.png'
				  }
				  else if (textToTranslate == '0 1 0 0 0 1'){
				    return 'weather_icons/tornado.png'
				  }
				  else{
				    return textToTranslate;
				  }
				}				
				svg.selectAll("images")
					.data(d.values)
					.enter().append("svg:image")
					.attr("class", "images")
					.attr('x', function(d) {
				    	for (var j = 0; j < selec_dates.length; j++) {
				            if (selec_dates[j].toLocaleDateString("pt-PT") == d.Date) {
				                break;
				            }
				        }
				        return (xScale(j) + (-xScale(0))) +j * width/(selec_dates.length-1)+50 ;
				    })
				.attr("y", function(d) {
				    return yScale(d.Streams/divisor)+10;
				})
				.attr('width', 20)
				.attr('height', 20)
				.attr("xlink:href", function(d){return translate(d.Indicators);})
				.style("opacity", 0.0);

				var imagens = d3.selectAll(".images")
					.transition().delay(function(d, i) { return i * 100; }).duration(2000).style("opacity", 1.0)
					;


	}); // End data nest loop





});

}


	    function transition(path) {
        path.transition()
            .duration(2000)
            .attrTween("stroke-dasharray", tweenDash);
    }
    function tweenDash() {
        var l = this.getTotalLength(),
            i = d3.interpolateString("0," + l, l + "," + l);
        return function (t) { return i(t); };
    }
	
	
	var data;
	var streamsInCountry = [];
	var dias = []
	var colors_availa=["blue", "green","red", "purple","orange", "yellow"];
	
	
	var divisor = 1000;

	var margin = {top: 20,right: 20,bottom: 30,left: 60};

	var width = 300 - margin.left - margin.right,height = 280 - margin.top - margin.bottom;

	var xScale = d3.scaleTime()
		.range([0, width])
		.domain(d3.extent(selec_dates, function(d) { return d; }));
	

	
	d3.dsv(",", "line_chart/all.csv", function(data) {
		
	
	
		for (var j = 0; j < selec_dates.length; j++) {
			var current_date = selec_dates[j].toLocaleDateString("pt-PT");
			if (!dias.includes(current_date)){
				dias.push(current_date);
			}
			data.forEach(function(d) {
				for (var l=0; l < selec_countries.length; l++) {
					if (current_date == d.Date &&  d.Country == getCountryISO2(selec_countries[l])) {
						streamsInCountry.push(d);
					}
				}
				
			});
		}
		
		console.log("LOL");
		console.log(streamsInCountry);




	/*********************** Plot Below *********************/
		var yScale = d3.scaleLinear()
			.range([height, 0])
			.domain(d3.extent(streamsInCountry, function(d) {
				return d.Streams/divisor;
			})).nice();
		// Set colour Scale
		let colour = d3.scaleOrdinal(d3.schemeCategory20);

		var xAxis = d3.axisBottom()
			.scale(xScale)
			.ticks(selec_dates.length)
		  .tickFormat(d3.timeFormat("%d %b"));

		var yAxis = d3.axisLeft().scale(yScale);

		var ticks = xScale.ticks(selec_dates.length);

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
			return yScale(d.Streams/divisor);
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
            

			var line = svg.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")")


			var dot = svg.append("g")
				.attr("id", "scatter")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			dataNest.forEach(function (d, i) {
			// Add line plot

				line.append("g")
					.attr("id", "line-" + i)
					.attr("clip-path", "url(#clip)")
					.append("path")
					.call(transition)
					.datum(d.values)
					.attr("class", "pointlines")
					.attr("d", plotLine)
					.style("fill", "none")
					.style("stroke", function () {

						return d.colour = colors_availa[i];
					});

        		  svg.append("text")             
        		  .attr("transform",
        				"translate(" + (width/2 + 60) + " ," + 
        							   (height + margin.top + 30) + ")")
        		  .style("text-anchor", "middle")
        		  .text("Date");

// dot.append("g")
//     .selectAll(".symbol")
//     .data(d.values)
//     .enter()
//     .append("circle")
//     .attr("class", "symbol")
    
//     .attr("cx", function(d, i) {
//       for (var j = 0; j < selec_dates.length; j++) {
//                       if (selec_dates[j].toLocaleDateString("pt-PT") == d.Date) {
//                           break;
//                       }
//                     }
//                     return (xScale(j) + (-xScale(0))) +j * width/(selec_dates.length-1);
//     })
//     .attr("cy", function(d, i) {
//       return yScale(d.Streams/divisor);
//     })
//     .style("background", "url(weather_icons/sun.png)");;
				// dot.append("g")
				//   .selectAll("image")
				//   .data(d.values)
				// 	.enter().append("circle")
				// 	.attr("class", "symbol")

				// 	.attr("r", 2)
				// 	.attr("cx", function(d) {
				// 	  for (var j = 0; j < selec_dates.length; j++) {
				// 		if (selec_dates[j].toLocaleDateString("pt-PT") == d.Date) {
				// 			break;
				// 		}
				// 	  }
				// 	  return (xScale(j) + (-xScale(0))) +j * width/(selec_dates.length-1);
				// 	})
				// 	.attr("cy", function(d) {
				// 	  return yScale(d.Streams/divisor);
				// 	})
				// 	.attr("stroke-width", "2px")
				// 	.style("fill", function() {
				// 	  return d.colour = colors_availa[i];
				// 	});
    //                 .style("xlink:href", "weather_icons/sun.png");
function translate(textToTranslate){
  if (textToTranslate == '0 0 0 0 0 0') {
    return 'weather_icons/sun.png';
  }
  else if (textToTranslate == '0 1 0 0 0 0'){
    return 'weather_icons/rain.png'
  }
  else if (textToTranslate == '1 1 1 0 0 0'){
    return 'weather_icons/rain.png'
  }
  else if (textToTranslate == '1 0 0 0 0 0'){
    return 'weather_icons/fog.png'
  }
  else if (textToTranslate == '1 0 1 0 0 0'){
    return 'weather_icons/snow.png'
  }
  else if (textToTranslate == '0 0 1 0 0 0'){
    return 'weather_icons/snow.png'
  }
  else if (textToTranslate == '0 1 1 0 0 0'){
    return 'weather_icons/snow.png'
  }
  else if (textToTranslate == '0 1 0 0 1 0'){
    return 'weather_icons/thunder.png'
  }
  else if (textToTranslate == '1 1 0 0 0 0'){
    return 'weather_icons/fog.png'
  }
  else if (textToTranslate == '0 1 1 1 1 0'){
    return 'weather_icons/thunder.png'
  }
  else if (textToTranslate == '1 1 1 0 1 0'){
    return 'weather_icons/thunder.png'
  }
  else if (textToTranslate == '0 0 0 0 1 0'){
    return 'weather_icons/thunder.png'
  }
  else if (textToTranslate == '0 1 1 0 1 0'){
    return 'weather_icons/snow.png'
  }
  else if (textToTranslate == '1 1 0 0 1 0'){
    return 'weather_icons/thunder.png'
  }
  else if (textToTranslate == '0 1 1 1 0 0'){
    return 'weather_icons/hail.png'
  }
  else if (textToTranslate == '0 1 0 1 1 0'){
    return 'weather_icons/thunder.png'
  }
  else if (textToTranslate == '0 1 0 1 0 0'){
    return 'weather_icons/hail.png'
  }
  else if (textToTranslate == '0 0 0 0 1 1'){
    return 'weather_icons/tornado.png'
  }
  else if (textToTranslate == '1 0 1 0 0 0'){
    return 'weather_icons/snow.png'
  }
  else if (textToTranslate == '1 1 0 1 1 0'){
    return 'weather_icons/thunder.png'
  }
  else if (textToTranslate == '0 1 0 0 1 1'){
    return 'weather_icons/tornado.png'
  }
  else if (textToTranslate == '1 1 1 1 0 0'){
    return 'weather_icons/hail.png'
  }
  else if (textToTranslate == '0 1 0 0 0 1'){
    return 'weather_icons/tornado.png'
  }
  else{
    return textToTranslate;
  }
}				
svg
 .selectAll("images")
 .data(d.values)
.enter().append("svg:image")


.attr('x', function(d) {
                    for (var j = 0; j < selec_dates.length; j++) {
                      if (selec_dates[j].toLocaleDateString("pt-PT") == d.Date) {
                          break;
                      }
                    }
                    return (xScale(j) + (-xScale(0))) +j * width/(selec_dates.length-1)+50 ;
                  })
.attr("y", function(d) {
    return yScale(d.Streams/divisor)+10;
})
.attr('width', 20)
.attr('height', 20)
.attr("xlink:href", function(d){
    
    return translate(d.Indicators);

});

                // text label for the y axis
                    svg.append("text")
            		  .attr("transform", "rotate(-90)")
            		  .attr("y", 0 - margin.left)
            		  .attr("x",0 - (height / 2))
            		  .attr("dy", "1em")
            		  .style("text-anchor", "middle")
            		  .text("Value");
            			}); // End data nest loop




});
