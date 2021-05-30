import React, { useEffect, useState } from "react";

export const Paginator=(props)=>{
  const [currentPage,setCurrentPage]=useState(props.currentPage);
  const [totalPages,setTotalPages]=useState(props.totalPages);
  const [displayedPages,setDisplayedPages]=useState(props.displayedPages);
  const [recordsPerPage,setRecordsPerPage]=useState(25);
  const [sortcol,setSortCol]=useState(props.currentSort);
  useEffect(()=>{
    setRecordsPerPage(props.recordsPerPage);
  },[props.recordsPerPage]);
  useEffect(()=>{
    setSortCol(props.currentSort);
  },[props.currentSort]);
  let pageLinksMarkup=[];
  let startPage=currentPage-parseInt(displayedPages/2);
  if(startPage<1)
    startPage=1;
  let endPage=startPage+displayedPages-1;
  if(endPage>totalPages){
    endPage=totalPages;
    startPage=totalPages-displayedPages+1;
  }
  if(startPage<1)
    startPage=1;
  for (let i = startPage; i <= endPage; i++) {
    pageLinksMarkup.push(i);
  }
  
  function pageClickHandler(index){
    console.log(sortcol.col);
    
    setCurrentPage(index);
    props.dataUpdate({
      type:"list",
      params:{
        count:recordsPerPage,
        currentPage:index,
        sortcol:sortcol.col,
        sort:sortcol.order
      }
    })
  }
  return (
    <div className="col-12">
      <button className={(startPage>1)?"btn btn-dark":"btn btn-dark disabled"} key="first" onClick={(e)=>pageClickHandler(1)}>&lt;&lt;</button>
      {pageLinksMarkup.map((el)=>{
        if(el==currentPage)
          return (<button className="btn btn-primary" key={el}>{el}</button>)
        else
          return (<button className="btn btn-dark" key={el} data-index={el} onClick={(e)=>pageClickHandler(e.target.getAttribute("data-index"))}>{el}</button>);
        })}
      <button className={(endPage<totalPages)?"btn btn-dark":"btn btn-dark disabled"} key="last" onClick={(e)=>pageClickHandler(totalPages)}>&gt;&gt;</button>
    </div>
  );
}