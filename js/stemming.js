// Process Stemming using Algorithm Nazief Adriani
function stem(token) {
  var tempWord = ""; //Temporary variable for before find root word
  var rootWord = []; //Array for Root Word

  for (var i = 0; i < token.length; i++) {
    //Start Perulangan Kata

    if (checkArray(kataDasar, token[i])) {
      //Start Check Root Word
      rootWord.push(token[i]); //Add into array root word IF found in kataDasar
      continue;
    }
    if (token[i] == "") {
      //Check if there is empty in array *from filter process
      continue;
    }

    //STEP 2 Inflection Suffixes
    tempWord = checkIS(token[i]);
    if (checkArray(kataDasar, tempWord)) {
      rootWord.push(tempWord);
      continue;
    }

    //STEP 3 Derivation Suffixes
    tempWord = checkDS(tempWord);
    if (checkArray(kataDasar, tempWord)) {
      rootWord.push(tempWord);
      continue;
    }

    //STEP 4 Derivation Prefix
    //STEP 4a
    if (checkAwalanAkhiran(tempWord)) {
      rootWord.push(tempWord);
      console.log("Awalan dan Akhiran yang tidak diizinkan");
      continue;
    }
    //STEP 4b
    tempWord = checkDP(tempWord);
    if (checkArray(kataDasar, tempWord)) {
      rootWord.push(tempWord);
      continue;
    }

    //STEP 5 Recoding
    //???????????????????????

    //STEP 6 IF NOT FOUND ADD IT AS ROOT WORD
    rootWord.push(tempWord);
  } //End of stemming word

  return rootWord;
}

// This Function is for checking if there array items equal with value
function checkArray(arr, val) {
  return arr.some(function (arrVal) {
    return val === arrVal;
  });
}

//To get suffix from word
function getSuffix(token, suffix) {
  var temp = token.substr(token.length - suffix.length);
  return temp;
}

//To remove suffix from word
function delSuffix(token, suffix) {
  var tempWord = token.substr(0, token.length - suffix.length);
  return tempWord;
}

//To get prefix from word
function getPrefix(token, prefix) {
  var temp = token.substr(0, prefix.length);
  return temp;
}

//To remove prefix from word
function delPrefix(token, prefix) {
  var temp = token.substr(prefix.length);
  return temp;
}

/////////////////////////////////////////////////////////////
/////////////S/U/F/F/I/X/////////////////////////////////////
/////////////////////////////////////////////////////////////

// Check Possessive Pronoun
function checkPP(tempWord) {
  var temp = "";
  for (var i = 0; i < pp.length; i++) {
    //Start of Possessive Pronoun Check
    //check possessive pronoun
    temp = getSuffix(tempWord, pp[i]);
    if (temp == pp[i]) {
      tempWord = delSuffix(tempWord, pp[i]);
      break;
    }
  } //End of Possessive Pronoun Check
  return tempWord;
}

// Check Inflection Suffixes
function checkIS(token) {
  var tempWord = token;
  for (var j = 0; j < is.length; j++) {
    //Start loop IS
    var temp = getSuffix(token, is[j]);

    if (temp == is[j]) {
      //Start IF Inflection Suffixes
      tempWord = delSuffix(token, is[j]);

      if (checkArray(p, temp)) {
        //Check IF suffix is Particles

        if (checkPP(tempWord) != tempWord) {
          //Check IF if there any Possessive Prounoun
          tempWord = checkPP(tempWord); //IF True update tempWord
          break;
        }
      }
      //Break loop IS IF suffix is Possessive Prounoun
      else break;
    } //End IF Check Inflection Suffixes
  } //End loop IS
  //console.log(tempWord);
  return tempWord;
}

