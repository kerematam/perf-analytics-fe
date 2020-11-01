import { useInjectReducer, useInjectSaga } from 'redux-injectors'
import saga from './StatsPage.saga'
import { createSlice } from '@reduxjs/toolkit'

export const NAMESPACE = 'StatsPage'

export const initialState = {
  loading: {
    loadStats: false,
    getPage: false,
  },
  page: {},
  stats: [],
}

const slice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {
    loadStats: state => {
      state.loading.loadStats = true
    },
    loadStatsSucceed: (state, action) => {
      state.stats = action.payload.stats
      state.loading.loadStats = false
    },
    loadStatsFailed: (state, action) => {
      state.stats = []
      state.loading.loadStats = false
    },

    getPage: state => {
      state.loading.getPage = true
    },
    getPageSucceed: (state, action) => {
      state.page = action.payload.page
      state.loading.getPage = false
    },
    getPageFailed: (state, action) => {
      state.state.loading.getPage = false
    },
  },
})

export const { reducer, actions } = slice

// Injectors
export const useStatsReducerInjector = () =>
  useInjectReducer({ key: NAMESPACE, reducer })
export const useStatsSagaInjector = () =>
  useInjectSaga({ key: NAMESPACE, saga })

export const useStatsReduxInjector = () => {
  useStatsReducerInjector()
  useStatsSagaInjector()
}

// Selectors
export const pageSelector = state => state[NAMESPACE]
