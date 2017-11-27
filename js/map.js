/* --------- CREATE MAP --------- */
function create_map(layer, path) {
// Get JSON file and create the world on layer1 (Background)
    d3.json("dk_ger_swe.json", function (error, topo) {

        // VARIABLES
        var subunits = topojson.feature(topo, topo.objects.subunits);
        var subunits_features = topojson.feature(topo, topo.objects.subunits).features;
        var places = topojson.feature(topo, topo.objects.places);
        var places_features = topojson.feature(topo, topo.objects.places).features;

        // GET ALL SUBUNITS FROM SHAPEFILE AND APPEND TO PATH
        layer.selectAll(".subunit")
            .data(subunits_features)
            .enter().append("path")
            .attr("class", function (d) {
                return "subunit " + d.id;
            })
            .attr("d", path);
    });
}