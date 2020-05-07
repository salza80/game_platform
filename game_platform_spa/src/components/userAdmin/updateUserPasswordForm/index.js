import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap'

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const UPDATE_USER_PASSWORD = gql`
  mutation updateUserPassword($password: String!, $passwordConfirmation: String!) {
    updateUserPassword(password: $password, passwordConfirmation: $passwordConfirmation) {
      displayName
    }
  }
`;

export default function UpdateUserPasswordForm() {
  const [validated, setValidated] = useState(false);
  const [updateUserPassword,  { error: updateError, loading: submitting, data: updateResult }] = useMutation(UPDATE_USER_PASSWORD);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;

    if (form.checkValidity()) { 
      updateUserPassword(
        { variables:
          { 
            password: form.elements.password.value,
            passwordConfirmation: form.elements.passwordConfirmation.value
          }
        }
      ).catch(e => {
        setValidated(false)
      })
    } else { setValidated(true)}

  };

  return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
            Update Password
          </Button>
      </Form>
      <div className='mt-3'>
        {updateError && updateError.graphQLErrors && updateError.graphQLErrors.map(({ message }, i) => (
          <Alert key={i} variant={'warning'}>{message}</Alert>
        ))}
        {updateResult &&  <Alert variant={'success'}>Password Successfully Updated!</Alert>}
        </div>
    </div>
  
  );
}
