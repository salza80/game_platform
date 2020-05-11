import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap'

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import FormErrors from '../../formErrors'

const RESET_PASSWORD = gql`
  mutation sendResetPasswordInstructions($email: String!) {
    sendResetPasswordInstructions(email: $email)
  }
`;

export default function ResetPasswordForm(props) {
  const [validated, setValidated] = useState(false);
  const [resetPassword,  { error: resetPasswordError, loading: submitting, data: resetPasswordResult }] = useMutation(RESET_PASSWORD);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    setValidated(false)
    if (form.checkValidity()) { 
      resetPassword(
        { variables:
          { 
            email: form.elements.email.value
          }
        }
      ).catch(e => {})
    } else { setValidated(true)}

  };

  return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" required placeholder="Enter the account email address"  />
            <Form.Control.Feedback type="invalid">
                Please enter the account email address.
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit" disabled={submitting ? true : false}>
            Send Reset Password Instructions
          </Button>
      </Form>
      <FormErrors error={resetPasswordError} success={resetPasswordResult ? true : false} successMessage="An email will be sent shortly with instructions to reset your password."/>
    </div>
  
  );
}

