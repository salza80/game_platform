import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
  useParams,
  Redirect,
  Link
} from "react-router-dom";
const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1']
const TOPICS = ['Vocabulary', 'Konjugation']

export function OptionsSelector () {
  let { topicId, levelId } = useParams();
	return (
    <div>
      <h3 className="h2">Select a Level</h3>
      {
        LEVELS.map((v, i) => {
          return (
            <React.Fragment key={i}>
              <Link className={`btn ${v===levelId ? 'btn-warning' : 'btn-primary'}`} to={`/games/falling-text/${topicId}/${v}`}>{v}</Link>{' '}
            </React.Fragment>
          )
        })
      }
      <h3>Select a Topic</h3>
      {
        TOPICS.map((v, i) => {
          return (
            <React.Fragment key={i}>
             <Link className={`btn ${v===topicId ? 'btn-warning' : 'btn-primary'}`} to={`/games/falling-text/${v}/${levelId}`}>{v}</Link>{' '}
            </React.Fragment>
          )
        })
      }
    </div>
  )
}

function OptionsSelectorRoutes() {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/:topicId/:levelId`}>
        <OptionsSelector />
      </Route>
      <Route path={`${path}`}>
        <Redirect to={`${path}/Vocabulary/A1`} />
      </Route> 
    </Switch>
  )
}


export default OptionsSelectorRoutes

