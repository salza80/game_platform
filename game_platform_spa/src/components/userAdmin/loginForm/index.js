import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap'

import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { ME } from '../queries.js'

import {
  useHistory
} from "react-router-dom";

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
      token
    }
  }
`;

export default function LoginForm(props) {
  const [validated, setValidated] = useState(false);
  const { refetch } = useQuery(ME);
  const history = useHistory();

  const onLoginCompeted = (data) => {
    localStorage.setItem('token', data.login.token)
    refetch()
    history.push("/");
  }
  const [login] = useMutation(LOGIN, { onCompleted: onLoginCompeted});

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;

    if (form.checkValidity()) {
      login({ variables: {
        email: form.elements.email.value,
        password: form.elements.password.value
      }})
    } else { setValidated(true)}

    
  };
  return (
    <div>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" required placeholder="Enter email" />
            <Form.Control.Feedback type="invalid">
              Please provide an email.
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="text" required placeholder="Enter password" />
            <Form.Control.Feedback type="invalid">
              Please provide a password.
            </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
    </Form>
    
    </div>
  
  );
}

