import React, { useState }  from 'react';
import './layout.scss'
import GameSidebar from './gameSidebar'
import Game from './game'
import { LEVELS, TOPICS } from "./constants"

function GameLayout () {
	const [levelCode, setLevelCode] = useState(LEVELS[0]);
  const [topicCode, setTopicCode] = useState(TOPICS[0]);

  const handleOptionChanged = (option, value) => {
    switch (option) {
      case 'levelCode':
        setLevelCode(value)
        break;
      case 'topicCode':
        setTopicCode(value)
        break;
      default: 
        break;
    }
  }

	return (
      <div className="row">
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky">
            <GameSidebar topicCode={topicCode} levelCode={levelCode} handleOptionChanged={handleOptionChanged} />
          </div>
        </nav>
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
            <Game levelCode={levelCode} topicCode={topicCode}  />
        </main>
      </div>
    )
}

export default GameLayout
