import React from 'react'
import renderer from 'react-test-renderer'
import InfoCard from '../index'

const setup = () => {
  const wrapper = renderer.create(<InfoCard />).toJSON()

  return {
    wrapper,
  }
}

describe('Infocard component', () => {
  test('should match with snapshow', () => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
  })
})
