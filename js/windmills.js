/* ----- ANIMATED WINDMILLS ----- */
function windmill(svgGroup, coord, rotorWidth, rotorHeight, poleWidth, poleHeight, offsetWidth, offsetHeight, id) {
    projectedCoords = projection(coord);
    svgGroup.append("rect")
        .attr("height", poleHeight)
        .attr("width",poleWidth)
        .attr("x", projectedCoords[0] - Math.round(poleWidth / 2) - offsetWidth)
        .attr("y", projectedCoords[1] - poleHeight - offsetHeight)
        .attr("id", id)
        .attr("class", "windmill_pole");

    var x =  projectedCoords[0] - Math.round(rotorWidth / 2) - offsetWidth;
    var y = projectedCoords[1] - 2 * poleHeight - offsetHeight;
    // Hack to prevent issue in firefox
    var class_type = 'windmill_rotor';
    if (navigator.userAgent.search("Firefox") != -1) {
        class_type = 'ff_windmill_rotor';
    }
    svgGroup.append("image")
        .attr("height", rotorHeight)
        .attr("width",rotorWidth)
        .attr("x", x)
        .attr("y", y)
        .attr("xlink:href", "img/windmill_rotor.png")
        .attr("id", id)
        .attr("class", class_type)
}

function windmillPark(svgGroup, coord, rotorWidth, rotorHeight, poleWidth, poleHeight, id) {
    windmillParkWidthOffset = 20;
    windmillParkHeightOffset = 20;
    windmill(svgGroup, coord, rotorWidth, rotorHeight, poleWidth, poleHeight, windmillParkWidthOffset, windmillParkHeightOffset, id);
    windmill(svgGroup, coord, rotorWidth, rotorHeight, poleWidth, poleHeight, 0, 0, id);
}

function create_windmills(layer, coords) {
    windmillPark(layer, coords.anholt_windmill_park, 75, 75, 6, 40, 0, 0, 'windmill');
    windmill(layer, coords.nysted_windmill_park, 75, 75, 6, 40, 0, 0, 'windmill');
    windmillPark(layer, coords.horns_rev_windmill_park, 75, 75, 6, 40, 0, 0, 'windmill');
}