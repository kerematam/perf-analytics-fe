import React from 'react'
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'
import configureStore from 'redux/configureStore'
import { MemoryRouter } from 'react-router-dom'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import BasicLayout from '../layouts/BasicLayout'
import Routes from '../Routes'

configure({ adapter: new Adapter() })

const setup = (path = '/') => {
  const store = configureStore()

  const Component = (
    <Provider store={store}>
      <MemoryRouter initialEntries={[path]}>
        <HelmetProvider>
          <Routes />
        </HelmetProvider>
      </MemoryRouter>
    </Provider>
  )

  const snapshot = mount(Component).debug()
  const wrapper = mount(Component)

  return {
    snapshot,
    wrapper,
  }
}

describe('Routes should handle root path', () => {
  test('correctly handles "/" route', () => {
    const { wrapper, snapshot } = setup('/')

    expect(snapshot).toMatchSnapshot()
    expect(wrapper.find(BasicLayout).length).toBe(1)
  })

  test('correctly handles 404 routes ', () => {
    const { snapshot } = setup('/sdafadsfasdf')
    expect(snapshot).toMatchSnapshot()
  })
})
