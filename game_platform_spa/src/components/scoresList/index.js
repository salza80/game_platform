import React from 'react';

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

export default function ScoresList(props) {
  const { loading, error, data } = useQuery(SCORES_LIST, { variables: { gameCode: props.gameCode, scoreCode: props.scoreCode } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  let highScoresAllTime = data.gameScores.highScoresAllTime
  console.log(data)
  return (
    <div>
        { highScoresAllTime.map((score, index ) => (
          <span key={index}>{score.userName}</span>
        ))
      }
    </div>
  )
}


