import { axiosGet } from '@/utils/api'
import { getMatch, getMatchCategory } from './action'

const initialState = {
  matchCategory: [],
  match: []
}

export const match = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MATCH_CATEGORY':
      return { 
        ...state,
        matchCategory: action.payload
      }
    case 'GET_MATCH':
      return {
        ...state,
        match: action.payload,
      };
    default:
      return state
  }
}

export const getMatchDataThunkAction = () => async (dispatch, getState) => {
  try {
    const urls = [
      'http://api-demowebsite.cdktcnqn.edu.vn/api/Match/getallclient',
      'http://api-demowebsite.cdktcnqn.edu.vn/api/CategoriesMatch/getallclient',
    ];

    const [ matchRes, matchCategory ] = await Promise.all(
      urls.map(url => axiosGet(url))
    );

    await dispatch(getMatch(matchRes));
    await dispatch(getMatchCategory(matchCategory));
  } catch (error) {
    console.log(error);
  }
};