import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap'

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { parseFormValidationErrors } from '../../helpers'
import FormErrors from '../../formErrors'

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
  let validationErrors = parseFormValidationErrors(updateError)

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    setValidated(false)
    if (form.checkValidity()) { 
      updateUserPassword(
        { variables:
          { 
            password: form.elements.password.value,
            passwordConfirmation: form.elements.passwordConfirmation.value
          }
        }
      ).catch(e => {})
    } else { setValidated(true)}

  };

  return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" isInvalid={!!validationErrors['password']}  required placeholder="Enter password" />
              <Form.Control.Feedback type="invalid">
                {validationErrors['password'] ? validationErrors['password'] : 'Please provide a password.'}
              </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="passwordConfirmation">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control type="password" isInvalid={!!validationErrors['passwordConfirmation']}  required placeholder="Enter password again" />
              <Form.Control.Feedback type="invalid">
                {validationErrors['passwordConfirmation'] ? validationErrors['passwordConfirmation'] : 'Please re-enter the password.'}
              </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit" disabled={submitting ? true : false}>
            Update Password
          </Button>
      </Form>
      <FormErrors error={updateError} success={updateResult ? true : false} />
    </div>
  
  );
}
