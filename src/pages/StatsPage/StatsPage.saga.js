import { call, put, takeLatest } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { actions } from './StatsPage.redux'
import { api } from 'utils/api'

export function* loadStats({ payload }) {
  const { pageId } = payload
  const last30Min = new Date(
    new Date().getTime() - 1000 * 60 * 30
  ).toISOString()
  try {
    const stats = yield call(api.getStats, {
      pathParams: { pageId },
      queryParams: { fromDate: last30Min },
    })
    yield put(actions.loadStatsSucceed({ stats }))
  } catch (err) {
    yield put(actions.loadStatsFailed())
  }
}

export function* getPage({ payload }) {
  const { pageId } = payload
  try {
    const page = yield call(api.getPage, { pathParams: { pageId } })
    yield put(actions.getPageSucceed({ page }))
  } catch (err) {
    yield put(push('/404'))
    yield put(actions.getPageFailed())
  }
}

export default function* charactersData() {
  yield takeLatest(actions.loadStats.type, loadStats)
  yield takeLatest(actions.getPage.type, getPage)
}
