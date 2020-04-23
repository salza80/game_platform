import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const CREATE_SCORE = gql`
  mutation createScore($gameCode: String!, $scoreCode: String!, $userName: String!, $score: Int! ) {
    createScore(gameCode: $gameCode, scoreCode: $scoreCode, userName: $userName, score: $score)
  }
`;

export default function CreateScorePopup(props) {
  const [createScore] = useMutation(CREATE_SCORE);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;

    if (form.checkValidity()) {
      createScore({ variables: {
        userName: form.elements.userName.value,
        gameCode: props.gameCode,
        scoreCode: props.scoreCode,
        score: props.score
      }});
      props.handleClose();
    }

    setValidated(true);
  };
  return (
      <Modal show={props.show} onHide={props.handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Save you score!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="userName">
              <Form.Label>Display Name </Form.Label>
              <Form.Control type="text" required placeholder="Enter name" />
                <Form.Control.Feedback type="invalid">
                  Please provide a name.
                </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Enter your name to save your score
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Score!
            </Button>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Exit without saving
        </Button>
        </Modal.Footer>
      </Modal>
  );
}
