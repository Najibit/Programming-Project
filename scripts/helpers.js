function getMonths() {

  // return months of the year
  const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun',
                  'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

  return months
}

/* make a dictionary with all positive/negative words for sentiment analysis */
function getDict() {

  // dict
  let dictionary = {};
  dictionary['positive'] = [];
  dictionary['negative'] = [];

  // initialise queue
  const Q = d3.queue();

  // get all words
  Q.defer(d3.csv, "data/sentiments/positive-words.csv")
   .defer(d3.csv, "data/sentiments/negative-words.csv")
   .awaitAll(processDict)

  function processDict(error, response) {

    if (error) throw error;

    // more descriptive variables
    positiveWords = response[0];
    negativeWords = response[1];

    // fill dict with positive words
    for (let i = 0; i < positiveWords.length; i++) {
      dictionary.positive.push(positiveWords[i].words);
    }

    // fill dict with negative words
    for (let i = 0; i < negativeWords.length; i++) {
      dictionary.negative.push(negativeWords[i].words);
    }
  }
    return dictionary
}

// dict variable
let dict = getDict();

// calculate sentiment
function calculateSentiment(tokens) {

  // score variable
  let score = 0;

  // better name
  let dictionary = dict;

  // save counters
  let negWords = 0;
  let posWords = 0;

  // length of dichts
  let negWordsLength = 4783;
  let posWordsLength = 2006;

  for (let i = 0; i < tokens.length; i++) {

    for (let j = 0; j < posWordsLength; j++) {
      if (dictionary.positive[j] == tokens[i].toLowerCase()) {
        posWords++;
      }
    }

    for (let k = 0; k < negWordsLength; k++) {
      if (dictionary.negative[k] == tokens[i].toLowerCase()) {
        negWords++;
      }
    }
  }

  // dict for all sentiment scores
  let sentiments = {}
  sentiments['Positive Words'] = posWords;
  sentiments['Negative Words'] = negWords;

  return sentiments
}

function groupHashtags(hashtags, hashDict, index) {

  // get all months
  let months = getMonths();

  // split all tags
  let tags = hashtags.toptags.split(',');


  let counter = 0;

  // add all tags
  for (let x = 0; x < tags.length; x++) {
    if (tags[x] != undefined && counter < 30) {
      hashDict[months[index]].push(`#${tags[x]}`);
      counter++;
    }
  }
  return hashDict
}

function gimmeSentiments() {

  // initialse queue
  const Q = d3.queue();

  // storage variables
  let allTweets;
  let allSentiments;

  // get all tweets with certain hashtags
  Q.defer(d3.csv, "data/hashtags/htmaga.csv") // #MAGA
   .defer(d3.csv, "data/hashtags/htblacklm.csv") // #BLACKLIVESMATTER
   .defer(d3.csv, "data/hashtags/htclinton.csv") // #CLINTON
   .defer(d3.csv, "data/hashtags/httrump.csv") // #TRUMP
   .awaitAll(processTweets)

  function processTweets(error, response) {

    if (error) throw error;

    // make dicts
    allTweets = {};
    allSentiments = {};

    // commonly used tags to analyse
    comTags = ['#MAGA', '#BLACKLIVESMATTER', '#CLINTON', '#TRUMP'];

    // process dicts
    for (let i = 0; i < comTags.length; i++) {
      allTweets[comTags[i]] = response[i];
      allSentiments[comTags[i]] = [];
    }

    // calculate the pos/neg counts
    for (let i = 0; i < comTags.length; i++) {

      // counters
      let negativity = 0;
      let positivity = 0;

      // loop through all tweets
      for (let j = 0; j < allTweets[comTags[i]].length; j++) {

        // get the tweet
        let message = Object.values(allTweets[comTags[i]][j])[0]

        // split it up in to tokens
        let words = message.split(/[ '\-\(\)\*":;\[\]|{},.!?]+/);

        // calculate the scores
        let sentiments = calculateSentiment(words);

        // add scores to coutners
        negativity += sentiments['Negative Words'];
        positivity += sentiments['Positive Words'];
      }

        // push counters to dict
        allSentiments[comTags[i]].push(negativity, positivity)
    }

    // call function
    getSentiments(allSentiments)
  }
}
