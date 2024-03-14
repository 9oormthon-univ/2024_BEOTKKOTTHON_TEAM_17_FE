import axios from "axios";

const API_KEY = process.env.REACT_APP_API;

export const submitSignUp = async (userData, setCookie) => {
  try {
    const formData = new FormData();
    formData.append("signUp", JSON.stringify(userData));

    const url = `${API_KEY}` + "/api/auth/sign-up";
    const res = await axios.post(url, formData);
    const token = res.headers.authorization;
    setCookie("jwt-token", token, { path: "/", secure: true });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const logIn = async (userData, setCookie) => {
  try {
    const url = `${API_KEY}` + "/api/auth/sign-in";
    const res = await axios.post(url, userData);
    const token = res.headers.authorization;
    setCookie("jwt-token", token, { path: "/", secure: true });
    return res.data;
  } catch (error) {
    throw error;
  }
};
