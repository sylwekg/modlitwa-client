import React from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom';


const PrivateRoute = ({ component: Component, isAuthorized,  ...rest }) => (
  <Route {...rest} render={props => (
    isAuthorized ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)


export default PrivateRoute;