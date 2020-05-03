import React from 'react';
import ScoresList from "../../../../components/scoresList"
import { LEVELS, TOPICS } from "../constants"

function GameSidebar (props) {
	return (
    <div>
      <div className="border border-primary rounded mt-2 p-2">
        <h3>Select a Level</h3>
        {
          LEVELS.map((v, i) => {
            return (
              <React.Fragment key={i}>
                <button className={`btn ${v===props.levelCode ? 'btn-warning' : 'btn-primary'}`} onClick={(e) => props.handleOptionChanged('levelCode', v)}>{v}</button>{' '}
              </React.Fragment>
            )
          })
        }
        <h3>Select a Topic</h3>
        {
          TOPICS.map((v, i) => {
            return (
              <React.Fragment key={i}>
               <button className={`btn ${v===props.topicCode ? 'btn-warning' : 'btn-primary'}`} onClick={(e) => props.handleOptionChanged('topicCode', v)}>{v}</button>{' '}
              </React.Fragment>
            )
          })
        }
      </div>
      <div className="border border-primary rounded mt-2 p-2">
        <ScoresList gameCode="falling_text" scoreCode={`${props.topicCode}_${props.levelCode}`}> </ScoresList>
      </div>
    </div>
  )
}


export default GameSidebar

