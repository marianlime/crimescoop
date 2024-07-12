export const fetchForceDetails = async (force) => {
  try {
    const forceDetails = await fetch(
      `https://data.police.uk/api/forces/${force}`
    );
    const data = await forceDetails.json();
    return data;
  } catch (error) {
    return { error: error.message };
  }
};
