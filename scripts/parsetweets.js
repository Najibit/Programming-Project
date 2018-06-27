function gimmeSentiments() {

  const Q = d3.queue();

  let allTweets;
  let allSentiments;

  Q.defer(d3.csv, "data/hashtags/htmaga.csv")
   .defer(d3.csv, "data/hashtags/htblacklm.csv")
   .defer(d3.csv, "data/hashtags/htclinton.csv")
   .defer(d3.csv, "data/hashtags/httrump.csv")
   .awaitAll(processTweets)

  function processTweets(error, response) {

    if (error) throw error;

    allTweets = {};
    allSentiments = {};
    comTags = ['#MAGA', '#BLACKLIVESMATTER', '#CLINTON', '#TRUMP'];

    for (let i = 0; i < comTags.length; i++) {
      allTweets[comTags[i]] = response[i];
      allSentiments[comTags[i]] = [];
    }



    for (let i = 0; i < comTags.length; i++) {
      let negativity = 0;
      let positivity = 0;

      for (let j = 0; j < allTweets[comTags[i]].length; j++) {

        let message = Object.values(allTweets[comTags[i]][j])[0]
        let words = message.split(/[ '\-\(\)\*":;\[\]|{},.!?]+/);
        let sentiments = calculateSentiment(words);


        negativity += sentiments['Negative Words'];
        positivity += sentiments['Positive Words'];
      }

        allSentiments[comTags[i]].push(negativity, positivity)
    }
    getSentiments(allSentiments)
  }
}
