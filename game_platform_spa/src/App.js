import React from 'react';
import { Helmet } from 'react-helmet';
// import logo from './logo.svg';
import Layout from './core/layout'
import './App.css';

function App() {
  return (
    <React.Fragment>
      <Helmet>
        <title>German Games</title>
          <meta name="description" content="Learn German with Games!" />
          <meta property="og:url" content="https://deutsch.games" />
          <meta property="og:title" content="Deutsch Games!" />
          <meta property="og:description" content="Learn German with Games!" />
          <meda property="og:image" content="https://deutsch.games/spa/logo512.png" />
        </Helmet>
      <Layout />
    </React.Fragment>
  );
}

export default App;
