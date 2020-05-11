import React from 'react';
import { Modal, Button } from 'react-bootstrap'

import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { ME } from '../userAdmin/queries.js'
import LoginForm from '../userAdmin/loginForm'

const CREATE_SCORE = gql`
  mutation createScore($gameCode: String!, $scoreCode: String!, $score: Int! ) {
    createScore(gameCode: $gameCode, scoreCode: $scoreCode, score: $score)
  }
`;

export default function CreateScorePopup(props) {
  const [createScore] = useMutation(CREATE_SCORE, {
    refetchQueries: ["gameScores"]
  });

  const { loading, error, data } = useQuery(ME)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;


  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
      createScore({ variables: {
        gameCode: props.gameCode,
        scoreCode: props.scoreCode,
        score: props.score
      }})
      .catch (e => {
        console.log(e)
      })
      .then(() => props.handleClose() )
  };
  return (
      <Modal show={props.show} onHide={props.handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Save your score!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>Congratulations! Your score is: {props.score}</p>
          </div>
          { data && data.me &&
            <Button variant="primary" onClick={handleSubmit}>
              Save Score!
            </Button>
          }
          { (!data || !data.me) && 
            <div>
              Login to save your score!
              <LoginForm redirectAfterLogin={false} />
            </div>
          }
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Exit without saving
        </Button>
        </Modal.Footer>
      </Modal>
  );
}
