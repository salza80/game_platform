import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './custom-bootstrap.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import {
  BrowserRouter as Router
} from "react-router-dom";

function logout() {
  localStorage.removeItem('token')
}

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL,
  request: (operation) => {
    const token = localStorage.getItem('token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  onError: (({ graphQLErrors, networkError, response, operation }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
    if (networkError) {
      if (networkError.statusCode === 401) {
        logout()
      } else {
        console.log(`[Network error]: ${networkError}`);
      }
    }
  })
})

client.defaultOptions = {
    query: {
      errorPolicy: 'all',
    },
  }

ReactDOM.render(
  <React.StrictMode>
  	<ApolloProvider client={client}>
	  	<Router>
	    	<App />
	    </Router>
	</ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

