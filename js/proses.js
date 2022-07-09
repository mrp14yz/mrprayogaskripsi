//Step Process Algorithm Rabin Karp
function algorithm(doc1, doc2, k) {
  var pattern = "";
  var hashPattern; //pattern doc1
  var hashText; //pattern doc2
  var totalMatch = 0;
  var n; //variable for sum of match in loop doc2
  var listMatch = []; //Array 2 Dimensional
  for (var i = 0; i < doc1.length - (k - 1); i++) {
    //START LOOP DOC1
    //get first pattern hash for doc1
    if (i == 0) {
      hashPattern = hash(i, k, doc1);
    } //using rolling hash for next pattern for doc1
    else hashPattern = rollHash(i, hashPattern, k, doc1);

    console.log(hashPattern);
    pattern = getPattern(doc1, k, i);
    //console.log(pattern);

    //Check if there any in array
    if (checkArray2D(hashPattern, pattern, listMatch)) {
      totalMatch++;
      //console.log("Berhasil ditemukan");
      continue;
    }

    n = 1; //Start from 1

    for (var j = 0; j < doc2.length - (k - 1); j++) {
      //START LOOP DOC2
      if (j == 0) {
        //get first pattern hash for doc2
        hashText = hash(j, k, doc2);
      } //using rolling hash for next pattern for doc2
      else hashText = rollHash(j, hashText, k, doc2);

      if (hashPattern == hashText) {
        //START CHECK IF HASH SIMILAR

        //check pattern for avoid collision
        if (pattern == getPattern(doc2, k, j)) {
          n++;
          //Add into array list Match
          if (!checkArray2D(hashPattern, pattern, listMatch)) {
            listMatch.push([hashPattern, pattern]);
          }

          //console.log(n);
        } else {
          //IF THERE A HASH MATCH WITH ANOTHER HASH AND
          //THE PATTERN IS NOT SAME WITH THAT HASH
          // OR U CAN SAY COLLISION HASH
          console.log("COLLISION");
          continue;
        }
      } //END CHECK HASH SIMILAR
    } //End of loop Document 2
    
    if (n !== 1) {
      totalMatch += n; //Jumlahkan total yang ditemukan
    }
  } //End of loop Document 1

  //Dice similarity Coefficient
  console.log(listMatch);
  console.log("totalmatch "+totalMatch);
  return diceSimilarity(doc1, doc2, totalMatch / 2, k);
}

//function for convert pattern to hash value
function hash(index, k, text) {
  var hash = 0;
  for (var i = k - 1; i >= 0; i--) {
    hash += text.charCodeAt(index) * Math.pow(10, i);
    index++;
  }
  return hash;
}

//function rolling hash
function rollHash(index, hash, k, text) {
  hash =
    (hash - text.charCodeAt(index - 1) * Math.pow(10, k - 1)) * 10 +
    text.charCodeAt(index + (k - 1)) * Math.pow(10, 0);
  return hash;
}

//function dice similarity coefficient
function diceSimilarity(doc1, doc2, c, k) {
  var a = doc1.length - (k - 1);
  var b = doc2.length - (k - 1);
  var s = (2 * c) / (a + b);
  s = s * 100;
  return s;
}

//function check pattern
function getPattern(doc, k, index) {
  var pattern = "";
  for (var i = index; i <= index + (k-1); i++) {
    pattern += doc[i];
  }
  return pattern;
}

//function check array 2 dimensional
function checkArray2D(hash, pattern, array) {
  for (var i = 0; i < array.length; i++) {
    if (hash == array[i][0]) {
      if (pattern == array[i][1]) {
        return true;
      }
    }
  }
  return false;
}
