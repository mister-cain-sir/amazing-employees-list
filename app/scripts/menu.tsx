import React, { useEffect, useState } from "react";
import {MenuItem} from "./menu-item";
import {Notification} from "./notification";
const axios = require('axios');

export const Menu=()=>{
  const [menuState,setMenuState]=useState({
    reset:{
      status:"ready",
      notification:{}
    }
  });
  const [resetState,setResetState]=useState("ready");
  const [notificationContent,setNotificationContent]=useState({});
  useEffect(()=>{});
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
    setMenuState({
      reset:{
        status:"waitingResponseFromServer",
        notification:{
          heading:"Requesting Dataset Change",
          description:"Synchronizing database"
        }
      }
    });
    axios.delete("/api/json/reset").then((response)=>{
      console.log(response);
      // TODO: Handle error
      setMenuState({
        reset:{
          status:"dataCleared",
          notification:{
            heading:"Dataset Change",
            description:"Database has been emptied"
          }
        }
      });
      window.setTimeout(()=>{
        setMenuState({
          reset:{
            status:"ready",
            notification:{}
          }
        });
      },3000);
    });
  }
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
                      <div>
                        <button type="button" className={(menuState.reset.status=="waitingResponseFromServer" || menuState.reset.status=="dataCleared")?"btn btn-danger disabled":"btn btn-danger"} onClick={()=>resetData()}>Confirm</button>
                        <Notification content={menuState.reset.notification}/>
                      </div>
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