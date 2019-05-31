import React from 'react'
import ReactDOM from 'react-dom'
import { configure, shallow } from 'enzyme'
import { expect } from 'chai'
import Adapter from 'enzyme-adapter-react-16';
import TitleBar from '../../src/components/TitleBar'
import { defaultProps } from '../../src/propTypes/TitleBar'

configure({ adapter: new Adapter() });

const shallowTitleBar = shallow(<TitleBar />)
const shallowHeader = shallowTitleBar.find('header')
const shallowTitle = shallowTitleBar.find('#titleBar_title')
const shallowDescription = shallowTitleBar.find('#titleBar_description')

const testTitleText = 'Test Title'
const testDescription = 'Test description'

describe('<TitleBar />', () => {
  it('should exist', () => {
    expect(shallowTitleBar.exists()).to.equal(true)
  })
  it('should have a header', () => {
    expect(shallowHeader.exists()).to.equal(true)
  })
  it('should have a title', () => {
    expect(shallowTitle.exists()).to.equal(true)
  })
  it('should have a description', () => {
    expect(shallowDescription.exists()).to.equal(true)
  })

  describe('Without props', () => {
    it('Title should have default tile when passed nothing', () => {
      expect(shallowTitle.text()).to.equal(defaultProps.titleText)
    })
    it('Subtitle should have default description when passed nothing', () => {
      expect(shallowDescription.text()).to.equal(defaultProps.description)
    })
  })

  describe('With partial props', () => {
    it('Title should be populated and description has default description when only passed titleText', () => {
      const shallowTitleBarPopulated = shallow(<TitleBar titleText={testTitleText} />)
      const shallowTitlePopulated = shallowTitleBarPopulated.find('#titleBar_title')
      const shallowDescriptionPopulated = shallowTitleBarPopulated.find('#titleBar_description')

      expect(shallowTitlePopulated.text()).to.equal(testTitleText)
      expect(shallowDescriptionPopulated.text()).to.equal(defaultProps.description)
    })
    it('Description should be populated and title has default title when only passed description', () => {
      const shallowTitleBarPopulated = shallow(<TitleBar description={testDescription} />)
      const shallowTitlePopulated = shallowTitleBarPopulated.find('#titleBar_title')
      const shallowDescriptionPopulated = shallowTitleBarPopulated.find('#titleBar_description')

      expect(shallowTitlePopulated.text()).to.equal(defaultProps.titleText)
      expect(shallowDescriptionPopulated.text()).to.equal(testDescription)
    })
  })

  describe('With props', () => {
    const shallowTitleBarPopulated = shallow(<TitleBar titleText={testTitleText} description={testDescription} />)
    const shallowTitlePopulated = shallowTitleBarPopulated.find('#titleBar_title')
    const shallowDescriptionPopulated = shallowTitleBarPopulated.find('#titleBar_description')

    it('Title should have passed in tile', () => {
      expect(shallowTitlePopulated.text()).to.equal(testTitleText)
    })
    it('Subtitle should have passed in description', () => {
      expect(shallowDescriptionPopulated.text()).to.equal(testDescription)
    })
  })
})
