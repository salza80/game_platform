import React from 'react';
import {
  Route,
  Redirect
} from "react-router-dom";
import { ME } from '../userAdmin/queries.js'
import { useQuery } from '@apollo/react-hooks';

export default function PrivateRoute({ children, redirectTo, ...rest }) {
  const { loading, error, data } = useQuery(ME);

  if (loading) return null
  if (error) return null
  return (
    <Route
      {...rest}
      render={({ location }) =>
        data && data.me ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: redirectTo ? redirectTo : "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}