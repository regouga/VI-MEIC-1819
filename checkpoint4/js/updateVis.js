
function updateViss () {
	
	console.log("Sagres merda" + artistsWordCloud);
	//Start cycling through the demo data
	var myWordCloud = wordCloud('#putaquepariu');
	showNewWords(myWordCloud);
	showNewWords(myWordCloud);
	showNewWords(myWordCloud);
	
	d3.select("#graphic").select("svg").remove();
	updateBarChart();
}


