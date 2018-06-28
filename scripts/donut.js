//
// The page contains functions to implement the sentiment analysis, donut chart.
//
// Name: Najib el Moussaoui
// Course: Minor Programming, End Project.
// Date: 28-06-2018
//

window.onload = function() {

  // launch SVG
  gimmeSentiments();

}

function getSentiments(sentiments) {

  // better name
  let scores = sentiments;

  // remove current donut
  replaceDonut(scores);

  // add SVG
  const DONUT = d3.select('#donut-chart-background')
                  .append('svg')
                  .attr('width', 530)
                  .attr('height', 530)
                  .attr('id', 'donut-chart');

}

/* replaces the current donut for a new one */
function replaceDonut(scores) {

  // analyzed tags
  comTags = ['#MAGA', '#BLACKLIVESMATTER', '#CLINTON', '#TRUMP'];

  // on click in text, replace donut with new one
  $(comTags[0]).click(function() { removeDonut(scores[comTags[0]], comTags[0]); });
  $(comTags[1]).click(function() { removeDonut(scores[comTags[1]], comTags[1]); });
  $(comTags[2]).click(function() { removeDonut(scores[comTags[2]], comTags[2]); });
  $(comTags[3]).click(function() { removeDonut(scores[comTags[3]], comTags[3]); });
}

/* remove current donut */
function removeDonut(data, tag) {

  d3.selectAll('svg#donut-chart')
    .transition().duration(200).style("opacity", 0.1) // fade out
    .transition().duration(200).remove(); // and be-gone

    // remove info message
    $('h5').remove();

    // create a new one
    setTimeout(function(){ createDonut(data, tag); }, 1000);
}


/* creates a donut chart */
function createDonut(data, tag) {

  // radius of the donut
  let radius = 200;

  // color scale, in gradients (red-green)
  let color = d3.scale.ordinal().range(["url(#svgGradientRed)", "url(#svgGradientGreen)"]);

  // add an SVG
  const DONUT = d3.select('#donut-chart-background')
                  .append('svg')
                  .attr('width', 485)
                  .attr('height', 485)
                  .attr('id', 'donut-chart')

  var defs = DONUT.append("defs");

  // red gradient for negative scores
  var gradientRed = defs.append("linearGradient")
                        .attr("id", "svgGradientRed")
                        .attr("x1", "0%")
                        .attr("x2", "100%")
                        .attr("y1", "0%")
                        .attr("y2", "100%");

  // gradient start color (negative)
  gradientRed.append("stop")
             .attr('class', 'start')
             .attr("offset", "0%")
             .attr("stop-color", "pink")
             .attr("stop-opacity", 0.2);

  // gradient stop color (negative)
  gradientRed.append("stop")
             .attr('class', 'end')
             .attr("offset", "100%")
             .attr("stop-color", "red")
             .attr("stop-opacity", 0.8);

  // gradient for positives
  var gradientGreen = defs.append("linearGradient")
                           .attr("id", "svgGradientGreen")
                           .attr("x1", "0%")
                           .attr("x2", "100%")
                           .attr("y1", "0%")
                           .attr("y2", "100%");

  // start color (positive)
  gradientGreen.append("stop")
               .attr('class', 'start')
               .attr("offset", "0%")
               .attr("stop-color", "lightgreen")
               .attr("stop-opacity", 0.2);

  // stop color (positive)
  gradientGreen.append("stop")
               .attr('class', 'end')
               .attr("offset", "100%")
               .attr("stop-color", "green")
               .attr("stop-opacity", 0.8);

  // append group
  let group = DONUT.append('g')
                   .attr('transform', 'translate(235, 235)');

  // append arc
  let arc = d3.svg.arc()
                  .innerRadius(radius / 2)
                  .outerRadius(radius);

  let pie = d3.layout.pie()
              .value((d) => d);

  // make arcs
  let arcs = group.selectAll(".arc")
                  .data(pie(data))
                  .enter()
                  .append('g')
                  .attr('class', 'arc')

  // append path to arcs
  arcs.append('path')
      .attr('d', 0)
      .style('opacity', 0)
      .style('opacity', 0)
      .transition().duration(200).attr("d", arc)
      .transition().duration(200).style("opacity", 1)
      .attr('fill', (d) => color(d.data))
      .attr('stroke','lightblue')

  // append count of negative/positive words to chart
  arcs.append('text')
      .attr('transform', 'translate(400, 400)')
      .attr('font-size', '0px')
      .transition().duration(200)
      .attr('transform', (d) => "translate(" + arc.centroid(d) + ")")
      .text((d) => `${d.data}x`)
      .attr('font-size', "30px")
      .attr('text-anchor', 'middle')
      .attr('font-family', "Courier")
      .attr('fill', "white")
      .attr('stroke', "white")

  // append select tag
  DONUT.append('text')
       .text(tag)
       .attr('transform', 'translate(220, 400)')
       .attr('text-anchor', 'left')
       .attr('font-family', "Impact")
       .attr('font-size', "30px")
       .attr('fill', d => (tag == "#MAGA" || tag == "#TRUMP") ? "rgba(255, 0, 0, 1)" : "rgba(0, 0, 255, 1)")
       .attr('stroke', "rgba(255, 255, 255, 0.9)")
       .transition().duration(500)
       .attr('transform', 'translate(20, 460)')
       .attr('font-size', "40px")
       .attr('stroke', d => (tag == "#MAGA" || tag == "#TRUMP") ? "rgba(255, 0, 0, 1)" : "rgba(0, 0, 255, 1)")

}
