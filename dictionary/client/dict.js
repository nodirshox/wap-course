const API_URL = "http://localhost:3000";

$(document).ready(function() {
    $("#search").click(sendRequest);
});

function sendRequest() {
    const searchWord = $("#search_value").val();
    const body = JSON.stringify({ word: searchWord });

    $.ajax({
        url: `${API_URL}/search`,
        type: "POST",
        dataType: "json",
        data: body,
        contentType: "application/json",
        success: (response) => {
            populateData(response);
        },
        error: (err) => {
            $("#result").empty().append("<p>Error on connecting the server</p>");
         }
    });
}

function populateData(response) {
    let text = "<p>Word not found</p>";
    if (response.total > 0) {
        text = response.data.map((e, index) => {
            return `<p>${index + 1}(${e.wordtype}) :: ${e.definition}</p>`
        });    
    }
    $("#result").empty().append(text);
}