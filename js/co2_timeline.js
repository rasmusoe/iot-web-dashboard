function drawChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('date', 'Date');
    data.addColumn('number', 'Sold Pencils');
    data.addColumn('string', 'title1');
    data.addColumn('string', 'text1');
    data.addColumn('number', 'Sold Pens');
    data.addColumn('string', 'title2');
    data.addColumn('string', 'text2');
    data.addRows([
        [new Date(2008, 1 ,1), 30000, undefined, undefined, 40645, undefined, undefined],
        [new Date(2008, 1 ,2), 14045, undefined, undefined, 20374, undefined, undefined],
        [new Date(2008, 1 ,3), 55022, undefined, undefined, 50766, undefined, undefined],
        [new Date(2008, 1 ,4), 75284, undefined, undefined, 14334, undefined, undefined],
        [new Date(2008, 1 ,5), 41476, undefined, undefined, 66467, undefined, undefined],
        [new Date(2008, 1 ,6), 33322, undefined, undefined, 39463, undefined, undefined]
    ]);

    var chart = new google.visualization.AnnotatedTimeLine(document.getElementById('co2_graph'));
    chart.draw(data, {displayAnnotations: true});
}
