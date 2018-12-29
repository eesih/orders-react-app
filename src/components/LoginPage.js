import React from 'react';
import { connect } from 'react-redux';
import { login, updatePassword } from './../actions/users';

export class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username:  '',
            password: '',
            newPassword: '',
            newConfirmPassword: '',
            error: props.loginError ? props.loginError : '',
            needPasswordChange: props.needPasswordChange
        };
    }

    onUsernameChange = (e) => {
        const username = e.target.value;
        this.setState(() => ({ username }));
    }
    onPasswordChange = (e) => {
        const password = e.target.value;
        this.setState(() => ({ password }));
    }
    onNewPasswordChange = (e) => {
        const newPassword = e.target.value;
        this.setState(() => ({ newPassword }));
    }
    onNewConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        this.setState(() => ({ newConfirmPassword }));
    }
   
    onSubmit = (e) => {
        e.preventDefault();

        if (this.state.needPasswordChange) {
            if(this.state.newPassword !== this.state.newConfirmPassword) {
                this.setState(() => ({ error: 'Väärä salasana' }));
            } else {
                this.setState(()=> ({ error: '' }));
                this.props.updatePassword({ newPassword: this.state.newPassword });
            }
        } else if (!this.state.username || !this.state.password) {
            this.setState(() => ({ error: 'Syötä käyttäjätunnus sekä salasana' }));
        } else {
            this.setState(()=> ({ error: '' }));
            this.props.login(this.state.username, this.state.password);
        }
    };
    render() {
        return (  
            <div>
                <div className="header">
                    <div className="content-container">
                        <div className="header__content">
                            <div className="header__title">
                                <h1>Kuriirikeskus admin</h1>
                            </div>
                        </div>
                    </div>
                </div>      
                <div className="content-container">
                    <div className="input-group__login">
                        <form onSubmit={this.onSubmit}>
                            {this.state.error && <p className="form__error">{this.state.error}</p>}
                            {!this.state.needPasswordChange &&
                                <div className="input-group__login_item">
                                    <input 
                                        className="text-input__login"
                                        type="text"
                                        placeholder="Käyttäjänimi"
                                        autoFocus
                                        value={this.state.username}
                                        onChange={this.onUsernameChange}
                                    />
                                    <input 
                                        className="text-input__login"
                                        type="password"
                                        placeholder="Salasana"
                                        value={this.state.password}
                                        onChange={this.onPasswordChange}
                                    />
                                </div>
                            }       
                            {this.state.needPasswordChange && 
                                <div className="input-group__login_item">

                                    <h2 className="header__change_password" >Vaihda salasana</h2>
                                    <input 
                                        className="text-input__login"
                                        type="password"
                                        placeholder="Uusi salasana"
                                        value={this.state.newPassword}
                                        onChange={this.onNewPasswordChange}
                                    />  
                                    <input 
                                        className="text-input__login"
                                        type="password"
                                        placeholder="Uusi salasana uudestaan"
                                        value={this.state.newConfirmPassword}
                                        onChange={this.onNewConfirmPasswordChange}
                                    />                                         
                                </div>}
                        
                            <div>
                                <button className="button--with-s-margin">Kirjaudu sisään</button>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
        )
    }
};

const mapDispatchToProps = (dispatch) => ({
  login: (username, password) => dispatch(login(username, password)),
  updatePassword: (data) => dispatch(updatePassword(data))
});

const mapStateToProps = (state) => ({
    loginError: state.users.loginError,
    needPasswordChange: state.users.needPasswordChange
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
