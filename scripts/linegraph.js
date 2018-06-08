window.onload = function () {

  function getDimensions() {

    const DIMENSIONS = {
      width: 1000,
      height: 500,
      margin: {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50
      },
    }

    return DIMENSIONS
  }

  function lineGraph() {

    const DM = getDimensions();
    let dayTweets = getTweetVolumes();
    console.log(dayTweets);

    const SVG = d3.select('body')
                  .append('svg')
                  .attr('width', DM.width)
                  .attr('height', DM.height)
                  .attr('id', 'linesvg')

    const xScale = d3.scaleLinear()
                        .domain([0, 400])
                        .range([0, DM.width - DM.margin.left - DM.margin.right]);
    const yScale = d3.scaleLinear()
                        .domain([0, 1000])
                        .range([DM.height, 0]);


    let xAxis = d3.axisBottom(xScale)
    let yAxis = d3.axisLeft(yScale)

    SVG.append("g")
        .attr('class', 'axis')
        .attr('transform', `translate(${DM.margin.left}, ${DM.height})`)
        .call(xAxis);

    SVG.append("g")
        .attr('class', 'axis')
        .attr('transform', 'translate(' + DM.margin.left + ",0)")
        .call(yAxis);

  }

  lineGraph();
}
