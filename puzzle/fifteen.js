const empty = {
    x: 300,
    y: 300
}

$(document).ready(() => {
    $("#shufflebutton").bind("click", function() {
        let current = [
            {
                x: 0,
                y: 0
            },
            {
                x: 100,
                y: 0
            },
            {
                x: 200,
                y: 0
            },
            {
                x: 300,
                y: 0
            },
            {
                x: 0,
                y: 100
            },
            {
                x: 100,
                y: 100
            },
            {
                x: 200,
                y: 100
            },
            {
                x: 300,
                y: 100
            },
            {
                x: 0,
                y: 200
            },
            {
                x: 100,
                y: 200
            },
            {
                x: 200,
                y: 200
            },
            {
                x: 300,
                y: 200
            },
            {
                x: 0,
                y: 300
            },
            {
                x: 100,
                y: 300
            },
            {
                x: 200,
                y: 300
            },
            {
                x: 300,
                y: 300
            }
        ];

        $("#puzzlearea div").each(function() {
            shuffle(current);
            let tempX = current[0].x;
            let tempY = current[0].y;

            $(this).attr("position", `${tempX}-${tempY}`);
            $(this).css("left", `${tempX}px`);
            $(this).css("top", `${tempY}px`);

            if ($(this).attr("empty")) {
                empty.x = tempX;
                empty.y = tempY
            }
            current.shift();
            $(this).unbind("click");
        });

        function shuffle(array) {
            array.sort(() => Math.random() - 0.5);
        }
        setListener();
    });
    setPosition();
    setListener();
});

function setPosition() {
    $("#puzzlearea div").each(function(i) {
        let div = $(this);

        // calculate x and y for this piece
        let x = ((i % 4) * 100) ;
        let y = (Math.floor(i / 4) * 100) ;

        div.attr("position", `${x}-${y}`);

        // set basic style and background
        applyBackground(div, x, y);
    });
}

function setListener() {
    $("#puzzlearea div").each(function(i) {
        let div = $(this);

        // calculate x and y for this piece
        let newPosition = $(this).attr("position").split("-")
        // store x and y for later
        div.x = newPosition[0];
        div.y = newPosition[1];

        div.bind({
            click: function() {
                const { xSide, ySide, xDifference, yDifference } = checkEmptySide(div);

                if (xSide) {
                    check(div.css("background-position"), div.text());
                    clearBox(div);
                    empty.x -= xDifference;
                } else if (ySide) {
                    check(div.css("background-position"), div.text());
                    clearBox(div);
                    empty.y -= yDifference;
                }
            }
        });

        if (newPosition[0] == empty.x && newPosition[1] == empty.y) {
            clearBox(div);
        }
    });

    function check(prop, content) {
        $("#puzzlearea div").each(function() {
            let position = $(this).attr("position").split("-");

            if (empty.x == position[0] && empty.y == position[1]) {
                applyBackground($(this), empty.x, empty.y);
                $(this).css("background-position", prop);
                $(this).html(content);
            }
        })
    }

    function clearBox(div) {
        div.empty();
        div.css("backgroundImage", "none");
        div.removeClass("puzzlepiece");
    }

    function checkEmptySide(div) {
        const result = {
            xSide: false,
            ySide: false,
            xDifference: 0,
            yDifference: 0
        }
        if (empty.y == div.y || empty.x == div.x) {
            if (Math.abs(empty.x - div.x) == 100) {
                result.xDifference = empty.x - div.x;
                result.xSide = true;
            }
            if (Math.abs(empty.y - div.y) == 100) {
                result.yDifference = empty.y - div.y;
                result.ySide = true;
            }
        }
        return result;
    }
}

function applyBackground(div, x, y) {
    div.addClass("puzzlepiece");
    div.css({
        "left": x + 'px',
        "top": y + 'px',
        "backgroundImage": 'url("background.jpg")',
        "backgroundPosition": -x + 'px ' + (-y) + 'px'
    });
}