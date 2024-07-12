import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const CrimeList = ({ data, modalVisible, setModalVisible }) => {
  const groupedCrimes = {};

  const handleClose = () => {
    setModalVisible(false);
  };

  data.crimes.forEach(crime => {
    const category = crime.category;
    if(groupedCrimes[category]){
      groupedCrimes[category].count++;
      groupedCrimes[category].crimes.push(crime);
    } else {
      groupedCrimes[category] = {
        count: 1,
        crimes: [crime]
      }
    }
  });

  return (
    <div className={`modal ${modalVisible ? "visible" : ""}`}>
      <div className="modal-content">
        <h3>Crime Safety Score: {data.crimeRating}</h3>
        <h3>Most repeated crime: {data.mostRepeatedCrime.replaceAll("-", " ")}</h3>
        {data.preventionLink.map((resource) => {
          return (
            <a key={resource.link} href={resource.link} target="_blank" rel="noreferrer">Prevent</a>
          );
        })}
        <div className="crimeList">
          <ul>
            {Object.keys(groupedCrimes).map((category) => (
              <ModalItem
              key={category}
              category={category}
              count={groupedCrimes[category].count}
              crimes={groupedCrimes[category].crimes}
            />
            )
            )}
          </ul>
        </div>
        <button className="close-button" onClick={handleClose}>Exit</button>
      </div>
    </div>
  );
};

const ModalItem = ({ category, count, crimes }) => {
  const [expanded, setExpanded] = useState(false);

  const handleCategoryClick = () => {
    setExpanded(!expanded);
  }

  const getLocationString = (crime) => {
    const location = crime.location.street.name;
    if (location.startsWith("On or near")) {
      const trimmedLocation = location.slice(10).trim();
      if (trimmedLocation === "") {
        return "No location data for this crime";
      } else {
        return trimmedLocation;
      }
    } else {
      return location;
    }
  };

  return (
    <li onClick={handleCategoryClick}>
      <div className="category-header">
        {expanded ? <FaChevronUp className="icon" /> : <FaChevronDown className="icon" />}
        <h3>{category.toUpperCase().replaceAll("-", " ")}</h3>        
      </div>
      {expanded ? <p></p> : <p className="crimes-count">Found {count} crimes</p>}
      {expanded && (
        <ol>
          {crimes.map((crime) => (
            <li key={crime.id}>
              <p>{getLocationString(crime)}</p>
              <p>{crime.month}</p>
            </li>
          ))}
        </ol>
      )}
    </li>
  );
};

export default CrimeList;
