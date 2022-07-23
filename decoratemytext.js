function myAlert() {
    let text = document.getElementById("myText");

    text.style.fontWeight = "normal";
    text.style.color = "black";
    text.style.textDecoration = "none";

    let checkBox = document.getElementById("bling");
    if (checkBox.checked) {
        text.style.fontWeight = "bold";
        text.style.color = "green";
        text.style.textDecoration = "underline";
    }

    setInterval(increaseFontSize, 500);
}

function increaseFontSize() {
    let text = document.getElementById("myText");
    let currentSize = parseInt(text.style.fontSize);
    if (!currentSize) {
        currentSize = 12;
    }
    currentSize += 2;
    text.style.fontSize = currentSize + "pt";
}