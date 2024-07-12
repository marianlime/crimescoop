export const fetchSearches = async (token) => {
  try {
    const response = await fetch("http://localhost:3001/searches", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};