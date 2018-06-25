function sortObject(obj) {
    var arr = [];
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            arr.push({
                'key': `#${prop}`,
                'value': obj[prop]
            });
        }
    }
    arr.sort(function(a, b) {
      return a.value - b.value;
    });
    return arr;
}

function parseMonthTags(index, month) {
  let monthTags = hashtags[index].toptags.split(',');
  monthTags.forEach(function(tag) {
    if (hashMonths[month][tag] == null) {
      hashMonths[month][tag] = 0;
    } else {
      hashMonths[month][tag]++;
    }
  })
}

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
    padding: {
      t: 10,
      b: 10,
      l: 10,
      r: 10
    }
  }

  return DIMENSIONS
}

function getMonths() {

  const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun',
                  'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

  return months
}



function processSentiment(tokens) {
  console.log(tokens);

    let dictionary = {};
    dictionary['positive'] = [];
    dictionary['negative'] = [];
    let negCount = 0

    const Q = d3.queue();

    Q.defer(d3.csv, "data/sentiments/positive-words.csv")
     .defer(d3.csv, "data/sentiments/negative-words.csv")
     .awaitAll(processDict)

    function processDict(error, response) {

      if (error) throw error;

      positiveWords = response[0];
      negativeWords = response[1];

      for (let i = 0; i < positiveWords.length; i++) {
        dictionary.positive.push(positiveWords[i].words);
      }

      for (let i = 0; i < negativeWords.length; i++) {
        dictionary.negative.push(negativeWords[i].words);
        negCount++;
      }
      console.log(dictionary);
      return calculateSentiment(dictionary, tokens);
    }
}

function calculateSentiment(dictionary, tokens) {

  let score = 0
  console.log(score);

  for (let i = 0; i < tokens.length; i++) {
    console.log(tokens[i].toLowerCase())

    for (let j = 0; j < 2006; j++) {

      if (dictionary.positive[j] == tokens[i].toLowerCase()) {
        score++;
      }
    }

    for (let k = 0; k < 4783; k++) {
      if (dictionary.negative[k] == tokens[i].toLowerCase()) {
        score--;
      }
    }
  }
  console.log(score);
  return score
}

function groupHashtags(hashtags, hashDict, index) {
  let months = getMonths();
  let tags = hashtags.toptags.split(',');
  for (let x = 0; x < tags.length; x++) {
    if (tags[x] != undefined && hashDict[months[index]].length < 75) {
      hashDict[months[index]].push(`#${tags[x]}`);
    }
  }
  return hashDict
}
