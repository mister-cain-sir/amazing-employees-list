import React, { useEffect, useState } from "react";
import {TableRow} from "./table-row";
import {TableHead} from "./table-head";
import dayjs from 'dayjs';
import "../styles/_table.scss";

export const Table=(props)=>{
  const [data,setData]=useState(props.data);
  const [sortcol,setsortCol]=useState({
    col:props.currentSort.col,
    order:props.currentSort.order
  });
  const [currentSearch,setCurrentSearch]=useState(props.currentSearch);
  // console.log(props.currentSort);
  useEffect(()=>{
    setCurrentSearch(props.currentSearch);
  },[props.currentSearch]);
  useEffect(()=>{
    setData(props.data)
  },[props.data]);
  function sortHandler(element){
    setsortCol((prevState)=>{
      if(prevState.col==element.getAttribute("order")){
        return {
          col:prevState.col,
          order:(prevState.order=="asc")?"desc":"asc"
        };
      }
      else
        return {
          col:element.getAttribute("order"),
          order:"asc"
        };
    })
  }
  useEffect(()=>{
    props.updateSort({
      currentSort:sortcol.col,
      currentSortOrder:sortcol.order
    });
    props.dataUpdate({
      type:"list",
      params:{
        count:props.recordsPerPage,
        currentPage:props.currentPage,
        sortcol:sortcol.col,
        sort:sortcol.order
      }
    })
  },[sortcol]);
  
  
  let colNames=[["Name","alpha","name"],["Age","numeric","age"],["Date Of Birth","numeric","dob"],["Reporting Manager","alpha","manager"],["Department","alpha","department"],["Salary","numeric","salary"]]
  return (
    <div className="col-12 overflow-auto data-table-wrapper">
      <table className="table table-striped">
        <thead>
          <tr>
            {colNames.map((text,index)=>
              <TableHead key={index} colName={text[0]} sortColName={text[2]} iconType={text[1]} sortHandler={sortHandler} currentSort={sortcol}  dataUpdate={props.dataUpdate} currentSearch={currentSearch} recordsPerPage={props.recordsPerPage} updateSearch={props.updateSearch}/>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row,index)=>
            <TableRow name={row.name} age={row.age} dob={dayjs(row.dob).format('DD/MM/YYYY')} repMan={row.manager} department={row.department} salary={row.salary} key={index}/>
          )}
        </tbody>
      </table>
    </div>
  );
}