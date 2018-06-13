function sortObject(obj) {
    var arr = [];
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            arr.push({
                'key': prop,
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
