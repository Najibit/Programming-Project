let tweets;

window.onload = function() {

  const Q = d3.queue();

  Q.defer(d3.csv, "data/hashtags/htmaga.csv")
   .await(processTweets)

  function processTweets(error, response) {

    if (error) throw error;

    tweets = response;


    tweetCollection = [];

    for (let i = 0; i < tweets.length; i++) {
      tweetCollection[`tweet_${i}`] = {}
      let words = Object.values(tweets[i])[0].split(' ');

      tweetCollection[`tweet_${i}`]['words'] = words;
      tweetCollection[`tweet_${i}`][`score`] = processSentiment(words);
    }
  }
  setTimeout(() => console.log(tweetCollection), 3000);
}
