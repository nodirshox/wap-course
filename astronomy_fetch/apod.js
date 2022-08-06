$(document).ready(function () {
    $("#view_button").click(getPicture);
    $("#loading").hide();
});

function getPicture () {
    const date = $("#date").val();
    fetch(`https://api.nasa.gov/planetary/apod?api_key=BcDlAajpopNIVm3wRa5d1S5lZ0tEVhcPwkIiPO6i&date=${date}`)
    .then(function(respone) {
        return respone.json();
    })
    .then(function(data) {
        if (data.code == 400) {
            return Promise.reject(data.msg);
        }

        showPicture(data);
    })
    .catch(function(error) {
        noPicture(error);
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
    $("#loading").hide();
    alert(error);
};
