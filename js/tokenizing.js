// Change Text into Token
function tokenize(doc) {
  var x = doc;
  regex = /[a-z0-9]/;
  var y = "";
  var z = [];

  //Start loop char in document
  for (i = 0; i < x.length; i++) {
    //Check regular expression
    if (regex.test(x[i])) {
      //if yes add char into y
      y += x[i];
    } else if (y != "") {
      //if y is not empty and char is not in regex then put y into array z
      z.push(y);
      y = "";
    }

    //check last char in document
    if (i == x.length - 1 && y != "") {
      z.push(y);
      y = "";
    }
  }
  //return array z
  return z;
}
