import axios from 'axios'
const api_host = 'http://api-demowebsite.cdktcnqn.edu.vn/api/';
export const axiosGet = async (url) => {
  const response = await axios.get(api_host + url, {
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 60000 // đơn vị là milliseconds
  });
  return response.data;
};

export const axiosPost = async (url, data) => {
  const response = await axios.post(api_host + url,data, {
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 60000 // đơn vị là milliseconds
  });
  return response;
};

const axiosInstance = axios.create({
  baseURL: 'http://api-demowebsite.cdktcnqn.edu.vn/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance
