import axios from 'axios';

export const axiosGet = async (url) => {
  const response = await axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'no-cors',
    withCredentials: false,
		credentials: 'same-origin',
  });
  return response.data;
}
