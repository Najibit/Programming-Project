let tweets;
let tweetCollection;



const Q = d3.queue();

Q.defer(d3.csv, "data/hashtags/htmaga.csv")
 .await(processTweets)

function processTweets(error, response) {

  if (error) throw error;

  tweets = response;


  tweetCollection = [];
  dictionary = getDictionary();

  for (let i = 0; i < 2; i++) {
    tweetCollection[`tweet_${i}`] = {}
    let words = Object.values(tweets[i])[0].split(' ');

    tweetCollection[`tweet_${i}`]['words'] = words;
    dictionary =
    tweetCollection[`tweet_${i}`][`score`] = processSentiment(words, dictionary);
  }
  console.log(tweetCollection)
}
// setTimeout(() => console.log(tweetCollection), 3000);
