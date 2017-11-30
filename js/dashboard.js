$(document).ready(function () {
    // d3 is used to create SVG
    var svg = d3.select("#map").append("svg")
        .attr("width", width)
        .attr("height", height);

    // Layering of elements due to d3 not supporting z-index layering
    var map = svg.append('svg').attr('id','map');
    var dashedLineGroup = svg.append('g').attr('id','dashedLine');
    var solarGroup = svg.append('g').attr('id','solar');
    var windmillGroup = svg.append('g').attr('id','windmills');
	var powerGroup = svg.append('g').attr('id','power')
    var textboxRectGroup = svg.append('g').attr("id","textboxRect");
    var textboxTextGroup = svg.append('g').attr("id","textboxText");
    var gaugeGroup = svg.append('g').attr("id","gauges");

    create_map(map, path);
    create_energy_lines(dashedLineGroup, textboxTextGroup, textboxRectGroup, coords,dataFetchInterval_ms);
    create_windmills(windmillGroup, coords);
    create_solar_panels(solarGroup, coords);
    create_gauge(gaugeGroup, coords,dataFetchInterval_ms);
	create_power_plants(powerGroup, coords);

    // google charts for generating timeline charts
    google.charts.load("current", {packages: ['annotatedtimeline']});
    google.charts.setOnLoadCallback(function() {drawChart()});

	// scroll to co2 chart
    $("#gauges").on('click',function () {
        $("#co2_card")[0].scrollIntoView();
    });
	
	// scroll to energy production card
	$("#solar, #power, #windmills").on('click',function () {
        $("#energy_prod_card")[0].scrollIntoView();
    });
	
	// scroll to energy transmission card
    $("#textboxText, #textboxRect, #dashedLine").on('click',function () {
        $("#energy_trans_card")[0].scrollIntoView();
    });

	// fade out all but self
    $("#solar, #gauges, #windmills, #power").on('mouseover',function () {
        fade_out(this)
    });
	
	// fade out all but group
    $("#textboxText, #textboxRect, #dashedLine").on('mouseover',function () {
        fade_out(["#textboxText","#textboxRect","#dashedLine"])
    });
	
	// fade in all and remove all data highlight
    $("#solar, #gauges, #windmills, #power, #textboxText, #textboxRect, #dashedLine").on('mouseout',function () {
        fade_in();
        $('.power_prod_data').show();
        $('.wind_power_data').show();
    });

    // filter recent data table
    $("#power").on('mouseover',function () {
        $('.wind_power_data').hide();
    });

    $("#windmills").on('mouseover',function () {
        $('.power_prod_data').hide();
    });

});

function fade_out(id) {
    $('.subunit').attr('opacity',0.4);
    $('#windmills').attr('opacity',0.4);
    $('#solar').attr('opacity',0.4);
	$('#power').attr('opacity',0.4);
    $('#textboxRect').attr('opacity',0.4);
    $('#textboxText').attr('opacity',0.4);
    $('#dashedLine').attr('opacity',0.4);
    $('#gauges').attr('opacity',0.4);

    if(id instanceof Array) {
        id.forEach(function (entry) {
            $(entry).attr('opacity', 1);
        });
    } else {
        $(id).attr('opacity', 1);
    }
}

function fade_in() {
    $('.subunit').attr('opacity',1);
    $('#windmills').attr('opacity',1);
    $('#solar').attr('opacity',1);
	$('#power').attr('opacity',1);
    $('#textboxRect').attr('opacity',1);
    $('#textboxText').attr('opacity',1);
    $('#dashedLine').attr('opacity',1);
    $('#gauges').attr('opacity',1);
}

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
    silkeborg_solar_farm: [9.337419, 56.206914],
    gaugePlacement: [13.756697,57.270417],
	sjaelland_power: [12.465601,55.829442],
	esbjerg_power: [8.713396,55.793304],
	studstrup_power: [10.130475, 56.344693],
	aalborg_power: [10.134089, 57.125391]
};