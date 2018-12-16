var fills = {
	HIGH: '#ff0000',
	LOW: '#000000'
	
};

function arrayRemove(arr, value) {

   return arr.filter(function(ele){
       return ele != value;
   });

}


var countryISO3Mapping = {
  ar: "ARG",
  au: "AUS",
  at: "AUT",
  be: "BEL",
//  CAN: "ca",
//  CHL: "cl",
//  CHN: "hk",
//  COL: "co",
//  CRI: "cr",
//  CZE: "cz",
//  DNK: "dk",
//  DOM: "do",
//  ECU: "ec",
//  SLV: "sv",
//  EST: "ee",
//  FIN: "fi",
//  FRA: "fr",
//  DEU: "de",
//  GRC: "gr",
//  GTM: "gt",
//  HND: "hn",
//  HUN: "hu",
//  ISL: "is",
//  IDN: "id",
//  IRL: "ie",
//  ITA: "it",
//  JPN: "jp",
//  LVA: "lv",
//  LTU: "lt",
//  LUX: "lu",
//  MYS: "my",
//  MEX: "mx",
//  NLD: "nl",
//  NZL: "nz",
//  NOR: "no",
//  PAN: "pa",
//  PRY: "py",
//  PER: "pe",
//  PHL: "ph",
//  POL: "pl",
//  PRT: "pt",
//  SGP: "sg",
//  SVK: "sk",
//  ESP: "es",
//  SWE: "se",
//  CHE: "ch",
//  TWN: "tw",
//  TUR: "tr",
//  GBR: "gb",
//  USA: "us",
//  URY: "uy",
}
	

var countryISOMapping = {
  ARG: "ar",
  AUS: "au",
  AUT: "at",
  BEL: "be",
  BOL: "bo",
  BRA: "br",
  CAN: "ca",
  CHL: "cl",
  CHN: "hk",
  COL: "co",
  CRI: "cr",
  CZE: "cz",
  DNK: "dk",
  DOM: "do",
  ECU: "ec",
  SLV: "sv",
  EST: "ee",
  FIN: "fi",
  FRA: "fr",
  DEU: "de",
  GRC: "gr",
  GTM: "gt",
  HND: "hn",
  HUN: "hu",
  ISL: "is",
  IDN: "id",
  IRL: "ie",
  ITA: "it",
  JPN: "jp",
  LVA: "lv",
  LTU: "lt",
  LUX: "lu",
  MYS: "my",
  MEX: "mx",
  NLD: "nl",
  NZL: "nz",
  NOR: "no",
  PAN: "pa",
  PRY: "py",
  PER: "pe",
  PHL: "ph",
  POL: "pl",
  PRT: "pt",
  SGP: "sg",
  SVK: "sk",
  ESP: "es",
  SWE: "se",
  CHE: "ch",
  TWN: "tw",
  TUR: "tr",
  GBR: "gb",
  USA: "us",
  URY: "uy",
}

var countrynaming = {
  ARG: "Argentina",
  AUS: "Australia",
  AUT: "Austria",
  BEL: "Belgium",
  BOL: "Bolivia",
  BRA: "Brazil",
  CAN: "Canada",
  CHL: "Chile",
  CHN: "China",
  COL: "Colombia",
  CRI: "Costa Rica",
  CZE: "Czech Republic",
  DNK: "Denmark",
  DOM: "Dominican Republic",
  ECU: "Ecuador",
  SLV: "El Salvador",
  EST: "Estonia",
  FIN: "Finland",
  FRA: "France",
  DEU: "Germany",
  GRC: "Greece",
  GTM: "Guatemala",
  HND: "Honduras",
  HUN: "Hungary",
  ISL: "Iceland",
  IDN: "Indonesia",
  IRL: "Ireland",
  ITA: "Italy",
  JPN: "Japan",
  LVA: "Latvia",
  LTU: "Lithuania",
  LUX: "Luxembourg",
  MYS: "Malaysia",
  MEX: "Mexico",
  NLD: "The Netherlands",
  NZL: "New Zealand",
  NOR: "Norway",
  PAN: "Panama",
  PRY: "Paraguay",
  PER: "Peru",
  PHL: "Philippines",
  POL: "Poland",
  PRT: "Portugal",
  SGP: "Singapore",
  SVK: "Slovakia",
  ESP: "Spain",
  SWE: "Sweden",
  CHE: "Switzerland",
  TWN: "Taiwan",
  TUR: "Turkey",
  GBR: "United Kingdom",
  USA: "United States",
  URY: "Urugay",
}


