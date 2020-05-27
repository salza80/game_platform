import React from 'react'
// import Games from './games'
import About from './about'
import FallingText from './games/fallingText'
import LoginForm from "../components/userAdmin/loginForm"
import Logout from "../components/userAdmin/logout"
import SignUpForm from "../components/userAdmin/signUpForm"
import ResetPasswordForm from "../components/userAdmin/resetPasswordForm"
import Profile from "../components/userAdmin/profile"
import withAuthentication from "../components/userAdmin/withAuthentication"
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { PrivateRoute } from "../components/"
import logo from '../logo.png'
import './layout.scss'
import {
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

function CenterPage(props) {
  return (
     <div className="row align-items-center justify-content-center">
        <div className="col-lg-4 col">
          <div className="jumbotron mt-3">
          { props.children }
          </div>
         </div>
      </div>
    )
}

function LoggedOutNav() {
  return (
      <ul className="navbar-nav px-3 ml-auto" >
        <li className="nav-item text-nowrap">
          <Link className="nav-link" to='/login'>login</Link>
        </li>
      </ul>
    )
}

function LoggedInNav(props) {
  return (
      <React.Fragment>
         <ul className="navbar-nav ml-auto px-3">
          <li className="nav-item text-nowrap">
            <Link className="nav-link" to='/profile'>{props.me && props.me.displayName ? props.me.displayName : 'Profile'}</Link>
          </li>
          <li className="nav-item text-nowrap">
            <Link className="nav-link" to='/logout'>logout</Link>
          </li>
        </ul>
      </React.Fragment>
    )
}

const NonCollapsableNav = withAuthentication(LoggedInNav, LoggedOutNav)

function CollapsableNav(props) {
  return (
    <React.Fragment>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Games" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/games/falling-text" >Falling Text</NavDropdown.Item>
            <NavDropdown.Divider />
          </NavDropdown>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </React.Fragment>
  )
}

function Layout () {
return (
    <React.Fragment>
      <Navbar collapseOnSelect expand="xs" bg="dark" variant="dark" sticky="top" className='p-0 shadow'>
        <Navbar.Brand href="/about">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Deutsch Games (Alpha)
        </Navbar.Brand>
        <NonCollapsableNav />
        <CollapsableNav />
      </Navbar>
      <div className="container-fluid main-content">
          <Switch>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/spa">
               <Redirect to="/" />
              </Route>
              <Route exact path="/">
               <Redirect to="/games/falling-text" />
              </Route>
              <Route exact path="/games">
                <Redirect to="/games/falling-text" />
              </Route>
              <Route exact path="/login">
                <CenterPage>
                  <LoginForm />
                  <Link className="nav-link" to='/signup'>Signup</Link>
                  <Link className="nav-link" to='/reset-password'>Forgotten password?</Link>
                </CenterPage>
              </Route>
              <Route exact path="/reset-password">
                <CenterPage>
                  <ResetPasswordForm />
                  <Link className="nav-link" to='/login'>Log in</Link>
                </CenterPage>
              </Route>
              <Route exact path="/logout">
                  <Logout />
              </Route>
              <Route exact path="/signup">
                <CenterPage>
                  <SignUpForm />
                  <Link className="nav-link" to='/login'>Login</Link>
                </CenterPage>
              </Route>
              <PrivateRoute exact path="/profile">
                <CenterPage>
                  <Profile />
                </CenterPage>
              </PrivateRoute>
              <Route path="/games/falling-text">
                <FallingText />
              </Route>
          </Switch>
      </div>
    </React.Fragment>
  )
}

export default Layout