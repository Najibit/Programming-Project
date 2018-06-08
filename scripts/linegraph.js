function lineGraph(tweetVolumes) {

  // get graph dimensions
  const DM = getDimensions();

  // append SVG
  const SVG = d3.select('body')
                .append('svg')
                .attr('width', DM.width)
                .attr('height', DM.height)
                .attr('id', 'linesvg')
  // x- and y-scales
  const xScale = d3.scaleLinear()
                      .domain([0, 365])
                      .range([0, DM.width]);
  const yScale = d3.scaleLinear()
                      .domain([0, 4000])
                      .range([DM.height, 0]);

  // x- and y-axis
  let xAxis = d3.axisBottom(xScale)
  let yAxis = d3.axisLeft(yScale)

  // add x-axis
  SVG.append("g")
      .attr('class', 'axis')
      .attr('transform', `translate(${DM.margin.left}, ${DM.height})`)
      .call(xAxis);

  // add y-axis
  SVG.append("g")
      .attr('class', 'axis')
      .attr('transform', 'translate(' + DM.margin.left + ",0)")
      .call(yAxis);

  // add all rects
  SVG.selectAll("rect")
     .data(tweetVolumes)
     .enter()
     .append("rect")
     .attr("x", (d, i) => DM.margin.left + i * (DM.width / tweetVolumes.length))
     .attr("y", DM.height)
     .attr("width", (DM.width - DM.margin.left) / tweetVolumes.length)
     .attr("height", 0)
     .style("opacity", 0)
     .transition().duration(4000)
     .delay((d, i) => i * 2)
     .style("opacity", 1)
     .attr("y", d => yScale(d[1]))
     .attr("height", d => DM.height - yScale(d[1]))
     .attr('fill', 'white')
     .attr('stroke', 'black')
}
