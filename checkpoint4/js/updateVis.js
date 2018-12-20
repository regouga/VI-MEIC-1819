
function updateViss () {
	
	console.log("Sagres merda" + artistsWordCloud);
	//Start cycling through the demo data
	
	d3.select('#putaquepariu').select("svg").remove();
	var myWordCloud = wordCloud('#putaquepariu');
	showNewWords(myWordCloud);
	showNewWords(myWordCloud);
	showNewWords(myWordCloud);
	
	d3.select("#graphic").select("svg").remove();
	updateBarChart();
	d3.select("#plot").select("svg").remove();
	drawLineChart();
	d3.select("body #sunburst").select("svg").remove();
	drawSunburst();
}

function vissInicial() {
	
	selec_countries = ["PRT"];
	
	console.log("Sagres merda" + artistsWordCloud);
	//Start cycling through the demo data
	
	var myWordCloud = wordCloud('#putaquepariu');
	showNewWords(myWordCloud);
	showNewWords(myWordCloud);
	showNewWords(myWordCloud);
	
	updateBarChart();
	drawLineChart();
	drawSunburst();
}

