// Link.react.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import {App} from "../../scripts/app";

test('App matches snapshot', () => {
  const component = renderer.create(
    <App></App>,
  );
  let app = component.toJSON();
  expect(app).toMatchSnapshot();
});