let tweets;
let tweetCollection;

const Q = d3.queue();

Q.defer(d3.csv, "data/hashtags/htmaga.csv")
 .defer(d3.csv, "data/hashtags/htblacklm.csv")
 .defer(d3.csv, "data/hashtags/htclinton.csv")
 .defer(d3.csv, "data/hashtags/httrump.csv")
 .defer(d3.csv, "data/hashtags/htsanders.csv")
 .defer(d3.csv, "data/hashtags/htcruz.csv")

 .awaitAll(processTweets)

function processTweets(error, response) {

  if (error) throw error;

   tweets = response[0];


  tweetCollection = [];
  let negativity = 0;
  let positivity = 0;
  let neutrality = 0;

  for (let i = 0; i < tweets.length; i++) {
    tweetCollection[`tweet_${i}`] = {}
    let words = Object.values(tweets[i])[0].split(/[ '\-\(\)\*":;\[\]|{},.!?]+/);
    let sentimentsTotal = calculateSentiment(words);
    // let sentiment = "neutral";


    negativity += sentimentsTotal['Negative Words'];
    positivity += sentimentsTotal['Positive Words'];

    // if (score < 0) {
    //   sentiment = "negative";
    //   negativity++;
    // } else if (score > 0) {
    //   sentiment = "positive";
    //   positivity++;
    // } else {
    //   neutrality++;
    // }
    tweetCollection[`tweet_${i}`]['words'] = words;
    // tweetCollection[`tweet_${i}`][`score`] = score;
    // tweetCollection[`tweet_${i}`][`sentiment`] = sentiment;
  }
  console.log(negativity, positivity)
}
// setTimeout(() => console.log(tweetCollection), 3000);
