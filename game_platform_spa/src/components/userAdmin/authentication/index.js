import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { ME } from '../queries.js'

// HOC

// Display ComponentWith when authenticated, and componentWithout when not authenticated

function withAuthentication(ComponentWith, ComponentWithout) {
  return function Me () {
    const { loading, error, data } = useQuery(ME);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    if (!data.me) return ( ComponentWithout ? <ComponentWithout /> : null)
    return (
      <ComponentWith me={data.me} />
    )
  }
}

//HOC

// Only display the component when the user is not authenticated

function withoutAuthentication(ComponentWithout) {
  return function Me () {
    const { loading, error, data } = useQuery(ME);

    if (loading) return null;
    if (error) return <p>Error :(</p>;
    if (data.me) return ( null )
    return (
      <ComponentWithout />
    )
  }
}

function WithAuthentication(props) {
  const { loading, error, data } = useQuery(ME);

  if (loading) return null;
  if (error) return <p>Error :(</p>;
  if (!data.me) return null;

   const updateChildrenWithProps = React.Children.map(
      props.children,
      (child, i) => {
        return React.cloneElement(child, {
          me: data.me,
          index: i
        });
      }
    );
  return ( 
    <React.Fragment>
      {updateChildrenWithProps}
    </React.Fragment>
  )
}

function WithoutAuthentication(props) {
  const { loading, error, data } = useQuery(ME);

  if (loading) return null;
  if (error) return <p>Error :(</p>;
  if (data.me) return null;

  return ( props.children )
}





export  { withAuthentication, withoutAuthentication, WithAuthentication, WithoutAuthentication }



