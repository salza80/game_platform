import React from 'react';
import ScoresList from "../../../../components/scoresList"
import { LEVELS, TOPICS } from "../constants"
import {
  Switch,
  Route,
  useRouteMatch,
  useParams,
  Redirect,
  Link
} from "react-router-dom";

function OptionsSelector () {
  let { topicCode, levelCode } = useParams();
	return (
    <div>
      <div className="border border-primary rounded mt-2 p-2">
        <h3>Select a Level</h3>
        {
          LEVELS.map((v, i) => {
            return (
              <React.Fragment key={i}>
                <Link className={`btn ${v===levelCode ? 'btn-warning' : 'btn-primary'}`} to={`/games/falling-text/${topicCode}/${v}`}>{v}</Link>{' '}
              </React.Fragment>
            )
          })
        }
        <h3>Select a Topic</h3>
        {
          TOPICS.map((v, i) => {
            return (
              <React.Fragment key={i}>
               <Link className={`btn ${v===topicCode ? 'btn-warning' : 'btn-primary'}`} to={`/games/falling-text/${v}/${levelCode}`}>{v}</Link>{' '}
              </React.Fragment>
            )
          })
        }
      </div>
      <div className="border border-primary rounded mt-2 p-2">
        <ScoresList gameCode="falling_text" scoreCode={`${topicCode}_${levelCode}`}> </ScoresList>
      </div>
    </div>
  )
}

function GameSidebarRoutes() {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/:topicCode/:levelCode`}>
        <OptionsSelector />
      </Route>
      <Route path={`${path}`}>
        <Redirect to={`${path}/Vocabulary/A1`} />
      </Route> 
    </Switch>
  )
}


export default GameSidebarRoutes

