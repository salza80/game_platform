import React, { useState }  from 'react';
import './layout.scss'

//HOC for a game layout

function withGameLayout(defaultOptions, GameSidebarComponent, GameComponent) {

  return (
    function GameLayout () {
      const [gameOptions, setGameOptions] = useState(defaultOptions)

        const handleOptionChanged = (option, value) => {
          let newOptions = {...gameOptions}
          newOptions[option] = value
          setGameOptions(newOptions)
        }

      return (
          <div className="row">
            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
              <div className="sidebar-sticky">
                <GameSidebarComponent {...gameOptions} handleOptionChanged={handleOptionChanged} />
              </div>
            </nav>
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                <GameComponent {...gameOptions}  />
            </main>
          </div>
        )
    }
  )
}

export default withGameLayout
