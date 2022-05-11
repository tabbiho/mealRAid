/* eslint-disable react/prop-types */
import axios from 'axios';
import React from 'react';

export default function Navbar({
  setLogin, setSystem, setPostRights, setPage,
}) {
  const handleLogout = async () => {
    await axios.get('/users/logout');
    setLogin(false);
    setSystem(false);
    setPostRights(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow-sm sticky-top p-2">
      <button
        className="navbar-toggler me-3"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#toggleMenu"
        aria-controls="toggleMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="toggleMenu">
        <ul className="navbar-nav ms-auto text-center">
          <li>
            <button className="btn nav-link" type="button" onClick={() => setPage('home')}>Home</button>
          </li>
          <li>
            <button className="btn nav-link" type="button" onClick={() => setPage('account')}>Account</button>
          </li>
          <li className="text-center">
            <button className="btn nav-link" type="button" onClick={(handleLogout)}>Logout</button>
          </li>
        </ul>
      </div>
    </nav>

  );
}
