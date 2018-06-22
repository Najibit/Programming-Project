// function slide() {
//
//   let slideSVG = d3.select('#timeSlider')
//                    .attr('width', 900)
//                    .attr('height', 100);
//
//   let d_grade = 25;
//   let e_grade = 25;
//   let f_grade = 25;
//   let g_grade = 25;
//
//   var gSlider = d3.sliderHorizontal().value(g_grade)
//      .max(100)
//      .step(1)
//      .axis(true)
//   	.on("slideend", function(evt,value) {
//       let totalValue = value + f_grade+ d_grade + e_grade
//
//        if (totalValue > 100){
//
//          g_grade = 100 - f_grade - d_grade - e_grade;
//
//        } else {
//
//          g_grade = value;
//
//        }
//
//       	gSlider.value(g_grade)
//     })
//
//
//   d3.select('#timeSlider')
//     .call(gSlider)
//
//   console.log("hi")
//
// }
