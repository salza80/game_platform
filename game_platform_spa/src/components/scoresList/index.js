import React from 'react';
import { Tabs, Tab } from 'react-bootstrap'
import './scoresList.scss'


import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { ME } from '../userAdmin/queries'

const SCORES_LIST = gql`
 query gameScores($gameCode: String!, $gameOptions: [GameOptionInput!]! ) {
    gameScores(gameCode: $gameCode, gameOptions: $gameOptions) {
      gameCode
      gameOptions {
        code
        value
      }
      highScoresWeek {
        user { 
          id
          displayName
        }
        score
        createdAt
      }
      highScoresAllTime {
        user {
          id
          displayName
        }
        score
        createdAt
      }
      myHighScores {
        user {
          id
          displayName
        }
        score
        createdAt
      }
    }
  }
`;

function Scores(props) {
  return (
    <table className="table table-striped table-sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Score</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        { props.scores.map((score, index ) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td >
              {props.myId === score.user.id ?
                <span className="badge badge-primary"> {score.user.displayName}</span>
                : score.user.displayName
              }
            </td>
            <td>{score.score}</td>
            <td>{score.createdAt}</td>
          </tr>
        ))}
      </tbody>
  </table>
  )
}

export default function ScoresList(props) {
  const { loading: loadingMe, error: errorMe, data: dataMe } = useQuery(ME);

  const gameOptionsArray = Object.keys(props.gameOptions).map((key)=>({code: key, value: props.gameOptions[key]}))

  const { loading, error, data } = useQuery(SCORES_LIST, { variables: { gameCode: props.gameCode, gameOptions: gameOptionsArray } });

  let myId = (!loadingMe && !errorMe && dataMe && dataMe.me) ? dataMe.me.id : null
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  let { highScoresAllTime, highScoresWeek, myHighScores, gameOptions } = data.gameScores
  return (
    <div className="score-list">
      <h5>High Scores</h5>
      {gameOptions.map((option)=>(
        <span key={`${option.code}${option.value}`}>{option.value} </span>
      ))}
      <Tabs defaultActiveKey="week" className="nav-pills nav-justified">
        { myId && myHighScores &&
          <Tab eventKey="me" title="My scores">
            <Scores myId={myId} scores={myHighScores} />
          </Tab>
        }
        <Tab eventKey="week" title="This Week">
          <Scores myId={myId} scores={highScoresWeek} />
        </Tab>
        <Tab eventKey="alltime" title="All Time">
           <Scores myId={myId} scores={highScoresAllTime} />
        </Tab>
      </Tabs>
    </div>
  )
}


