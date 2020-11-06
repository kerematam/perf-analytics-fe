import { useInjectReducer, useInjectSaga } from 'redux-injectors'
import { createSlice } from '@reduxjs/toolkit'
import saga from './HomePage.saga'

export const NAMESPACE = 'HomePage'

export const initialState = {
  postPageLoading: false,
  page: {},
  getPagesLoading: false,
  pages: [],
}

const slice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {
    postPage: state => {
      state.postPageLoading = true
    },
    postPageSucceed: (state, action) => {
      state.postPageLoading = false
      state.page = action.payload.page
    },
    postPageFailed: (state, action) => {
      state.postPageLoading = false
    },
    getPages: state => {
      state.getPagesLoading = true
    },
    getPagesSucceed: (state, action) => {
      state.getPagesLoading = false
      state.pages = action.payload.pages
    },
    getPagesFailed: (state, action) => {
      state.getPagesLoading = false
    },
  },
})

export const { reducer, actions } = slice

//  Injectors
export const usePagesReducerInjector = () =>
  useInjectReducer({ key: NAMESPACE, reducer })
export const usePagesSagaInjector = () =>
  useInjectSaga({ key: NAMESPACE, saga })
export const usePagesReduxInjector = () => {
  usePagesReducerInjector()
  usePagesSagaInjector()
}

// Selectors
export const pagesReduxSelector = state => state[NAMESPACE]
