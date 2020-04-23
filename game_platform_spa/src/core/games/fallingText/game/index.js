import React, { useState } from 'react';
import './game.scss';
import {
  Switch,
  Route,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import CreateScorePopup from "../../../../components/createScorePopup"

const GAME_QUERY = gql`
  query FallingTextGame($topicId: String!, $levelId: String! ) {
    fallingTextGame(topicId: $topicId, levelId: $levelId) {
      gameCode
      scoreCode
      words {
        question
        answer
        tip
      }
    }
  }
`
function Game() {
  const [show, setShow] = useState(false);
  const [score, setScore] = useState(0);
  let { topicId, levelId } = useParams();
  const { loading, error, data } = useQuery(GAME_QUERY, { variables: { topicId: topicId, levelId: levelId } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  
  const handleClose = () => setShow(false);
  const handleShow = (data) => {
    setScore(data.score)
    setShow(true)
  }

  const getGameCallback = (handleShow) => (
    (data) => {
      handleShow(data)
    }
  )

  window.gameConfig = {
    start_text: `${topicId} Level: ${levelId}`,
    words: data.fallingTextGame.words,
    game_over_callback: getGameCallback(handleShow)
  }

  return (
    <React.Fragment>
      <iframe id="gameIframe" title="falling-text" key={`${topicId}/${levelId}`} src="/konjugator/index.html" className="game-box"></iframe>
      <CreateScorePopup handleClose={handleClose} score={score} gameCode={data.fallingTextGame.gameCode} scoreCode={data.fallingTextGame.scoreCode} show={show} />
    </React.Fragment>
  )
}

function GameRoutes() {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/:topicId/:levelId`}>
        <Game />
      </Route>
      <Route path={`${path}`}>
        <div>Select Game Options</div>
      </Route>   
    </Switch>
  )
}

export default GameRoutes