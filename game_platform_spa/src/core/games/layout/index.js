import React from 'react';
import './layout.scss'

function withGameLayout(SideBarComponent, GameComponent) {
  return function GameLayout () {
    return (
      <div className="row">
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky">
              <SideBarComponent />
            </div>
        </nav>
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
            <GameComponent />
        </main>
      </div>
    )
  }
}

export default withGameLayout
