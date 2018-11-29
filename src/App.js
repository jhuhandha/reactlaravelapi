import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Routes from './Routes'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';


class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <Router>
        <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">MiAppLaravel</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link className="nav-link" to="/producto">Productos</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/producto/crear">Crear Productos</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <div className="container">
          <Routes />
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
