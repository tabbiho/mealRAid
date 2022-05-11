/* eslint-disable max-len */
import axios from 'axios';
import React, { useState } from 'react';
import 'regenerator-runtime/runtime';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import Account from './components/Account.jsx';
import Create from './components/Create.jsx';
import Edit from './components/Edit.jsx';
import RaidList from './components/RaidList.jsx';

export default function App() {
  const [login, setLogin] = useState(false);
  const [system, setSystem] = useState(false);
  const [postRights, setPostRights] = useState(false);
  const [page, setPage] = useState('home');
  const [editData, setEditData] = useState({});

  const checkLogin = async () => {
    const result = await axios.get('/users/checkLogin');

    if (result.data.login) {
      setLogin(true);
      if (result.data.system) {
        setSystem(true);
      }
      if (result.data.postRights) {
        setPostRights(true);
      }
    }
  };
  checkLogin();

  return (
    <>
      {login && <Navbar setLogin={setLogin} setSystem={setSystem} setPostRights={setPostRights} setPage={setPage} />}
      <div className="container bg-light rounded mt-5 mb-3 border shadow p-4">
        {!login && <Login setLogin={setLogin} setSystem={setSystem} setPostRights={setPostRights} setPage={setPage} />}

        {login && system && <Register />}
        {login && !system && page === 'home' && <Home postRights={postRights} setPage={setPage} setEditData={setEditData} />}
        {login && !system && page === 'raidList' && <RaidList />}
        {login && !system && page === 'edit' && <Edit editData={editData} setPage={setPage} />}
        {login && !system && page === 'account' && <Account />}
        {login && !system && postRights && page === 'create' && <Create setPage={setPage} />}
      </div>
    </>

  );
}
