import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import OrdersPage from '../components/OrdersPage';
import HandleOrderPage from '../components/HandleOrderPage';
import NotFoundPage from '../components/NotFoundPage';
import UsersPage from '../components/UsersPage';
import AddUserPage from '../components/AddUserPage';
import EditUserPage from '../components/EditUserPage';
import InvoicePage from '../components/InvoicePage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/login" component={LoginPage} exact={true} />
        <PrivateRoute path="/users" component={UsersPage} />
        <PrivateRoute path="/edit/:id" component={EditUserPage} />
        <PrivateRoute path="/add-user" component={AddUserPage} />
        <PrivateRoute path="/orders" component={OrdersPage} />
        <PrivateRoute path="/order-actions/:id" component={HandleOrderPage} />
        <PrivateRoute path="/invoicing" component={InvoicePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;