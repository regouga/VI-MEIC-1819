

var dataset = [];

  d3.json("jsons/arALTALT.json", function(data) {

    const width = window.innerWidth,
  height = window.innerHeight,
  maxRadius = Math.min(width, height) / 2 - 5
ROOT_NODE_NAME = 'How Weather influences the Music we stream on Spotify'

let isCurrentlyZoomed = false

const x = d3
  .scaleLinear()
  .range([0, 2 * Math.PI])
  .clamp(true);

const y = d3.scaleSqrt().range([maxRadius * 0.1, maxRadius]);

const color = d3.scaleOrdinal(d3.schemeCategory20);

const partition = d3.partition();

const arc = d3
  .arc()
  .startAngle(d => x(d.x0))
  .endAngle(d => x(d.x1))
  .innerRadius(d => Math.max(0, y(d.y0)))
  .outerRadius(d => Math.max(0, y(d.y1)));

const middleArcLine = d => {
  const halfPi = Math.PI / 2;
  const angles = [x(d.x0) - halfPi, x(d.x1) - halfPi];
  const r = Math.max(0, (y(d.y0) + y(d.y1)) / 2);
  
  const middleAngle = (angles[1] + angles[0]) / 2;
  const invertDirection = middleAngle > 0 && middleAngle < Math.PI; // On lower quadrants write text ccw
  if (invertDirection) {
    angles.reverse();
  }
  
  const path = d3.path();
  path.arc(0, 0, r, angles[0], angles[1], invertDirection);
  return path.toString();
};

const textFits = d => {
  const CHAR_SPACE = 6;
  
  const deltaAngle = x(d.x1) - x(d.x0);
  const r = Math.max(0, (y(d.y0) + y(d.y1)) / 2);
  const perimeter = r * deltaAngle;

  //console.log(d.data.name.length)
  
  //return d.data.name.length * CHAR_SPACE < perimeter;
  return true;
};

var div = d3.select("body .toolTip")
console.log(div)

const svg = d3
  .select("body")
  .append("svg")
  .style("width", "100vw")
  .style("height", "100vh")
  .attr("viewBox", `${-width / 2} ${-height / 2} ${width} ${height}`)
  .on("click", () => focusOn()); // Reset zoom on canvas click



    console.log(data);

    var end_date = new Date(2017,0,1);
    console.log(end_date);
    console.log(end_date.getDate());
    console.log(end_date.getMonth());
    var index = dayOfYear(end_date.getDate(),end_date.getMonth());
    console.log(index);


    //dataset.push(data[0])
    dataset = data.children[index].children[0];
    console.log(dataset)

    root = d3.hierarchy(dataset, function(d){return d.children;});
    root.sum(d => d.Streams);
    root.sort(function(a, b) { return b.value - a.value; });
    var total_streams = root.value;
    console.log("HELLLOOOOO");
    console.log(root)

    const slice = svg.selectAll("g.slice").data(partition(root).descendants());

    slice.exit().remove();

    const getClickableClass = d => {
      if (d.children && d.data.name !== ROOT_NODE_NAME) {
        return "slice clickable"
      }
      return "slice"
    }

    const getTooltipText = (d) => {
      const percent = parseInt(100 * d.data.Stream_Count / total_streams)
      div.select(".title").html(translate(d.data.name))
      div.select(".value").html(`${d.value} Streams (${percent}%)`)
      div.select(".info").html(d.data.tooltipInfo)
    }

    const newSlice = slice
      .enter()
      .append("g")
      .attr("class", d => getClickableClass(d))
      .on("click", d => {
        d3.event.stopPropagation();
        if (d.children) focusOn(d)
      })
      .on("mousemove", function(d){
        div.style("left", d3.event.pageX+10+"px");
        div.style("top", d3.event.pageY-25+"px");
        div.style("display", "inline-block");
        getTooltipText(d);
      })
      .on("mouseout", function(d){
        div.style("display", "none");
      });

    newSlice
      .append("path")
      .attr("class", "main-arc")
      .style("fill", d => color((d.children ? d : d.parent).data.name))
      .attr("d", arc);

    newSlice
      .append("path")
      .attr("class", "hidden-arc")
      .attr("id", (_, i) => `hiddenArc${i}`)
      .attr("d", middleArcLine)

    const text = newSlice
      .append("text")
      .attr("display", d => (textFits(d) ? null : "none"));

    // Add white contour
    text
      .append("textPath")
      .attr("startOffset", "50%")
      .attr("xlink:href", (_, i) => `#hiddenArc${i}`)
      .text(d => translate(d.data.name))
      .style("fill", "none")
      .style("stroke-linejoin", "round");

    text
      .append("textPath")
      .attr("startOffset", "50%")
      .attr("xlink:href", (_, i) => `#hiddenArc${i}`)
      .text(d => translate(d.data.name));

    function focusOn(d = {}) {
      const zoomOut = {x0: 0, x1: 1, y0: 0, y1: 1}
      const name = d.data && d.data.name
      if (!name) {
        doFocus(zoomOut)
        isCurrentlyZoomed = false
      } else if (name === ROOT_NODE_NAME && isCurrentlyZoomed) {
        doFocus(zoomOut)
        isCurrentlyZoomed = false
      } else if (name !== ROOT_NODE_NAME) {
        if (isCurrentlyZoomed) {
          doFocus(zoomOut)
          isCurrentlyZoomed = false
        } else {
          doFocus(d)
          isCurrentlyZoomed = true
        }
      }
    }
    function doFocus(d) {
      const transition = svg
        .transition()
        .duration(750)
        .tween("scale", () => {
          const xd = d3.interpolate(x.domain(), [d.x0, d.x1]),
            yd = d3.interpolate(y.domain(), [d.y0, 1]);
          return t => {
            x.domain(xd(t));
            y.domain(yd(t));
          };
        });
      
      transition.selectAll("path.main-arc").attrTween("d", d => () => arc(d));
      
      transition
        .selectAll("path.hidden-arc")
        .attrTween("d", d => () => middleArcLine(d));
      
      transition
        .selectAll("text")
        .attrTween("display", d => () => (textFits(d) ? null : "none"));
      
      moveStackToFront(d);
      
      function moveStackToFront(elD) {
        svg
          .selectAll(".slice")
          .filter(d => d === elD)
          .each(function(d) {
            this.parentNode.appendChild(this);
            if (d.parent) {
              moveStackToFront(d.parent);
            }
          });
      }
    }
  });



