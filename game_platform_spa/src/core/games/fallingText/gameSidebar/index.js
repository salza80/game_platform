import React from 'react';
import ScoresList from "../../../../components/scoresList"
import OptionSelector from "../../../../components/optionSelector"
import { LEVELS, TOPICS } from "../constants"


function GameSidebar (props) {
  const handleOptionChanged = (code) => {
    return (value) => {
      props.handleOptionChanged(code, value)
    }
  }

	return (
    <div>
      <div className="border border-primary rounded mt-2 p-2">
        <h3>Select a Level</h3>
        <OptionSelector handleOptionChanged={handleOptionChanged('levelCode')} currentOption={props.levelCode} options={LEVELS} />
        <h3>Select a Topic</h3>
        <OptionSelector handleOptionChanged={handleOptionChanged('topicCode')} currentOption={props.topicCode} options={TOPICS} />
      </div>
      <div className="border border-primary rounded mt-2 p-2">
        <ScoresList gameCode="falling_text" scoreCode={`${props.topicCode}_${props.levelCode}`}> </ScoresList>
      </div>
    </div>
  )
}


export default GameSidebar
