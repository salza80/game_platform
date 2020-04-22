import React from 'react';
import './game.scss';
import {
  Switch,
  Route,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const GAME_QUERY = gql`
    query FallingTextGame($topicId: String!, $levelId: String! ) {
      fallingTextGame(topicId: $topicId, levelId: $levelId) {
        question
        answer
        tip
      }
    }
`

function Game() {
  let { topicId, levelId } = useParams();
  const { loading, error, data } = useQuery(GAME_QUERY, { variables: { topicId: topicId, levelId: levelId } });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data)
  window.gameConfig = {
    topicId,
    levelId,
    start_text: `${topicId} Level: ${levelId}`,
    words: data.fallingTextGame,
    game_over_callback: function(data) { 
      console.log(data)
     }
  }
  console.log(window.gameConfig)
  return (
    <iframe id="gameIframe" title="falling-text" key={`${topicId}/${levelId}`} src="/konjugator/index.html" className="game-box"></iframe>
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