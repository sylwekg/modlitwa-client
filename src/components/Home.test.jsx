import React from 'react';
import Home from './Home';
import renderer from 'react-test-renderer';  //waiting until CRA with React 16.0 is available
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

test('Home screen check', () => {
  const component = renderer.create(
    <MuiThemeProvider>
    <Home />
    </MuiThemeProvider>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});