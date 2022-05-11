/* eslint-disable react/prop-types */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

export default function Home({ postRights, setPage, setEditData }) {
  const [userDetails, setUserDetails] = useState({});
  const [raidDetails, setRaidDetails] = useState([]);
  const [userRaidText, setUserRaidText] = useState({});
  const [currentRaidProgress, setCurrentRaidProgress] = useState({});
  const [maxRaidProgress, setMaxRaidProgress] = useState({});
  const [posterTag, setPosterTag] = useState({});
  const [inTag, setInTag] = useState({});
  const [expiredTag, setExpiredTag] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const handleJoin = async (raidId) => {
    const result = await axios.get(`/raids/join/${raidId}`);
    if (!result.data) {
      setErrorMessage('An error has occured. Please reload the page.');
      return;
    }
    const currentUserRaidText = { ...userRaidText };
    const currentProgress = { ...currentRaidProgress };
    const currentInTag = { ...inTag };

    if (currentUserRaidText[raidId] === 'Get me out!') {
      currentProgress[raidId] -= 1;
      currentUserRaidText[raidId] = 'Count me in!';
      currentInTag[raidId] = false;
    } else {
      currentProgress[raidId] += 1;
      currentUserRaidText[raidId] = 'Get me out!';
      currentInTag[raidId] = true;
    }
    setCurrentRaidProgress(currentProgress);
    setUserRaidText(currentUserRaidText);
    setInTag(currentInTag);
  };

  useEffect(() => {
    const initialState = async () => {
      const result = await axios.get('/raids/fetchRaidDetails');
      const { dataArr, user } = result.data;
      const usersInRaids = {};
      const initialCurrentRaidProgress = {};
      const initialMaxRaidProgress = {};
      const initialPosterTag = {};
      const initialInTag = {};
      const initialExpiredTag = {};

      const timeNow = moment().subtract(8, 'hours').format();

      dataArr.forEach((x) => {
        const currentUsers = x.users.map((y) => y.id);
        initialCurrentRaidProgress[x.id] = x.users.length;
        initialMaxRaidProgress[x.id] = x.pax;
        if (currentUsers.includes(user)) {
          usersInRaids[x.id] = 'Get me out!';
          initialInTag[x.id] = true;
        } else {
          usersInRaids[x.id] = 'Count me in!';
        }

        if (user === x.userId) {
          initialPosterTag[x.id] = true;
        }

        if (timeNow >= x.bestBy) {
          initialExpiredTag[x.id] = true;
        }
      });
      setUserRaidText(usersInRaids);
      setCurrentRaidProgress(initialCurrentRaidProgress);
      setMaxRaidProgress(initialMaxRaidProgress);
      setPosterTag(initialPosterTag);
      setInTag(initialInTag);
      setExpiredTag(initialExpiredTag);
    };
    initialState();
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const result = await axios.get('/users/fetchUserDetails');
      setUserDetails(result.data);
    };
    const fetchRaidDetails = async () => {
      const result = await axios.get('/raids/fetchRaidDetails');
      const { dataArr, user } = result.data;

      const raidsDisplay = dataArr.map((x) => (
        <div className="accordion-item" key={x.createdAt}>
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#id${x.id}`}>
              {x.name}
              {' '}
              (
              {x.pax}
              {' '}
              servings) - Posted
              {' '}
              {moment(x.createdAt).fromNow()}
              {posterTag[x.id] && <button className="btn btn-secondary btn-sm mx-2" disabled type="button">Posted by you</button>}
              {inTag[x.id] && <button className="btn btn-danger btn-sm mx-2" disabled type="button">RAid Joined</button>}
              {expiredTag[x.id] && <button className="btn btn-warning btn-sm mx-2" disabled type="button">Expired</button>}
            </button>
          </h2>
          <div id={`id${x.id}`} className="accordion-collapse collapse">
            <div className="accordion-body row">
              <div className="col-12 col-lg-7">
                Location:
                {' '}
                {x.location.location}
                <br />
                Best By:
                {' '}
                {`${moment(x.bestBy).format('Do MMM YYYY (h:mm A)')} - ${moment(x.bestBy).fromNow()}`}
                <br />
                Details:
                {' '}
                {x.detail}
                <br />
                Possible Allergens:
                {' '}
                {x.allergens.length ? x.allergens.map((y) => (<button key={y.id} className="btn btn-secondary btn-sm mx-1" type="button" disabled>{y.allergen}</button>)) : 'None'}
              </div>
              <div className="col mt-2">
                <img src={x.image} height="120" width="250" alt="Preview Img" className="rounded border shadow-sm" style={{ objectFit: 'cover' }} />
              </div>
              <div className="col-3">
                {x.userId === user ? (
                  <button
                    className="btn btn-success"
                    type="button"
                    onClick={() => {
                      setPage('edit');
                      setEditData(x);
                    }}
                    disabled={expiredTag[x.id]}
                  >
                    Edit
                  </button>
                ) : (
                  <button className="btn btn-danger" type="button" disabled={expiredTag[x.id] || (currentRaidProgress[x.id] === maxRaidProgress[x.id] && userRaidText[x.id] !== 'Get me out!')} onClick={() => handleJoin(x.id)}>
                    {userRaidText[x.id]}
                  </button>
                )}
              </div>
              <div className="col-4">
                <div className="progress">
                  <div className={`progress-bar ${currentRaidProgress[x.id] === maxRaidProgress[x.id] && userRaidText[x.id] !== 'Get me out!' ? 'bg-danger' : 'progress-bar-striped progress-bar-animated bg-success'}`} role="progressbar" style={{ width: `${(currentRaidProgress[x.id] / maxRaidProgress[x.id]) * 100}%` }}> </div>
                </div>
                <div className="fs-6 text-center">{`${currentRaidProgress[x.id]} / ${maxRaidProgress[x.id]} Servings RAided`}</div>
              </div>
            </div>
          </div>
        </div>
      ));

      setRaidDetails(raidsDisplay);
    };
    fetchUserDetails();
    fetchRaidDetails();
  }, [userRaidText, currentRaidProgress]);

  return (
    <div className="row">
      <div className="row mb-3">
        <div className="col-12 text-center col-lg-3 text-lg-start">
          <img src="/logos/instagram_profile_image.png" alt="Mini mealRAid logo" height="150" className="rounded mt-3 ms-3 d-none d-lg-block" />
          <img src="/logos/facebook_cover_photo_2.png" alt="mealRAid logo" height="130" className="rounded my-3 d-lg-none" />
        </div>
        <div className="col">
          <h1 className="text-center pt-lg-2 mb-3">Welcome to mealRAid!</h1>
          <div className="text-center">
            Logged in as:
            {' '}
            {userDetails.name}
            <br />
            Designation:
            {' '}
            {userDetails.designation}
            {' '}
            <br />
            Division:
            {' '}
            {userDetails.division}
          </div>
        </div>
        <div className="col-0 col-lg-3" />
      </div>
      <div className="row justify-content-center mb-4">
        <div className="col-6 btn-group-vertical" role="group">
          <button className="btn btn-warning border shadow" type="button" onClick={() => setPage('raidList')}>View Your Joined RAids</button>
          {postRights && <button className="btn btn-danger border shadow" onClick={() => setPage('create')} type="button">Create RAid</button>}
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-10">
          <h2 className="text-danger text-center">{errorMessage}</h2>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-10 col-lg-8">
          <div className="accordion">
            {raidDetails}
          </div>
        </div>
      </div>
    </div>
  );
}
