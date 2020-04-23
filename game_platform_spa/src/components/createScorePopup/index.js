import React from 'react';
import { Modal, Button } from 'react-bootstrap'

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const CREATE_SCORE = gql`
  mutation createScore($gameCode: String!, $scoreCode: String!, $userName: String!, $score: Int! ) {
    createScore(gameCode: $gameCode, scoreCode: $scoreCode, userName: $userName, score: $score)
  }
`;




export default function CreateScorePopup(props) {
  const [createScore, { data }] = useMutation(CREATE_SCORE);
  let inputUserName
  return (
      <Modal show={props.show} onHide={props.handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Save you score!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.gameCode}
          {props.scoreCode}
          {props.score}
          <form
            onSubmit={e => {
              e.preventDefault();
              createScore({ variables: {
                userName: inputUserName.value,
                gameCode: props.gameCode,
                scoreCode: props.scoreCode,
                score: props.score
              } });
              inputUserName.value = '';
            }}
          >
            <input
              ref={node => {
                inputUserName = node;
              }}
            />
            <button type="submit">Save Score!</button>
          </form>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
        </Button>
          <Button variant="primary" onClick={props.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  );
}