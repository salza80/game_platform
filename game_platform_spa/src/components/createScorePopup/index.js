import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap'

import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { ME } from '../userAdmin/queries.js'
import LoginForm from '../userAdmin/loginForm'
import SignUpForm from '../userAdmin/signUpForm'

const CREATE_SCORE = gql`
  mutation createScore($gameCode: String!, $gameOptions: [GameOptionInput!]!, $score: Int! ) {
    createScore(gameCode: $gameCode, gameOptions: $gameOptions, score: $score)
  }
`;

export default function CreateScorePopup(props) {
  const [showCreateUser, setShowCreateUser] = useState(false)
  const [createScore] = useMutation(CREATE_SCORE, {
    refetchQueries: ["gameScores"]
  });

  const { loading, error, data } = useQuery(ME)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const switchToCreateUser = () => {setShowCreateUser(true)}
  const switchToLogin = () => {setShowCreateUser(false)}

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const gameOptionsArray = Object.keys(props.gameOptions).map((key)=>({code: key, value: props.gameOptions[key]}))
      createScore({ variables: {
        gameCode: props.gameCode,
        gameOptions: gameOptionsArray,
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
          { (!data || !data.me) && !showCreateUser &&
            <div>
              Login to save your score!
              <LoginForm redirectAfterLogin={false} />
              <Button variant="warning" onClick={switchToCreateUser}>No account? Create a new one!</Button>
            </div>
          }
          { (!data || !data.me) && showCreateUser &&
            <div>
              Login to save your score!
              <SignUpForm redirectAfterLogin={false} />
              <Button  variant="warning" onClick={switchToLogin}>Already have an account? Login!</Button>
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
