
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
	
	selec_countries = ["PRT"];
	
	//Start cycling through the demo data
	
	var myWordCloud = wordCloud('#putaquepariu');
	showNewWords(myWordCloud);
	showNewWords(myWordCloud);
	showNewWords(myWordCloud);
	
	updateBarChart();
	drawLineChart();
	drawSunburst();
}

