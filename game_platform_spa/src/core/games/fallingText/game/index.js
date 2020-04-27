import React, { useState, useEffect } from 'react';
import './game.scss';
import {
  Switch,
  Route,
  useRouteMatch,
  useParams,
  useLocation
} from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import CreateScorePopup from "../../../../components/createScorePopup"
import Loading from "../../../../components/loading"

const GAME_QUERY = gql`
  query FallingTextGame($topicCode: String!, $levelCode: String! ) {
    fallingTextGame(topicCode: $topicCode, levelCode: $levelCode) {
      gameCode
      scoreCode
      gameTitle
      gameDesc
      gameShortDesc
      words {
        question
        answer
        tip
      }
    }
  }
`

function GameOverview (props) {
  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container text-center">
        <h1 className="display-4">{props.gameTitle}</h1>
        <p className="lead">{props.gameShortDesc}</p>
        <p>{props.gameDesc}</p>
        <div> 
          <button className="btn btn-primary btn-lg" onClick={props.handlePlayClick}>Play Now!</button>
        </div>
      </div>
    </div>
  )
}

function Game() {
  const [showSaveScore, setShowScore] = useState(false);
  const [showGame, setShowGame] = useState(false)
  const [score, setScore] = useState(0);
  let { topicCode, levelCode } = useParams();
  let location = useLocation();

  // hide game when route/location changes.
  useEffect(() => {
   if (showGame) {
      setShowGame(false)
    }
  }, [location]);

  const { loading, error, data } = useQuery(GAME_QUERY, { variables: { topicCode: topicCode, levelCode: levelCode } });

  if (loading) return <Loading />
  if (error) return <p>Error :(</p>;

  const handleCloseSaveScore = () => setShowScore(false);
  const handleShowSaveScore = (data) => {
    setScore(data.score)
    setShowScore(true)
    setShowGame(false)
  }

  const handlePlayClick = () => setShowGame(true);

  window.gameConfig = {
    start_text: `${topicCode} Level: ${levelCode}`,
    words: data.fallingTextGame.words,
    game_over_callback: handleShowSaveScore
  }

  return (
    <React.Fragment>
      { showGame && 
        <iframe id="gameIframe" title="falling-text" key={`${topicCode}/${levelCode}`} src="/konjugator/index.html" className="game-box"></iframe>
      }
      { !showGame &&
        <GameOverview {...data.fallingTextGame} handlePlayClick={handlePlayClick}/>
      }
      <CreateScorePopup handleClose={handleCloseSaveScore} score={score} gameCode={data.fallingTextGame.gameCode} scoreCode={data.fallingTextGame.scoreCode} show={showSaveScore} />
    </React.Fragment>
  )
}

function GameRoutes() {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/:topicCode/:levelCode`}>
        <Game />
      </Route>
      <Route path={`${path}`}>
        <div>Select Game Options</div>
      </Route>   
    </Switch>
  )
}

export default GameRoutes