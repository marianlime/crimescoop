export const fetchForceID = async (coords) => {
  try {
    const force = await fetch(
      `https://data.police.uk/api/locate-neighbourhood?q=${coords.lat},${coords.lng}`
    );
    const data = await force.json();
    return data.force;
  } catch (error) {
    return { error: error.message };
  }
};
