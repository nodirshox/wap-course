const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send(`
    <html>
        <head>
            <title>Simple Calculator</title>
            <style>
                body {
                    font-family: Arial;
                }
                div {
                    margin: 8px 0;
                }
                input[type="submit"] {
                    background-color: blue;
                    color: white;
                    border: 0px black solid;
                    padding: 5px;
                }
            </style>
        </head>
        <body>
            <fieldset>
                <legend>Simple Calculator</legend>

                <form action="/calculate">
                <div>
                    <label>First Number</label>
                    <input type="number1" name="first" required>
                </div>
                <div>
                    <label>Operation</label>
                    <select name="operation">
                        <option value="plus" selected>+</option>
                        <option value="minus">-</option>
                        <option value="multiply">x</option>
                        <option value="divide">/</option>
                    </select>
                </div>
                <div>
                    <label>Second Number</label>
                    <input type="number2" name="second" required>
                </div>
                <div>
                    <input type="submit" value="Calculate">
                </div>
            </fieldset>
        </body>
    </html>
    `);
});

app.get("/calculate", (req, res) => {
    const num1 = parseInt(req.query.first);
    const num2 = parseInt(req.query.second);
    const operation = req.query.operation;

    let total = 0;
    let sign = "";
    
    switch(operation) {
        case "plus":
            total = num1 + num2;
            sign = "+";
            break;
        case "minus":
            total = num1 - num2;
            sign = "-";
            break;
        case "multiply":
            total = num1 * num2;
            sign = "x";
            break;
        case "divide":
            total = num1 / num2;
            sign = "/";
            break;
        default:
            total = 0;
    }
    res.send(`
    <html>
        <head>
            <title>Simple Calculator</title>
            <style>
                body {
                    font-family: Arial;
                }
                div {
                    margin: 8px 0;
                }
                a {
                    text-decoration: none;
                    color: blue;
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <fieldset>
                <legend>Total</legend>
                <div>${num1} ${sign} ${num2} = ${total}</div>
                <div><a href="/">Another calculation</a></div>
            </fieldset>
        </body>
    </html>
    `);
});

app.listen(3000);