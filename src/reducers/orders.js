
const initialState = {
    availableOrders: [],
    reservedOrders: [],
    startedOrders: [],
    todaysDoneOrders: [],
    ordersForInvoicing: [],
    orderTabIndex:0
}

export default (state=initialState, action) => {
    switch (action.type) { 
        case 'LOGOUT_FROM_APP' :
            return {
                initialState
            }   
        case 'SET_ORDER_TAB_INDEX' : 
            return {
                ...state,
                orderTabIndex: action.orderTabIndex
            }          
        case 'GET_AVAILABLE_ORDERS' : 
            return {
                ...state,
                availableOrders: action.availableOrders
            }  
        case 'GET_RESERVED_ORDERS' : 
            return {
                ...state,
                reservedOrders: action.reservedOrders
            }                     
        case 'GET_STARDED_ORDERS' : 
            return {
                ...state,
                startedOrders: action.startedOrders
            }      
        case 'GET_TODAYS_DONE_ORDERS': 
            return {
                ...state,
                todaysDoneOrders: action.doneOrders
        }  
        case 'GET_ALL_ORDERS_BY_TIMESTAMPS': 
            return {
                ...state,
                ordersForInvoicing: action.allOrdersByTimestamps
            }                   
        default:
            return state
    }
}