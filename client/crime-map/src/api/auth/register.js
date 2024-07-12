import { getToken } from "../../utils/HandleToken";

const register = async (name, email, password) => {
  try {
    if (!name || !email || !password) {
      return {error: "Name, email, and password are required fields."};
    }

    if (getToken()) {
      return {error: "Already logged in, to proceed please log out first!"};
    }

    const response = await fetch("http://localhost:3001/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    return data;

  } catch (error) {
    return {error: "An error occurred, please try again later."};
  }
};

export default register;
