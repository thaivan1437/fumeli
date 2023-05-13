import axios from 'axios'
import { loginAction, openLoginModal } from '@/components/auth/logic/action'
import { getConfigUrl } from './getConfig';

async function myFunction() {
  const configData = await getConfigUrl();
  if (configData) {
    return configData
  } else {
    return { apiHost: process.env.apiHost }
  }
}

export const axiosGet = async (url, dispatch) => {
  let user;
  const api_host = await myFunction();
  if (typeof localStorage !== 'undefined') {
    user = JSON.parse(localStorage.getItem("user"));
  }
  const token = user && user.access_token; // lấy token từ local storage
  let headers = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`; // thêm header Authorization nếu có token
  }

  try {
    const response = await axios.get(api_host + url, {
      headers,
      timeout: 60000 // đơn vị là milliseconds
    });
    return response.data;
  } catch (error) {
    if (error?.response?.status == 401) {
      // need show modal token expired
      await dispatch(loginAction());
      dispatch(openLoginModal());
      localStorage.setItem("user", JSON.stringify(''));
    }
  }
};

export const axiosPost = async (url, data, dispatch) => {
  const api_host = await myFunction();
  let user;
  if (typeof localStorage !== 'undefined') {
    user = JSON.parse(localStorage.getItem("user"));
  }
  const token = user && user.access_token; // lấy token từ local storage
  let headers = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`; // thêm header Authorization nếu có token
  }

  try {
    const response = await axios.post(api_host + url, data, {
      headers,
      timeout: 60000 // đơn vị là milliseconds
    });
    return response.data;
  } catch (error) {
    if (error?.response?.status == 401) {
      // need show modal token expired
      await dispatch(loginAction());
      dispatch(openLoginModal());
      localStorage.setItem("user", JSON.stringify(''));
    }
    return error?.response;
  }
};

const axiosInstance = axios.create({
  baseURL: '',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

async function setBaseURL() {
  const baseURL = await myFunction();
  axiosInstance.defaults.baseURL = baseURL;
}

setBaseURL();
export { axiosInstance };