function tabulate(data, columns, id) {
    var table = d3.select(id).append("table"),
        thead = table.append("thead"),
        tbody = table.append("tbody");

    // append the header row
    thead.append("tr")
        .selectAll("th")
        .data(columns)
        .enter()
        .append("th")
        .text(function(column) { return column; });

    // create a row for each object in the data
    var rows = tbody.selectAll("tr")
        .data(data)
        .enter()
        .append("tr");

    // create a cell in each row for each column
    // At this point, the rows have data associated.
    // So the data function accesses it.
    var cells = rows.selectAll("td")
        .data(function(row) {
            // he does it this way to guarantee you only use the
            // values for the columns you provide.
            return columns.map(function(column) {
                // return a new object with a value set to the row's column value.
                return {value: row[column]};
            });
        })
        .enter()
        .append("td")
        .text(function(d) { return d.value; });
    return table;
}

// render the table
// var peopleTable = tabulate(data, ["date", "close"]);


function getCountryISO3(countryCode) {
  return countryISO3Mapping[countryCode]
}


function getCountryISO2(countryCode) {
  return countryISOMapping[countryCode]
}

function getCountryName(countryCode) {
  return countrynaming[countryCode]
}



function updateSongList(state_id) {
	
	console.log("AMOR DE VERDADE");
	var teste = [];
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
										
										console.log("Estou aqui");
										console.log(teste);
										for (var i = 0; i < selec_dates.length; i++) {

											var current_date = selec_dates[i].toLocaleDateString("pt-PT");
											console.log(current_date);
											
											var div = document.getElementById('listamusicas');
										var str1 = "<p style=\"font-size: 15px;\">Top 10 in "
										var str2 = getCountryName(state_id);
										var str3 = " in "	
										var str4 = current_date;
										var res = str1.concat(str2, str3, str4);
										div.innerHTML += res;
											
											csv.forEach(function(d) {
											if (d.Date == current_date && d.Country == getCountryISO2(state_id)) teste.push(d);
										});


										function tabulate(data, columns) {
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

										// render the tables
											
										tabulate(teste, ['Position', 'TrackName', 'Artist']); // 2 column table
										div.innerHTML += "<hr style=\"border: 1px solid black;\" />"
										teste = [];
											
										}
										
																				

										
									});
}


