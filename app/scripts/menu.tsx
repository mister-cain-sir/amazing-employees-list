import React, { useEffect, useState } from "react";
import {MenuItem} from "./menu-item";
const axios = require('axios'),
  $=require("jquery");

export const Menu=()=>{
  const [resetState,setResetState]=useState("ready");
  useEffect(()=>{
    if($('.toast').length>0){
      $('.toast').toast('show',{
        animation:true
      })
    }
  });
  function uploadHandler(e){
    let formData = new FormData();
    formData.append("dataupload", e.target.files[0]);
    axios.post("/upload-data",formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(function (response) {
      if(response.data.status && response.data.message=="File is uploaded")
        console.log("DATA UPLOADED");
        
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  function resetData(){
    setResetState("waitingResponseFromServer");
    axios.delete("/api/json/reset").then((response)=>{
      console.log(response);
      // TODO: Handle error
      setResetState("dataCleared");
      window.setTimeout(()=>{
        setResetState("ready");
      },3000);
    });
  }
  let resetConfirmationButton=(resetState=="dataCleared")?(
      <div>
        <button type="button" className="btn btn-danger disabled" onClick={()=>resetData()}>Confirm</button>
        <div className="position-fixed bottom-0 right-0 p-3" style={{zIndex: 5, right: 0, bottom: 0}}>
          <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true" data-autohide="false">
            <div className="toast-header">
              <strong className="mr-3">Dataset Change</strong>
              <small>now</small>
              <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="toast-body">
              Database has been emptied.
            </div>
          </div>
        </div>
      </div>
    ):(resetState=="waitingResponseFromServer")?(
      <div>
        <button type="button" className="btn btn-danger disabled" onClick={()=>resetData()}>Confirm</button>
        <div className="position-fixed bottom-0 right-0 p-3" style={{zIndex: 5, right: 0, bottom: 0}}>
          <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true" data-autohide="false">
            <div className="toast-header">
              <strong className="mr-3">Requesting Dataset Change</strong>
              <small>now</small>
              <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="toast-body">
              Synchronizing database
            </div>
          </div>
        </div>
      </div>
    ):(
      <button type="button" className="btn btn-danger" onClick={()=>resetData()}>Confirm</button>
    );
  return (
    <div className="sticky-top">
      <div className="collapse" id="navbarToggleExternalContent">
        <div className="bg-dark p-4">
          <div className="row">
            <div className="col-3">
              <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <a className="nav-link active text-white" id="v-pills-download-tab" data-toggle="pill" href="#v-pills-download" role="tab" aria-controls="v-pills-download" aria-selected="true">Download</a>
                <a className="nav-link text-white" id="v-pills-upload-tab" data-toggle="pill" href="#v-pills-upload" role="tab" aria-controls="v-pills-upload" aria-selected="false">Upload</a>
                <a className="nav-link text-white" id="v-pills-reset-tab" data-toggle="pill" href="#v-pills-reset" role="tab" aria-controls="v-pills-reset" aria-selected="false">Reset</a>
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
                <div className="tab-pane fade" id="v-pills-reset" role="tabpanel" aria-labelledby="v-pills-reset-tab">
                  <div className="card bg-gradient-warning ">
                    <div className="card-body">
                      <h5 className="card-title">Data Removal Warning!!!</h5>
                      <p className="card-text">All data will be deleted. Press Confirm to proceed</p>
                      {resetConfirmationButton}
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