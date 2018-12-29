import React from 'react';
import { connect } from 'react-redux';
import UserForm from './UserForm';
import { startEditUser, startRemoveUser, getRoles } from './../actions/users';

export class EditUserPage extends React.Component {

    componentWillMount() {

        if(!(sessionStorage.getItem("isAdmin") == 'true')) {
            this.props.history.push('/orders'); 
        } 

        this.props.getRoles();
    }

    onSubmitEditUser = (user) => {
        this.props.startEditUser(this.props.user.id, user);
        this.props.history.push('/users');
    }    
    onSubmitRemoveUser = () => {
        this.props.startRemoveUser({ id: this.props.user.id });
        this.props.history.push('/users');
    }

    onClickGoBack = () => {
        this.props.history.push('/users');
    };

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container-small"> 
                        <h1 className="page-header__title">Muokkaa käyttäjää</h1>
                    </div>
                </div>
                <div className="content-container-small">
                    <UserForm 
                        roles={this.props.roles}
                        user={this.props.user}
                        onSubmit={this.onSubmitEditUser}
                    />
                    <div>
                        <button className="button button--with-margin" onClick={this.onClickGoBack}>Palaa</button>
                    </div>
                    <button className="button button--secondary" onClick={this.onSubmitRemoveUser}>Poista käyttäjä</button>
                </div>       
            </div>
        )
    }
}

const mapStateToProps=(state, props) => ({
    user: state.users.users.find((user) => user.id.toString() === props.match.params.id),
    roles: state.users.roles
});

const mapDispatchToProps = (dispatch) => ({
    startRemoveUser: (id) => dispatch(startRemoveUser(id)),
    startEditUser: (id, user) => dispatch(startEditUser(id, user)),
    getRoles: () => dispatch(getRoles()) 
});

export default connect(mapStateToProps, mapDispatchToProps)(EditUserPage);