import React from 'react';
import './game.scss';
import {
  Switch,
  Route,
  useRouteMatch,
  useParams
} from "react-router-dom";

function Game() {
  let { topicId, levelId } = useParams();

  window.gameConfig = {
    topicId,
    levelId,
    start_text: `${topicId} Level: ${levelId}`,
    words: [{"question":"test","answer":"test","tip":"test"},{"question":"again","answer":"testing","tip":"again"}],
    game_over_callback: function(data) { 
      console.log(data)
     }
  }
  return (
    <iframe id="gameIframe" title="falling-text" key={`${topicId}/${levelId}`} src="/konjugatorTest/index.html" className="game-box"></iframe>
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