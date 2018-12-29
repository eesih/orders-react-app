import React from 'react';

export default class UserForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            addUser: props.user ? false : true, 
            username: props.user ? props.user.username : '',
            password: '',
            email: props.user ? props.user.email : '',
            first_name: props.user ? props.user.first_name : '',
            last_name: props.user ? props.user.last_name : '',
            phone: props.user ? props.user.phone : '',
            address: props.user ? props.user.address : '',
            postalcode: props.user ? props.user.postalcode : '',
            city: props.user ? props.user.city : '',
            userRole: props.user ? props.user.user_role_id : undefined,
            user_role_id: undefined,
            error: ''
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
    onEmailChange = (e) => {
        const email = e.target.value;
        this.setState(() => ({ email }));
    }
    onFistNameChange = (e) => {
        const first_name = e.target.value;
        this.setState(() => ({ first_name }));
    }
    onLastNameChange = (e) => {
        const last_name = e.target.value;
        this.setState(() => ({ last_name }));
    }
    onPhoneChange = (e) => {
        const phone = e.target.value;
        this.setState(() => ({ phone }));
    }
    onAddressChange = (e) => {
        const address = e.target.value;
        this.setState(() => ({ address }));
    }
    onPostalcodeChange = (e) => {
        const postalcode = e.target.value;
        this.setState(() => ({ postalcode }));
    }
    onCityChange = (e) => {
        const city = e.target.value;
        this.setState(() => ({ city }));
    }
    onRoleChange = (e) => {
        const user_role_id = e.target.value;
        this.setState(() => ({ user_role_id }));
    }
   
    onSubmit = (e) => {
        e.preventDefault();

        if (!this.state.username || !this.state.email) {
            this.setState(() => ({ error: 'Käyttäjänimi ja email ovat pakollisia tietoja.'}));
        } else {
            this.setState(()=> ({ error: ''}));
            this.props.onSubmit({
                username: this.state.username,
                password: this.state.password,
                email: this.state.email,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                phone: this.state.phone,
                address: this.state.address,
                postalcode: this.state.postalcode,
                city: this.state.city,
                user_role_id: this.state.user_role_id
            });
        }
    };
    render() {
        return (        
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <input 
                    className="text-input"
                    type="text"
                    placeholder="Käyttäjänimi"
                    autoFocus
                    value={this.state.username}
                    onChange={this.onUsernameChange}
                />
                {this.state.addUser && 
                    <input 
                        className="text-input"
                        type="text"
                        placeholder="Salasana"
                        value={this.state.password}
                        onChange={this.onPasswordChange}
                    />
                }
                <input 
                    className="text-input"
                    type="text"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.onEmailChange}
                />
                <input 
                    className="text-input"
                    type="text"
                    placeholder="Etunimi"
                    value={this.state.first_name}
                    onChange={this.onFistNameChange}
                />   
                <input 
                    className="text-input"
                    type="text"
                    placeholder="Sukunimi"
                    value={this.state.last_name}
                    onChange={this.onLastNameChange}
                />                               
                <input 
                    className="text-input"
                    type="text"
                    placeholder="Puh"
                    value={this.state.phone}
                    onChange={this.onPhoneChange}
                />
                <input 
                    className="text-input"
                    type="text"
                    placeholder="Osoite"
                    value={this.state.address}
                    onChange={this.onAddressChange}
                />
                <input 
                    className="text-input"
                    type="text"
                    placeholder="Postikoodi"
                    value={this.state.postalcode}
                    onChange={this.onPostalcodeChange}
                /> 
                <input 
                    className="text-input"
                    type="text"
                    placeholder="Kaupunki"
                    value={this.state.city}
                    onChange={this.onCityChange}
                />         
                <select onChange={this.onRoleChange} value={this.state.userRole}>
                {
                    this.props.roles && this.props.roles.map(function (role) {
                        return <option key={role.id} value={role.id} >{role.role_name}</option>;
                    })
                }
            </select>                                                 
                <div>
                    <button className="button">Tallenna käyttäjä</button>
                </div>
                
            </form>
        )
    }
};