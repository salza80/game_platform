import React from 'react';
import {
  Link
} from "react-router-dom";

class Games extends React.Component {
  render() {
    return (
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link" to='/games/falling-text'>
            <span data-feather="home"></span>
              Falling Text
          </Link>
        </li>
      </ul>
    )
  }
}

export default Games