var cenas;
d3.csv("map/weather_by_day.csv", function(csvdata) {
	cenas = csvdata;
});


				function Datamap() {
					this.$container = $("#container");
					this.instance = new Datamaps({
						scope: 'world',
						element: this.$container.get(0),
						projection: 'mercator',
						fills: {
							HIGH: '#1DB954',
							LOW: '#000000',
							defaultFill: '#BEBEBE',
						},
						
						data: {
							
							
							IRL: {
								fillKey: 'HIGH'
							},
							USA: {
								fillKey: 'HIGH'
							},
							DEU: {
								fillKey: 'HIGH'
							},
							ARG: {
								fillKey: 'HIGH'
							},
							AUT: {
								fillKey: 'HIGH'
							},
							AUS: {
								fillKey: 'HIGH'
							},
							AUT: {
								fillKey: 'HIGH'
							},
							BOL: {
								fillKey: 'HIGH'
							},
							BRA: {
								fillKey: 'HIGH'
							},
							BEL: {
								fillKey: 'HIGH'
							},
							CAN: {
								fillKey: 'HIGH'
							},
							CHL: {
								fillKey: 'HIGH'
							},
							COL: {
								fillKey: 'HIGH'
							},
							CRI: {
								fillKey: 'HIGH'
							},
							DNK: {
								fillKey: 'HIGH'
							},
							SLV: {
								fillKey: 'HIGH'
							},
							ECU: {
								fillKey: 'HIGH'
							},
							SVK: {
								fillKey: 'HIGH'
							},
							ESP: {
								fillKey: 'HIGH'
							},
							EST: {
								fillKey: 'HIGH'
							},
							PHL: {
								fillKey: 'HIGH'
							},
							FIN: {
								fillKey: 'HIGH'
							},
							FRA: {
								fillKey: 'HIGH'
							},
							GRC: {
								fillKey: 'HIGH'
							},
							GTM: {
								fillKey: 'HIGH'
							},
							NLD: {
								fillKey: 'HIGH'
							},
							HND: {
								fillKey: 'HIGH'
							},
							HUN: {
								fillKey: 'HIGH'
							},
							IDN: {
								fillKey: 'HIGH'
							},
							ISL: {
								fillKey: 'HIGH'
							},
							ITA: {
								fillKey: 'HIGH'
							},
							JPN: {
								fillKey: 'HIGH'
							},
							LVA: {
								fillKey: 'HIGH'
							},
							LTU: {
								fillKey: 'HIGH'
							},
							LUX: {
								fillKey: 'HIGH'
							},
							MYS: {
								fillKey: 'HIGH'
							},
							MEX: {
								fillKey: 'HIGH'
							},
							NOR: {
								fillKey: 'HIGH'
							},
							NZL: {
								fillKey: 'HIGH'
							},
							PAN: {
								fillKey: 'HIGH'
							},
							PRY: {
								fillKey: 'HIGH'
							},
							PER: {
								fillKey: 'HIGH'
							},
							PRT: {
								fillKey: 'HIGH'
							},
							GBR: {
								fillKey: 'HIGH'
							},
							CZE: {
								fillKey: 'HIGH'
							},
							DOM: {
								fillKey: 'HIGH'
							},
							MEX: {
								fillKey: 'HIGH'
							},
							SWE: {
								fillKey: 'HIGH'
							},
							CHE: {
								fillKey: 'HIGH'
							},
							TWN: {
								fillKey: 'HIGH'
							},
							TUR: {
								fillKey: 'HIGH'
							},
							URY: {
								fillKey: 'HIGH'
							},
							POL: {
								fillKey: 'HIGH'
							},
							CHN: {
								fillKey: 'HIGH'
							}
						},
						geographyConfig: {
							highlightOnHover: false,
							popupTemplate: function(geo, csvdata1) {
								var lol;
								
								
								var current_date = selec_dates[0].toLocaleDateString("pt-PT");
								cenas.forEach(function(d) {
									if (d.id == getCountryISO2(geo.id) && d.Date == current_date) {
										var indicators = d.Indicators;
										if (indicators == "0 0 0 0 0 0") {
											lol = ['<div class="hoverinfo"><strong>', geo.properties.name,'<br> <img src="weather_icons/sun.png" style="width: 20px; height: 20px;"> <img src="weather_icons/fog.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/rain.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/snow.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/hail.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/thunder.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/tornado.png" style="width: 20px; height: 20px; opacity: 0.2;">',
										'</strong></div>'].join('');
										}
										
										
										else if (indicators == "0 1 0 0 0 0") {
											lol = ['<div class="hoverinfo"><strong>', geo.properties.name,'<br> <img src="weather_icons/sun.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/fog.png" style="width: 20px; height: 20px;"> <img src="weather_icons/rain.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/snow.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/hail.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/thunder.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/tornado.png" style="width: 20px; height: 20px; opacity: 0.2;">',
										'</strong></div>'].join('');
										}
										
										else if (indicators == "1 1 1 0 0 0") {
											lol = ['<div class="hoverinfo"><strong>', geo.properties.name,'<br> <img src="weather_icons/sun.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/fog.png" style="width: 20px; height: 20px;"> <img src="weather_icons/rain.png" style="width: 20px; height: 20px;"> <img src="weather_icons/snow.png" style="width: 20px; height: 20px;"> <img src="weather_icons/hail.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/thunder.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/tornado.png" style="width: 20px; height: 20px; opacity: 0.2;">',
										'</strong></div>'].join('');
										}
										
										
										else if (indicators == "1 0 0 0 0 0") {
											lol = ['<div class="hoverinfo"><strong>', geo.properties.name,'<br> <img src="weather_icons/sun.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/fog.png" style="width: 20px; height: 20px;"> <img src="weather_icons/rain.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/snow.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/hail.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/thunder.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/tornado.png" style="width: 20px; height: 20px; opacity: 0.2;">',
										'</strong></div>'].join('');
										}
										
										else if (indicators == "1 0 1 0 0 0") {
											lol = ['<div class="hoverinfo"><strong>', geo.properties.name,'<br> <img src="weather_icons/sun.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/fog.png" style="width: 20px; height: 20px;"> <img src="weather_icons/rain.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/snow.png" style="width: 20px; height: 20px;"> <img src="weather_icons/hail.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/thunder.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/tornado.png" style="width: 20px; height: 20px; opacity: 0.2;">',
										'</strong></div>'].join('');
										}
										
										else if (indicators == "0 0 1 0 0 0") {
											lol = ['<div class="hoverinfo"><strong>', geo.properties.name,'<br> <img src="weather_icons/sun.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/fog.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/rain.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/snow.png" style="width: 20px; height: 20px;"> <img src="weather_icons/hail.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/thunder.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/tornado.png" style="width: 20px; height: 20px; opacity: 0.2;">',
										'</strong></div>'].join('');
										}
										
										else if (indicators == "0 1 1 0 0 0") {
											lol = ['<div class="hoverinfo"><strong>', geo.properties.name,'<br> <img src="weather_icons/sun.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/fog.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/rain.png" style="width: 20px; height: 20px;"> <img src="weather_icons/snow.png" style="width: 20px; height: 20px;"> <img src="weather_icons/hail.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/thunder.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/tornado.png" style="width: 20px; height: 20px; opacity: 0.2;">',
										'</strong></div>'].join('');
										}
										
										else if (indicators == "0 1 0 0 1 0") {
											lol = ['<div class="hoverinfo"><strong>', geo.properties.name,'<br> <img src="weather_icons/sun.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/fog.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/rain.png" style="width: 20px; height: 20px;"> <img src="weather_icons/snow.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/hail.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/thunder.png" style="width: 20px; height: 20px;"> <img src="weather_icons/tornado.png" style="width: 20px; height: 20px; opacity: 0.2;">',
										'</strong></div>'].join('');
										}
										
										else if (indicators == "1 1 0 0 0 0") {
											lol = ['<div class="hoverinfo"><strong>', geo.properties.name,'<br> <img src="weather_icons/sun.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/fog.png" style="width: 20px; height: 20px;"> <img src="weather_icons/rain.png" style="width: 20px; height: 20px;"> <img src="weather_icons/snow.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/hail.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/thunder.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/tornado.png" style="width: 20px; height: 20px; opacity: 0.2;">',
										'</strong></div>'].join('');
										}
										
										else if (indicators == "0 1 1 1 1 0") {
											lol = ['<div class="hoverinfo"><strong>', geo.properties.name,'<br> <img src="weather_icons/sun.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/fog.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/rain.png" style="width: 20px; height: 20px;"> <img src="weather_icons/snow.png" style="width: 20px; height: 20px;"> <img src="weather_icons/hail.png" style="width: 20px; height: 20px;"> <img src="weather_icons/thunder.png" style="width: 20px; height: 20px;"> <img src="weather_icons/tornado.png" style="width: 20px; height: 20px; opacity: 0.2;">',
										'</strong></div>'].join('');
										}
										
										else if (indicators == "1 1 1 0 1 0") {
											lol = ['<div class="hoverinfo"><strong>', geo.properties.name,'<br> <img src="weather_icons/sun.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/fog.png" style="width: 20px; height: 20px;"> <img src="weather_icons/rain.png" style="width: 20px; height: 20px;"> <img src="weather_icons/snow.png" style="width: 20px; height: 20px;"> <img src="weather_icons/hail.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/thunder.png" style="width: 20px; height: 20px;"> <img src="weather_icons/tornado.png" style="width: 20px; height: 20px; opacity: 0.2;">',
										'</strong></div>'].join('');
										}
										
										else if (indicators == "0 0 0 0 1 0") {
											lol = ['<div class="hoverinfo"><strong>', geo.properties.name,'<br> <img src="weather_icons/sun.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/fog.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/rain.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/snow.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/hail.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/thunder.png" style="width: 20px; height: 20px;"> <img src="weather_icons/tornado.png" style="width: 20px; height: 20px; opacity: 0.2;">',
										'</strong></div>'].join('');
										}
										
										else if (indicators == "0 1 1 0 1 0") {
											lol = ['<div class="hoverinfo"><strong>', geo.properties.name,'<br> <img src="weather_icons/sun.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/fog.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/rain.png" style="width: 20px; height: 20px;"> <img src="weather_icons/snow.png" style="width: 20px; height: 20px;"> <img src="weather_icons/hail.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/thunder.png" style="width: 20px; height: 20px;"> <img src="weather_icons/tornado.png" style="width: 20px; height: 20px; opacity: 0.2;">',
										'</strong></div>'].join('');
										}
										
										else if (indicators == "1 1 0 0 1 0") {
											lol = ['<div class="hoverinfo"><strong>', geo.properties.name,'<br> <img src="weather_icons/sun.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/fog.png" style="width: 20px; height: 20px;"> <img src="weather_icons/rain.png" style="width: 20px; height: 20px;"> <img src="weather_icons/snow.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/hail.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/thunder.png" style="width: 20px; height: 20px;"> <img src="weather_icons/tornado.png" style="width: 20px; height: 20px; opacity: 0.2;">',
										'</strong></div>'].join('');
										}
										
										else if (indicators == "0 1 1 1 0 0") {
											lol = ['<div class="hoverinfo"><strong>', geo.properties.name,'<br> <img src="weather_icons/sun.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/fog.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/rain.png" style="width: 20px; height: 20px;"> <img src="weather_icons/snow.png" style="width: 20px; height: 20px;"> <img src="weather_icons/hail.png" style="width: 20px; height: 20px;"> <img src="weather_icons/thunder.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/tornado.png" style="width: 20px; height: 20px; opacity: 0.2;">',
										'</strong></div>'].join('');
										}
										
										else if (indicators == "0 1 0 1 1 0") {
											lol = ['<div class="hoverinfo"><strong>', geo.properties.name,'<br> <img src="weather_icons/sun.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/fog.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/rain.png" style="width: 20px; height: 20px;"> <img src="weather_icons/snow.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/hail.png" style="width: 20px; height: 20px;"> <img src="weather_icons/thunder.png" style="width: 20px; height: 20px;"> <img src="weather_icons/tornado.png" style="width: 20px; height: 20px; opacity: 0.2;">',
										'</strong></div>'].join('');
										}
										
										else if (indicators == "0 1 0 1 0 0") {
											lol = ['<div class="hoverinfo"><strong>', geo.properties.name,'<br> <img src="weather_icons/sun.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/fog.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/rain.png" style="width: 20px; height: 20px;"> <img src="weather_icons/snow.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/hail.png" style="width: 20px; height: 20px;"> <img src="weather_icons/thunder.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/tornado.png" style="width: 20px; height: 20px; opacity: 0.2;">',
										'</strong></div>'].join('');
										}
										
										else if (indicators == "0 0 0 0 1 1") {
											lol = ['<div class="hoverinfo"><strong>', geo.properties.name,'<br> <img src="weather_icons/sun.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/fog.png" style="width: 20px; height: 20px;"> <img src="weather_icons/rain.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/snow.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/hail.png" style="width: 20px; height: 20px;"> <img src="weather_icons/thunder.png" style="width: 20px; height: 20px;"> <img src="weather_icons/tornado.png" style="width: 20px; height: 20px;">',
										'</strong></div>'].join('');
										}
										
										else if (indicators == "1 0 1 0 0 0") {
											lol = ['<div class="hoverinfo"><strong>', geo.properties.name,'<br> <img src="weather_icons/sun.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/fog.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/rain.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/snow.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/hail.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/thunder.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/tornado.png" style="width: 20px; height: 20px; opacity: 0.2;">',
										'</strong></div>'].join('');
										}
										
										else if (indicators == "1 1 0 1 1 0") {
											lol = ['<div class="hoverinfo"><strong>', geo.properties.name,'<br> <img src="weather_icons/sun.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/fog.png" style="width: 20px; height: 20px;"> <img src="weather_icons/rain.png" style="width: 20px; height: 20px;"> <img src="weather_icons/snow.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/hail.png" style="width: 20px; height: 20px;"> <img src="weather_icons/thunder.png" style="width: 20px; height: 20px;"> <img src="weather_icons/tornado.png" style="width: 20px; height: 20px; opacity: 0.2;">',
										'</strong></div>'].join('');
										}
										
										else if (indicators == "0 1 0 0 1 1") {
											lol = ['<div class="hoverinfo"><strong>', geo.properties.name,'<br> <img src="weather_icons/sun.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/fog.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/rain.png" style="width: 20px; height: 20px;"> <img src="weather_icons/snow.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/hail.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/thunder.png" style="width: 20px; height: 20px;"> <img src="weather_icons/tornado.png" style="width: 20px; height: 20px;">',
										'</strong></div>'].join('');
										}
										
										else if (indicators == "1 1 1 1 0 0") {
											lol = ['<div class="hoverinfo"><strong>', geo.properties.name,'<br> <img src="weather_icons/sun.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/fog.png" style="width: 20px; height: 20px;"> <img src="weather_icons/rain.png" style="width: 20px; height: 20px;"> <img src="weather_icons/snow.png" style="width: 20px; height: 20px;"> <img src="weather_icons/hail.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/thunder.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/tornado.png" style="width: 20px; height: 20px; opacity: 0.2;">',
										'</strong></div>'].join('');
										}
										
										else if (indicators == "0 1 0 0 0 1") {
											lol = ['<div class="hoverinfo"><strong>', geo.properties.name,'<br> <img src="weather_icons/sun.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/fog.png" style="width: 20px; height: 20px;"> <img src="weather_icons/rain.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/snow.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/hail.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/thunder.png" style="width: 20px; height: 20px; opacity: 0.2;"> <img src="weather_icons/tornado.png" style="width: 20px; height: 20px;">',
										'</strong></div>'].join('');
										}
										
									}
									
								});
								
								
								return lol;
								
							
							}
						},
						done: this._handleMapReady.bind(this),
						
						
						
						
					});
				}

				Datamap.prototype._handleMapReady = function(datamap) {
					var selected_countries = 0;
					
					this.zoom = new Zoom({
						$container: this.$container,
						datamap: datamap
					});
					
					datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
						var state_id = geography.id;

						var countries = ["IRL", "USA", "DEU", "ARG", "AUT", "AUS", "AUT", "BOL", "BRA", "BEL", "CAN", "CHL", "COL", "CRI", "DNK", "SLV", "ECU", "SVK", "ESP", "EST", "PHL", "FIN", "FRA", "GRC", "GTM", "NLD", "HND", "HUN", "IDN", "ISL", "ITA", "JPN", "LVA", "LTU", "LUX", "MYS", "MEX", "NOR", "NZL", "PAN", "PRY", "PER", "PRT", "GBR", "CZE", "DOM", "MEX", "SWE", "CHE", "TWN", "TUR", "URY", "POL", "CHN"];
						
						if (countries.includes(state_id)) {
							if (selec_countries.includes(state_id)){
								
								
								console.log(state_id);
								num_selec_countries--;
								document.getElementById(state_id).outerHTML = "";
								console.log(num_selec_countries);
								selec_countries = jQuery.grep(selec_countries, function(value) {
								  return value != state_id;
								});
								console.log(selec_countries);
								var ul = document.getElementById("listamusicas");
								ul.innerHTML = "";
								var fillkey_obj = datamap.options.data[state_id] || {fillKey: 'LOW'};
								var fillkey = fillkey_obj.fillKey;;
								var fillkeys = Object.keys(fills);
								var antikey = fillkeys[Math.abs(fillkeys.indexOf(fillkey) - 1)];
								var new_fills = {
									[geography.id] : {
										fillKey: antikey
									}
								};
								if (selec_countries.length > 0)
								for (var k=0; k<selec_countries.length; k++) {
									updateSongList(selec_countries[k])
								}
								
								updateViss();
							}
							
							else if(num_selec_countries < max_countries && num_selec_countries >= 0 && !selec_countries.includes(state_id)) {
								console.log(state_id);
									num_selec_countries++;
									selec_countries.push(state_id);
									var ul = document.getElementById("lista");
									var li = document.createElement(state_id);
									li.className = "list-group-item";
									li.id = state_id;
									li.appendChild(document.createTextNode(state_id));
									ul.appendChild(li);

									var teste = [];
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
										
										
										console.log("Estou aqui");
										console.log(teste);
										for (var i = 0; i < selec_dates.length; i++) {

											var current_date = selec_dates[i].toLocaleDateString("pt-PT");
											console.log(current_date);
											
											var div = document.getElementById('listamusicas');
										var str1 = "<p style=\"font-size: 15px;\">Top 10 in "
										var str2 = getCountryName(state_id);
										var str3 = " in "	
										var str4 = current_date;
										var res = str1.concat(str2, str3, str4);
										div.innerHTML += res;
											if (artistsWordCloud.length > 0) {
												document.getElementById("putaquepariu").innerHTML = "";
											}
												
											
											strArtists = "";
											csv.forEach(function(d) {
											if (d.Date == current_date && d.Country == getCountryISO2(state_id)){
												
												
												var string = d.Artist
												var newString = string.replace(/\s+/g,' ').trim();
												strArtists += newString;
												strArtists += ", ";
												
												console.log(strArtists);
												
												
												teste.push(d);
											} 
										});
											
											artistsWordCloud.unshift(strArtists);
											console.log("LOG");
											console.log(artistsWordCloud);
											updateViss();
											
											

										function tabulate(data, columns) {
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

										// render the tables
											
										tabulate(teste, ['Position', 'TrackName', 'Artist']); // 2 column table
										div.innerHTML += "<hr style=\"border: 1px solid black;\" />"
										teste = [];
											
										}
										
																				

										
									});

								
								
									console.log(num_selec_countries);
									var fillkey_obj = datamap.options.data[state_id] || {fillKey: 'LOW'};
									var fillkey = fillkey_obj.fillKey;;
									var fillkeys = Object.keys(fills);
									var antikey = fillkeys[Math.abs(fillkeys.indexOf(fillkey) - 1)];
									var new_fills = {
										[geography.id] : {
											fillKey: antikey
										}
									};
									datamap.updateChoropleth(new_fills);
									
							}
							
							
						}
						datamap.updateChoropleth(new_fills);
						
					});
					


				}

				new Datamap();





