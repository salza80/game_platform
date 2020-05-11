import React, { useState } from 'react';
import './game.scss';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import CreateScorePopup from "../../../../components/createScorePopup"
import WordListPopup from "../../../../components/wordListPopup"
import Loading from "../../../../components/loading"
import OptionSelector from "../../../../components/optionSelector"
import { LEVELS, TOPICS, INPUT_TYPES, LEVELS_COMMING_SOON } from "../constants"

const GAME_QUERY = gql`
  query FallingTextGame($topicCode: String!, $levelCode: String! ) {
    fallingTextGame(topicCode: $topicCode, levelCode: $levelCode) {
      gameCode
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
         <div className="border border-primary rounded mt-2 mb-4 p-2">
          <h5>Select a Level</h5>
          <OptionSelector handleOptionChanged={props.handleOptionChanged('levelCode')} currentOption={props.levelCode} options={LEVELS} />
          <div className='mt-1'>
          { 
            LEVELS_COMMING_SOON.map((v, i) => {
              return (
                <React.Fragment key={i}>
                  <button className='btn btn-sm btn-primary' title='comming soon!' disabled>{v}</button>{' '}
                </React.Fragment>
              )
            })
          }
          </div>
          <h5>Select a Topic</h5>
          <OptionSelector handleOptionChanged={props.handleOptionChanged('topicCode')} currentOption={props.topicCode} options={TOPICS} />
          <h5>Select a Game Input Type</h5>
          <OptionSelector handleOptionChanged={props.handleOptionChanged('inputTypeCode')} currentOption={props.inputTypeCode} options={INPUT_TYPES} />
        </div>
        <p>Sudy the <button className="btn btn-link p-0" onClick={props.handleOpenWordList}>game word list</button> before you start!</p>
        <div className="mt-5"> 
          <button className="btn btn-primary btn-lg" onClick={props.handlePlayClick}>Play Now!</button>
        </div>
      </div>
    </div>
  )
}

function Game(props) {
  const [showSaveScore, setShowScore] = useState(false);
  const [showGame, setShowGame] = useState(false)
  const [showWordList, setShowWordList] = useState(false)
  const [score, setScore] = useState(0);

  const { loading, error, data } = useQuery(GAME_QUERY, { variables: { topicCode: props.topicCode, levelCode: props.levelCode } });

  if (loading) return <Loading />
  if (error) return <p>Error :(</p>;

  const handleOptionChanged = (code) => {
    return (value) => {
      props.handleOptionChanged(code, value)
    }
  }

  const handleCloseSaveScore = () => setShowScore(false);
  const handleShowSaveScore = (data) => {
    setScore(data.score)
    setShowScore(true)
    setShowGame(false)
  }

  const handleCloseWordList = () => setShowWordList(false);
  const handleOpenWordList = () => setShowWordList(true);

  const handlePlayClick = () => setShowGame(true);

  window.gameConfig = {
    start_text: `${props.topicCode} Level: ${props.levelCode}`,
    words: data.fallingTextGame.words,
    input_type: props.inputTypeCode,
    game_over_callback: handleShowSaveScore
  }

  return (
    <React.Fragment>
      { showGame && 
        <iframe id="gameIframe" title="falling-text" key={`${props.scoreCode}`} src="/konjugator/index.html" className="game-box"></iframe>
      }
      { !showGame &&
        <GameOverview {...data.fallingTextGame} {...props} handlePlayClick={handlePlayClick} handleOpenWordList={handleOpenWordList} handleOptionChanged={handleOptionChanged}/>
      }
      <CreateScorePopup handleClose={handleCloseSaveScore} score={score} gameCode={data.fallingTextGame.gameCode} scoreCode={props.scoreCode} show={showSaveScore} />
      <WordListPopup handleClose={handleCloseWordList} show={showWordList} words={data.fallingTextGame.words} />
    </React.Fragment>
  )
}

export default Game