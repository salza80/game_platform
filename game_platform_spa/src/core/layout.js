import React from 'react';
import Games from './games'
import About from './about'
import {
  Switch,
  Route,
  Link
} from "react-router-dom";

function Layout () {

return (
  <div className="d-flex flex-column h-100">
    <main role="main" className="flex-shrink-0">
      <div className="container">
        <h1 className="mt-5">Sticky footer</h1>
        <p className="lead">Pin a footer to the bottom of the viewport in desktop browsers with this custom HTML and CSS.</p>
        <p>Play <Link to='/games'>Games</Link></p>
        <p><Link to='/about'>About</Link></p>
      </div>
    </main>
    <Switch>
    <Route exact path="/about">
      <About />
    </Route>
    <Route path="/games">
      <Games />
    </Route>
  </Switch>
  </div>
  )
}

export default Layout