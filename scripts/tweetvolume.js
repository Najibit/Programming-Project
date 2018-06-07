function getTweetVolumes() {

  // store all tweets per day
  let days = [];

  d3.csv("data/tweetvolume.csv", function(data) {

    for (let i = 0; i < data.length; i++) {

      let day = [];

      day.push(data[i]["\"day\""].replace("\"", "")
                                 .replace("\"", ""));
      day.push(parseInt(data[i]["\"num\""].replace("\"", "")
                                 .replace("\"", "")));

      days.push(day);
    }
  })

  return days;
}
