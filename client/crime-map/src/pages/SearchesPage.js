import React, { useState, useEffect } from "react";
import { fetchCrimeData, fetchSearches, removeSearch  } from "../api/api";
import { getToken } from "../utils/HandleToken";
import CrimeList from "../components/common/CrimeList";

const token = getToken();

function Searches() {
  const [searches, setSearches] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    if (!token) {
      window.location.href = "/";
      return;
    }
  
    const fetchSearchesData = async () => {
      try {
        const searchesData = await fetchSearches(token);
        setSearches(searchesData);
      } catch (error) {
        alert(error.message);
      }
    };
    
    fetchSearchesData();
  }, []);

  const handleSeeCrimes = async (event, search) => {
    event.preventDefault();
    const coords = {
      lat: +search.lat,
      lng: +search.lng,
    };
    const crimeData = await fetchCrimeData(coords);
    if (crimeData) {
      setData(crimeData);
      setModalVisible(true);
    }
  };

  const handleDeleteSearch = async (id) => {
    try {
      const response = await removeSearch(id);
      if (response.affectedRows === 1) {
        window.location.reload();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className="searches-container">
        <div className="searches-header">
          <h2>Your search history</h2>
        </div>
        <div className="searches-list">
          {searches.map((search) => (
            <div key={search.id} className="card">
              <div className="card-header">
                <h3>{search.name.toUpperCase()}</h3>
              </div>
              <div className="card-content">
                <p>Latitude: {search.lat}</p>
                <p>Longitude: {search.lng}</p>
              </div>
              <div className="card-actions">
                <button onClick={(event) => handleSeeCrimes(event, search)}>
                  See crimes
                </button>
                <button
                  className="right-button"
                  onClick={() => handleDeleteSearch(search.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
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
}

export default Searches;
