import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap'

import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { ME } from '../queries.js'
import { parseFormValidationErrors } from '../../helpers'
import FormErrors from '../../formErrors'

import {
  useHistory
} from "react-router-dom";

const SIGN_UP = gql`
  mutation signUp($email: String!, $displayName: String!, $password: String!, $passwordConfirmation: String!) {
    signUp(attributes: { email: $email, displayName: $displayName, password: $password, passwordConfirmation: $passwordConfirmation }) {
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

  const [signUp,  { error: signUpError, loading: submitting }] = useMutation(SIGN_UP, { onCompleted: onSignUpCompeted});
  let validationErrors = parseFormValidationErrors(signUpError)

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    setValidated(false)
    if (form.checkValidity()) {
      signUp(
        { variables:
          { email: form.elements.email.value,
            displayName: form.elements.displayName.value,
            password: form.elements.password.value,
            passwordConfirmation: form.elements.passwordConfirmation.value
          }
        }
      ).catch(e => {})
    } else { setValidated(true)}
  };
  return (
    <div>
      <h3>Create an Account</h3>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control isInvalid={!!validationErrors['email']} type="email" required placeholder="Enter email" />
              <Form.Control.Feedback type="invalid">
                {validationErrors['email'] ? validationErrors['email'] : 'Please provide an email.'}
              </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="displayName">
            <Form.Label>Display name</Form.Label>
            <Form.Control isInvalid={!!validationErrors['displayName']} type="text" required placeholder="Enter a public display name" />
              <Form.Control.Feedback type="invalid">
                 {validationErrors['displayName'] ? validationErrors['displayName'] : 'Please provide a name.'}
              </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control isInvalid={!!validationErrors['password']} type="password" required placeholder="Enter password" />
              <Form.Control.Feedback type="invalid">
                {validationErrors['password'] ? validationErrors['password'] : 'Please provide a password.'}
              </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="passwordConfirmation">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control isInvalid={!!validationErrors['passwordConfirmation']} type="password" required placeholder="Enter password again" />
              <Form.Control.Feedback type="invalid">
                {validationErrors['passwordConfirmation'] ? validationErrors['passwordConfirmation'] : 'Please re-enter the password.'}
              </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit" disabled={submitting ? true : false}>
            Sign Up
          </Button>
      </Form>
      <FormErrors error={signUpError} />
      </div>
  
  );
}

