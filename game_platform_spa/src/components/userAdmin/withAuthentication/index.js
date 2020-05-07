import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { ME } from '../queries.js'

function withAuthentication(ComponentWith, ComponentWithout) {
  return function Me () {
	  const { loading, error, data } = useQuery(ME);

	  if (loading) return <p>Loading...</p>;
	  if (error) return <p>Error :(</p>;
	  if (!data.me) return (<ComponentWithout />)
	  return (
	    <ComponentWith me={data.me} />
	  )
	}
}

export default withAuthentication
