//
// The page contains functions to implement the word cloud.
//
// Name: Najib el Moussaoui
// Course: Minor Programming, End Project.
// Date: 28-06-2018
//

// global storage variable
let hashMonths = {};

window.onload = function() {

  // parse all tags
  getHashTags();

  // and activate update function
  updateCloud();

  // when a month is clicked, navigate to word cloud
  $(".month-buttons").click(function() {
    $('html, body').animate({
        scrollTop: $("#wordcloud").offset().top
    }, 1000);
  });

}

function updateCloud() {

  // months of the year
  let months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun',
                'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

  // jQuery interactivity to update word cloud based on month clicked
  $(`#${months[0]}`).click(function() { removeHashTags(months[0]);});
  $(`#${months[1]}`).click(function() { removeHashTags(months[1]);});
  $(`#${months[2]}`).click(function() { removeHashTags(months[2]);});
  $(`#${months[3]}`).click(function() { removeHashTags(months[3]);});
  $(`#${months[4]}`).click(function() { removeHashTags(months[4]);});
  $(`#${months[5]}`).click(function() { removeHashTags(months[5]);});
  $(`#${months[6]}`).click(function() { removeHashTags(months[6]);});
  $(`#${months[7]}`).click(function() { removeHashTags(months[7]);});
  $(`#${months[8]}`).click(function() { removeHashTags(months[8]);});
  $(`#${months[9]}`).click(function() { removeHashTags(months[9]);});
  $(`#${months[10]}`).click(function() { removeHashTags(months[10]);});
  $(`#${months[11]}`).click(function() { removeHashTags(months[11]);});

}

function removeHashTags(month) {

  // remove current word cloud
  d3.selectAll('.cloudtags')
    .transition()
    .duration(400)
    .style('opacity', 0) // fade out
    .remove(); // and remove

  drawWordCloud(hashMonths, month);

}