function translate(textToTranslate){
  if (textToTranslate == '0 0 0 0 0 0') {
    return 'Sunny';
  }
  else if (textToTranslate == '0 1 0 0 0 0'){
    return 'Rain'
  }
  else if (textToTranslate == '1 1 1 0 0 0'){
    return 'Fog - Rain - Snow'
  }
  else if (textToTranslate == '1 0 0 0 0 0'){
    return 'Fog'
  }
  else if (textToTranslate == '1 0 1 0 0 0'){
    return 'Fog - Snow'
  }
  else if (textToTranslate == '0 0 1 0 0 0'){
    return 'Snow'
  }
  else if (textToTranslate == '0 1 1 0 0 0'){
    return 'Rain - Snow'
  }
  else if (textToTranslate == '0 1 0 0 1 0'){
    return 'Rain - Thunder'
  }
  else if (textToTranslate == '1 1 0 0 0 0'){
    return 'Fog - Rain'
  }
  else if (textToTranslate == '0 1 1 1 1 0'){
    return 'Rain - Snow - Hail - Thunder'
  }
  else if (textToTranslate == '1 1 1 0 1 0'){
    return 'Fog - Rain - Snow - Thunder'
  }
  else if (textToTranslate == '0 0 0 0 1 0'){
    return 'Thunder'
  }
  else if (textToTranslate == '0 1 1 0 1 0'){
    return 'Rain - Snow - Thunder'
  }
  else if (textToTranslate == '1 1 0 0 1 0'){
    return 'Fog - Rain - Thunder'
  }
  else if (textToTranslate == '0 1 1 1 0 0'){
    return 'Rain - Snow - Hail'
  }
  else if (textToTranslate == '0 1 0 1 1 0'){
    return 'Rain - Hail - Thunder'
  }
  else if (textToTranslate == '0 1 0 1 0 0'){
    return 'Rain - Hail'
  }
  else if (textToTranslate == '0 0 0 0 1 1'){
    return 'Thunder - Tornado'
  }
  else if (textToTranslate == '1 0 1 0 0 0'){
    return 'Fog - Snow'
  }
  else if (textToTranslate == '1 1 0 1 1 0'){
    return 'Fog - Rain - Hail - Thunder'
  }
  else if (textToTranslate == '0 1 0 0 1 1'){
    return 'Rain - Thunder - Tornado'
  }
  else if (textToTranslate == '1 1 1 1 0 0'){
    return 'Fog - Rain - Snow - Hail'
  }
  else if (textToTranslate == '0 1 0 0 0 1'){
    return 'Rain - Tornado'
  }
  else{
    return textToTranslate;
  }
}

function dayOfYear(day, month){
  if (month == 11 && (day == 31 || day == 30 || day == 29)){
    return 361;
  }
  console.log("oi")
  var end = new Date(2017, month, day);
  console.log(end);
  var start = new Date(2017, 0, 1);
  console.log(start);
  var diff = end - start;
  var oneDay = 1000 * 60 * 60 * 24;
  var day = Math.floor(diff / oneDay);
  console.log('Day of year: ' + day);
  return day;
}

