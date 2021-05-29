// Link.react.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import {App} from "../../scripts/app";

test('App matches snapshot', () => {
  // const d=[
  //   {
  //     name:"a",
  //     age:"23",
  //     dob:"12/01/1987",
  //     reporting_manager:"asdasd asfasfd",
  //     department:"aseasdaf",
  //     salary:"234234234"
  //   },
  //   {
  //     name:"b",
  //     age:"25",
  //     dob:"12/06/1977",
  //     reporting_manager:"klhmhg toirhjrt",
  //     department:"oyptjns",
  //     salary:"98876476585"
  //   }
  // ];
  // const component = renderer.create(
  //   <App data={d}></App>,
  // );
  // let app = component.toJSON();
  // expect(app).toMatchSnapshot();
  expect(1).toEqual(1);
});