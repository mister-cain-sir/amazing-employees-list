import React from "react";

export const TableRow=(props)=>{
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.age}</td>
      <td>{props.dob}</td>
      <td>{props.repMan}</td>
      <td>{props.department}</td>
      <td>{props.salary}</td>
    </tr>
  );
}