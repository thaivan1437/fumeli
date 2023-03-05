import axios from 'axios'
export const axiosGet = async (url) => {
  const response = await axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.data
}

const axiosInstance = axios.create({
  baseURL: 'http://api-demowebsite.cdktcnqn.edu.vn/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default axiosInstance
