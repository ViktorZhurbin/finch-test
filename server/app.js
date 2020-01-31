const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

const port = 4000;

app.post("/finch-test", (req, res) => {
    res.send({ success: true });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
