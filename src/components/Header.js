import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from './../actions/users';

export const Header = ({ logout }) => (
  <header className="header">
    <div className="content-container">
        <div className="header__content">
            <Link className="header__title" to="/login">
                <h1>Kuriirikeskus admin</h1>
            </Link>
            <button onClick={logout} className="button button--link">Kirjaudu ulos</button>
            </div>
        <div >
          <Link to="/orders" className={ "button button--link" + ((sessionStorage.getItem("isAdmin") == 'true' || sessionStorage.getItem("isController") == 'true') ? '' : '-hide')}>Ajot</Link>
          <Link to="/invoicing" className={ "button button--link" + ((sessionStorage.getItem("isAdmin") == 'true' || sessionStorage.getItem("isController") == 'true') ? '' : '-hide')}>Laskutus</Link>
          <Link to="/users" className={ "button button--link" + ((sessionStorage.getItem("isAdmin") == 'true') ? '' : '-hide')}>Käyttäjät</Link>
          </div>
    
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) =>({
  logout: () => dispatch(logout()) 
});

export default connect(undefined, mapDispatchToProps)(Header);
