import React from 'react';
import Games from './games'
import About from './about'
import './layout.scss'
import {
  Switch,
  Route,
  Link
} from "react-router-dom";

function Layout () {

return (
    <React.Fragment>
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
       <Link className="navbar-brand col-sm-3 col-md-2 mr-0" to='/'>German Games</Link>
        {/* <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" /> */}
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap">
            <Link className="nav-link" to='/signout'>Signout</Link>
          </li>
        </ul>
      </nav>
      <div className="container-fluid">
        <div className="row">
          <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link className="nav-link active" to='/games'>
                    <span data-feather="home"></span>
                    Play Games <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to='/about'><span data-feather="file"></span>
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
           <Switch>
              <Route exact path="/about">
                <About />
              </Route>
              <Route path="/games">
                <Games />
              </Route>
          </Switch>
          </main>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Layout