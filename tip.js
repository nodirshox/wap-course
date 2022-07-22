function calcTip() {
    let subtotal = parseFloat(document.getElementById("subtotal").value);
    let tip = parseFloat(document.getElementById("tip").value);
    
    let totalSum = subtotal + subtotal * tip / 100;
    
    // check totalSum is integer, if yes add .00
    // if totalSum has floating points, round by 2 decimal points
    if (totalSum % 1 === 0) {
        totalSum = totalSum + ".00";
    } else {
        totalSum = totalSum.toFixed(2);
    }

    document.getElementById("total").innerHTML = "$" + totalSum;
}