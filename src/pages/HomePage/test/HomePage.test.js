import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux/configureStore'
import { HelmetProvider } from 'react-helmet-async'
import Adapter from 'enzyme-adapter-react-16'
import { mount, configure, shallow } from 'enzyme'
import { api } from 'utils/api'
import { spy } from 'utils/helper'
import HomePage from 'pages/HomePage'
import UrlTable from 'components/UrlTable'
import InfoCard from 'components/InfoCard'
import CopyScript, { AddUrl } from 'components/CopyScript'
import { sagas } from '../HomePage.saga'
import { actions } from '../HomePage.redux'

spy.watch(api)
spy.watch(sagas)
spy.watch(actions)

configure({ adapter: new Adapter() })

const setup = ({ renderFn }) => {
  spy.resetHistory()
  const store = configureStore()
  const Component = (
    <Provider store={store}>
      <HelmetProvider>
        <HomePage />
      </HelmetProvider>
    </Provider>
  )
  const wrapper = renderFn(Component)

  return { wrapper, store }
}

describe('Homepage ', () => {
  test('should match with snapshot', () => {
    const renderFn = Component => mount(Component).debug()
    const { wrapper: snapshot } = setup({ renderFn })
    expect(snapshot).toMatchSnapshot()
  })

  test('should handle redux action/state correctly', () => {
    const { store, wrapper } = setup({ renderFn: mount })

    expect(wrapper.find(InfoCard).length).toBe(1)
    expect(wrapper.find(UrlTable).length).toBe(1)
    expect(wrapper.find(CopyScript).length).toBe(1)

    const injectedReducers = store.injectedReducers
    const initialState = store.getState()

    expect(injectedReducers.HomePage).toBeTruthy()
    expect(initialState.HomePage.pages.length).toBe(0)
    expect(actions.getPages.callCount).toBe(1)
    expect(sagas.getPages.callCount).toBe(1)
    expect(api.getPages.callCount).toBe(1)

    const page = {
      createdAt: '2020-11-01T23:08:23.013Z',
      url: 'http://localhost:3000/test.html',
      __v: 0,
      _id: '5f9f3fe7dcb96300041b7ae9',
    }

    store.dispatch(
      actions.getPagesSucceed({
        pages: [page],
      })
    )

    const newState = store.getState()
    expect(newState.HomePage.pages.length).toBe(1)
    expect(wrapper.html()).toContain(page.url)
  })

  test('should dispatch post page request', () => {
    // use render fn. from  @testing-library
    const wrapper = setup({ renderFn: render })
    const input = document.getElementById('add_url_text_box')
    const button = document.getElementById('add_url_button')
    fireEvent.change(input, {
      target: { value: 'http://localhost:3000/test.html' },
    })
    fireEvent.click(button)

    expect(actions.postPage.callCount).toBe(1)
    expect(sagas.postPage.callCount).toBe(1)
    expect(api.postPage.callCount).toBe(1)
  })
})
