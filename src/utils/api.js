import axios from 'axios';

export const axiosGet = async (url) => {
  const response = await axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 30000 // đơn vị là milliseconds
  });
  return response.data;
}
