import React, { useState } from 'react';
import './game.scss';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import CreateScorePopup from "../../../../components/createScorePopup"
import WordListPopup from "../../../../components/wordListPopup"
import OptionSelector from "../../../../components/optionSelector"
import { LEVELS, TOPICS, INPUT_TYPES, LEVELS_COMING_SOON } from "../constants"

const GAME_DATA_QUERY = gql`
  query FallingTextGame($topicCode: String!, $levelCode: String! ) {
    fallingTextGame(topicCode: $topicCode, levelCode: $levelCode) {
      words {
        question
        answer
        tip
        voice
      }
    }
  }
`

function GameOverview (props) {
  const [showWordList, setShowWordList] = useState(false)
  const { loading, error, data } = useQuery(GAME_DATA_QUERY, { variables: { topicCode: props.gameOptions.topicCode, levelCode: props.gameOptions.levelCode } });

  const handleCloseWordList = () => setShowWordList(false);
  const handleOpenWordList = () => setShowWordList(true);

  if (!loading && !error) {
    window.gameConfig = {
      start_text: `${props.gameOptions.topicCode} Level: ${props.gameOptions.levelCode}`,
      words: data.fallingTextGame.words,
      input_type: props.gameOptions.inputTypeCode,
      game_over_callback: props.handleShowSaveScore
    }
  }

  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container text-center">
        <h1 className="display-4">{props.gameTitle}</h1>
        <p className="lead">{props.gameShortDesc}</p>
        <p>{props.gameDesc}</p>
         <div className="border border-primary rounded mt-2 mb-4 p-2">
          <h5>Select a Level</h5>
          <OptionSelector handleOptionChanged={props.handleOptionChanged('levelCode')} currentOption={props.gameOptions.levelCode} options={LEVELS} />
          <div className='mt-1'>
          { 
            LEVELS_COMING_SOON.map((v, i) => {
              return (
                <React.Fragment key={i}>
                  <button className='btn btn-sm btn-primary' title='coming soon!' disabled>{v}</button>{' '}
                </React.Fragment>
              )
            })
          }
          </div>
          <h5>Select a Topic</h5>
          <OptionSelector handleOptionChanged={props.handleOptionChanged('topicCode')} currentOption={props.gameOptions.topicCode} options={TOPICS} />
          <h5>Select a Game Input Type</h5>
          <OptionSelector handleOptionChanged={props.handleOptionChanged('inputTypeCode')} currentOption={props.gameOptions.inputTypeCode} options={INPUT_TYPES} />
        </div>
        <p>Study the <button className="btn btn-link p-0" disabled={ loading || error ? true : false} onClick={handleOpenWordList}>game word list</button> before you start!</p>
        <div className="mt-4"> 
          <button className="btn btn-success btn-lg" disabled={ loading || error ? true : false} onClick={props.handlePlayClick}>Play Now!</button>
        </div>
      </div>
      <WordListPopup handleClose={handleCloseWordList} show={showWordList} words={loading || error ? [] : data.fallingTextGame.words} />
    </div>
  )
}

function Game(props) {
  const [showSaveScore, setShowSaveScore] = useState(false);
  const [showGame, setShowGame] = useState(false)
 
  const [score, setScore] = useState(0);

  const { gameDetails } = props

  const handleOptionChanged = (code) => {
    return (value) => {
      props.handleOptionChanged(code, value)
    }
  }

  const handleCloseSaveScore = () => { 
    setShowSaveScore(false)
    setScore(0)
  }
  
  const handleShowSaveScore = (data) => {
    setScore(data.score)
    setShowSaveScore(true)
    setShowGame(false)
  }


  const handlePlayClick = () => setShowGame(true);

  return (
    <React.Fragment>
      { showGame && 
        <iframe id="gameIframe" title="falling-text" key={`${props.gameOptions}`} name={Date.now()} src="/spa/konjugator/index.html" className="game-box"></iframe>
      }
      { !showGame &&
        <GameOverview {...gameDetails} {...props} handlePlayClick={handlePlayClick} handleShowSaveScore={handleShowSaveScore} handleOptionChanged={handleOptionChanged}/>
      }
      <CreateScorePopup handleClose={handleCloseSaveScore} score={score} gameCode={gameDetails.gameCode} gameOptions={props.gameOptions} show={showSaveScore} />
      
    </React.Fragment>
  )
}

export default Game