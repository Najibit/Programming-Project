function createDonut() {

  let data = [250, 450];

  let radius = 300;

  let color = d3.scale.ordinal().range(['red', 'green'])

  const DONUT = d3.select('body').append('svg').attr('width', 700).attr('height', 700).attr('id', 'donut-chart')

  let group = DONUT.append('g').attr('transform', 'translate(300, 300)')

  let arc = d3.svg.arc()
              .innerRadius(radius - 100)
              .outerRadius(radius)

  let pie = d3.layout.pie()
              .value(function(d) { return d; });


  let arcs = group.selectAll(".arc")
                  .data(pie(data))
                  .enter()
                  .append('g')
                  .attr('class', 'arc')

  arcs.append('path')
      .attr('d', arc)
      .attr('fill', function(d) { return color(d.data);})

  arcs.append('text')
      .attr('transform', function(d) {  return "translate(" + arc.centroid(d) + ")" })
      .text(function(d) { return d.data; })
      .attr('font-size', "20px")
      .attr('font-family', "Courier")
      .attr('fill', "white")
      .attr('stroke', "white")
}
