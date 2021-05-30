import React, { useEffect, useState } from "react";

export const TableHead=(props)=>{
  const [colName,setColName]=useState(props.colName);
  const [sortColName,setSortColName]=useState(props.sortColName);
  const [currentSort,setCurrentSort]=useState(props.currentSort);
  const [currentSearch,setCurrentSearch]=useState(props.currentSearch);
  let matches={
    name:"Name",
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
  function searchHandler(element){
    let currentProperty=element.parentElement.parentElement.querySelector('[order]').getAttribute("order");
    let newSearch=currentSearch;
      newSearch[currentProperty]=element.value;
    props.updateSearch(newSearch);
    props.dataUpdate({
      type:"search",
      params:{
        count:props.recordsPerPage,
        currentPage:1,
        sortcol:currentSort.col,
        sort:currentSort.order,
        queries:currentSearch
      }
    });
  }
  // useEffect(()=>{
  //   props.dataUpdate({
  //     type:"search",
  //     params:{
  //       count:props.recordsPerPage,
  //       currentPage:props.currentPage,
  //       sortcol:currentSort.col,
  //       sort:currentSort.order,
  //       queries:currentSearch
  //     }
  //   })
  // },[currentSearch]);
  return (
    <th>
      <div onClick={(e)=>props.sortHandler(e.target)} order={sortColName}>
        {colName} {icon}
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text icon-search" id="search-icon"></span>
        </div>
        <input type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="search-icon" onInput={(e)=>searchHandler(e.target)}/>
      </div>
    </th>
  );
}