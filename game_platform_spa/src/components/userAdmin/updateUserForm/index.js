import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap'

import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { ME } from '../queries.js'
import { parseFormValidationErrors } from '../../helpers'
import FormErrors from '../../formErrors'

const UPDATE_USER = gql`
  mutation updateUser($displayName: String!) {
    updateUser(displayName: $displayName) {
      id
      email
      displayName
    }
  }
`;

export default function UpdateUserForm(props) {
  const [validated, setValidated] = useState(false);
  const [updateUser,  { error: updateError, loading: submitting, data: updateResult }] = useMutation(UPDATE_USER);
  const { loading, error, data } = useQuery(ME);
  let validationErrors = parseFormValidationErrors(updateError)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    setValidated(false)
    if (form.checkValidity()) { 
      updateUser(
        { variables:
          { 
            displayName: form.elements.displayName.value
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
            <Form.Control type="text" plaintext defaultValue={data.me.email} />
          </Form.Group>
          <Form.Group controlId="displayName">
            <Form.Label>Display name</Form.Label>
            <Form.Control type="text" isInvalid={!!validationErrors['displayName']} required placeholder="Enter a public display name" defaultValue={data.me.displayName} />
              <Form.Control.Feedback type="invalid">
                {validationErrors['displayName'] ? validationErrors['displayName'] : 'Please provide a name.'}
              </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit" disabled={submitting || loading ? true : false}>
            Update
          </Button>
      </Form>
      <FormErrors error={updateError} success={updateResult ? true : false} />
    </div>
  
  );
}

