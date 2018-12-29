import React from 'react';
import OrderListItem from './OrderListItem';
import { connect } from 'react-redux';
import { getAvailableOrders, getReservedOrders, getStartedOrders, getFinishedOrdersFromToday } from '../actions/orders';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import queryString from 'query-string';

export class OrdersPage extends React.Component {

    componentWillMount() {
        
        if (!this.props.availableOrders || this.props.availableOrders.length === 0)   {
                this.props.getAvailableOrders();    
        }

        if (!this.props.reservedOrders || this.props.reservedOrders.length === 0)   {
            this.props.getReservedOrders();    
        }

        if (!this.props.startedOrders || this.props.startedOrders.length === 0)   {
            this.props.getStartedOrders();    
        }

        if (!this.props.todaysDoneOrders || this.props.todaysDoneOrders.length === 0)   {
            this.props.getFinishedOrdersFromToday();    
        }
    }

    render() {
        return(
            <div>
                <Tabs defaultIndex={this.props.tabIndex}>
                    <TabList>
                        <Tab>Vapaat ajot</Tab>
                        <Tab>Varatut ajot</Tab>
                        <Tab>Aloitetut ajot</Tab>
                        <Tab>Ajetut ajot</Tab>
                    </TabList>    
                    <TabPanel>
                        <div className="content-container">
                            <table class="table">
                                <thead class="thead-light">
                                    <th scope="col">#</th>
                                    <th scope="col">Tilaaja</th>
                                    <th scope="col">Vastaanottaja</th>
                                    <th scope="col">Varaa</th>
                                    {sessionStorage.getItem('isDriver') != 'true' && <th scope="col">Poista</th> }
                                </thead>
                                <tbody>
                                    {
                                        !this.props.availableOrders || this.props.availableOrders.length === 0 ? (
                                            <td colSpan="5">Ei varattavia ajoja</td>
                                        ) : (
                                            this.props.availableOrders.filter((order) => order.tilaaja && order.vastaanottaja).map((availableOrder) => {
                                                return <OrderListItem key={availableOrder.id} listType={1} buttonLabel="Varaa" order={availableOrder} /> 
                                            })
                                        )
                                    }
                                    </tbody>
                            </table>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="content-container">
                            <table class="table">
                                <thead class="thead-light">
                                    <th scope="col">#</th>
                                    <th scope="col">Tilaaja</th>
                                    <th scope="col">Vastaanottaja</th>
                                    <th scope="col">Kuljettaja</th>
                                    <th scope="col">Aloita ajo</th>
                                </thead>
                                <tbody>                                   
                                    {
                                        !this.props.reservedOrders || this.props.reservedOrders.length === 0 ? (
                                                <td colSpan="5">Ei varattuja ajoja</td>
                                        ) : (
                                            this.props.reservedOrders.filter((order) => order.tilaaja && order.vastaanottaja).map((reservedOrder) => {
                                                return <OrderListItem key={reservedOrder.id} listType={2} buttonLabel="Aloita" order={reservedOrder} /> 
                                            })
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </TabPanel>
                    <TabPanel>  
                        <div className="content-container">
                            <table class="table">
                                <thead class="thead-light">
                                    <th scope="col">#</th>
                                    <th scope="col">Tilaaja</th>
                                    <th scope="col">Vastaanottaja</th>
                                    <th scope="col">Kuljettaja</th>
                                    <th scope="col">Merkitse ajo ajetuksi</th>
                                </thead>
                                <tbody>  
                                    {
                                        !this.props.startedOrders || this.props.startedOrders.length === 0 ? (
                                            <td colSpan="5">Ei aloitettuja ajoja</td>
                                        ) : (
                                            this.props.startedOrders.filter((order) => order.tilaaja && order.vastaanottaja).map((startedOrder) => {
                                                return <OrderListItem key={startedOrder.id} listType={3} buttonLabel="Ajo ajettu" order={startedOrder} /> 
                                            })
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </TabPanel>  
                    <TabPanel>                       
                        <div className="content-container">
                            <table class="table">
                                <thead class="thead-light">
                                    <th scope="col">#</th>
                                    <th scope="col">Tilaaja</th>
                                    <th scope="col">Vastaanottaja</th>
                                    <th scope="col">Kuljettaja</th>
                                    <th scope="col">Ajettu pvm</th>
                                </thead>
                                <tbody> 
                                    {
                                        !this.props.todaysDoneOrders || this.props.todaysDoneOrders.length === 0 ? (
                                            <td colSpan="5">Ei ajettuja ajoja tänään</td>
                                        ) : (
                                            this.props.todaysDoneOrders.filter((order) => order.tilaaja && order.vastaanottaja).map((doneOrder) => {
                                                return <OrderListItem key={doneOrder.id} listType={4} order={doneOrder} /> 
                                            })
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>                    
                    </TabPanel>                     
                </Tabs>
            </div>
        )
    };
}

const mapStateToProps = (state, props) => {
    const tabObj = queryString.parse(props.location.search);
    const tab = tabObj ? parseInt(tabObj.tab) : 0;
    return {
        tabIndex: tab,
        availableOrders: state.orders.availableOrders,
        reservedOrders: state.orders.reservedOrders,
        startedOrders: state.orders.startedOrders,
        todaysDoneOrders: state.orders.todaysDoneOrders
    }
};

const mapDispatchToProps = (dispatch) => ({
    getAvailableOrders: () => dispatch(getAvailableOrders()),
    getReservedOrders: () => dispatch(getReservedOrders()),
    getStartedOrders: () => dispatch(getStartedOrders()),
    getFinishedOrdersFromToday: () => dispatch(getFinishedOrdersFromToday())
});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersPage);



