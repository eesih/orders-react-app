import React from 'react';
import { connect } from 'react-redux';
import UserForm from './UserForm';
import { startAddUser, getRoles } from './../actions/users';

export class AddUserPage extends React.Component {

    componentWillMount() {
        this.props.getRoles();
    }

    onSubmitAddUser = (user) => {
        this.props.startAddUser(user);
        this.props.history.push('/users');
    }  
    
    onSubmitCancel = () => {
        this.props.history.push('/users');
    }   

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container-small"> 
                        <h1 className="page-header__title">Lisää uusi käyttäjä</h1>
                    </div>
                </div>
                <div className="content-container-small">
                    <UserForm 
                        roles={this.props.roles}
                        onSubmit={this.onSubmitAddUser}
                    />
                    <button className="button button--secondary" onClick={this.onSubmitCancel}>Peruuta</button>
                </div>       
            </div>
        )
    }
}

const mapStateToProps=(state) => ({
    roles: state.users.roles
});

const mapDispatchToProps = (dispatch) => ({
    startAddUser: (user) => dispatch(startAddUser(user)),
    getRoles: () => dispatch(getRoles()) 
});

export default connect(mapStateToProps, mapDispatchToProps)(AddUserPage);