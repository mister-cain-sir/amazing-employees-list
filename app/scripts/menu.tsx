import React, { useEffect, useState } from "react";
import {MenuItem} from "./menu-item";
import {Notification} from "./notification";
import {Network} from "./network";

let net=new Network();

export const Menu=(props)=>{
  const [uploadState,setUploadState]=useState({
    status:"ready",
    notification:{}
  });
  const [resetState,setResetState]=useState({
    status:"ready",
    notification:{}
  });
  function uploadHandler(e){
    setUploadState({
      status:"uploadInProgress",
      notification:{
        heading:"Requesting Dataset Change",
        description:"Data Upload in progress"
      }
    });
    net.uploadFile(e.target.files[0]).then(function (response) {
      if(response.data.status && response.data.message=="File is uploaded")
        setUploadState({
          status:"uploadComplete",
          notification:{
            heading:"Dataset Change",
            description:"Data Upload complete"
          }
        });
      else
        setUploadState({
          status:"uploadError",
          notification:{
            heading:"Dataset Error",
            description:"Something went wrong"
          }
        });
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  function resetData(){
    setResetState({
      status:"waitingResponseFromServer",
      notification:{
        heading:"Requesting Dataset Change",
        description:"Synchronizing database"
      }
    });
    net.resetAllData().then((response)=>{
      if(response.data.message=="Database cleared")
        setResetState({
          status:"dataCleared",
          notification:{
            heading:"Dataset Change",
            description:"Database has been emptied"
          }
        });
      else
        setResetState({
          status:"dataClearError",
          notification:{
            heading:"Dataset Error",
            description:"Something went wrong"
          }
        });
    });
  }
  useEffect(()=>{
    if(resetState.status=="dataCleared" || uploadState.status=="uploadComplete"){
      props.dataUpdate();
      if(resetState.status=="dataCleared")
        setResetState({
          status:"ready",
          notification:{}
        });
      if(uploadState.status=="uploadComplete"){
        document.getElementById("data-upload-file-input").value="";
        setUploadState({
          status:"ready",
          notification:{}
        });
      }
    }
  },[resetState.status,uploadState.status]);
  return (
    <div className="col-12">
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
                  <button type="button" className="btn btn-secondary btn-lg btn-block" onClick={()=>props.download("template")}>Data Input Template</button>
                  {/* <button type="button" className="btn btn-secondary btn-lg btn-block" onClick={()=>props.download("current")}>Current Filter Selection</button> */}
                  <button type="button" className="btn btn-secondary btn-lg btn-block" onClick={()=>props.download("all")}>All Data</button>
                </div>
                <div className="tab-pane fade" id="v-pills-upload" role="tabpanel" aria-labelledby="v-pills-upload-tab">
                  <div className="input-group mb-3">
                    <div className="custom-file">
                      <input type="file" className="custom-file-input" id="data-upload-file-input" accept=".csv" multiple={false} onInput={(e)=>uploadHandler(e)}/>
                      <label className="custom-file-label" htmlFor="inputGroupFile02" aria-describedby="inputGroupFileAddon02">Choose file</label>
                      <Notification content={uploadState.notification}/>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="v-pills-reset" role="tabpanel" aria-labelledby="v-pills-reset-tab">
                  <div className="card bg-gradient-warning ">
                    <div className="card-body">
                      <h5 className="card-title">Data Removal Warning!!!</h5>
                      <p className="card-text">All data will be deleted. Press Confirm to proceed</p>
                      <div>
                        <button type="button" className={(resetState.status=="waitingResponseFromServer" || resetState.status=="dataCleared")?"btn btn-danger disabled":"btn btn-danger"} onClick={()=>resetData()}>Confirm</button>
                        <Notification content={resetState.notification}/>
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