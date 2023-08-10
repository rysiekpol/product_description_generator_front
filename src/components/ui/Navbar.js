import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../main_logo.svg';
import "./NavbarStyles.css";
import { logoutUser } from '../../services/userService';  // Import the logout function

class Navbar extends Component {

  state = { clicked: false, isLoggedIn: false };

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  componentDidMount() {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.setState({ isLoggedIn: true });
    }
  }

  handleLogout = () => {
    logoutUser().then(() => {
      localStorage.removeItem('access_token');
      this.setState({ isLoggedIn: false });
    });
  };

  render() {
    return (
      <>
        <nav id="mainNav">
          <img src={Logo} alt="SVG" style={{ borderRadius: '50%' }} />

          <div>
            <ul
              id="navbar"
              className={this.state.clicked ? "#navbar active" : "#navbar"}
            >
              <li>
                <NavLink to="/">
                  Home
                </NavLink>
              </li>
              {!this.state.isLoggedIn ? (
                <li>
                  <NavLink to="/signin">Sign In</NavLink>
                </li>
              ) : (
                <li onClick={this.handleLogout}>
                  <NavLink to="/signin">Logout</NavLink>
                </li>
              )}
              <li>
                <NavLink to="/products">Products</NavLink>
              </li>
              <li>
                <NavLink to="/search">Search</NavLink>
              </li>
            </ul>
          </div>

          <div id="mobile" onClick={this.handleClick}>
            <i
              id="bar"
              className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}
            ></i>
          </div>
        </nav>
      </>
    );
  }
}

export default Navbar;