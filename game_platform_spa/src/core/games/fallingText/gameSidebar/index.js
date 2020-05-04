import React from 'react';
import ScoresList from "../../../../components/scoresList"

function GameSidebar (props) {
	return (
    <div>
      <div className="border border-primary rounded mt-2 p-2">
        <ScoresList gameCode="falling_text" scoreCode={props.scoreCode}> </ScoresList>
      </div>
    </div>
  )
}


export default GameSidebar
