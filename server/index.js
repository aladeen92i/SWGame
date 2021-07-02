import express from "express";
import cors from "cors";
import fetch from "node-fetch";
//import * as utils from "./utils/utils.js";
var app = express();
app.use(cors());
app.use(express.json());

const getSWDAta = async (type, input) => {
  try {
    console.log("request started server side");
    const url = "https://swapi.dev/api/" + type.trim() + "/?search=" + input.trim();
    console.log("url :",url);
    const response = await fetch(url);
    const data = await response.json(); // parse JSON
    return data;
  } catch (error) {
    console.log(error);
  }
};

app.post("/api/getSWData", async (req, res) => {
  let { type, input } = req.body;
  if(type.length !== 0 && input.length !== 0 ){
    console.log("search request type :", type);
    console.log("search request input:", input);
    let response = await getSWDAta(type, input);
    console.log(response)
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(response);
  }else{
    res.status(400).json("you must provide a type & some input to start a research !");
  }

});

app.listen(8080, () => {
  console.log("Server listening on 8080");
});
