const express = require("express");
const app = express();
const session = require("express-session");
const path = require("path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(session({
    secret: "mysecret",
    saveUninitialized: true,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 *24
    }
}));

app.use((req, res, next) => {
    if (req.session.squenceNumber == undefined) {
        req.session.squenceNumber = 0;
        req.session.score = 0;
    }
    next();
});

app.get("/", (req, res) => {
    const sequences = [
        [
            1, 1, 2, 3, 5
        ],
        [
            1, 4, 9, 16, 25
        ],
        [
            2, 3, 5, 7, 11
        ],
        [
            1, 2, 4, 8, 16
        ],
        [
            3, 1, 4, 1, 5
        ]
    ]
    let isFinished = false;
    if (req.session.squenceNumber >= sequences.length) {
        isFinished = true;
    }

    res.render("sample", {
        score: req.session.score,
        sequence: sequences[req.session.squenceNumber],
        total: sequences.length,
        finish: isFinished
    });
});

app.post("/submit", (req, res) => {
    const sequences = [
        [8], [36], [13], [32], [9]
    ]
    if (sequences[req.session.squenceNumber] == req.body.answer) {
        req.session.score++;
    };
    req.session.squenceNumber++;
    res.redirect("back");
});

app.get("/clear", (req, res) => {
    req.session.destroy();
    res.redirect("back");
});

app.listen(3000);