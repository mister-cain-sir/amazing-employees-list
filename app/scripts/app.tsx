import React, { useEffect, useState } from "react";
import {Table} from "./table";
import {Menu} from "./menu";
export const App=(props)=>{
  const [data,setData]=useState(props.data);
  
  useEffect(()=>{
    setData(props.data);
  },[props.data]);
  return (
    <div>
      <Menu />
      <Table data={data}/>
    </div>
  );
}