require("bootstrap");
import React from 'react';
import ReactDom from 'react-dom';
import {App} from "./app";
import {Network} from "./network";
import "../styles/app.scss";

let network=new Network();
let currentPage=1,
  resultsPerPage=11;
network.fetchRequestedData({
  type:"list",
  params:{
    count:resultsPerPage,
    currentPage:currentPage
  }
}).then((records)=>{
  ReactDom.render(<App data={records.rows} totalRecords={records.count} recordsPerPage={resultsPerPage} currentPage={currentPage}/>,document.getElementById("main-wrapper"));
});