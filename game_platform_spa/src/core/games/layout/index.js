import React, { useState }  from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import Loading from "../../../components/loading"
import ScoresList from "../../../components/scoresList"

function GameScores (props) {
  return (
    <div>
      <div className="jumbotron mt-1">
        <ScoresList gameCode={props.gameDetails.gameCode} gameOptions={props.gameOptions}> </ScoresList>
      </div>
    </div>
  )
}

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
function withGameLayout(gameCode, defaultOptions, GameComponent) {

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
            <main role="main" className="col-lg-8 col-xl-9 px-0 min-vh-100">
              <GameComponent gameDetails={data.gameDetails} gameOptions={gameOptions} handleOptionChanged={handleOptionChanged}/>
            </main>
            <nav className="col-lg-4 col-xl-3 bg-light px-1 min-vh-100">
              <GameScores gameDetails={data.gameDetails} gameOptions={gameOptions} handleOptionChanged={handleOptionChanged} />
            </nav>
          </div>
        )
    }
  )
}

export default withGameLayout
