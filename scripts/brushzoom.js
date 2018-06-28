// 
// This page contains functions for the brush and zoom graph.
//
// Name: Najib el Moussaoui
// Course: Minor Programming, End Project.
// Date: 28-06-2018
//


window.onload = function() {
  brushAndZoom();
}

/* implements the line graph of the tweet volumes by Russian Trolls in 2016 */
function brushAndZoom() {

  // create a line chart svg
  const lineSVG = d3.select('#linechart'),
              margin1 = {top: 20, right: 20, bottom: 110, left: 40},
              margin2 = {top: 525, right: 20, bottom: 30, left: 40},
              width   = +lineSVG.attr('width') - margin1.left - margin1.right,
              height  = +lineSVG.attr('height') - margin1.top - margin1.bottom,
              height2 = +lineSVG.attr('height') - margin2.top - margin2.bottom;

  // date function
  let parseDate = d3.timeParse('%Y-%m-%d');

  // seperate date ranges for graph and smaller zoom slider
  let x   = d3.scaleTime().range([0, width]),
      x2  = d3.scaleTime().range([0, width]),
      y   = d3.scaleLinear().range([height, 0]),
      y2  = d3.scaleLinear().range([height2, 0]);

  // axis
  let xAxis   = d3.axisBottom(x),
      xAxis2  = d3.axisBottom(x2),
      yAxis   = d3.axisLeft(y);

  // brush function
  let brush = d3.brushX()
                .extent([[0, 0], [width, height2]])
                .on('brush end', brushed);

  // zoom function
  let zoom = d3.zoom()
               .scaleExtent([1, Infinity])
               .translateExtent([[0, 0], [width, height]])
               .extent([[0, 0], [width, height]])
               .on('zoom', zoomed);

  // determine area big graph
  let area = d3.area()
               .curve(d3.curveMonotoneX)
               .x(d =>  x(d.day))
               .y0(height)
               .y1(d => y(d.num));

  // determine area small graph
  let area2 = d3.area()
                .curve(d3.curveMonotoneX)
                .x(d => x2(d.day))
                .y0(height2)
                .y1(d => y2(d.num));

  // append paths
  lineSVG.append('defs')
     .append('clipPath')
     .attr('id', 'clip')
     .append('rect')
     .attr('width', width)
     .attr('height', height);

  // focus function
  let focus = lineSVG.append('g')
                 .attr('class', 'focus')
                 .attr('transform', `translate(${margin1.left}, ${margin1.top})`);

  // context function
  let context = lineSVG.append('g')
                   .attr('class', 'context')
                   .attr('transform', `translate(${margin2.left}, ${margin2.top})`);

  // get data from csv
  d3.csv('data/tweets/tweetvolume.csv', type, (error, data) => {

    if (error) throw error;

    // determine domains
    x.domain(d3.extent(data, d => d.day));
    y.domain([0, d3.max(data, d => d.num)]);
    x2.domain(x.domain());
    y2.domain(y.domain());

    // append path
    focus.append('path')
         .datum(data)
         .attr('class', 'area')
         .attr('d', area);

    // append x-axis
    focus.append('g')
         .attr('class', 'axis axis--x')
         .attr('transform', `translate(0, ${height})`)
         .call(xAxis);

    // append y-axis
    focus.append('g')
         .attr('class', 'axis axis--y')
         .call(yAxis);

    // append path for smaller graph
    context.append('path')
           .datum(data)
           .attr('class', 'area')
           .attr('d', area2);

    // append x-axis for smaller graph
    context.append('g')
           .attr('class', 'axis axis--x')
           .attr('transform', `translate(0, ${height2})`)
           .call(xAxis2);

    // append brush
    context.append('g')
        .attr('class', 'brush')
        .call(brush)
        .call(brush.move, x.range());

    // append the zoom rect
    lineSVG.append('rect')
        .attr('class', 'zoom')
        .attr('width', width)
        .attr('height', height)
        .attr('transform', `translate(${margin1.left}, ${margin1.top})`)
        .call(zoom);
  });

  function brushed() {
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'zoom') {
       return; // ignore brush-by-zoom
     }

     // selection
    let s = d3.event.selection || x2.range();
    x.domain(s.map(x2.invert, x2));

    // focus for both x-axis
    focus.select('.area').attr('d', area);
    focus.select('.axis--x').call(xAxis);

    // scale when zoomed
    lineSVG.select('.zoom').call(zoom.transform, d3.zoomIdentity
       .scale(width / (s[1] - s[0]))
       .translate(-s[0], 0));
  }

  function zoomed() {
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'brush') {
       return; // ignore zoom-by-brush
     }

    let t = d3.event.transform;

    // adjust domain
    x.domain(t.rescaleX(x2)
     .domain());

    // add area
    focus.select('.area')
         .attr('d', area);

    // add second focus axis
    focus.select('.axis--x')
         .call(xAxis);

    // move brush
    context.select('.brush')
           .call(brush.move, x.range().map(t.invertX, t));
  }

  // parse data function
  function type(d) {
    d.day = parseDate(d.day);
    d.num = +d.num;
    return d;
  }
}
