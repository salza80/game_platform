import React from 'react';
import UpdateUserForm from '../updateUserForm'
import UpdateUserPasswordForm from '../updateUserPasswordForm'


export default function Profile() {
 
  return (
  		<div>
  			<h3>My Profile</h3>
  			<UpdateUserForm />

  			<UpdateUserPasswordForm />
  		</div>
  	)

}