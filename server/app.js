const express = require("express");

const app = express();

app.post("/finch-test", (req, res) => {
    res.send({ success: true });
});

const port = 4000;
const server = app.listen(port, () =>
    console.log(`App ready on port ${port}!`)
);

process.on("SIGTERM", () => {
    server.close(() => {
        console.log("Process terminated");
    });
});
