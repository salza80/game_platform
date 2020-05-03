import React, { useState } from 'react';
import './game.scss';
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

function Game(props) {
  const [showSaveScore, setShowScore] = useState(false);
  const [showGame, setShowGame] = useState(false)
  const [score, setScore] = useState(0);

  const { loading, error, data } = useQuery(GAME_QUERY, { variables: { topicCode: props.topicCode, levelCode: props.levelCode } });

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
    start_text: `${props.topicCode} Level: ${props.levelCode}`,
    words: data.fallingTextGame.words,
    game_over_callback: handleShowSaveScore
  }

  return (
    <React.Fragment>
      { showGame && 
        <iframe id="gameIframe" title="falling-text" key={`${props.topicCode}/${props.levelCode}`} src="/konjugator/index.html" className="game-box"></iframe>
      }
      { !showGame &&
        <GameOverview {...data.fallingTextGame} handlePlayClick={handlePlayClick}/>
      }
      <CreateScorePopup handleClose={handleCloseSaveScore} score={score} gameCode={data.fallingTextGame.gameCode} scoreCode={data.fallingTextGame.scoreCode} show={showSaveScore} />
    </React.Fragment>
  )
}

export default Game