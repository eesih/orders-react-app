import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reserveOrder, startOrder, finishOrder, removeOrder } from '../actions/orders';

export class OrderListItem extends React.Component {

        constructor(props) {
                super(props);    
        }

        handleRemoveOrder = () => {
                this.props.removeOrder(this.props.order.id);
        }        

        handleButtonClick = () => {
                if (this.props.listType === 1) {
                        this.props.reserveOrder(this.props.order.id);
                } else if (this.props.listType === 2) {
                        this.props.startOrder(this.props.order.id);
                } else if (this.props.listType === 3) {
                        this.props.finishOrder(this.props.order.id);
                }
        } 

        render() {
                return (                 
                        <tr>
                                <td><Link to={`/order-actions/${this.props.order.id}`}>{this.props.order.id}</Link></td>
                                <td>{this.props.order.tilaaja}</td>
                                <td>{this.props.order.vastaanottaja}</td>
                                { this.props.order.driverDetails && <td >{this.props.order.driverDetails.first_name} {this.props.order.driverDetails.last_name}</td>}
                                { this.props.listType <= 3 && 
                                        <td>
                                                <button className="button" onClick={this.handleButtonClick} >{this.props.buttonLabel}</button>
                                        </td>
                                }
                                { sessionStorage.getItem('isDriver') != 'true' && this.props.listType === 1 && 
                                        <td>
                                                <button className="button" onClick={this.handleRemoveOrder}>Poista</button>
                                        </td>
                                }
                                {this.props.order.ajettu_pvm && <td>{this.props.order.ajettu_pvm}</td>}
                        </tr>
                )
        };
}

const mapDispatchToProps = (dispatch) => ({
        reserveOrder: (id) => dispatch(reserveOrder(id)),
        startOrder: (id) => dispatch(startOrder(id)),
        finishOrder: (id) => dispatch(finishOrder(id)),
        removeOrder: (id) => dispatch(removeOrder(id))
});

export default connect(undefined, mapDispatchToProps)(OrderListItem);