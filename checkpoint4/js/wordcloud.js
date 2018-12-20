

//Simple animated example of d3-cloud - https://github.com/jasondavies/d3-cloud
//Based on https://github.com/jasondavies/d3-cloud/blob/master/examples/simple.html

// Encapsulate the word cloud functionality
function wordCloud(selector) {

    var fill = d3.scale.category20();

    //Construct the word cloud's SVG element
    var svg = d3.select(selector).append("svg")
        .attr("width", 300)
        .attr("height", 300)
        .append("g")
        .attr("transform", "translate(150,150)");


    //Draw the word cloud
    function draw(words) {
        var cloud = svg.selectAll("g text")
                        .data(words, function(d) { return d.text; })

        //Entering words
        cloud.enter()
            .append("text")
            .style("font-family", "Helvetica Neue")
			.style("font-weight", "bold")
            .style("fill", function(d, i) { return fill(i); })
            .attr("text-anchor", "middle")
            .attr('font-size', 20)
            .text(function(d) { return d.text; });

        //Entering and existing words
        cloud
            .transition()
                .duration(1000)
                .style("font-size", function(d) { return d.size + "px"; })
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .style("fill-opacity", 1);

        //Exiting words
        cloud.exit()
            .transition()
                .duration(200)
                .style('fill-opacity', 1e-6)
                .attr('font-size', 1)
                .remove();
    }


    //Use the module pattern to encapsulate the visualisation code. We'll
    // expose only the parts that need to be public.
    return {

        //Recompute the word cloud for a new set of words. This method will
        // asycnhronously call draw when the layout has been computed.
        //The outside world will need to call this function, so make it part
        // of the wordCloud return value.
        update: function(words) {
            d3.layout.cloud().size([300, 300])
                .words(words)
                .padding(5)
                .rotate(function() { return 0; })
                .font("Helvetica Neue")
                .fontSize(function(d) { return d.size; })
                .on("end", draw)
                .start();
        }
    }

}

//Some sample data - http://en.wikiquote.org/wiki/Opening_lines
//var words = [
//    "Shakira, CNCO, J Balvin, Ricky Martin, Carlos Vive… Yatra, Charly Black, Zion & Lennox, Bruno Mars, "
//]



//Prepare one of the sample sentences by removing punctuation,
// creating an array of words and computing a random size attribute.
function getWords(i) {
	
    return artistsWordCloud[0]
            .replace(/[!\.:;\?]/g, '')
            .split(',')
            .map(function(d) {
                return {text: d, size: 25};
            })
}

//This method tells the word cloud to redraw with a new set of words.
//In reality the new words would probably come from a server request,
// user input or some other source.
function showNewWords(vis, i) {
	
    i = i || 0;

    vis.update(getWords(i ++ % artistsWordCloud.length))
	
}

//Create a new instance of the word cloud visualisation.


//Start cycling through the demo data

