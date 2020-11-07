import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet-async'
import { Grid } from '@material-ui/core/'
import CopyScript from 'components/CopyScript'
import UrlTable from 'components/UrlTable'
import InfoCard from 'components/InfoCard'
import {
  actions,
  pagesReduxSelector,
  usePagesReduxInjector,
} from './HomePage.redux'
import { ACTIVE_HOST } from 'utils/config'

const HomePage = () => {
  usePagesReduxInjector()
  const dispatch = useDispatch()

  const { page, pages, postPageLoading, getPagesLoading } = useSelector(
    pagesReduxSelector
  )

  useEffect(() => {
    dispatch(actions.getPages())
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
          <InfoCard />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <CopyScript
            onSubmit={handleSubmitUrl}
            page={page}
            reqUrl={ACTIVE_HOST}
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

export default HomePage
