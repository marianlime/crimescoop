const API_KEY = "AIzaSyAvVe7UvKi81ftIQ1ZwoSGtalZoNLM3Ty0";

export const fetchGeocodeData = async (address) => {
  try {
    const geocodeData = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${API_KEY}`
    );
    if (!geocodeData.ok) {
      throw new Error(`Bad request: ${geocodeData.status}`);
    }

    const responseData = await geocodeData.json();
    if (
      responseData.results.length === 0 ||
      !responseData.results[0].geometry
    ) {
      throw new Error("Please correct address or try another one!");
    }

    const { lat, lng } = responseData.results[0].geometry.location;
    return { lat, lng };
  } catch (error) {
    return { error: error.message };
  }
};
