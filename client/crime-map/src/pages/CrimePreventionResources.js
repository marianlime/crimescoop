import React, { useState, useEffect } from "react";

function CrimePreventionResources() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/resources')
      .then((response) => response.json())
      .then((data) => setLinks(data));
  }, []);

  return (
    <div id="resources-container">
      <h1>Looking for how to prevent a Crime?</h1>
      <ul>
        {links.map((link) => (
          <li key={link.id}>
           <a href={link.link} target="_blank" rel="noreferrer">
             {link.title}
           </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CrimePreventionResources;
