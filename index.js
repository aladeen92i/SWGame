import express from "express";
import cors from "cors";
import fetch from "node-fetch"
//import * as utils from "./utils/utils.js";
var app = express();
app.use(cors());
app.use(express.json());

const getSWDAta = async (type, input) => {
  try {
    const url = "https://swapi.dev/api/" + type + "/?search=" + input;
    const response = await fetch(url); // get users list
    const data = await response.json() // parse JSON
    return data;
  } catch (error) {
    console.log(error);
  }
};

app.get("/getSWData", async (req, res) => {
  let type = req.query.type;
  let input = req.query.input;
  let response = await getSWDAta(type, input)
  res.send(response);
});

app.listen(8080, () => {
  console.log("Server listening on 8080");
});
