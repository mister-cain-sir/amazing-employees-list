import React, { useEffect, useState } from "react";
import {Table} from "./table";
import {Menu} from "./menu";
import {Network} from "./network";
import {Paginator} from "./paginator";
let network=new Network();
export const App=(props)=>{
  const [data,setData]=useState(props.data);
  const [currentPage,setCurrentPage]=useState(props.currentPage);
  const [recordsPerPage,setRecordsPerPage]=useState(props.recordsPerPage);
  let tPages=parseInt(props.totalRecords/recordsPerPage);
  if(tPages*recordsPerPage<props.totalRecords)
    tPages++;
  const [totalPages,setTotalPages]=useState((tPages<1)?1:tPages);
  const [displayedPages,setDisplayedPages]=useState(5);
  
  function updateData(config){
    if(!config)
      network.fetchAllData().then((records)=>{
        setData(records.rows);
      });
    else{
      network.fetchRequestedData(config).then((records)=>{
        setData(records.rows);
      });
    }
  }
  useEffect(()=>{
    setData(props.data);
  },[props.data]);
  function downloadCSV(downloadType){
    let csv;
    switch(downloadType){
      case "all":
        csv = data.map(row => Object.values(row));
        csv.unshift(Object.keys(data[0]));
        csv=csv.join('\n');
        break;
      case "current":
        break;
      case "template":
        if(data.length>0){
          let d=data.slice(0,1);
          csv = d.map(row => Object.values(row));
          csv.unshift(Object.keys(data[0]));
          csv=csv.join('\n');
        }
        else
          csv="first_name,last_name,dob,salary,manager,department";
        break;
    }
    
    
    let hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv );
    // hiddenElement.target = '_blank';
    hiddenElement.download = 'people.csv';
    hiddenElement.click();
  }
  return (
    <div className="row">
      <Menu download={downloadCSV} dataUpdate={updateData} setData={setData} data={data}/>
      <Table data={data}/>
      <Paginator currentPage={currentPage} totalPages={totalPages} displayedPages={displayedPages} dataUpdate={updateData} recordsPerPage={recordsPerPage}/>
    </div>
  );
}