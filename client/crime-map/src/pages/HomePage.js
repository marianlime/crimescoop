import React, { useState } from "react";
import CrimeList from "../components/common/CrimeList";
import AddressForm from "../components/forms/AddressForm";
import Map from "../components/Map";
import { getToken } from "../utils/HandleToken";
import { fetchCrimeData, fetchGeocodeData, addSearch } from "../api/api.js";

const HomePage = () => {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: 51.5321389,
    lng: -0.4727493,
  });
  const [data, setData] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState(null);

  const showCrimes = async (event) => {
    event.preventDefault();
    try {
      const coords = await fetchGeocodeData(address);
      if (coords.error) {
        setError(coords.error);
        return;
      }
      setCoordinates(coords);
      const crimeData = await fetchCrimeData(coords);
      if (crimeData.error) {
        setError(crimeData.error);
        return;
      }
      if (crimeData) {
        setData(crimeData);
        setModalVisible(true);
        setError("");
      }
      if (getToken()) {
        addSearch(coords.lat, coords.lng, address);
      }
    } catch (error) {
      setError("An error occurred while geocoding the address.");
    }
  };

  return (
    <>
      <div className="main-container">
        <AddressForm
          address={address}
          setAddress={setAddress}
          handleSubmit={showCrimes}
          buttonName={"Show Crimes"}
          error={error}
        />
        {coordinates && <Map coordinates={coordinates} />}
      </div>
      {modalVisible && (
        <CrimeList
          data={data}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </>
  );
};

export default HomePage;
