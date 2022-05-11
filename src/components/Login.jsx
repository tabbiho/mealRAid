/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from 'axios';
import React, { useState } from 'react';

export default function Login({
  setLogin, setSystem, setPostRights, setPage,
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    const result = await axios.post('/users/login', { email, password });
    if (result.data.login) {
      setLogin(true);
      setPage('home');
      if (result.data.system) {
        setSystem(true);
      }
      if (result.data.postRights) {
        setPostRights(true);
      }
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid login details');
    }
  };

  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-10 col-md-8 col-lg-6 text-center">
          <img src="/logos/facebook_cover_photo_2.png" alt="mealRAid logo" height="150" className="frontLogo rounded my-3" />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <h2 className="text-center">Login Page</h2>
        </div>
      </div>
      <div className="row justify-content-center mt-2 mb-3">
        <div className="col col-lg-6">
          <label className="form-label" htmlFor="email">Email Address</label>
          <input className="form-control" type="email" id="email" name="email" onChange={(e) => { setEmail(e.target.value); }} />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col col-lg-6">
          <label className="form-label" htmlFor="password">Password</label>
          <input className="form-control" type="password" id="password" name="password" onChange={(e) => { setPassword(e.target.value); }} />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col col-lg-6">
          <span className="text-danger">{errorMessage}</span>
        </div>
      </div>
      <div className="row justify-content-center mt-4 mb-5">
        <div className="col col-lg-6">
          <button type="button" className="btn btn-success float-end" onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}
