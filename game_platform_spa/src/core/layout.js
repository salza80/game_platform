import React from 'react'
import Games from './games'
import About from './about'
import FallingText from './games/fallingText'
import LoginForm from "../components/userAdmin/loginForm"
import Logout from "../components/userAdmin/logout"
import SignUpForm from "../components/userAdmin/signUpForm"
import ResetPasswordForm from "../components/userAdmin/resetPasswordForm"
import Profile from "../components/userAdmin/profile"
import withAuthentication from "../components/userAdmin/withAuthentication"
import { PrivateRoute } from "../components/"
import './layout.scss'
import {
  Switch,
  Route,
  Link
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

const NavBarLinks = withAuthentication(LoggedInNav, LoggedOutNav)

function Layout () {
return (
    <React.Fragment>
      <nav className="navbar navbar-expand navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
       <Link className="navbar-brand col-sm-3 col-md-2 mr-0" to='/'>German Games</Link>
        {/* <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" /> */}
        <NavBarLinks />

      </nav>
      <div className="container-fluid main-content">
          <Switch>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/">
                <Games />
              </Route>
              <Route exact path="/games">
                <Games />
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