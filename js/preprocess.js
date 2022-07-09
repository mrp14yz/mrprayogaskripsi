function preproses(doc) {
  // This is Pre Processing
  // There are Case Folding, Tokenizing, Filtering, and Stemming in this step
  var text = caseFold(doc);
  var token = tokenize(text);
  filter(token);
  token = stem(token);
  doc = tampilToken(token, doc);
  return doc;
}

function prosesCompare() {
  //Check input if there any empty field
  if (checkEmptyInput("outputDoc1", "outputDoc2", "kgram")) {
    //Start all process from begin to end
    var doc1 = preproses("outputDoc1");
    var doc2 = preproses("outputDoc2");
    var k = document.getElementById("kgram").value;
    var hasil = algorithm(doc1, doc2, k);

    //Memanggil Google Pie Chart untuk menampilkan hasil
    google.charts.setOnLoadCallback(drawChart(hasil));
  }
}

function tampilToken(token, doc) {
  //Function untuk menampilkan array
  var x = "";
  for (var i = 0; i < token.length; i++) {
    //console.log(token[i]);
    if (i !== token.length - 1) {
      x += token[i] + " ";
    } else x += token[i];
  }
  document.getElementById(doc).value = x;
  return x;
}

function checkEmptyInput(doc, doc2, k) {
  //Check input jika kosong akan mengembalikan false
  var x = document.getElementById(doc).value;
  var y = document.getElementById(doc2).value;
  var z = document.getElementById(k).value;
  if (x == "") {
    document.getElementById(doc).className = "form-control is-invalid";
  }
  if (y == "") {
    document.getElementById(doc2).className = "form-control is-invalid";
  }
  if (z == "") {
    document.getElementById(k).className = "form-control is-invalid";
  }
  if (x == "" || y == "" || z == "") {
    return false;
  } else return true;
}

function defaultClass(id) {
  //Change input and textarea class to default
  document.getElementById(id).className = "form-control";
}

function checkInput(event) {
  //function for check input kgram
  regex = /[0-9]/;
  var x = event.key;

  //Allow only number
  if (!regex.test(x)) {
    //event.returnValue = false;
    //Melakukan prevent Default untuk mencegah terjadinya perubahan
    if (event.preventDefault) event.preventDefault();
  }
}
