import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux/configureStore'
import { HelmetProvider } from 'react-helmet-async'
import Adapter from 'enzyme-adapter-react-16'
import { mount, shallow, configure } from 'enzyme'
import { api } from 'utils/api'
import { spy } from 'utils/helper'
import StatsPage from 'pages/StatsPage'
import Chart from 'components/Chart'
import { sagas } from '../StatsPage.saga'
import { actions } from '../StatsPage.redux'

spy.watch(api)
spy.watch(sagas)
spy.watch(actions)

configure({ adapter: new Adapter() })

const setup = ({ renderFn, path = '/stats/5f9f3fe7dcb96300041b7ae9' }) => {
  spy.resetHistory()
  const store = configureStore()
  const Component = (
    <Provider store={store}>
      <MemoryRouter initialEntries={[path]}>
        <HelmetProvider>
          <StatsPage />
        </HelmetProvider>
      </MemoryRouter>
    </Provider>
  )

  const wrapper = renderFn(Component)

  return { wrapper, store }
}

describe('StatsPage ', () => {
  test('should match with snapshot', () => {
    const renderFn = Component => mount(Component).debug()
    const { wrapper: snapshot } = setup({ renderFn })

    expect(snapshot).toMatchSnapshot()
  })

  test('should handle redux action/state correctly', () => {
    const { store, wrapper } = setup({ renderFn: mount })
    expect(wrapper.find(Chart).length).toBe(4)

    const injectedReducers = store.injectedReducers
    const initialState = store.getState()

    expect(injectedReducers.StatsPage).toBeTruthy()
    expect(initialState.StatsPage.page).toBeTruthy()
    expect(initialState.StatsPage.stats.length).toBe(0)

    expect(actions.getPage.callCount).toBe(1)
    expect(sagas.loadStats.callCount).toBe(1)
    expect(api.getStats.callCount).toBe(1)

    const stats = {
      _id: [
        '5fa382ac6f79d10004b867dd',
        '5fa382c66f79d10004b867de',
        '5fa385a76f79d10004b867df',
      ],
      doml: [730, 518, 1015],
      ttfb: [1, 1, 1],
      fcp: [113.35499992128462, 95.41499998886138, 95.6349999178201],
      wl: [759, 555, 1052],
      createdAt: [
        '2020-11-05T04:42:20.574Z',
        '2020-11-05T04:42:46.349Z',
        '2020-11-05T04:55:03.640Z',
      ],
    }

    store.dispatch(
      actions.loadStatsSucceed({
        stats,
      })
    )

    const newState = store.getState()
    expect(newState.StatsPage.stats._id.length).toBe(3)

    const expectedDateStr = new Date(stats.createdAt[0]).toLocaleString()
    expect(wrapper.html()).toContain(expectedDateStr)
  })
})
