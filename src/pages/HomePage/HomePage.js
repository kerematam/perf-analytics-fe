import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet-async'
import { Typography, Grid } from '@material-ui/core/'
import CopyScript from 'components/CopyScript'
import UrlTable from './components/UrlTable'
import {
  actions,
  pagesReduxSelector,
  usePagesReduxInjector,
} from './HomePage.redux'

import styles from './HomePage.module.scss'

const HomePage = () => {
  usePagesReduxInjector()
  const dispatch = useDispatch()

  const { page, pages, postPageLoading, getPagesLoading } = useSelector(
    pagesReduxSelector
  )

  useEffect(() => {
    dispatch(actions.getPages())

    // eslint-disable-next-line react-hooks/exhaustive-deps,
  }, [])

  const handleSubmitUrl = pageUrl => {
    dispatch(actions.postPage({ pageUrl }))
  }

  const handleGetPage = page => {
    dispatch(actions.postPageSucceed({ page }))
  }

  return (
    <div>
      <Helmet>
        <title>PerfAnalytics</title>
      </Helmet>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6}>
          <Card />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <CopyScript
            onSubmit={handleSubmitUrl}
            page={page}
            loading={postPageLoading}
          />
        </Grid>
        <Grid item xs={12}>
          <UrlTable
            pages={pages}
            loading={getPagesLoading}
            getPage={handleGetPage}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export const Card = () => (
  <div>
    <Typography>
      The performanceTiming API, a JavaScript API for measuring the loading
      performance of the requested page, is deprecated but supported in all
      browsers. It has been replaced with the performanceNavigationTiming API.
    </Typography>
    <br />
    <Typography>
      The performance timing API provided read only times, in milliseconds(ms),
      describing at what time each point in the page loading process was
      reached. As displayed in the image below, the navigation process goes from
      navigationStart, unloadEventStart, unloadEventEnd, redirectStart,
      redirectEnd, fetchStart, domainLookupStart, domainLookupEnd, connectStart
      , connectEnd, secureConnectionStart, requestStart, responseStart,
      responseEnd, domLoading, domInteractive, domContentLoadedEventStart,
      domContentLoadedEventEnd, domComplete, loadEventStart, and loadEventEnd.
    </Typography>
    <a
      rel="noopener noreferrer"
      className={styles.read_more}
      href="https://developer.mozilla.org/en-US/docs/Web/Performance/Navigation_and_resource_timings#Performance_Timings"
      target="_blank"
    >
      read more
    </a>
  </div>
)

export default HomePage
