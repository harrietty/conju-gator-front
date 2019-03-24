import React from 'react';
import {shallow} from 'enzyme';

import App from '../src/App';

test('App renders', () => {
  const app = shallow(<App />);
  expect(app.find('h1').text()).toEqual('Hello world');
});
