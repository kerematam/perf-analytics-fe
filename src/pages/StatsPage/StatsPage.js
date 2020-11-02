import React, { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet-async'
import { Button, Grid } from '@material-ui/core'
import Chart from 'components/Chart'
import {
  pageSelector,
  useStatsReduxInjector,
} from 'pages/StatsPage/StatsPage.redux.js'
import { useRouteMatch } from 'react-router-dom'
import { msg } from 'utils/helper'
import { actions } from './StatsPage.redux'

import styles from './StatsPage.module.scss'

const StatsPage = () => {
  useStatsReduxInjector()
  const dispatch = useDispatch()
  const iframeRef = useRef()
  const { page, stats } = useSelector(pageSelector)

  const {
    params: { id: pageId },
  } = useRouteMatch()

  useEffect(() => {
    dispatch(actions.getPage({ pageId }))
    dispatch(actions.loadStats({ pageId }))

    // eslint-disable-next-line react-hooks/exhaustive-deps,
  }, [])

  const handleTriggerPageLoad = () => {
    try {
      iframeRef.current.src = iframeRef.current.src += ''
    } catch (err) {
      msg.error(err)
    }
  }

  const handleStatsLoad = () => {
    dispatch(actions.loadStats({ pageId }))
  }

  return (
    <div>
      <Helmet>
        <title>{`Stats: ${page?.url}`}</title>
      </Helmet>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6}>
          <div className={styles.page_view_container}>
            <div className={styles.top_menu}>
              <Button
                onClick={handleTriggerPageLoad}
                className={styles.button}
                variant="contained"
                size="small"
              >
                Reload Page
              </Button>
              <Button
                onClick={handleStatsLoad}
                className={styles.button}
                variant="contained"
                size="small"
              >
                Reload Stats
              </Button>
            </div>
            <iframe
              src={page.url}
              title={page.url}
              className={styles.iframe}
              ref={iframeRef}
            ></iframe>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Chart title="Window Load" data={stats.wl} time={stats.createdAt} />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Chart
            title="Time to Fist Btye"
            data={stats.ttfb}
            time={stats.createdAt}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Chart
            title="First ContentFul Paint"
            data={stats.fcp}
            time={stats.createdAt}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Chart title="Dom Load" data={stats.doml} time={stats.createdAt} />
        </Grid>
      </Grid>
    </div>
  )
}

export default StatsPage
