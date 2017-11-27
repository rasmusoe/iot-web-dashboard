/* ----- CREATE ENERGY LINES ----- */
function energyLine(dl_layer, text_layer, text_box_layer, coord,coord_offset_x,coord_offset_y,width,height,dashed_line_coords,id,text,value){
    this.upper_right_coordinates = [coord[0]+coord_offset_x, coord[1]+coord_offset_y ];
    this.x = projection(this.upper_right_coordinates)[0];
    this.y = projection(this.upper_right_coordinates)[1];
    this.id = id;
    this.text = text;
    this.dashed_line_coords = dashed_line_coords;

    // Dashed line offset controls animation
    var dashOffset = 48;

    // SET UP DASHED LINE
    dl_layer.append("path")
        .datum({
            type: "LineString", coordinates: this.dashed_line_coords.coord // points in decimal degrees
        })
        .attr("d", path)
        .attr("class", "dashed-line " + this.id)
        .attr("stroke-dashoffset", dashOffset );

    // SET UP TEXT ELEMENT WITH CHOSEN SIZE (CSS)
    this.textElement = text_layer.append("text")
        .text(this.text)
        .attr("class", "textbox text "+this.id)
        .attr("id",this.id);
    // PLACE TEXT ELEMENT BASED ON LENGTH AND SIZE
    this.x -= this.textElement.node().getBBox().width;
    this.textElement
        .attr('y', this.y)
        .attr('x', this.x);


    // SET UP VALUE TEXT FILED
    this.distanceBetweenTexts = 0.2 * this.textElement.node().getBBox().height;
    this.valueElement = text_layer.append("text")
        .text(this.text)
        .attr('x', this.x)
        .attr('y', this.y + this.distanceBetweenTexts + this.textElement.node().getBBox().height)
        .attr("class", "textbox value "+this.id)
        .attr("id",this.id + " Value");

    // SET UP RECTANGLE BOX BEHIND TEXT
    this.rect_offset = this.textElement.node().getBBox().height;
    this.offset_factor = 2;

    this.rectElement = text_box_layer.append("rect")
        .attr('width', this.textElement.node().getBBox().width + this.offset_factor * this.rect_offset)
        .attr('height', this.textElement.node().getBBox().height  + this.valueElement.node().getBBox().height + this.distanceBetweenTexts + this.rect_offset )

    this.rectElement
        .attr('x', this.x - this.rect_offset )
        .attr('y', this.y - this.textElement.node().getBBox().height + this.distanceBetweenTexts - this.rect_offset/2 )
        .attr("class", "textbox rect "+this.id)
        .attr("id",this.id);

    // FUNCTION TO UPDATE VALUE IN TEXTBOX AND CHANGE DIRECTION OF DASHED LINE BASED ON VALUE
    this.updateValue = function(value)
    {
        if(value < 0){
            value = "IMPORT: " +value.slice(0) + " MW";
            dl_layer.select(".dashed-line."+this.id)
                .attr("stroke-dashoffset", -dashOffset );
        }
        else{
            value = "EXPORT: " +value + " MW";
            dl_layer.select(".dashed-line."+this.id)
                .attr("stroke-dashoffset", dashOffset );
        }

        this.valueElement
            .text(value)
            .attr("x",this.x + this.textElement.node().getComputedTextLength() / 2 -this.valueElement.node().getComputedTextLength() / 2 );
    };

    // FORCE CONSTRUCTION OF ELEMENT TO UPDATE VALUE
    this.updateValue(value);
}

// Start-End coordinates of dashed lines (LONG,LATI) corresponding to (E,N)
function dashed_line(start_coord,stop_coord,id){
    this.coord = [start_coord, stop_coord];
}

// Update Energy lines values
// Function to update gauge vaule
function arrayHasOwnIndex(array, prop) {
    return array.hasOwnProperty(prop) && /^0$|^[1-9]\d*$/.test(prop) && prop <= 4294967294; // 2^32 - 2
}

function updateEnergyLines(energyLines) {
    energyLines.forEach(function (arrayItem) {
        // INSERT FETCH OF ENERGY DATA HERE
        var overflow = 0; //10;
        var value = 0 - overflow + (200 - 0 + overflow * 2) * Math.random() - 100;
        arrayItem.updateValue(String(Math.round(value)));
    });
}

function create_energy_lines(dl_layer, text_layer, text_box_layer, coords, dataFetchInterval_ms) {
// Creation of object with all dashed line coords
    var dashed_lines = [
        new dashed_line(coords.thorup_strand, coords.kristiansand),
        new dashed_line(coords.asaa, coords.goeteborg),
        new dashed_line(coords.rens, coords.rendsburg),
        new dashed_line(coords.helsingoer, coords.helsingborg),
        new dashed_line(coords.ringsted, coords.rostock),
        new dashed_line(coords.odense, coords.jyderup),
        new dashed_line(coords.hasle, coords.borrby)
    ];

// Creation of energy lines. Dashed-lines and Textboxes will be created
    var energyLines = [
        new energyLine(dl_layer, text_layer, text_box_layer, coords.thorup_strand, -0.15, 0.1, 140, 65, dashed_lines[0], "jylland-norge", "JYLLAND - NORGE", 10),
        new energyLine(dl_layer, text_layer, text_box_layer, coords.asaa, 1.7, 0.05, 150, 50, dashed_lines[1], "jylland-sverige", "JYLLAND - SVERIGE", 10),
        new energyLine(dl_layer, text_layer, text_box_layer, coords.rens, -0.15, 0.1, 150, 50, dashed_lines[2], "jylland-tyskland", "JYLLAND - TYSKLAND", 10),
        new energyLine(dl_layer, text_layer, text_box_layer, coords.helsingoer, 1.7, 0.2, 150, 50, dashed_lines[3], "sjaelland-sverige", "SJÆLLAND - SVERIGE", 10),
        new energyLine(dl_layer, text_layer, text_box_layer, coords.ringsted, 1.7, -0.5, 150, 50, dashed_lines[4], "sjaelland-tyskland", "SJÆLLAND - TYSKLAND", 10),
        new energyLine(dl_layer, text_layer, text_box_layer, coords.odense, 0.8, -0.1, 150, 50, dashed_lines[5], "storebaelt", "STOREBÆLT", 10),
        new energyLine(dl_layer, text_layer, text_box_layer, coords.hasle, -0.15, 0.1, 150, 50, dashed_lines[6], "bornholm-sverige", "BORNHOLM - SVERIGE", 10),
    ];

// Make gauge value be updated every 5000 ms
    setInterval(function(){updateEnergyLines(energyLines)}, dataFetchInterval_ms);
}
