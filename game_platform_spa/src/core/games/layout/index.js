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
            <nav className="col-lg-4 col-xl-3 d-none d-lg-block bg-light sidebar">
              <div className="sidebar-sticky">
                <GameSidebarComponent gameOptions={gameOptions} handleOptionChanged={handleOptionChanged} />
              </div>
            </nav>
            <main role="main" className="col-lg-8 ml-sm-auto col-xl-9 px-4">
                <GameComponent gameOptions={gameOptions} handleOptionChanged={handleOptionChanged}/>
            </main>
          </div>
        )
    }
  )
}

export default withGameLayout
