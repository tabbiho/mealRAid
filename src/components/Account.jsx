/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Account() {
  const [emailDisplay, setEmailDisplay] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reconfirmPassword, setReconfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchEmail = async () => {
      const result = await axios.get('/users/fetchEmail');
      setEmailDisplay(result.data.email);
    };
    fetchEmail();
  }, []);

  const handleChangePassword = async () => {
    if (newPassword !== reconfirmPassword || !currentPassword || !newPassword || !reconfirmPassword) {
      setErrorMessage('Error, please verify above and try again!');
      return;
    }
    const data = {
      currentPassword,
      newPassword,
    };
    const result = await axios.post('/users/changePassword', data);

    if (result.data) {
      setSuccessMessage('Password Change Success!');
      setCurrentPassword('');
      setNewPassword('');
      setReconfirmPassword('');
      setErrorMessage('');
    } else {
      setErrorMessage('Error, please verify above and try again!');
      setSuccessMessage('');
    }
  };

  return (
    <div className="row">
      <div className="col-12 text-center col-lg-2 text-lg-start">
        <img src="/logos/instagram_profile_image.png" alt="Mini mealRAid logo" height="150" className="rounded mt-3 ms-3 d-none d-lg-block" />
        <img src="/logos/facebook_cover_photo_2.png" alt="mealRAid logo" height="130" className="frontLogo rounded my-3 d-lg-none" />
      </div>
      <div className="col">
        <div className="row">
          <div className="col">
            <h2 className="text-center">Change your Password</h2>
          </div>
        </div>
        <div className="row justify-content-center mt-3 mb-5">
          <div className="col col-lg-6">
            <label className="form-label" htmlFor="email">Email Address</label>
            <input className="form-control" type="email" id="email" value={emailDisplay} disabled />
          </div>
        </div>
        <div className="row justify-content-center mt-2 mb-2">
          <div className="col col-lg-6">
            <label className="form-label" htmlFor="currentPassword">Current Password</label>
            <input className="form-control" type="password" id="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
          </div>
        </div>
        <div className="row justify-content-center mt-2 mb-2">
          <div className="col col-lg-6">
            <label className="form-label" htmlFor="newPassword">New Password</label>
            <input className="form-control" type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </div>
        </div>
        <div className="row justify-content-center mt-2 mb-1">
          <div className="col col-lg-6">
            <label className="form-label" htmlFor="reconfirmPassword">Reconfirm New Password</label>
            <input className="form-control" type="password" id="reconfirmPassword" value={reconfirmPassword} onChange={(e) => setReconfirmPassword(e.target.value)} />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col col-lg-6">
            <span className="text-danger">{errorMessage}</span>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col col-lg-6">
            <span className="text-success">{successMessage}</span>
          </div>
        </div>
        <div className="row justify-content-center mt-3 mb-2">
          <div className="col col-lg-6">
            <button type="button" className="btn btn-success float-end" onClick={handleChangePassword}>Change Password</button>
          </div>
        </div>
      </div>
      <div className="col-0 col-lg-2" />
    </div>
  );
}
