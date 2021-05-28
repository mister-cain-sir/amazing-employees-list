import React from "react";
import {Table} from "./table";
import {Menu} from "./menu";
export const App=(props)=>{
  const data=[
    {
      name:"a",
      age:"23",
      dob:"12/01/1987",
      reporting_manager:"asdasd asfasfd",
      department:"aseasdaf",
      salary:"234234234"
    },
    {
      name:"b",
      age:"25",
      dob:"12/06/1977",
      reporting_manager:"klhmhg toirhjrt",
      department:"oyptjns",
      salary:"98876476585"
    }
  ];
  return (
    <div>
      <Menu />
      <Table data={data}/>
    </div>
  );
}