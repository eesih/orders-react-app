import axios from 'axios';
import { history } from './../routers/AppRouter';

const url = "http://localhost:3000";

export const getAvailableOrders = () => { 
    return (dispatch) => {
        return axios.get(`${url}/available-orders`,{
            headers: {
                'x-auth': sessionStorage.getItem('token'),
            }
        })
        .then((res) => {
            let availableOrders = res.data;
            dispatch(getReservedOrders());
            dispatch(getStartedOrders());
            dispatch(getFinishedOrdersFromToday());
            dispatch({ type: 'GET_AVAILABLE_ORDERS', availableOrders});
        });
    };
};

export const getReservedOrders = () => { 
    return (dispatch) => {
        return axios.get(`${url}/reserved-orders`,{
            headers: {
                'x-auth': sessionStorage.getItem('token'),
            }
        })
        .then((res) => {
            let reservedOrders = res.data;
            dispatch({ type: 'GET_RESERVED_ORDERS', reservedOrders});
        });
    };
};

export const getStartedOrders = () => { 
    return (dispatch) => {
        return axios.get(`${url}/started-orders`,{
            headers: {
                'x-auth': sessionStorage.getItem('token'),
            }
        })
        .then((res) => {
            let startedOrders = res.data;
            dispatch({ type: 'GET_STARDED_ORDERS', startedOrders});
        });
    };
};

export const getFinishedOrdersFromToday = () => { 
    return (dispatch) => {
        return axios.get(`${url}/todays-done-orders`,{
            headers: {
                'x-auth': sessionStorage.getItem('token'),
            }
        })
        .then((res) => {
            let doneOrders = res.data;
            dispatch({ type: 'GET_TODAYS_DONE_ORDERS', doneOrders});
        });
    };
};

export const getAllOrdersByTimestamps = (fromTS, toTS) => {
    return (dispatch) => {
        return axios.get(`${url}/all-orders/from/${fromTS}/to/${toTS}`,{
            headers: {
                'x-auth': sessionStorage.getItem('token'),
            }
        })
        .then((res) => {
            let allOrdersByTimestamps = res.data;
            dispatch({ type: 'GET_ALL_ORDERS_BY_TIMESTAMPS', allOrdersByTimestamps});
        });
    };
}

export const reserveOrder = (id) => {
    return (dispatch) => {
        return axios.patch(`${url}/orders/reserve/${id}`, {} ,{
            headers: {
                'x-auth': sessionStorage.getItem('token'),
            }
        })
        .then((res) => {
            dispatch(getAvailableOrders());
            dispatch(getReservedOrders());
            dispatch(getStartedOrders());
            dispatch(getFinishedOrdersFromToday());
            history.push('/orders?tab=1');
        });
    };
};

export const startOrder = (id) => {
    return (dispatch) => {
        return axios.patch(`${url}/orders/start/${id}`, {} ,{
            headers: {
                'x-auth': sessionStorage.getItem('token'),
            }
        })
        .then((res) => {
            dispatch(getAvailableOrders());
            dispatch(getReservedOrders());
            dispatch(getStartedOrders());
            dispatch(getFinishedOrdersFromToday());
            history.push('/orders?tab=2');
        });
    };
};

export const finishOrder = (id) => {
    return (dispatch) => {
        return axios.patch(`${url}/orders/done/${id}`, {} ,{
            headers: {
                'x-auth': sessionStorage.getItem('token'),
            }
        })
        .then((res) => {
            dispatch(getAvailableOrders());
            dispatch(getReservedOrders());
            dispatch(getStartedOrders());
            dispatch(getFinishedOrdersFromToday());
            history.push('/orders?tab=3');
        });
    };
};

export const removeOrder = (id) => {
    return (dispatch) => {
        return axios.patch(`${url}/orders/remove/${id}`, {} ,{
            headers: {
                'x-auth': sessionStorage.getItem('token'),
            }
        })
        .then((res) => {
            dispatch(getAvailableOrders());
            dispatch(getReservedOrders());
            dispatch(getStartedOrders());
            dispatch(getFinishedOrdersFromToday());
            history.push('/orders');
        });
    };
};