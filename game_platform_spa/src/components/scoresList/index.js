import React from 'react';
import { Tabs, Tab } from 'react-bootstrap'


import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const SCORES_LIST = gql`
 query gameScores($gameCode: String!, $scoreCode: String! ) {
    gameScores(gameCode: $gameCode, scoreCode: $scoreCode) {
      gameCode
      scoreCode
      gameTitle
      highScoresWeek {
        userName
        score
        createdAt
      }
      highScoresAllTime {
        userName
        score
        createdAt
      }
    }
  }
`;

function Scores(props) {
  return (
    <table className="table">
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
            <td>{score.userName}</td>
            <td>{score.score}</td>
            <td>{score.createdAt}</td>
          </tr>
        ))}
      </tbody>
  </table>
  )
}

export default function ScoresList(props) {
  const { loading, error, data } = useQuery(SCORES_LIST, { variables: { gameCode: props.gameCode, scoreCode: props.scoreCode } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  let { highScoresAllTime, highScoresWeek } = data.gameScores
  return (
    <div>
      <h3>High Scores</h3>
      <Tabs defaultActiveKey="week">
        <Tab eventKey="week" title="This Week">
          <Scores scores={highScoresWeek} />
        </Tab>
        <Tab eventKey="alltime" title="All Time">
           <Scores scores={highScoresAllTime} />
        </Tab>
      </Tabs>
    </div>
  )
}


