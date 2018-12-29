import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

export const PrivateRoute = ({
    isAuthenticated, 
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={(props) => (
        isAuthenticated ? (
            <div>
                <Header />
                <Component {...props} />
            </div>
            
        ) : (
            <Redirect to="/login" />
        )
    )} />
);

const mapStateToProps = () => ({
    isAuthenticated: sessionStorage.getItem('token')
});

export default connect(mapStateToProps)(PrivateRoute);