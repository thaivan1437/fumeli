import axios from 'axios'
export const api_host = 'https://api-demowebsite.cdktcnqn.edu.vn/api/';

export const axiosGet = async (url) => {
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

  const response = await axios.get(api_host + url, {
    headers,
    timeout: 60000 // đơn vị là milliseconds
  });
  return response.data;
};

export const axiosPost = async (url, data) => {
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

  const response = await axios.post(api_host + url, data, {
    headers,
    timeout: 60000 // đơn vị là milliseconds
  });

  return response;
};

const axiosInstance = axios.create({
  baseURL: 'https://api-demowebsite.cdktcnqn.edu.vn/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance
