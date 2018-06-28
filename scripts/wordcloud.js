let hashtags;
let hashMonths = {};
let months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
var width =  1300;// $("#chart").width();
var height = 600; // $("#chart").height();

let currentMonth = 'jan';


window.onload = function() {
getHashTags();
updateCloud();
$(".month-buttons").click(function() {
  $('html, body').animate({
      scrollTop: $("#wordcloud").offset().top
  }, 1000);
});
}
function updateCloud() {

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

  d3.selectAll('.cloudtags').transition().duration(400).style('opacity', 0).remove();
  drawWordCloud(hashMonths, month)


  // for (let i = 0; i < months.length; i++) {
  //
  //   if (!(months[i] == month)) {
  //     console.log('removing')
  //   // remove all hashtags not belonging to the current view
  //   d3.selectAll(`text#hashtag-${months[i]}`)
  //     .transition().duration(1000).style("opacity", 0)
  //     .transition().duration(1000).remove();
  //   }
  // }
}

function createSVG(width, height) {

  d3.select('#chart')
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr('id', 'wordcloud')

  d3.select("svg#linechart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr('id', 'linegraph')
}

function drawWordCloud(allTags, month){

  let common = "poop,i,me,my,myself,we,us,our,ours,ourselves,you,your,yours,yourself,yourselves,he,him,his,himself,she,her,hers,herself,it,its,itself,they,them,their,theirs,themselves,what,which,who,whom,whose,this,that,these,those,am,is,are,was,were,be,been,being,have,has,had,having,do,does,did,doing,will,would,should,can,could,ought,i'm,you're,he's,she's,it's,we're,they're,i've,you've,we've,they've,i'd,you'd,he'd,she'd,we'd,they'd,i'll,you'll,he'll,she'll,we'll,they'll,isn't,aren't,wasn't,weren't,hasn't,haven't,hadn't,doesn't,don't,didn't,won't,wouldn't,shan't,shouldn't,can't,cannot,couldn't,mustn't,let's,that's,who's,what's,here's,there's,when's,where's,why's,how's,a,an,the,and,but,if,or,because,as,until,while,of,at,by,for,with,about,against,between,into,through,during,before,after,above,below,to,from,up,upon,down,in,out,on,off,over,under,again,further,then,once,here,there,when,where,why,how,all,any,both,each,few,more,most,other,some,such,no,nor,not,only,own,same,so,than,too,very,say,says,said,shall";

  var word_count = {};
  // console.log(allTags[month], month)
  var words = allTags[month].split(/[ '\-\(\)\*":;\[\]|{},.!?]+/);
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

  var svg_location = "#chart";


  // createSVG(width, height);

  var fill = d3.scale.category20();

  var word_entries = d3.entries(word_count);

  var xScale = d3.scale.linear()
     .domain([0, d3.max(word_entries, function(d) {
        return d.value;
      })
     ])
     .range([10,100]);

  d3.layout.cloud().size([width, height])
    .timeInterval(20)
    .words(word_entries)
    .fontSize(function(d) { return xScale(+d.value); })
    .text(function(d) { return d.key; })
    .rotate(function() { return ~~(Math.random() * 2) * 90; })
    .font("Impact")
    .on("end", draw)
    .start();

    // d3.select('#chart').append("svg")
    //     .attr("width", width)
    //     .attr("height", height)
    //     .attr('id', 'wordcloud')

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

  d3.layout.cloud().stop();
}

function getHashTags() {

  // store all tweets per day
  let days = [];

  // make a queue
  const Q = d3.queue();

  // import all data from csv
  Q.defer(d3.csv, "data/hashtags/allhashtags.csv")
   .await(processHash);

  // process data so it's usable
  function processHash(error, response) {

    if (error) throw error;

    hashtags = response;


    for (let i = 0; i < months.length; i++) {
      hashMonths[months[i]] = [];
    }

    for (let i = 0; i < hashtags.length; i++) {
      hashtags[i].day = hashtags[i].day.slice(0, -3);
    }

    // kan veel beter, maak functie
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

    for (let i = 0; i < months.length; i++) {
        hashMonths[months[i]] = hashMonths[months[i]].join(' ');
    }


    createSVG(width, height)
    drawWordCloud(hashMonths, 'jan');
    return hashMonths;
  }
}
