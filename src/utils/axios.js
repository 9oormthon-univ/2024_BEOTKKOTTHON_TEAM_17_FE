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

export const logOut = async (token) => {
  try {
    const config = {
      method: "get",
      url: `${API_KEY}/api/auth/sign-out`,
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

export const findPassword = async (info) => {
  try {
    const url = `${API_KEY}/api/auth/reissuance-pw`;
    const res = await axios.post(url, info);
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
    const searchKeyword = searchData.trim();
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
    }
  } catch (error) {
    navigate("/");
  }
};

export const saveAdditionalInfoDetails = async (info, token) => {
  try {
    const config = {
      method: "patch",
      url: `${API_KEY}/api/card`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: info,
    };
    const res = await axios.request(config);
    return res;
  } catch (error) {
    throw error;
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

export const saveCustom = async (info, token) => {
  try {
    const config = {
      method: "patch",
      url: `${API_KEY}/api/card/color`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: info,
    };
    const res = await axios.request(config);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getCategoryList = async (token) => {
  try {
    const config = {
      method: "get",
      url: `${API_KEY}/api/card/category`,
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

export const getListCategoryInfo = async (token, categoryId) => {
  try {
    const config = {
      method: "get",
      url: `${API_KEY}/api/card/category/${categoryId}`,
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

export const getSearchCategoryInfo = async (token, categoryId, searchData) => {
  try {
    const searchKeyword = searchData.trim();
    const config = {
      method: "get",
      url: `${API_KEY}/api/card/category/${categoryId}?search=${searchKeyword}`,
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

export const createCategory = async (categoryName, token) => {
  try {
    const config = {
      method: "post",
      url: `${API_KEY}/api/card/category`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        categoryName,
      },
    };
    const res = await axios.request(config);
    return res;
  } catch (error) {
    throw error;
  }
};

export const deleteCategory = async (categoryId, token) => {
  try {
    const config = {
      method: "delete",
      url: `${API_KEY}/api/card/category/${categoryId}`,
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

export const getNotExistCard = async (categoryId, keyword, token) => {
  try {
    const config = {
      method: "get",
      url: `${API_KEY}/api/card/category/not-belong/${categoryId}?search=${keyword}`,
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

export const addCardsToCategory = async (categoryId, cardList, token) => {
  try {
    const config = {
      method: "post",
      url: `${API_KEY}/api/card/category/friend`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        categoryId: categoryId,
        cardIdList: cardList,
      },
    };
    console.log(config);
    const res = await axios.request(config);
    return res;
  } catch (error) {
    throw error;
  }
};

export const modCategoryName = async (categoryId, newName, token) => {
  try {
    const config = {
      method: "patch",
      url: `${API_KEY}/api/card/category/${categoryId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        categoryName: newName,
      },
    };
    console.log(config);
    const res = await axios.request(config);
    return res;
  } catch (error) {
    throw error;
  }
};
