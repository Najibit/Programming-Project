function getTweetVolumes() {

  // store all tweets per day
  let days = [];
  let dayValues = [];

  // make a queue
  const Q = d3.queue();

  // import all data from csv
  Q.defer(d3.csv, "data/tweets/tweetvolume.csv")
   .await(processData);

  // process data so it's usable
  function processData(error, response) {

    if (error) throw error;

    let weekData = response;
    let monthTotals = {}
    let months = getMonths();

    for (let i = 0; i < weekData.length; i++) {
      weekData[i].day = weekData[i].day.slice(0, -3);
    }

    for (let i = 0; i < months.length; i++) {
      monthTotals[months[i]] = 0;
    }

    for (let i = 0, j = 0; i < weekData.length; i++) {
      switch (weekData[i].day) {
        case "2016-01":
          monthTotals[months[j]] += parseInt(weekData[i].num);
          break;
        case "2016-02":
          j = 1;
          monthTotals[months[j]] += parseInt(weekData[i].num);
          break;
        case "2016-03":
          j = 2;
          monthTotals[months[j]] += parseInt(weekData[i].num);
          break;
        case "2016-04":
          j = 3;
          monthTotals[months[j]] += parseInt(weekData[i].num);
          break;
        case "2016-05":
          j = 4;
          monthTotals[months[j]] += parseInt(weekData[i].num);
          break;
        case "2016-06":
          j = 5;
          monthTotals[months[j]] += parseInt(weekData[i].num);
          break;
        case "2016-07":
          j = 6;
          monthTotals[months[j]] += parseInt(weekData[i].num);
          break;
        case "2016-08":
          j = 7;
          monthTotals[months[j]] += parseInt(weekData[i].num);
          break;
        case "2016-09":
          j = 8;
          monthTotals[months[j]] += parseInt(weekData[i].num);
          break;
        case "2016-10":
          j = 9;
          monthTotals[months[j]] += parseInt(weekData[i].num);
          break;
        case "2016-11":
          j = 10;
          monthTotals[months[j]] += parseInt(weekData[i].num);
          break;
        case "2016-12":
          j = 11;
          monthTotals[months[j]] += parseInt(weekData[i].num);
          break;
        default:
      }
    }

    for (let i = 0; i < response.length; i++) {

      let day = [];

      day.push(response[i]['day']);
      day.push(parseInt(response[i]['num']));
      dayValues.push(parseInt(response[i]['num']));

      days.push(day);
    }
    lineGraph(days, dayValues, monthTotals);
  }
}
getTweetVolumes();
