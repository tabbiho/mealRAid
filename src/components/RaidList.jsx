import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

export default function RaidList() {
  const [userRaids, setUserRaids] = useState([]);
  useEffect(() => {
    const initialStates = async () => {
      const result = await axios.get('/raids/fetchUserRaids');
      const raidsDisplay = result.data.map((x) => (
        <li className="list-group-item p-3" key={`id${x.id}`}>
          <div className="row">
            <div className="col">
              <div className="row">
                <h5>{x.name}</h5>
              </div>
              <div className="row">
                <div className="col ms-3">
                  <div className="row">
                    Location:
                    {' '}
                    {x.location.location}
                  </div>
                  <div className="row">
                    Best By:
                    {' '}
                    {`${moment(x.bestBy).format('Do MMM YYYY (h:mm A)')} - ${moment(x.bestBy).fromNow()}`}
                  </div>
                </div>
              </div>

            </div>
            <div className="col-4">
              <img src={x.image} height="120" width="180" alt="Preview Img" className="rounded border shadow-sm" style={{ objectFit: 'cover' }} />
            </div>
          </div>

        </li>
      ));

      setUserRaids(raidsDisplay);
    };
    initialStates();
  }, []);

  return (
    <div className="row">
      <div className="col-12 text-center col-lg-3 text-lg-start">
        <img src="/logos/instagram_profile_image.png" alt="Mini mealRAid logo" height="150" className="rounded mt-3 ms-3 d-none d-lg-block" />
        <img src="/logos/facebook_cover_photo_2.png" alt="mealRAid logo" height="130" className="rounded my-3 d-lg-none" />
      </div>
      <div className="col">
        <div className="row mb-2">
          <div className="col">
            <h2 className="text-center">List of your Joined RAids</h2>
          </div>
        </div>
        <div className="row mt-5">
          <ul className="list-group">
            {userRaids.length !== 0 ? userRaids : (<li className="list-group-item list-group-item-secondary text-center">You do not have any RAids ongoing. RAid on!</li>)}
          </ul>
        </div>
      </div>
      <div className="col-0 col-lg-3" />
    </div>
  );
}
