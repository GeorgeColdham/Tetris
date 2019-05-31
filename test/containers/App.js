import React from 'react'
import ReactDOM from 'react-dom'
import { configure, shallow, mount, render } from 'enzyme'
import { expect } from 'chai'
import Adapter from 'enzyme-adapter-react-16';
import App from '../../src/containers/App'
import TitleBar from '../../src/components/TitleBar'

configure({ adapter: new Adapter() });

const shallowApp = shallow(<App />)

const shallowTitleBar = shallowApp.find(TitleBar)

describe('<App />', () => {
  it('should exist', () => {
    expect(shallowApp.exists()).to.equal(true)
  })

  describe('<TitleBar />', () => {
    it('should be rendered', () => {
      expect(shallowTitleBar.exists()).to.equal(true)
    })
    it('should be rendered once', () => {
      expect(shallowTitleBar).to.have.length(1)
    })
  })
})
