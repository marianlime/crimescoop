import { getToken } from "../../utils/HandleToken";

export const removeSearch = async (id) => {
  try {
    const response = await fetch("http://localhost:3001/remove-search", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete search");
    }
    return response.json();
  } catch (error) {
    throw new Error("Error deleting search");
  }
};
