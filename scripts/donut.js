window.onload = function() {

  gimmeSentiments();

  $(".seperator").hover(function() {
    $('html, body').animate({
        scrollTop: $("#smessage").offset().top
    }, 1000);
});
}

function getSentiments(sentiments) {

  let scores   = sentiments;

  replaceDonut(scores)

  const DONUT = d3.select('#donut-chart-background')
                  .append('svg')
                  .attr('width', 530)
                  .attr('height', 530)
                  .attr('id', 'donut-chart')
  DONUT.append('p')
        .text('sdfsdfsdfsd')
        .attr('font-size', '70px')
        .attr('transform', 'translate(300, 300)')

}

function replaceDonut(scores) {

  comTags    = ['#MAGA', '#BLACKLIVESMATTER', '#CLINTON', '#TRUMP'];

  $(comTags[0]).click(function() { removeDonut(scores[comTags[0]], comTags[0]); });
  $(comTags[1]).click(function() { removeDonut(scores[comTags[1]], comTags[1]); });
  $(comTags[2]).click(function() { removeDonut(scores[comTags[2]], comTags[2]); });
  $(comTags[3]).click(function() { removeDonut(scores[comTags[3]], comTags[3]); });
}

function removeDonut(data, tag) {

  d3.selectAll('svg#donut-chart')
    .transition().duration(200).style("opacity", 0.1)
    .transition().duration(200).remove();

    $('h5').remove();

    setTimeout(function(){ createDonut(data, tag);; }, 1000);
}


function createDonut(data, tag) {

  let radius = 200;

  let color = d3.scale.ordinal().range(["url(#svgGradientRed)", "url(#svgGradientGreen)"]);

  const DONUT = d3.select('#donut-chart-background')
                  .append('svg')
                  .attr('width', 485)
                  .attr('height', 485)
                  .attr('id', 'donut-chart')

  var defs = DONUT.append("defs");

  var gradientRed = defs.append("linearGradient")
                        .attr("id", "svgGradientRed")
                        .attr("x1", "0%")
                        .attr("x2", "100%")
                        .attr("y1", "0%")
                        .attr("y2", "100%");

  gradientRed.append("stop")
             .attr('class', 'start')
             .attr("offset", "0%")
             .attr("stop-color", "pink")
             .attr("stop-opacity", 0.2);

  gradientRed.append("stop")
             .attr('class', 'end')
             .attr("offset", "100%")
             .attr("stop-color", "red")
             .attr("stop-opacity", 0.8);

  var gradientGreen = defs.append("linearGradient")
                           .attr("id", "svgGradientGreen")
                           .attr("x1", "0%")
                           .attr("x2", "100%")
                           .attr("y1", "0%")
                           .attr("y2", "100%");

  gradientGreen.append("stop")
               .attr('class', 'start')
               .attr("offset", "0%")
               .attr("stop-color", "lightgreen")
               .attr("stop-opacity", 0.2);

  gradientGreen.append("stop")
               .attr('class', 'end')
               .attr("offset", "100%")
               .attr("stop-color", "green")
               .attr("stop-opacity", 0.8);

  let group = DONUT.append('g')
                   .attr('transform', 'translate(235, 235)');

  let arc = d3.svg.arc()
                  .innerRadius(radius / 2)
                  .outerRadius(radius);

  let pie = d3.layout.pie()
              .value((d) => d);


  let arcs = group.selectAll(".arc")
                  .data(pie(data))
                  .enter()
                  .append('g')
                  .attr('class', 'arc')

  arcs.append('path')
      .attr('d', 0)
      .style('opacity', 0)
      .style('opacity', 0)
      .transition().duration(200).attr("d", arc)
      .transition().duration(200).style("opacity", 1)
      .attr('fill', (d) => color(d.data))
      .attr('stroke','lightblue')

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
