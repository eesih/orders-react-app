import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({
  isAuthenticated,
  needPasswordChange,
  component: Component,
  ...rest
}) => (
    <Route {...rest} component={(props) => 
      !needPasswordChange && isAuthenticated ? (
          <Redirect to="/orders" />
        ) :(
          <Component {...props} />
        ) 
    } />
  );

const mapStateToProps = (state) => ({
    isAuthenticated: sessionStorage.getItem('token'),
    needPasswordChange: state.users.needPasswordChange
});

export default connect(mapStateToProps)(PublicRoute);
