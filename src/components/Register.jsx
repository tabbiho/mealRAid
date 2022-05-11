/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import jsSHA from 'jssha';
import axios from 'axios';

const generateRandomPassword = () => Math.random().toString(36).slice(2, 10);

const getHash = (str) => {
  // eslint-disable-next-line new-cap
  const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
  shaObj.update(str);
  const hash = shaObj.getHash('HEX');
  return hash;
};

const SALT = 'meal';

export default function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [division, setDivision] = useState('');
  const [postRights, setPostRights] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    if (!email || !name || !designation || !division) {
      setErrorMessage('Please ensure all above fields are filled!');
      return;
    }

    const password = generateRandomPassword();
    const params = {
      email,
      name,
      password,
    };

    const serviceId = 'service_1usrcnj';
    const templateId = 'template_b6un56v';
    const publicKey = 'f6wfRL6CNHFA-iFOH';

    const data = {
      email,
      password: getHash(`${password}-${SALT}`),
      name,
      designation,
      division,
      system: false,
      postRights,
    };

    const result = await axios.post('/users/register', data);

    if (result.data) {
      emailjs.send(serviceId, templateId, params, publicKey);
      setEmail('');
      setName('');
      setDesignation('');
      setDivision('');
      setPostRights(false);
    } else {
      setErrorMessage('Error! Please verify above information!');
    }
  };

  return (
    <div>
      <div className="row mb-4">
        <div className="col">
          <h2 className="text-center">System Administrator</h2>
          <h6 className="text-muted text-center">New User Creation</h6>
        </div>
      </div>
      <div className="row justify-content-center mb-3">
        <div className="col col-lg-6">
          <label className="form-label" htmlFor="email">Email Address</label>
          <input className="form-control" type="email" id="email" name="email" value={email} onChange={(e) => { setEmail(e.target.value); }} />
        </div>
      </div>
      <div className="row justify-content-center mb-3">
        <div className="col col-lg-6">
          <label className="form-label" htmlFor="name">Name</label>
          <input className="form-control" type="name" id="name" name="name" value={name} onChange={(e) => { setName(e.target.value); }} />
        </div>
      </div>
      <div className="row justify-content-center mb-3">
        <div className="col col-lg-6">
          <label className="form-label" htmlFor="designation">Designation</label>
          <input className="form-control" type="designation" id="designation" name="designation" value={designation} onChange={(e) => { setDesignation(e.target.value); }} />
        </div>
      </div>
      <div className="row justify-content-center mb-3">
        <div className="col col-lg-6">
          <label className="form-label" htmlFor="division">Division</label>
          <input className="form-control" type="division" id="division" name="division" value={division} onChange={(e) => { setDivision(e.target.value); }} />
        </div>
      </div>
      <div className="row justify-content-center mb-3">
        <div className="col col-lg-6">
          <div className="row">
            <div className="col">
              <span className="text-danger">{errorMessage}</span>
            </div>
            <div className="col">
              <div className="form-check float-end">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="postingRights"
                  checked={postRights}
                  onChange={() => {
                    if (postRights) {
                      setPostRights(false);
                    } else {
                      setPostRights(true);
                    }
                  }}
                />
                <label className="form-check-label" htmlFor="postingRights">
                  Posting Rights
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center mt-4 mb-3">
        <div className="col col-lg-6">
          <button type="button" className="btn btn-danger float-end" data-bs-toggle="modal" data-bs-target="#confirmModal">Register New User</button>
        </div>
      </div>

      <div className="modal fade" id="confirmModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="confirmModalLabel">Confirm Registration</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              Confirm
              {' '}
              <strong>
                {email}
              </strong>
              {' '}
              is accurate?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-warning" onClick={handleRegister} data-bs-dismiss="modal">Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
