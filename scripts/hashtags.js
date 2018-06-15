let hashtags;
let hashMonths;


function getHashTags() {

  // store all tweets per day
  let days = [];

  // make a queue
  const Q = d3.queue();

  // import all data from csv
  Q.defer(d3.csv, "data/hashtags/allhashtags.csv")
   .await(processHash);

  // process data so it's usable
  function processHash(error, response) {

    if (error) throw error;

    hashtags = response;

    let months = getMonths();

    hashMonths = {};

    for (let i = 0; i < months.length; i++) {
      hashMonths[months[i]] = [];
    }

    for (let i = 0; i < hashtags.length; i++) {
      hashtags[i].day = hashtags[i].day.slice(0, -3);
    }

    for (let i = 0, j = 0; i < hashtags.length; i++) {
      switch (hashtags[i].day) {
        case "2016-01":
          parseMonthTags(i, months[j]);
          break;
        case "2016-02":
          j = 1;
          parseMonthTags(i, months[j]);
          break;
        case "2016-03":
          j = 2;
          parseMonthTags(i, months[j]);
          break;
        case "2016-04":
          j = 3;
          parseMonthTags(i, months[j]);
          break;
        case "2016-05":
          j = 4;
          parseMonthTags(i, months[j]);
          break;
        case "2016-06":
          j = 5;
          parseMonthTags(i, months[j]);
          break;
        case "2016-07":
          j = 6;
          parseMonthTags(i, months[j]);
          break;
        case "2016-08":
          j = 7;
          parseMonthTags(i, months[j]);
          break;
        case "2016-09":
          j = 8;
          parseMonthTags(i, months[j]);
          break;
        case "2016-10":
          j = 9;
          parseMonthTags(i, months[j]);
          break;
        case "2016-11":
          j = 10;
          parseMonthTags(i, months[j]);
          break;
        case "2016-12":
          j = 11;
          parseMonthTags(i, months[j]);
          break;
        default:
      }
    }

    for (let i = 0; i < months.length; i++) {
        hashMonths[months[i]] = sortObject(hashMonths[months[i]]);
    }
  }
}

getHashTags();
