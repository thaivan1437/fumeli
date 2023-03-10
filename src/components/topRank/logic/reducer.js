
import { axiosGet } from '@/utils/api';
import { getTopRank } from './action';

const initialState = {
  topRank: []
}

export const topRank = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_TOPRANK':
      return {
        ...state,
        topRank: action.payload,
      };
    default:
      return state
  }
}

// http://api-demowebsite.cdktcnqn.edu.vn/api/Match/getallclient
export const getTopRankDataThunkAction = () => async (dispatch, getState) => {
  try {
    const urls = [
      'http://api-demowebsite.cdktcnqn.edu.vn/api/UserFPoint/getallclient'
    ];

    const [topRank] = await Promise.all(
      urls.map(url => axiosGet(url))
    );

    await dispatch(getTopRank(topRank));
  } catch (error) {
    console.log(error);
  }
};

