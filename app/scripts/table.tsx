import React, { useState } from "react";
import {TableRow} from "./table-row";

export const Table=(props)=>{
  const [data,setData]=useState(props.data);
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Date Of Birth</th>
          <th>Reporting Manager</th>
          <th>Department</th>
          <th>Salary</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row,index)=>
          <TableRow name={row.name} age={row.age} dob={row.dob} repMan={row.reporting_manager} department={row.department} salary={row.salary} key={index}/>
        )}
      </tbody>
    </table>
  );
}