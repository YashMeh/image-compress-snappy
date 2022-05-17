const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const LZ4 = require("lz4");
const SnappyJS = require("snappyjs");

function generateRandom(maxLimit = 1) {
  let rand = Math.random() * maxLimit;
  rand = Math.floor(rand); // 99

  return rand;
}

app.use(cors());

app.get("/img", (req, res) => {
  const imageUrl = `https://picsum.photos/id/${generateRandom()}/200/300`;
  console.log(imageUrl);
  axios
    .get(imageUrl, {
      responseType: "arraybuffer",
    })
    .then((response) => {
      //Create a buffer
      const buffer = Buffer.from(response.data);
      res.header("Content-Type", response.headers["content-type"]);
      res.status(200).send(buffer);
    })
    .catch((err) => {
      console.log(`Error fetching image ${err}`);
    });
});

app.get("/compress/img", (req, res) => {
  const imageUrl = `https://picsum.photos/id/${generateRandom()}/200/300`;
  axios
    .get(imageUrl, {
      responseType: "arraybuffer",
    })
    .then((response) => {
      //Create a buffer
      const buffer = Buffer.from(response.data);

      var snappyOutput = SnappyJS.compress(buffer);
      console.log("Snappy after compress size ", snappyOutput.length);
      res.header("Content-Type", response.headers["content-type"]);
      res.status(200).send(snappyOutput);
    })
    .catch((err) => {
      console.log(`Error fetching image ${err}`);
    });
});

app.listen(8080, (err) => {
  if (err) console.log(`Error occurred starting the server ${err}`);

  console.log(`Server started at port 8080`);
});
