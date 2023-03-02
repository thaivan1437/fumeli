
import {axiosGet} from '../../../utils/api';
import { getMatch, getVideo, getMiniGame, getMission, getMatchCategory, getSlider } from './action';

const initialState = {
  match: [],
  video: [],
  miniGame: [],
  mission: [],
  matchCategory: [],
  slider: []
}

export const home = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MISSION':
      return { 
        ...state,
        mission: action.payload
      }
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
    case 'GET_VIDEO':
      return {
        ...state,
        video: action.payload,
      };
    case 'GET_MINIGAME':
      return {
        ...state,
        miniGame: action.payload,
      };
    case 'GET_SLIDER':
      return {
        ...state,
        slider: action.payload,
      };
    default:
      return state
  }
}

// http://api-demowebsite.cdktcnqn.edu.vn/api/Match/getallclient
export const getAllDataThunkAction = (signal = {}) => async (dispatch, getState) => {
  try {
    const urls = [
      'http://api-demowebsite.cdktcnqn.edu.vn/api/Match/getallclient',
      'http://api-demowebsite.cdktcnqn.edu.vn/api/Media/getallclient',
      'http://api-demowebsite.cdktcnqn.edu.vn/api/MiniGame/getallclient',
      'http://api-demowebsite.cdktcnqn.edu.vn/api/Campaign/getallclient',
      'http://api-demowebsite.cdktcnqn.edu.vn/api/CategoriesMatch/getallclient',
      'http://api-demowebsite.cdktcnqn.edu.vn/api/Slider/getallclient'
    ];

    const [matchRes, videoRes, miniGameRes, mission, matchCategory, slider] = await Promise.all(
      urls.map(url => axiosGet(url, signal))
    );

    await dispatch(getMatch(matchRes));
    await dispatch(getVideo(videoRes));
    await dispatch(getMiniGame(miniGameRes));
    await dispatch(getMission(mission));
    await dispatch(getMatchCategory(matchCategory));
    await dispatch(getSlider(slider));
  } catch (error) {
    console.log(error);
  }
};

