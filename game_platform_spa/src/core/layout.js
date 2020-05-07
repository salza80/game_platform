import React from 'react'
import Games from './games'
import About from './about'
import FallingText from './games/fallingText'
import LoginForm from "../components/userAdmin/loginForm"
import Logout from "../components/userAdmin/logout"
import SignUpForm from "../components/userAdmin/signUpForm"
import Profile from "../components/userAdmin/profile"
import withAuthentication from "../components/userAdmin/withAuthentication"
import './layout.scss'
import {
  Switch,
  Route,
  Link
} from "react-router-dom";

function LogOutButton() {
  return (
      <Link className="nav-link" to='/logout'>logout</Link>
    )
}

function LogInButton() {
  return (
      <Link className="nav-link" to='/login'>login</Link>
    )
}

const LogInOutButtons = withAuthentication(LogOutButton, LogInButton)

function Layout () {
return (
    <React.Fragment>
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
       <Link className="navbar-brand col-sm-3 col-md-2 mr-0" to='/'>German Games</Link>
        {/* <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" /> */}
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap">
            <LogInOutButtons />
          </li>
        </ul>
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
                <LoginForm />
              </Route>
              <Route exact path="/logout">
                <Logout />
              </Route>
              <Route exact path="/signup">
                <SignUpForm />
              </Route>
              <Route exact path="/profile">
                <Profile />
              </Route>
              <Route path="/games/falling-text">
                <FallingText />
              </Route>
              
          </Switch>
      </div>
    </React.Fragment>
  )
}

export default Layout