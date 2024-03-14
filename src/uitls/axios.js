import axios from "axios";

const API_KEY = process.env.REACT_APP_API;

export const submitSignUp = async (userData) => {
  try {
    const formData = new FormData();
    formData.append("signUp", JSON.stringify(userData));

    const postData = {
      signUp: userData,
    };

    const url = `${API_KEY}` + "/api/auth/sign-up";
    const res = await axios.post(url, formData);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const logIn = async (userData) => {
  try {
    const url = `${API_KEY}` + "/api/auth/sign-in";
    const res = await axios.post(url, userData);
    return res.data;
  } catch (error) {
    throw error;
  }
};
