function lineGraph(monthTotals, dayValues, monthTotals) {

  // get graph dimensions
  const DM = getDimensions();
  const months = getMonths();

  monthTotals = Object.values(monthTotals);

  // append SVG
  const SVG = d3.select('body')
                .append('svg')
                .attr('width', DM.width)
                .attr('height', DM.height)
                .attr('id', 'linesvg')

  // x- and y-scales
  const xScale = d3.scaleLinear()
                      .domain([0, monthTotals.length])
                      .range([DM.margin.left, DM.width + DM.padding.l]);
  const yScale = d3.scaleLinear()
                      .domain([0, d3.max(monthTotals)]) // nog d3.max toevoegen
                      .range([DM.height, 0]);

  // x- and y-axis
  let xAxis = d3.axisBottom(xScale)
                .tickFormat((d, i) => months[i])
  let yAxis = d3.axisLeft(yScale)

  yValues = [];

  let valueLine = d3.line()
                    .x(function(d, i) { return xScale(i); })
                    .y(function(d) { yValues.push(yScale(d)); return yScale(d); })

  // add x-axis
  SVG.append("g")
      .attr('class', 'axis')
      .attr('transform', `translate(${0}, ${DM.height})`)
      .call(xAxis);

  // add y-axis
  SVG.append("g")
      .attr('class', 'axis')
      .attr('transform', 'translate(' + DM.margin.left + ",0)")
      .call(yAxis);

  // SVG.append('path')
  //    .data([dayValues])
  //    .attr('class', 'line')
  //    .attr('d', valueLine);
  //
  // function infoDot(xPos, yPos) {
  //
  //   d3.selectAll('#infodot').remove();
  //
  //   yIndex = parseInt(xPos * dayValues.length / 1000);
  //   yPos = yScale(dayValues[yIndex])
  //
  //   SVG.append('circle')
  //      .attr('x', xPos)
  //      .attr('y', yPos)
  //      .attr('r', '5')
  //      .attr('fill', 'black')
  //      .attr('transform', `translate(${xPos + 6}, ${yPos})`)
  //      .attr('id', 'infodot')
  // }
  //
  //  SVG.select(".line")
  //      .data(dayValues)
  //      .on("mousemove", function() {
  //        let xPos =    d3.mouse(this)[0];
  //        let yPos =    d3.mouse(this)[1];
  //        infoDot(xPos);
  //      })
  //      .on("mouseout", function() {
  //        // tooltip.style("display", "none");
  //      })
  //      .on("click", function(d, i) {
  //        let xPos =    d3.mouse(this)[0];
  //        let yPos =    d3.mouse(this)[1];
  //        console.log(xPos, yPos)
  //      })



  // add all rects
  SVG.selectAll("rect")
     .data(monthTotals)
     .enter()
     .append("rect")
     .attr("x", (d, i) => DM.margin.left + 5 + i * ((DM.width - DM.margin.left) / monthTotals.length) + 1)
     .attr("y", DM.height)
     .attr("width", (DM.width - DM.margin.left) / monthTotals.length)
     .attr("height", 0)
     .style("opacity", 0)
     .transition().duration(4000)
     .delay((d, i) => i * 2)
     .style("opacity", 1)
     .attr("y", d => yScale(d))
     .attr("height", d => DM.height - yScale(d))
     .attr('fill', 'white')
     .attr('stroke', 'black')
     .attr('id', 'monthrects')
}
