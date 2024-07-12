import React, { useState, useEffect } from "react";
import AddressForm from "../components/forms/AddressForm"
import { useNavigate } from 'react-router-dom';
import { fetchGeocodeData, fetchForceID, fetchForceDetails } from "../api/api";


const Authorities = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [policeForces, setPoliceForces] = useState([]);

  const showForceDetails = async (event, forceID = null) => {
    event.preventDefault();
    if(!forceID) {
      try {
        const coords = await fetchGeocodeData(address);
        if (coords.error) {
          setError(coords.error);
          return;
        }
        forceID = await fetchForceID(coords);
        if (forceID.error) {
          setError("Force not found, please ensure location is in the UK.")
          return;
        }
      } catch (error) {
        setError("An error occurred while geocoding the address.");
        return;
      }
    }
    const forceDetails = await fetchForceDetails(forceID);
    navigate(`/authorities/${forceDetails.id}`, { state: { forceDetails } });
  };

  useEffect(() => {
    fetch('https://data.police.uk/api/forces')
      .then(response => response.json())
      .then(data => setPoliceForces(data));
  }, []);

  return (
    <>
      <AddressForm
        address={address}
        setAddress={setAddress}
        handleSubmit={showForceDetails}
        buttonName={"Find Your Force"}
        error={error}
      />
      <div className="grid-container">
      {policeForces.map(policeForce => (
        <div key={policeForce.id} className="card">
          <div className="card-header">
            <h3>{policeForce.name}</h3>
          </div>
          <div className="card-actions">
            <button onClick={(event) => {showForceDetails(event, policeForce.id)}}>Show Details</button>
          </div>
        </div>
      ))}
    </div>
  </>
  );
};

export default Authorities;
