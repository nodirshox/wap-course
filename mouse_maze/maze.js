$(document).ready(function() {
    $("#start").click(startGame);
});

function startGame() {
    $("#status").text("Game is started...");
    $(".boundary").removeClass("youlose");
    
    $("#maze").on("mouseleave", function() {
        finishGame("You lose!", true);
    });

    let isWin = true;
    $("#maze .boundary").mouseover(function() {
        $(this).addClass("youlose");
        isWin = false;
    });

    $("#end").mouseover(function() {
        let message = isWin ? "You win! :]" : "Sorry, you lost. :[";
        finishGame(message, false);
    });
}

function finishGame(message, isCheat) {
    $("#status").text(message);
    $("#maze .boundary").unbind("mouseover");
    $("#end").unbind("mouseover");
    $("#maze").unbind("mouseleave");

    if (isCheat) {
        $("#maze .boundary").addClass("youlose");
    } else {
        alert(message);
        $(".boundary").removeClass("youlose");
    }
}