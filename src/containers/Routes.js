import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import BasicLayout from './layouts/BasicLayout'
import NotFoundPage from 'pages/NotFoundPage'

const useGetAuthenticated = () => {
  // TODO: change after authentication - katam
  const isAuthenticated = true

  return isAuthenticated
}

function ProtectedRoute({ children, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

function AuthRoute({ children, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
            }}
          />
        )
      }
    />
  )
}

const Routes = () => {
  const isAuthenticated = useGetAuthenticated()

  return (
    <Switch>
      <ProtectedRoute
        isAuthenticated={isAuthenticated}
        exact
        path={['/', '/home', '/stats/:id']}
      >
        <BasicLayout />
      </ProtectedRoute>
      <AuthRoute isAuthenticated={isAuthenticated} path={['/login']} />
      <Route path="/404" component={NotFoundPage} />
      <Redirect to="/404" />
    </Switch>
  )
}

export default Routes
