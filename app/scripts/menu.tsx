import React, { useState } from "react";
import {MenuItem} from "./menu-item";


export const Menu=()=>{
  function uploadHandler(e){
    console.log(e.target.files);
    var fr=new FileReader();
    fr.onload=function(){
      
    }
    fr.readAsText(e.target.files[0]);
  }
  return (
    <div className="sticky-top">
      <div className="collapse" id="navbarToggleExternalContent">
        <div className="bg-dark p-4">
          <div className="row">
            <div className="col-3">
              <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <a className="nav-link active text-white bg-secondary" id="v-pills-download-tab" data-toggle="pill" href="#v-pills-download" role="tab" aria-controls="v-pills-download" aria-selected="true">Download</a>
                <a className="nav-link text-white" id="v-pills-upload-tab" data-toggle="pill" href="#v-pills-upload" role="tab" aria-controls="v-pills-upload" aria-selected="false">Upload</a>
                <a className="nav-link text-white">Reset</a>
              </div>
            </div>
            <div className="col-9">
              <div className="tab-content" id="v-pills-tabContent">
                <div className="tab-pane fade show active" id="v-pills-download" role="tabpanel" aria-labelledby="v-pills-download-tab">
                  <button type="button" className="btn btn-secondary btn-lg btn-block">Data Input Template</button>
                  <button type="button" className="btn btn-secondary btn-lg btn-block">Current Filter Selection</button>
                  <button type="button" className="btn btn-secondary btn-lg btn-block">All Data</button>
                </div>
                <div className="tab-pane fade" id="v-pills-upload" role="tabpanel" aria-labelledby="v-pills-upload-tab">
                  <div className="input-group mb-3">
                    <div className="custom-file">
                      <input type="file" className="custom-file-input" id="inputGroupFile02" accept=".csv" multiple={false} onInput={(e)=>uploadHandler(e)}/>
                      <label className="custom-file-label" htmlFor="inputGroupFile02" aria-describedby="inputGroupFileAddon02">Choose file</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav className="navbar navbar-dark bg-dark">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      </nav>
    </div>
  );
};