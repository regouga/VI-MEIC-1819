
function updateViss () {
	

	//Start cycling through the demo data
	d3.select('#putaquepariu').select("svg").remove();
	var myWordCloud = wordCloud('#putaquepariu');
	showNewWords(myWordCloud);
	showNewWords(myWordCloud);
	showNewWords(myWordCloud);
	
	d3.select("#graphic").select("svg").remove();
	updateBarChart();
	d3.select("#plot").select("svg").remove();
	d3.select("#circle0").remove();
	d3.select("#circle1").remove();
	d3.select("#circle2").remove();
	d3.select("#circle3").remove();
	d3.select("#circle4").remove();
	d3.select("#circle5").remove();
	d3.select("#span0").remove();
	d3.select("#span1").remove();
	d3.select("#span2").remove();
	d3.select("#span3").remove();
	d3.select("#span4").remove();
	d3.select("#span5").remove();
	drawLineChart();
	d3.select("body #sunburst").select("svg").remove();
	drawSunburst();
}

function vissInicial() {

	state_id = "PRT";
	selec_countries = ["PRT"];
	num_selec_countries = 1;

	var ul = document.getElementById("lista");
	var li = document.createElement("PRT");
	li.className = "list-group-item";
	li.id = "PRT";
	li.appendChild(document.createTextNode("PRT"));
	ul.appendChild(li);

	var str67 = "map/"
	var str68 = getCountryISO2(state_id);
	var str69 = ".csv"
	var str70 = str67.concat(str68, str69)
	
	d3.dsv(",", str70, function(csv) {
	  return {
		Country: csv.Country,
		Date: csv.Date,
		TrackName: csv.TrackName,
		Artist: csv.Artist,
		Position: csv.Position  
		  
	  };
	}).then(function(csv) {
		for (var i = 0; i < selec_dates.length; i++) {

			var current_date = selec_dates[i].toLocaleDateString("pt-PT");
			
			
			var div = document.getElementById('listamusicas');
			var str1 = "<p style=\"font-size: 15px;\">Top 10 in "
			var str2 = getCountryName(state_id);
			var str3 = " in "	
			var str4 = current_date;
			var res = str1.concat(str2, str3, str4);
			div.innerHTML += res;
			if (artistsWordCloud.length > 0) {
				console.log("putaquepariu")
				document.getElementById("putaquepariu").innerHTML = "";
			}
				
			
			strArtists = "";
			csv.forEach(function(d) {
			if (d.Date == current_date && d.Country == getCountryISO2(state_id)){
				
				
				var string = d.Artist
				var newString = string.replace(/\s+/g,' ').trim();
				strArtists += newString;
				strArtists += ", ";

				teste.push(d);
			} 
		});

			artistsWordCloud.unshift(strArtists);
//console.log(artistsWordCloud)
			function tabulate_aux(data, columns) {
											
											var table = d3.select('#listamusicas').append('table')
											var thead = table.append('thead')
											var	tbody = table.append('tbody');

											// append the header row
											thead.append('tr')
											  .selectAll('th')
											  .data(columns).enter()
											  .append('th')
												.text(function (column) { 
												if (column == "Position") return "#"
												else return column; });

											// create a row for each object in the data
											var rows = tbody.selectAll('tr')
											  .data(data)
											  .enter()
											  .append('tr');

											// create a cell in each row for each column
											var cells = rows.selectAll('td')
											  .data(function (row) {
												return columns.map(function (column) {
												  return {column: column, value: row[column]};
												});
											  })
											  .enter()
											  .append('td')
												.text(function (d) { return d.value; });

										  return table;
										}


			tabulate_aux(teste, ['Position', 'TrackName', 'Artist']); // 2 column table
			div.innerHTML += "<hr style=\"border: 1px solid black;\" />"
			teste = [];
			//console.log(artistsWordCloud)
		}

	

	//Start cycling through the demo data
	//console.log(artistsWordCloud)
	//artistsWordCloud = ['Big Sean', 'Zayn', 'Aminé']
	var myWordCloud = wordCloud('#putaquepariu');
	showNewWords(myWordCloud);
	showNewWords(myWordCloud);
	showNewWords(myWordCloud);
	});
	updateBarChart();
	drawLineChart();
	drawSunburst();
}

