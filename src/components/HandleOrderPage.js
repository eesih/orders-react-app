
import React from 'react';
import OrderDetails from './OrderDetails';
import { connect } from 'react-redux';

export class HandleOrderPage extends React.Component {
    constructor(props) {
        super(props);
    }

    onClickGoBack = () => {
        this.props.history.push('/orders');
    }

    render() {
        return (        
            <div className="content-container-small">
                <OrderDetails {...this.props.order} />    
                <button className="button--with-m-margin" onClick={this.onClickGoBack}>Palaa</button>         
            </div>   
        )
    }
};

const mapStateToProps=(state, props) => {
    let tempOrder = state.orders.availableOrders.find((order) => order.id.toString() === props.match.params.id);
    if(!tempOrder) {
        tempOrder = state.orders.reservedOrders.find((order) => order.id.toString() === props.match.params.id);
    }
    if(!tempOrder) {
        tempOrder = state.orders.startedOrders.find((order) => order.id.toString() === props.match.params.id);
    }
    if(!tempOrder) {
        tempOrder = state.orders.todaysDoneOrders.find((order) => order.id.toString() === props.match.params.id);
    }
    return {
        order: tempOrder
    }
};


export default connect(mapStateToProps, undefined)(HandleOrderPage);