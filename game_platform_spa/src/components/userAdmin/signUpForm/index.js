import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap'

import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { ME } from '../queries.js'

import {
  useHistory
} from "react-router-dom";

const SIGN_UP = gql`
  mutation signUp($email: String!, $password: String!, $passwordConfirmation: String!) {
    signUp(attributes: { email: $email, password: $password, passwordConfirmation: $passwordConfirmation }) {
      email
      token
    }
  }
`;

export default function SignUpForm() {
  const [validated, setValidated] = useState(false);
  const { refetch } = useQuery(ME);
  const history = useHistory();

  const onSignUpCompeted = (data) => {
    if (data.signUp) {
      localStorage.setItem('token', data.signUp.token)
      refetch().then(() => {
        history.push("/")
      })
    }
  }

  const [signUp,  { error: loginError, loading: submitting }] = useMutation(SIGN_UP, { onCompleted: onSignUpCompeted});

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;

    if (form.checkValidity()) { 
      signUp(
        { variables:
          { email: form.elements.email.value,
            password: form.elements.password.value,
            passwordConfirmation: form.elements.passwordConfirmation.value
          }
        }
      ).catch(e => {
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
          <Form.Group controlId="passwordConfirmation">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control type="password" required placeholder="Enter password again" />
              <Form.Control.Feedback type="invalid">
                Please re-enter the password.
              </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit" disabled={submitting ? true : false}>
            Signup
          </Button>
      </Form>
      <div className='mt-3'>
        {loginError && loginError.graphQLErrors.map(({ message }, i) => (
          <Alert key={i} variant={'warning'}>{message}</Alert>
        ))}
        </div>
    </div>
  
  );
}

