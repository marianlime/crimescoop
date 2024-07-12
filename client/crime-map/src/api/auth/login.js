import {setToken, getToken} from "../../utils/HandleToken";

const login = async (email, password) => {
  try {
    if (getToken()) {
      return { error: "Already logged in, to proceed please log out first!"};
    }

    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      setToken(data.token);
      window.location.href = "/";
      return;
    } else {
      return data;
    }
  } catch (error) {
    return { error: "An error occurred, please try again later."};
  }
};

export default login;
