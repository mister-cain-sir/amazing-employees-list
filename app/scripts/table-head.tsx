import React, { useEffect, useState } from "react";

export const TableHead=(props)=>{
  const [colName,setColName]=useState(props.colName);
  const [sortColName,setSortColName]=useState(props.sortColName);
  const [currentSort,setCurrentSort]=useState(props.currentSort);
  let matches={
    employee:"Name",
    dob:"Date Of Birth",
    age:"Age",
    manager:"Reporting Manager",
    department:"Department",
    salary:"Salary"
  };
  let icon=null;
  if(sortColName==currentSort.col)
    icon=(<span className={"icon-sort-"+props.iconType+"-"+currentSort.order}></span>);
  useEffect(()=>{
    setColName(props.colName);
  },[props.colName]);
  useEffect(()=>{
    setSortColName(props.sortColName);
  },[props.sortColName]);
  useEffect(()=>{
    setCurrentSort(props.currentSort);
  },[props.currentSort]);
  return (
    <th onClick={(e)=>props.sortHandler(e.target)} order={sortColName}>{colName} {icon}</th>
  );
}