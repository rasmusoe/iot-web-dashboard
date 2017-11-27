$(document).ready(function () {
    console.log("ready")
    // d3 is used to create SVG
    var svg = d3.select("#map").append("svg")
        .attr("width", width)
        .attr("height", height);

    // Layering of elements due to d3 not supporting z-index layering
    var map = svg.append('svg');
    var dashedLineGroup = svg.append('g').attr('id','dashedLine');
    var solarGroup = svg.append('g').attr('id','solar');
    var windmillGroup = svg.append('g').attr('id','windmills');
    var textboxRectGroup = svg.append('g').attr("id","textboxRect");
    var textboxTextGroup = svg.append('g').attr("id","textboxText");
    var gaugeGroup = svg.append('g').attr("id","gauges");

    create_map(map, path);
    create_energy_lines(dashedLineGroup, textboxTextGroup, textboxRectGroup, coords,dataFetchInterval_ms);
    create_windmills(windmillGroup, coords);
    create_solar_panels(solarGroup, coords);
    create_gauge(gaugeGroup, coords,dataFetchInterval_ms);

    // TEMP
    google.charts.load("current", {packages: ['annotatedtimeline']});
    google.charts.setOnLoadCallback(function() {drawChart()});
});

/*  --------- CREATION OF SVG  --------- */
// SVG Height and Width
var width = 1100,
    height = 600;

// Choose projection and rotate/scale world
var projection = d3.geo.albers()
    .center([24.8, 52.95])
    .rotate([0, 0, -10])
    .parallels([50, 60])
    .scale(10200)
    .translate([width / 2, height / 2]);

/* --------- CREATE PATH ---------*/
var path = d3.geo.path()
    .projection(projection);

var dataFetchInterval_ms = 2000;

/*  --------- COORDINATES FOR THE SVG --------- */
var coords = {
    thorup_strand:[9.092772,57.1380563],
    kristiansand:[7.8691287,58.1529008],
    asaa:[10.417415,57.147015],
    goeteborg:[11.6136556,57.7006826],
    odense:[10.379272,55.399767],
    jyderup:[11.410810, 55.657214],
    rens:[9.150874, 54.874238],
    rendsburg:[9.5900401,54.2969277],
    helsingoer: [12.593724,56.035637],
    helsingborg:[12.719173,56.061975],
    ringsted:[11.789062, 55.456724],
    rostock: [12.0068693,54.1474698],
    hasle: [14.6718209,55.2079184],
    borrby: [14.1621923,55.456073],
    anholt_windmill_park: [11.174104, 56.597480],
    nysted_windmill_park: [11.698845, 54.575794],
    horns_rev_windmill_park : [7.859741, 55.560579],
    silkeborg_solar_farm: [9.537419, 56.206914],
    gaugePlacement: [13.756697,57.270417]
};