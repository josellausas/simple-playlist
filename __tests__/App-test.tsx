/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', async () => {
  let component;
  await renderer.act(async () => {
    component = renderer.create(<App />);
  });
  expect(component).toBeDefined();
});
