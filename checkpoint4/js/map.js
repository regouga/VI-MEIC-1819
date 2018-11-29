var fills = {
	HIGH: '#ff0000',
	LOW: '#000000'
	
};

function arrayRemove(arr, value) {

   return arr.filter(function(ele){
       return ele != value;
   });

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



function getCountryISO2(countryCode) {
  return countryISOMapping[countryCode]
}

function getCountryName(countryCode) {
  return countrynaming[countryCode]
}

var result = getCountryISO2("BRA")
console.log(result);



//basic map config with custom fills, mercator projection
function Zoom(args) {
	$.extend(this, {
		$buttons:   $(".zoom-button"),
		$info:      $("#zoom-info"),
		scale:      { max: 50, currentShift: 0 },
		$container: args.$container,
		datamap:    args.datamap
	});

	this.init();
}

Zoom.prototype.init = function() {
	var paths = this.datamap.svg.selectAll("path"),
	subunits = this.datamap.svg.selectAll(".datamaps-subunit");

				// preserve stroke thickness
				 // paths.style("vector-effect", "non-scaling-stroke");

				// disable click on drag end
				subunits.call(
					d3.behavior.drag().on("dragend", function() {
						d3.event.sourceEvent.stopPropagation();
					})
					);

				this.scale.set = this._getScalesArray();
				this.d3Zoom = d3.behavior.zoom().scaleExtent([ 1, this.scale.max ]);

				this._displayPercentage(1);
				this.listen();
			};

			Zoom.prototype.listen = function() {
				this.$buttons.off("click").on("click", this._handleClick.bind(this));

				this.datamap.svg
				.call(this.d3Zoom.on("zoom", this._handleScroll.bind(this)))
				  .on("dblclick.zoom", null); // disable zoom on double-click
				};

				Zoom.prototype.reset = function() {
					this._shift("reset");
				};

				Zoom.prototype._handleScroll = function() {
					var translate = d3.event.translate,
					scale = d3.event.scale,
					limited = this._bound(translate, scale);

					this.scrolled = true;

					this._update(limited.translate, limited.scale);
				};

				Zoom.prototype._handleClick = function(event) {
					var direction = $(event.target).data("zoom");

					this._shift(direction);
				};

				Zoom.prototype._shift = function(direction) {
					var center = [ this.$container.width() / 2, this.$container.height() / 2 ],
					translate = this.d3Zoom.translate(), translate0 = [], l = [],
					view = {
						x: translate[0],
						y: translate[1],
						k: this.d3Zoom.scale()
					}, bounded;

					translate0 = [
					(center[0] - view.x) / view.k,
					(center[1] - view.y) / view.k
					];

					if (direction == "reset") {
						view.k = 1;
						this.scrolled = true;
					} else {
						view.k = this._getNextScale(direction);
					}

					l = [ translate0[0] * view.k + view.x, translate0[1] * view.k + view.y ];

					view.x += center[0] - l[0];
					view.y += center[1] - l[1];

					bounded = this._bound([ view.x, view.y ], view.k);

					this._animate(bounded.translate, bounded.scale);
				};

				Zoom.prototype._bound = function(translate, scale) {
					var width = this.$container.width(),
					height = this.$container.height();

					translate[0] = Math.min(
						(width / height)  * (scale - 1),
						Math.max( width * (1 - scale), translate[0] )
						);

					translate[1] = Math.min(0, Math.max(height * (1 - scale), translate[1]));

					return { translate: translate, scale: scale };
				};

				Zoom.prototype._update = function(translate, scale) {
					this.d3Zoom
					.translate(translate)
					.scale(scale);

					this.datamap.svg.selectAll("g")
					.attr("transform", "translate(" + translate + ")scale(" + scale + ")");

					this._displayPercentage(scale);
				};

				Zoom.prototype._animate = function(translate, scale) {
					var _this = this,
					d3Zoom = this.d3Zoom;

					d3.transition().duration(350).tween("zoom", function() {
						var iTranslate = d3.interpolate(d3Zoom.translate(), translate),
						iScale = d3.interpolate(d3Zoom.scale(), scale);

						return function(t) {
							_this._update(iTranslate(t), iScale(t));
						};
					});
				};

				Zoom.prototype._displayPercentage = function(scale) {
					var value;

					value = Math.round(Math.log(scale) / Math.log(this.scale.max) * 100);
					this.$info.text(value + "%");
				};

				Zoom.prototype._getScalesArray = function() {
					var array = [],
					scaleMaxLog = Math.log(this.scale.max);

					for (var i = 0; i <= 10; i++) {
						array.push(Math.pow(Math.E, 0.1 * i * scaleMaxLog));
					}

					return array;
				};

				Zoom.prototype._getNextScale = function(direction) {
					var scaleSet = this.scale.set,
					currentScale = this.d3Zoom.scale(),
					lastShift = scaleSet.length - 1,
					shift, temp = [];

					if (this.scrolled) {

						for (shift = 0; shift <= lastShift; shift++) {
							temp.push(Math.abs(scaleSet[shift] - currentScale));
						}

						shift = temp.indexOf(Math.min.apply(null, temp));

						if (currentScale >= scaleSet[shift] && shift < lastShift) {
							shift++;
						}

						if (direction == "out" && shift > 0) {
							shift--;
						}

						this.scrolled = false;

					} else {

						shift = this.scale.currentShift;

						if (direction == "out") {
							shift > 0 && shift--;
						} else {
							shift < lastShift && shift++;
						}
					}

					this.scale.currentShift = shift;

					return scaleSet[shift];
				};

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
									
									debugger;
									d3.dsv(",", str70, function(d) {
									  return {
										Date: d.Date
									  };
									}).then(function(data) {
									  console.log(data);
									});
									
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
										debugger;
										for (var i = 0; i < selec_dates.length; i++) {

											var current_date = selec_dates[i].toLocaleDateString("pt-PT");
											console.log(current_date);
											
											var div = document.getElementById('listamusicas');
										var str1 = "<p style=\"font-size: 15px;\">Top 50 in "
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
										div.innerHTML += "<br><br><br>";
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
						
						
					});
					
					


				}

				new Datamap();





