import React, { useState }  from 'react';
import './layout.scss'

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import Loading from "../../../components/loading"

const GAME_QUERY = gql`
  query Game($gameCode: String! ) {
    gameDetails(gameCode: $gameCode) {
      gameCode
      gameTitle
      gameDesc
      gameShortDesc
    }
  }
`

//HOC for a game layout
function withGameLayout(gameCode, defaultOptions, GameSidebarComponent, GameComponent) {

  return (
    function GameLayout () {
      const [gameOptions, setGameOptions] = useState(defaultOptions)
      const { loading, error, data } = useQuery(GAME_QUERY, { variables: { gameCode: gameCode } });

      if (loading) return <Loading />
      if (error) return <p>Error :(</p>;

      const handleOptionChanged = (option, value) => {
        let newOptions = {...gameOptions}
        newOptions[option] = value
        setGameOptions(newOptions)
      }
      return (
          <div className="row">
            <nav className="col-lg-4 col-xl-3 d-none d-lg-block bg-light sidebar">
              <div className="sidebar-sticky">
                <GameSidebarComponent gameDetails={data.gameDetails} gameOptions={gameOptions} handleOptionChanged={handleOptionChanged} />
              </div>
            </nav>
            <main role="main" className="col-lg-8 ml-sm-auto col-xl-9 px-4">
                <GameComponent gameDetails={data.gameDetails} gameOptions={gameOptions} handleOptionChanged={handleOptionChanged}/>
            </main>
          </div>
        )
    }
  )
}

export default withGameLayout
