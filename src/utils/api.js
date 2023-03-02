import axios from 'axios';

export const axiosGet = async (url, options = {}) => {
  const { signal, ...otherOptions } = options;

  // Tạo một instance của AbortController và sử dụng signal cho request
  const abortController = new AbortController();
  const requestOptions = {
    ...otherOptions,
    signal: signal || abortController.signal
  }

  try {
    const response = await axios(url, requestOptions);
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request was cancelled', error.message);
    } else {
      console.log('Error in API call', error.message);
    }
    throw error;
  } finally {
    // Huỷ request nếu không được sử dụng
    if (!signal) {
      abortController.abort();
    }
  }
}