// Check Derivation Suffixes
function checkDS(tempWord) {
  for (var j = 0; j < ds.length; j++) {
    //Start of DS loop
    if (getSuffix(tempWord, ds[j]) == ds[j]) {
      var temp = ds[j];
      tempWord = delSuffix(tempWord, ds[j]); //Delete DS in tempWord IF found
      //Push item here
      if (checkArray(kataDasar, tempWord)) {
        //Start Check Root Word
        break;
      } else if (temp == "an") {
        //STEP 3a
        if (getSuffix(tempWord, "k") == "k") {
          temp = "k" + temp;
          tempWord = delSuffix(tempWord, "k");
          if (checkArray(kataDasar, tempWord)) {
            //Start Check Root Word 2nd
            break;
          }
        }
      }

      //STEP 3b
      tempWord += temp;
      break;
    } //End of Check DS
  } //End of DS loop
  return tempWord;
}

/////////////////////////////////////////////////////////////
/////////////P/R/E/F/I/X/////////////////////////////////////
/////////////////////////////////////////////////////////////

//Check Awalan Akhiran yang Tidak Diijinkan
function checkAwalanAkhiran(tempWord) {
  var tempp = getPrefix(tempWord, "aa"); //get Prefix
  var temps = "";
  for (var i = 0; i < ds.length; i++) {
    if (getSuffix(tempWord, ds[i]) == ds[i]) {
      temps = ds[i];
    }
  } //get Suffixes

  if (temps == "") {
    //Apabila tidak ditemukan suffixes -i -an -kan
    return false;
  }

  if (tempp == "be" && temps == "i") {
    return true;
  } else if (tempp == "di" && temps == "an") {
    return true;
  } else if (
    (tempp == "ke" && temps == "i") ||
    (tempp == "ke" && temps == "kan")
  ) {
    return true;
  } else if (tempp == "me" && temps == "an") {
    return true;
  } else if (
    (tempp == "se" && temps == "i") ||
    (tempp == "se" && temps == "kan")
  ) {
    return true;
  }
  return false;
}

// Function for STEP 4b
function checkDP(tempWord) {
  prefix = getPrefix(tempWord, "aa");
  for (var i = 1; i <= 3; i++) {
    if(checkArray(kataDasar, tempWord)){
      return tempWord;
    }else if (checkArray(dp, prefix)) {
      //check jika bukan
      if (checkArray(dpp, prefix)) {
        //Jika Prefix Di- Ke- Se-
        tempWord = delPrefix(tempWord, prefix);
        return tempWord;
      } else {
        //Jika Prefix Me- Pe- Te- Be-
        if (prefix == "me" || prefix == "pe") {
          tempWord = checkMEPE(tempWord);
        } else if (prefix == "te" || prefix == "be") {
          tempWord = checkTeBe(tempWord);
        }
      }
    } //Jika tidak termasuk ke dalam Derivation Prefixes
    else return tempWord;
  }
  return tempWord;
}

