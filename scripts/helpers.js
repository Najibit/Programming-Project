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
