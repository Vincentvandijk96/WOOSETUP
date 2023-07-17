function search(query) {
  // Get the PDF files in the repository.
  var files = fs.readdirSync(".");

  // Filter the files that are PDFs.
  var pdfFiles = files.filter(function(file) {
    return file.endsWith(".pdf");
  });

  // Search the PDF files for the query.
  var results = pdfFiles.map(function(file) {
    var content = fs.readFileSync(file, "utf8");
    var matches = content.match(new RegExp(query, "i"));
    return {
      file: file,
      matches: matches
    };
  });

  // Display the results.
  $("#results").html(results);
}

$(document).ready(function() {
  $("#search").on("submit", function(e) {
    e.preventDefault();
    search($("#query").val());
  });
});
