require("bootstrap");
import React from 'react';
import ReactDom from 'react-dom';
import {App} from "./app";
import {Network} from "./network";
import "../styles/app.scss";

let network=new Network();
network.fetchAllData().then((records)=>{
  console.log(records);
  
  ReactDom.render(<App data={records}/>,document.getElementById("main-wrapper"));
});