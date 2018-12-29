import React from 'react';
import UserListItem from './UserListItem';
import { connect } from 'react-redux';
import { getAllUsers } from '../actions/users';

export class UsersPage extends React.Component {

    componentWillMount() {
       
        if(!(sessionStorage.getItem("isAdmin") == 'true')) {
            this.props.history.push('/orders'); 
        } 
        
        if (!this.props.users || this.props.users.length === 0)   {
            this.props.getAllUsers();    
        }
    }

    componentDidMount() {
        if(!(sessionStorage.getItem("isAdmin") == 'true')) {
            this.props.history.push('/orders'); 
        } 
    }

    onAddNewUser = () => {
        this.props.history.push('/add-user');
    }

    render() {
        return(
            <div>
                <div className="page-header">
                    <div className="content-container"> 
                        <h1 className="page-header__title">Käyttäjät</h1>
                    </div>
                </div>
                <div className="content-container">
                    <table class="table">
                        <thead class="thead-light">
                            <th scope="col">Käyttäjänimi</th>
                            <th scope="col">Etunimi</th>
                            <th scope="col">Sukunimi</th>
                            <th scope="col">Email</th>
                            <th scope="col">Puhnum</th>
                            <th scope="col">Rooli</th>
                        </thead>
                    <tbody> 

                        {
                            !this.props.users || this.props.users.length === 0 ? (
                                <td colSpan="6">Ei käyttäjiä</td>
                            ) : (
                                this.props.users.map((user) => {
                                    return <UserListItem key={user.id} {...user} /> 
                                })
                            )
                        }
                        </tbody>               
                    </table>
                    <button className="button" onClick={this.onAddNewUser}>Lisää uusi käyttäjä</button>
                </div>
            </div>
        )
    };
}

const mapStateToProps = (state) => ({
     users: state.users.users
});

const mapDispatchToProps = (dispatch) => ({
    getAllUsers: () => dispatch(getAllUsers())  
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);



