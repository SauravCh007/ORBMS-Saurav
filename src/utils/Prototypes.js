Array.prototype.keySort = function(key, order = 'asc'){
  this.sort(function(a, b) {
    var result = order === 'desc' ? (a[key] < b[key]) : (a[key] > b[key]);
    return result ? 1 : -1;
  });
  return this;
}

Array.prototype.keySortCount = function(key, order = 'asc'){
  this.sort(function(a, b) {
    var result = order === 'desc' ? (a[key].length < b[key].length) : (a[key].length > b[key].length);

    if (a[key].length === b[key].length) {
      result = true;
    }
    return result ? 1 : -1;
  });
  return this;
}