// Upload Document Word .docx
var openFile = function (event, idInput) {
  var input = event.target;
  var reader = new FileReader();
  reader.onload = function () {
    var zip = new JSZip(reader.result);
    var doc = new window.docxtemplater().loadZip(zip);
    var text = doc.getFullText();
    if (idInput == "inputDoc1") {
      var node = document.getElementById("outputDoc1");
    } else var node = document.getElementById("outputDoc2");
    node.innerText = text;
  };
  reader.readAsBinaryString(input.files[0]);
};
