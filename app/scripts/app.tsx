import React, { useEffect, useState } from "react";
import {Table} from "./table";
import {Menu} from "./menu";
export const App=(props)=>{
  const [data,setData]=useState(props.data);
  
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
    <div>
      <Menu download={downloadCSV}/>
      <Table data={data}/>
    </div>
  );
}