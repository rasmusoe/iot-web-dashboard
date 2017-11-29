/* ----- SOLAR PANELS ----- */
function solarPanel(svgGroup, coord, width, height, id) {
    projectedCoords = projection(coord);

    svgGroup.append("image")
        .attr("height", height)
        .attr("width",width)
        .attr("x", projectedCoords[0] - Math.round(width / 2))
        .attr("y", projectedCoords[1] - Math.round(height / 2))
        .attr("xlink:href", "img/solar_panel.png")
        .attr("id", id)
}

function create_solar_panels(layer, coords) {
    solarPanel(layer, coords.silkeborg_solar_farm, 60, 60, 'solar');
}