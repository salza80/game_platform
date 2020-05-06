import React from 'react';
import gql from 'graphql-tag';
import { ME } from '../queries.js'
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  useHistory
} from "react-router-dom";

const LOGOUT = gql`
  mutation logout {
    logout
  }
`;

export default function Logout() {
  const { refetch } = useQuery(ME);
  const history = useHistory();
  const onLogoutCompeted = (data) => {
    localStorage.removeItem('token')
    refetch()
    history.push("/");
  }
  const [logout, { loading, error }] = useMutation(LOGOUT, { onCompleted: onLogoutCompeted});

  if (loading) return <div>Logging out</div>
  if (error) return <div>Error</div>

  if (localStorage.getItem('token')) { logout() }
  
  return (
    <div>You have been logged out</div>
  );
}
