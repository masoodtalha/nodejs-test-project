import React from 'react';
import { shallow, mount, render} from 'enzyme';
import Dashboard from '../Dashboard/Dashboard';
import "isomorphic-fetch"

describe('Dashboard Component', () => {

  it('should render without throwing an error', () => {
    expect(shallow( <Dashboard /> ).find('.bg').exists()).toBe(true)
  })
})