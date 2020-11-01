import { call, put, takeLatest } from 'redux-saga/effects'
import { actions } from './HomePage.redux'
import { api } from 'utils/api'
import { msg } from 'utils/helper'

export function* postPage({ payload }) {
  try {
    const { pageUrl: url } = payload
    const page = yield call(api.postPage, { url })
    yield put(
      actions.postPageSucceed({
        page,
      })
    )
    yield put(actions.getPages())
  } catch (err) {
    msg.error('Error occured while adding page')
    yield put(actions.postPageFailed())
  }
}

export function* getPages({ payload }) {
  try {
    const pages = yield call(api.getPages)
    yield put(
      actions.getPagesSucceed({
        pages,
      })
    )
  } catch (err) {
    console.log('err : ', err)

    msg.error('Error occured while loading pages')
    yield put(actions.getPagesFailed())
  }
}

export default function* pageSaga() {
  yield takeLatest(actions.postPage.type, postPage)
  yield takeLatest(actions.getPages.type, getPages)
}
