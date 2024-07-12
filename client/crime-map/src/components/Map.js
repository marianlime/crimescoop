import React from "react";

const Map = ({ coordinates }) => {
  const src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyAvVe7UvKi81ftIQ1ZwoSGtalZoNLM3Ty0&q=${coordinates.lat},${coordinates.lng}`;

  return (
    <div style={{ height: "81.7vh", overflow: "hidden" }}>
      <iframe
        title={"map"}
        src={src}
        width={"100%"}
        height={"100%"}
        style={{ border: 0 }}
        allowFullScreen
        aria-hidden={false}
        tabIndex={0}
      />
    </div>
  );
};

export default Map;
