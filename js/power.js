/* ----- POWER PLANTS ----- */
function power_plant(svgGroup, coord, width, height, id) {
    projectedCoords = projection(coord);

    svgGroup.append("image")
        .attr("height", height)
        .attr("width",width)
        .attr("x", projectedCoords[0] - Math.round(width / 2))
        .attr("y", projectedCoords[1] - Math.round(height / 2))
        .attr("xlink:href", "img/power_plant.png")
        .attr("id", id)
}

function create_power_plants(layer, coords) {
    power_plant(layer, coords.sjaelland_power, 60, 60, 'powerplant');
	power_plant(layer, coords.esbjerg_power, 60, 60, 'powerplant');
	power_plant(layer, coords.studstrup_power, 60, 60, 'powerplant');
	power_plant(layer, coords.aalborg_power, 60, 60, 'powerplant');
}