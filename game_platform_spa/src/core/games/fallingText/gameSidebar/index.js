import React from 'react';
import ScoresList from "../../../../components/scoresList"

function GameSidebar (props) {
	return (
    <div>
      <div className="jumbotron">
        <ScoresList gameCode="falling_text" scoreCode={props.scoreCode}> </ScoresList>
      </div>
    </div>
  )
}


export default GameSidebar
