
const initialState = {
    users: [],
    token: '',
    loginError: '',
    roles: [],
    needPasswordChange: false
}

export default (state=initialState, action) => {
    switch (action.type) {    
        case 'NEED_PASSWORD_CHANGE' : 
        return {
            ...state,
            needPasswordChange: true
        }
        case 'INVALID_CREDENTIALS' : 
        return {
            ...state,
            loginError: 'Väärä käyttäjätunnus tai salasana'
        }
        case 'NEW_PASSWORD_CHANGED' :
            return {
                ...state,
                needPasswordChange: false
            }
        case 'GET_ALL_USERS' :
            return {
                ...state,
                users: action.users
            }
        case 'GET_USER_ROLES' :
            return {
                ...state,
                roles: action.roles
            }            
        case 'LOGIN' :
            return {
                ...state,
                token: action.token
            }   
        case 'LOGOUT' :
            return {
                initialState
            }       
        default:
            return state
    }
}