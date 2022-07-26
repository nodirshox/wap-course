"use strict";

$(document).ready(function() {
    let intervalId;
    let speed = 250;
    $("#start").click(function() {
       startAnimation();
       toggleButtons(false, true, true);
    });
    
    $("#changeSize").change(function() {
        $("#mytextarea").css("font-size", this.value + "pt");
    });

    $("#stop").click(function() {
        toggleButtons(true, false, false);
        clearInterval(intervalId);
        let chars = ANIMATIONS[$("#animationType").val()].split("=====\n");
        $("#mytextarea").val(chars[0]);
    });

    $("#speed").click(function() {
        if ($('#speed').is(":checked")) {
            speed = 50;
            startAnimation();
        } else {
            speed = 250;
            startAnimation();
        }
    });

    function startAnimation() {
        clearInterval(intervalId);
        $("#mytextarea").val("");
        let chars = ANIMATIONS[$("#animationType").val()].split("=====\n");
        let total = chars.length;
        let index = 0;
        intervalId = setInterval(function() {
            if (index === total) {
                index = 0;
            }
            $("#mytextarea").val(chars[index]);
            index += 1;
        }, speed);
    }

    function toggleButtons(stop, start, animation) {
        $("#stop").prop("disabled", stop);
        $("#start").prop("disabled", start);
        $("#animationType").prop("disabled", animation);
    }
});