window.onload = function() {

  function getTweetVolumes() {

    // store all tweets per day
    let days = [];

    // make a queue
    const Q = d3.queue();

    // import all data from csv
    Q.defer(d3.csv, "data/tweetvolume.csv")
     .await(processData);

    // process data so it's usable
    function processData(error, response) {

      if (error) throw error;

      for (let i = 0; i < response.length; i++) {

        let day = [];

        day.push(response[i]['day']);
        day.push(parseInt(response[i]['num']));

        days.push(day);
      }
      lineGraph(days);
    }
  }
  getTweetVolumes();
}
