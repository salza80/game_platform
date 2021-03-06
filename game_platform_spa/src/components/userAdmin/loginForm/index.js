import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap'
import ReactGA from 'react-ga';

import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { ME } from '../queries.js'

import {
  useHistory
} from "react-router-dom";

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      displayName
      token
    }
  }
`;

export default function LoginForm({redirectAfterLogin = true, ...props}) {
  const [validated, setValidated] = useState(false);
  const { refetch } = useQuery(ME);
  const history = useHistory();
 
  const onLoginCompeted = (data) => {
    if (data.login) {
      localStorage.setItem('token', data.login.token)
      ReactGA.event({
        category: 'User',
        action: 'Logged In'
      });
      refetch().then(() => {
          if (redirectAfterLogin){history.push("/")}
        }).catch (e => {
          console.log(e)
        })
    }
  }
  const [login, { error: loginError, loading: submitting }] = useMutation(LOGIN, { onCompleted: onLoginCompeted});

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;

    if (form.checkValidity()) {
      login({ variables: {
        email: form.elements.email.value,
        password: form.elements.password.value
      }}).catch(e => {
        form.reset()
        setValidated(false)
      })
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
          <Form.Control type="password" required placeholder="Enter password" />
            <Form.Control.Feedback type="invalid">
              Please provide a password.
            </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit" disabled={submitting ? true : false}>
          Login
        </Button>
        <div className='mt-3'>
        {loginError && loginError.graphQLErrors && loginError.graphQLErrors.map(({ message }, i) => (
          <Alert key={i} variant={'warning'}>{message}</Alert>
        ))}
        </div>
    </Form>
    
    </div>
  
  );
}

