import React from 'react'
import renderer from 'react-test-renderer'
import UrlTable from '../index'

const MOCK_PROPS = {
  pages: [
    {
      _id: '123123',
      url: 'test',
      createdAt: new Date('11/1/2020'),
    },
  ],
  loading: false,
  getPage: () => {},
}

const setup = setupProps => {
  const wrapper = renderer.create(<UrlTable {...setupProps} />).toJSON()

  return {
    wrapper,
  }
}

describe('UrlTable ', () => {
  test('should match with snapshot', () => {
    const { wrapper } = setup(MOCK_PROPS)
    expect(wrapper).toMatchSnapshot()
  })
})
