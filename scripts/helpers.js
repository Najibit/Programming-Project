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

function getDict() {

  let dictionary = {};
  dictionary['positive'] = [];
  dictionary['negative'] = [];

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
    }
  }
    return dictionary
}

// function processSentiment(tokens) {
//   console.log(tokens);
//
//     let dictionary = {};
//     dictionary['positive'] = [];
//     dictionary['negative'] = [];
//     let negCount = 0
//
//     const Q = d3.queue();
//
//     Q.defer(d3.csv, "data/sentiments/positive-words.csv")
//      .defer(d3.csv, "data/sentiments/negative-words.csv")
//      .awaitAll(processDict)
//
//
//       console.log(dictionary);
//       return calculateSentiment(dictionary, tokens);
//     }
// }

let dict = getDict();

function calculateSentiment(tokens) {

  let score = 0;
  let dictionary = dict;
  let negWords = 0;
  let posWords = 0;

  for (let i = 0; i < tokens.length; i++) {

    for (let j = 0; j < 2006; j++) {
      if (dictionary.positive[j] == tokens[i].toLowerCase()) {
        posWords++;
      }
    }

    for (let k = 0; k < 4783; k++) {
      if (dictionary.negative[k] == tokens[i].toLowerCase()) {
        negWords++;
      }
    }
  }
  let sentiments = {}
  sentiments['Positive Words'] = posWords;
  sentiments['Negative Words'] = negWords;
  return sentiments
}

function groupHashtags(hashtags, hashDict, index) {
  let months = getMonths();
  let tags = hashtags.toptags.split(',');
  let counter = 0;
  for (let x = 0; x < tags.length; x++) {
    if (tags[x] != undefined && counter < 30) { // NOG NAAR KIJKEN
      hashDict[months[index]].push(`#${tags[x]}`);
      counter++;
    }
  }
  return hashDict
}
