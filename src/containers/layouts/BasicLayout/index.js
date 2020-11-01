import React, { lazy, Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Header from 'containers/layouts/Header'

import styles from './BasicLayout.module.scss'

const HomePage = lazy(() => import('pages/HomePage'))
const StatsPage = lazy(() => import('pages/StatsPage'))

const BasicLayout = () => {
  return (
    <div className={styles.root}>
      <Header />
      <div>
        <Suspense fallback={'Loading...'}>
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route path="/home" exact render={() => <HomePage />} />
            <Route path="/stats/:id" render={() => <StatsPage />} />
          </Switch>
        </Suspense>
      </div>
    </div>
  )
}

export default BasicLayout
