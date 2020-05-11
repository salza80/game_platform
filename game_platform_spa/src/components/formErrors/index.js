import React from 'react'
import { Alert } from 'react-bootstrap'
import FlashAlert from '../flashAlert'

export default function FormErrors(props) {


	return (
  	<div className='mt-3'>
      {props.error && props.error.graphQLErrors && props.error.graphQLErrors.map(({ message }, i) => (
        <Alert key={i} variant={'warning'}>{message}</Alert>
      ))}
      {props.success &&  <FlashAlert variant={'success'}>{props.successMessage ? props.successMessage : 'Successfully Updated!'}</FlashAlert>}
    </div>
  )
}