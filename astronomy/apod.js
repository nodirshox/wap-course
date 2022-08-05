$(document).ready(function () {
    $("#view_button").click(getPicture);
    $("#loading").hide();
});

function getPicture () {
    $.ajax({
        url: "https://api.nasa.gov/planetary/apod",
        type: "GET",
        data: {
            api_key: "BcDlAajpopNIVm3wRa5d1S5lZ0tEVhcPwkIiPO6i",
            date: $("#date").val()
        },
        dataType: "json",
        "success": showPicture,
        "error": noPicture,
        "always": hideLoading
    });
    $("#loading").show();
    $("#myTitle").text("");
    $("#pic").attr("src", "");
};

function showPicture(data) {
    $("#loading").hide();
    $("#pic").attr("src", data.url);
    $("#myTitle").text(data.title);
};

function noPicture(error) {
    alert(error.responseText);
};

function hideLoading() {
    $("#loading").hide();
}