/* create an SVG */
function createSVG(width, height) {

  // select chart div
  d3.select('#chart')
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr('id', 'wordcloud')

  // select line-chart div
  d3.select("svg#linechart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr('id', 'linegraph')
}

/* Draw the word cloud */
function drawWordCloud(allTags, month){

  // dimensions
  let width =  1300;
  let height = 600;

  // ignore commonly used words
  let common = "poop,i,me,my,myself,we,us,our,ours,ourselves,you,your,yours,yourself,yourselves,he,him,his,himself,she,her,hers,herself,it,its,itself,they,them,their,theirs,themselves,what,which,who,whom,whose,this,that,these,those,am,is,are,was,were,be,been,being,have,has,had,having,do,does,did,doing,will,would,should,can,could,ought,i'm,you're,he's,she's,it's,we're,they're,i've,you've,we've,they've,i'd,you'd,he'd,she'd,we'd,they'd,i'll,you'll,he'll,she'll,we'll,they'll,isn't,aren't,wasn't,weren't,hasn't,haven't,hadn't,doesn't,don't,didn't,won't,wouldn't,shan't,shouldn't,can't,cannot,couldn't,mustn't,let's,that's,who's,what's,here's,there's,when's,where's,why's,how's,a,an,the,and,but,if,or,because,as,until,while,of,at,by,for,with,about,against,between,into,through,during,before,after,above,below,to,from,up,upon,down,in,out,on,off,over,under,again,further,then,once,here,there,when,where,why,how,all,any,both,each,few,more,most,other,some,such,no,nor,not,only,own,same,so,than,too,very,say,says,said,shall";

  // count dict
  let word_count = {};

  // split all words in to tokens and add to count
  let words = allTags[month].split(/[ '\-\(\)\*":;\[\]|{},.!?]+/);
    if (words.length == 1){
      word_count[words[0]] = 1;
    } else {
      words.forEach(function(word){
        var word = word.toLowerCase();
        if (word != "" && common.indexOf(word)==-1 && word.length>1){
          if (word_count[word]){
            word_count[word]++;
          } else {
            word_count[word] = 1;
          }
        }
      })
    }

  // fill function
  let fill = d3.scale.category20();

  // all word entries
  let word_entries = d3.entries(word_count);

  // the x-scale
  let xScale = d3.scale.linear()
     .domain([0, d3.max(word_entries, function(d) {
        return d.value;
      })
     ])
     .range([10,100]);

  // initiate cloud
  d3.layout.cloud().size([width, height])
    .timeInterval(20)
    .words(word_entries)
    .fontSize(function(d) { return xScale(+d.value); })
    .text(function(d) { return d.key; })
    .rotate(function() { return ~~(Math.random() * 2) * 90; })
    .font("Impact")
    .on("end", draw)
    .start();


  // start drawing
  function draw(words) {

    d3.select('svg#wordcloud')
      .append("g")
        .attr("transform", "translate(" + [width >> 1, height >> 1] + ")")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .attr('id', `hashtag-${month}`)
        .attr('class', 'cloudtags')
        .style("font-size", "2px")
        .style("opacity", 0)
        .transition().duration(2000)
        .style("opacity", 1)
        .style("font-size", function(d) { return xScale(d.value) + "px"; })
        .style("font-family", "Impact")
        .style("fill", function(d, i) { return fill(i); })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.key; })

  }

  // and stop the cloud
  d3.layout.cloud().stop();
}

/* Gets all tags. */
function getHashTags() {

  // dimensions
  let width =  1300;
  let height = 600;

  // store all tweets per day
  let days = [];

  // months of the year
  let months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun',
                'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

  // make a queue
  const Q = d3.queue();

  // import all data from csv
  Q.defer(d3.csv, "data/hashtags/allhashtags.csv")
   .await(processHash);

  // process data so it's usable
  function processHash(error, response) {

    if (error) throw error;

    // save response in new descriptive variable
    let hashtags = response;

    // make a dict
    for (let i = 0; i < months.length; i++) {
      hashMonths[months[i]] = [];
    }

    // remove day of the month
    for (let i = 0; i < hashtags.length; i++) {
      hashtags[i].day = hashtags[i].day.slice(0, -3);
    }

    // sort all tags within their months
    for (let i = 0, j = 0; i < hashtags.length; i++) {
      switch (hashtags[i].day) {
        case "2016-01":
          groupHashtags(hashtags[i], hashMonths, j);
          break;
        case "2016-02":
          j = 1;
          groupHashtags(hashtags[i], hashMonths, j);
          break;
        case "2016-03":
          j = 2;
          groupHashtags(hashtags[i], hashMonths, j);
          break;
        case "2016-04":
          j = 3;
          groupHashtags(hashtags[i], hashMonths, j);
          break;
        case "2016-05":
          j = 4;
          groupHashtags(hashtags[i], hashMonths, j);
          break;
        case "2016-06":
          j = 5;
          groupHashtags(hashtags[i], hashMonths, j);
          break;
        case "2016-07":
          j = 6;
          groupHashtags(hashtags[i], hashMonths, j);
          break;
        case "2016-08":
          j = 7;
          groupHashtags(hashtags[i], hashMonths, j);
          break;
        case "2016-09":
          j = 8;
          groupHashtags(hashtags[i], hashMonths, j);
          break;
        case "2016-10":
          j = 9;
          groupHashtags(hashtags[i], hashMonths, j);
          break;
        case "2016-11":
          j = 10;
          groupHashtags(hashtags[i], hashMonths, j);
          break;
        case "2016-12":
          j = 11;
          groupHashtags(hashtags[i], hashMonths, j);
          break;
        default:
      }
    }

    // and join back together
    for (let i = 0; i < months.length; i++) {
        hashMonths[months[i]] = hashMonths[months[i]].join(' ');
    }

    // make an SVG
    createSVG(width, height)

    // and draw the initial word cloud
    drawWordCloud(hashMonths, 'jan');

    return hashMonths;
  }
}
