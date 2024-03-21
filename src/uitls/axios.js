import axios from "axios";

const API_KEY = process.env.REACT_APP_API;

export const submitSignUp = async (userData, setCookie) => {
  try {
    const url = `${API_KEY}` + "/api/auth/sign-up";
    const config = {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };
    const res = await axios.post(url, userData, config);
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

export const isValidToken = async (token) => {
  try {
    const config = {
      method: "get",
      url: `${API_KEY}/api/auth/validation-jwt`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.request(config);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getMyInfo = async (token) => {
  try {
    const config = {
      method: "get",
      url: `${API_KEY}/api/card`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.request(config);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getListInfo = async (token) => {
  try {
    const config = {
      method: "get",
      url: `${API_KEY}/api/card/list`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.request(config);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getSearchInfo = async (token, searchData) => {
  try {
    const searchKeyword = encodeURIComponent(searchData.trim()); // 한글이나 특수문자를 URL 안전한 형태로 인코딩
    const config = {
      method: "get",
      url: `${API_KEY}/api/card/list?search=${searchKeyword}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.request(config);
    return res;
  } catch (error) {
    throw error;
  }
};

export const subscribeCard = async (memberId, navigate, token) => {
  try {
    const config = {
      method: "post",
      url: `${API_KEY}/api/card/save/${memberId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.request(config);
    if (res.status === 200) {
      navigate("/mycards");
      console.log(res.data);
    }
  } catch (error) {
    navigate("/mypage");
    console.log("실패");
  }
};

export const deleteCard = async (memberId, token) => {
  try {
    const config = {
      method: "delete",
      url: `${API_KEY}/api/card/${memberId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.request(config);
    if (res.status === 200) {
      console.log(res.data);
      window.location.reload();
    }
  } catch (error) {
    console.log("실패");
    window.location.reload();
  }
};
