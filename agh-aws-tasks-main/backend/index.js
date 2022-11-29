const cors = require("cors");
const express = require("express");

const videos = require("./data/vid.json");

const app = express();

const port = 8080;

app.use(cors({
    origin: "*",
}));

app.get("/videos", (req, res) => {
    res.send(Object.values(videos));
});

app.get("/videos/:id", (req, res) => {
    const video = videos[req.params.id];

    if (!video) {
        res.status(404).send("Not found");
        return;
    }

    res.send(video);
});

app.listen(port);
console.log(`Backend running on port: ${port}`);