function checkMEPE(tempWord) {
  var prefix;
  var tempPrefix = ""; //untuk dapat menemukan awalan jika tidak ditemukan kata dasar
  var tempW;
  for (var i = 0; i < mepe.length; i++) {
    prefix = getPrefix(tempWord, mepe[i]);
    if (prefix == mepe[i]) {
      if (prefix == "me" || prefix == "pe") {
        tempPrefix = prefix;
        tempW = delPrefix(tempWord, prefix);
        if (checkArray(kataDasar, tempW)) {
          return tempW;
        } else continue;
      } else if (prefix == "men" || prefix == "pen") {
        tempPrefix = prefix;
        tempW = delPrefix(tempWord, prefix);
        if (checkArray(kataDasar, tempW)) {
          return tempW;
        } else if (checkArray(vokal, getPrefix(tempW, "a"))) {
          tempW = "t" + tempW; // kata dasar T luluh
          return tempW;
        } else continue;
      } else if (prefix == "mem" || prefix == "pem") {
        tempPrefix = prefix;
        tempW = delPrefix(tempWord, prefix);
        if (checkArray(kataDasar, tempW)) {
          return tempW;
        } else if (checkArray(vokal, getPrefix(tempW, "a"))) {
          tempW = "p" + tempW; // kata dasar P luluh
          return tempW;
        } else continue;
      } else if (prefix == "meny" || prefix == "peny") {
        tempPrefix = prefix;
        tempW = "s" + delPrefix(tempWord, prefix); // kata dasar S luluh
        if (checkArray(kataDasar, tempW)) {
          return tempW;
        } else continue;
      } else if (prefix == "meng" || prefix == "peng") {
        tempPrefix = prefix;
        tempW = delPrefix(tempWord, prefix);
        if (checkArray(kataDasar, tempW)) {
          return tempW;
        } else if (checkArray(vokal, getPrefix(tempW, "a"))) {
          tempW = "k" + tempW; // kata dasar K luluh
          return tempW;
        } else continue;
      } else if (prefix == "per") {
        tempPrefix = prefix;
        tempW = delPrefix(tempWord, prefix);
        if (checkArray(kataDasar, tempW)) {
          return tempW;
        } else continue;
      }
    } else continue;
  } //end of looping

  //Jika tidak ditemukan maka
  tempW = delPrefix(tempWord, tempPrefix);
  return tempW;
}

function checkTeBe(tempWord) {
  var prefix;
  var tempPrefix = ""; //untuk dapat menemukan awalan jika tidak ditemukan kata dasar
  var tempW;
  for (var i = 0; i < tebe.length; i++) {
    prefix = getPrefix(tempWord, tebe[i]);
    if (prefix == tebe[i]) {
      if (prefix == "te" || prefix == "be") {
        tempPrefix = prefix;
        tempW = delPrefix(tempWord, prefix);
        if (checkArray(kataDasar, tempW)) {
          return tempW;
        } else continue;
      } else if (prefix == "ter" || prefix == "ber") {
        tempPrefix = prefix;
        tempW = delPrefix(tempWord, prefix);
        if (checkArray(kataDasar, tempW)) {
          return tempW;
        } else continue;
      }else if(prefix=="bel"){
        tempPrefix = prefix;
        tempW = delPrefix(tempWord, prefix);
        if (checkArray(kataDasar, tempW)) {
          return tempW;
        } else continue;
      }
    }
  }
  //Jika tidak ditemukan maka
  tempW = delPrefix(tempWord, tempPrefix);
  return tempW;
}
///////////////////////////////////////////////////////////
////////////////V/A/R/I/A/B/E/L////////////////////////////
///////////////////////////////////////////////////////////

//////////S/U/F/F/I/X/E/S//////////////////////////////////
// Inflection  Suffixes posisi diakhir kata
const is = ["lah", "kah", "tah", "pun", "ku", "mu", "nya"];
// Particle
const p = ["lah", "kah", "tah", "pun"];
// Possessive Pronoun
const pp = ["ku", "mu", "nya"];

// Derivation  Suffixes posisi diakhir kata
const ds = ["i", "an", "kan"];

///////////P/R/E/F/I/X/E/S///////////////////////////////////
// Awalan dan Akhiran yang tidak diijinkan
const aa = ["be", "di", "ke", "me", "se"];

// Derivation Prefixes di posisi awal kata
const dp = ["di", "ke", "se", "te", "me", "be", "pe"];

// Khusus di- ke- se- dapat langsung dihapus
const dpp = ["di", "ke", "se"];

// Khusus te- me- be- pe- kompleks
const dpk = ["te", "me", "be", "pe"];

// Awalan Me- Pe-
const mepe = [
  "me",
  "pe",
  "men",
  "pen",
  "mem",
  "pem",
  "meny",
  "peny",
  "meng",
  "peng",
  "per",
  "pel", //Still on work
];

// Awalan Te- Be-
const tebe = ["te", "be", "ter", "ber", "bel"];

// Vokal character
const vokal = ["a", "i", "u", "e", "o"];
