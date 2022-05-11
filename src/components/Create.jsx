/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Create({ setPage }) {
  const [locations, setLocations] = useState(null);
  const [allergens, setAllergens] = useState(null);

  const [raidName, setRaidName] = useState('');
  const [raidServings, setRaidServings] = useState(0);
  const [raidBestBy, setRaidBestBy] = useState('');
  const [raidLocation, setRaidLocation] = useState(0);
  const [raidAllergens, setRaidAllergens] = useState([]);
  const [raidDetails, setRaidDetails] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      const result = await axios.get('/locations/index');
      const locationsOptions = result.data.map((x) => (
        <option value={x.id} key={x.id}>{x.location}</option>
      ));
      setLocations(locationsOptions);
    };
    const fetchAllergens = async () => {
      const result = await axios.get('/allergens/index');
      const allergensOptions = result.data.map((x) => (
        <>
          <input
            type="checkbox"
            className="btn-check"
            id={x.allergen}
            key={x.id}
            autoComplete="off"
            onClick={() => {
              setRaidAllergens((prev) => {
                const existingAllergens = [...prev];
                if (existingAllergens.includes(x.id)) {
                  existingAllergens.splice(existingAllergens.indexOf(x.id), 1);
                } else {
                  existingAllergens.push(x.id);
                }
                return existingAllergens;
              });
            }}
          />
          <label className="btn btn-outline-secondary mx-1" htmlFor={x.allergen}>{x.allergen}</label>
        </>
      ));
      setAllergens(allergensOptions);
    };
    fetchLocations();
    fetchAllergens();
  }, []);

  const handleSubmit = async () => {
    const data = new FormData();
    data.append('name', raidName);
    data.append('pax', raidServings);
    data.append('bestBy', raidBestBy);
    data.append('locationId', raidLocation);
    data.append('allergens', raidAllergens);
    data.append('detail', raidDetails);
    data.append('file', image);
    const result = await axios.post('/raids/submit', data);
    if (result) {
      setPage('home');
    }
  };

  return (
    <div className="row">
      <div className="col-12 text-center col-lg-3 text-lg-start">
        <img src="/logos/instagram_profile_image.png" alt="Mini mealRAid logo" height="150" className="rounded mt-3 ms-3 d-none d-lg-block" />
        <img src="/logos/facebook_cover_photo_2.png" alt="mealRAid logo" height="130" className="rounded my-3 d-lg-none" />
      </div>
      <div className="col">
        <div className="row mb-2">
          <div className="col">
            <h2 className="text-center">Create New RAid</h2>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <label htmlFor="raidName" className="form-label">RAid Name</label>
            <input className="form-control" id="raidName" type="text" onChange={(e) => setRaidName(e.target.value)} />
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <label htmlFor="servings" className="form-label">Estimated No. of Servings</label>
            <input className="form-control" id="servings" type="number" min="1" onChange={(e) => setRaidServings(e.target.value)} />
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <label htmlFor="bestBy" className="form-label">Best By (Date / Time)</label>
            <input className="form-control" id="bestBy" type="datetime-local" onChange={(e) => setRaidBestBy(e.target.value)} />
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <label htmlFor="location" className="form-label">Collection Location</label>
            <select className="form-select" id="location" onChange={(e) => setRaidLocation(e.target.value)}>
              <option disabled selected>Select a location</option>
              {locations}
            </select>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <label className="form-label">Allergens Present (Select all that apply)</label>
            <br />
            {allergens}
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <label htmlFor="details" className="form-label">Additional Details</label>
            <textarea className="form-control" id="details" rows="2" onChange={(e) => setRaidDetails(e.target.value)} />
          </div>
        </div>
        <div className="row mb-2">
          <div className="col mb-5">
            <label htmlFor="imgUpload" className="form-label">Upload RAid Image</label>
            <input className="form-control" type="file" id="imgUpload" onChange={(e) => setImage(e.target.files[0])} />

          </div>
          <div className="col text-center">
            {image && <img src={URL.createObjectURL(image)} height="120" width="250" alt="Preview Img" className="rounded border shadow-sm" style={{ objectFit: 'cover' }} />}
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button className="btn btn-danger" type="button" onClick={handleSubmit}>Create RAid</button>
          </div>
        </div>
      </div>
      <div className="col-0 col-lg-3" />
    </div>
  );
}
