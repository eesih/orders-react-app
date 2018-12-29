import axios from 'axios';
import { history } from './../routers/AppRouter';

const url = "http://localhost:3000/users";
const urlRoles = "http://localhost:3000/user-roles";

export const logout = () => {
    return (dispatch) => {
        return axios.delete(`${url}/me/token`, {
            headers: {
                'x-auth': sessionStorage.getItem('token'),
            }
        }).then((res) => {
            sessionStorage.clear();
            dispatch({ type: 'LOGOUT'});
            dispatch({type: 'LOGOUT_FROM_APP'})
            history.push('/login');
        });
    };
}

export const login = (username, password) => { 
    return (dispatch) => {
        return axios.post(`${url}/login`, {username, password})
        .then((res) => {
            let token = res.headers["x-auth"];
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('userId', res.data.id);
            sessionStorage.setItem('isAdmin', res.data.isAdmin);
            sessionStorage.setItem('isController', res.data.isController);
            sessionStorage.setItem('isDriver', !res.data.isAdmin && !res.data.isController);
            const needPasswordChange = res.data.needPasswordChange;
            if (needPasswordChange) {
                dispatch({ type: 'NEED_PASSWORD_CHANGE'});
                history.push('/login');
            } else {
                history.push('/orders');
            }
        }).catch((error) => {
            dispatch({ type: 'INVALID_CREDENTIALS'});
            history.push('/login');
        });
    };
};

export const updatePassword = (data) => {
    const userId = sessionStorage.getItem('userId');
    return (dispatch) => {
        return axios.patch(`${url}/${userId}/password-changed`, data, {
            headers: {
                'x-auth': sessionStorage.getItem('token'),
            }
        }).then((res) => {
            dispatch({ type: 'NEW_PASSWORD_CHANGED'});
            history.push('/orders');
        }).catch((error) => {
            console.log('error');
        });
    };
}

export const getAllUsers = () => { 
    return (dispatch) => {
        return axios.get(`${url}/with-roles`,{
            headers: {
                'x-auth': sessionStorage.getItem('token'),
            }
        })
        .then((res) => {
            let users = res.data;
            dispatch({ type: 'GET_ALL_USERS', users});
        });
    };
};

export const startAddUser = (user) => {
    return (dispatch) => {
        return axios.post(url, user, {
            headers: {
                'x-auth': sessionStorage.getItem('token'),
            }
        }).then((res) => {
            dispatch(getAllUsers());
        });
    };
};

export const getRoles = () => {
    return (dispatch) => {
        return axios.get(urlRoles, {
            headers: {
                'x-auth': sessionStorage.getItem('token'),
            }
        }).then((res) => {
            let roles = res.data;
            dispatch({ type: 'GET_USER_ROLES', roles});
        });
    };
}

export const startRemoveUser = (user) => {
    return (dispatch) => {
        return axios.delete(`${url}/${user.id}`, {
            headers: {
                'x-auth': sessionStorage.getItem('token'),
            }
        })
        .then((res) => {
            dispatch(getAllUsers());
        });
    }; 
}; 

export const startEditUser = (id, user) => {
    return (dispatch) => {
        return axios.patch(`${url}/${id}`, user, {
            headers: {
                'x-auth': sessionStorage.getItem('token'),
            }
        })
        .then((res) => {
            dispatch(getAllUsers());
        });
    }; 
}; 