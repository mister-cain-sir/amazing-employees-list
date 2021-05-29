import React, { useEffect, useState } from "react";
import {TableRow} from "./table-row";
import dayjs from 'dayjs';

export const Table=(props)=>{
  const [data,setData]=useState(props.data);
  useEffect(()=>{
    setData(props.data)
  },[props.data]);
  
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
          <TableRow name={row.first_name+" "+row.last_name} age={dayjs().diff(row.dob,"year")} dob={dayjs(row.dob).format('DD/MM/YYYY')} repMan={row.manager} department={row.department} salary={row.salary} key={index}/>
        )}
      </tbody>
    </table>
  );
}