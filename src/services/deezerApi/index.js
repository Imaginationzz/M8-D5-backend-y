const express = require("express");
const fetch = require("node-fetch");

const deezerRouter = express.Router();

deezerRouter.get("/songs/:query", async (req, res, next) => {
  try {
    const resp = await fetch(
      "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + req.params.query,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "dadb0572d1mshf513c7c09dbd153p184fa1jsndbdedc59fd83",
          "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        },
      }
    );
    const data = await resp.json();
    res.send(data);
  } catch (error) {
    next(error);
  }
});
deezerRouter.get("/artist/:id", async (req, res, next) => {
  try {
    const resp = await fetch(
      "https://deezerdevs-deezer.p.rapidapi.com/artist/" + req.params.id,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "dadb0572d1mshf513c7c09dbd153p184fa1jsndbdedc59fd83",
          "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        },
      }
    );
    const data = await resp.json();
    res.send(data);
  } catch (error) {
    next(error);
  }
});

deezerRouter.get("/album/:id", async (req, res, next) => {
  try {
    const resp = await fetch(
      "https://deezerdevs-deezer.p.rapidapi.com/album/" + req.params.id,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "dadb0572d1mshf513c7c09dbd153p184fa1jsndbdedc59fd83",
          "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        },
      }
    );
    const data = await resp.json();

    res.send(data);
  } catch (error) {
    next(error);
  }
});

module.exports = deezerRouter;
