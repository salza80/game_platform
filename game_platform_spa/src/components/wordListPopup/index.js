import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap'



export default function WordListPopup(props) {

  
  return (
      <Modal show={props.show} onHide={props.handleClose} scrollable={true} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Game Word List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Question</th>
                <th>Answer</th>
              </tr>
            </thead>
            <tbody>
            {
              props.words.map((word, index)=> (
                <tr key={index}>
                  <td>{word.question}</td>
                  <td>{word.answer}</td>
                </tr>
              ))
            }
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Exit
        </Button>
        </Modal.Footer>
      </Modal>
  );
}

