import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import Login from '../Login/Login';
import fetch from "isomorphic-fetch"
import "isomorphic-fetch";

// configure({adapter: new Adapter()});
describe('Login Component', () => {

  it('should render without throwing an error', () => {
    expect(shallow( <Login /> ).find('.loginBox').exists()).toBe(true)
  })
})