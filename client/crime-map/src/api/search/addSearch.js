import { getToken } from "../../utils/HandleToken";

export const addSearch = async (lat, lng, address) => {
  await fetch("http://localhost:3001/track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      lat,
      lng,
      address,
    }),
  });
};
