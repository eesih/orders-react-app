import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';
import { getAllOrdersByTimestamps } from './../actions/orders';
import { CSVLink } from "react-csv";

export class InvoicePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            startDate: moment().subtract(30, 'days'),
            endDate: moment(),
            focusedInput: 'startDate',
            headers: [
                { label: 'Tilaaja', key:'tilaaja' },
                { label: 'Email', key:'sposti' },
                { label: 'Puhnum', key:'puh' },
                { label: 'Lähettäjä', key:'lahettaja' },
                { label: 'Puhnum 2', key:'puh2' },
                { label: 'Nouto', key:'nouto' },
                { label: 'Puhnum 3', key:'puh3' },
                { label: 'Vienti', key:'vienti' },
                //{ label: 'Lisätieto', key:'lisatieto' },
                //{ label: 'Lisätieto', key:'lisatieto2' },
                { label: 'Yhteyshenkilö', key:'yhthenk' }
            ]
        };
    }

    componentWillMount() {
        this.getAllOrderByTimestamps();
        if(!(sessionStorage.getItem("isAdmin") == 'true') && !(sessionStorage.getItem("isController") == 'true')) {
            this.props.history.push('/orders'); 
        } 
    }

    getAllOrderByTimestamps = () => {
        this.props.getAllOrdersByTimestamps(this.state.startDate.unix(), this.state.endDate.unix());
    }

    onDatesChange = ({ startDate, endDate }) => {
        if(startDate) {
            this.setState({ startDate });
        }
        if(endDate) {
            this.setState({ endDate });
        }
    }

    render() {
        return (
        <div>
            <div className="page-header">
                <div className="content-container"> 
                    <h1 className="page-header__title">Hae ajoja</h1>
                </div>
            </div>
            <div className="content-container-small">
                <h3> {`Ajoja aikavälillä ${this.state.startDate.format('YYYY-MM-DD')} - ${this.state.endDate.format('YYYY-MM-DD')} 
                    : ${(this.props.ordersForInvoicing ? this.props.ordersForInvoicing.length : 0)} kpl.`}
                </h3>
                <DateRangePicker 
                    startDate={this.state.startDate}
                    startDateId="your_unique_start_date_id"
                    endDate={this.state.endDate} 
                    endDateId="your_unique_end_date_id" 
                    onDatesChange={this.onDatesChange} 
                    focusedInput={this.state.focusedInput} 
                    onFocusChange={focusedInput => this.setState({ focusedInput })} 
                    numberOfMonths={2}
                    isOutsideRange={() => false}               
                    keepOpenOnDateSelect={false}
                    startDatePlaceholderText={'Alkupvm'}
                    endDatePlaceholderText={'Loppupvm'}
                />
                
                <button onClick={this.getAllOrderByTimestamps} className="button--with-s-margin">Hae ajot ladattavaksi</button>  
                
                <CSVLink 
                    className={this.props.ordersForInvoicing && this.props.ordersForInvoicing.length > 0 ? 'button button--link-blue' : 'button--link-hide'} 
                    filename={`kuriirikeskus_ajot-${moment().format('YYYY-MM-DD')}.csv`}
                    headers={this.state.headers}
                    data={this.props.ordersForInvoicing ? this.props.ordersForInvoicing : [] }>
                Lataa CSV
                </CSVLink>  
            </div>

        </div>
        )
    }
}

const mapStateToProps = (state) => ({
    ordersForInvoicing: state.orders.ordersForInvoicing
});

const mapDispatchToProps = (dispatch) => ({
    getAllOrdersByTimestamps: (fromTS, toTS) => dispatch(getAllOrdersByTimestamps(fromTS, toTS))
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoicePage);

