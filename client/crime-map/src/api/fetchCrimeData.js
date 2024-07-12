export const fetchCrimeData = async (coordinates) => {
  try {
    const response = await fetch("http://localhost:3001/coordinates", {
      method: "POST",
      body: JSON.stringify(coordinates),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    if (!responseData.crimes || responseData.crimes.length === 0) {
      throw new Error("No crime data found for this location.");
    }
    return responseData;
  } catch (error) {
    return { error: error.message };
  }
};