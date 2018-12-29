import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import usersReducer from './../reducers/users';
import ordersReducer from './../reducers/orders';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      users: usersReducer,
      orders: ordersReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
