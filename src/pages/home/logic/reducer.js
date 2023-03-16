
import {axiosGet} from '@/utils/api';
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
export const getSlideAndMissionData = () => async (dispatch, getState) => {
  try {
    const urls = [
      'Campaign/getallclient',
      'Slider/getallclient'
    ];

    const [mission, slider] = await Promise.all(
      urls.map(url => axiosGet(url))
    );

    await dispatch(getMission(mission));
    await dispatch(getSlider(slider));
  } catch (error) {
    console.log(error);
  }
};

export const getVideoAndMiniGameData = () => async (dispatch, getState) => {
  try {
    const urls = [
      'Media/getallclient',
      'MiniGame/getallclient',
    ];

    const [videoRes, miniGameRes ] = await Promise.all(
      urls.map(url => axiosGet(url))
    );

    await dispatch(getVideo(videoRes));
    await dispatch(getMiniGame(miniGameRes));

  } catch (error) {
    console.log(error);
  }
};

export const getMatchDataThunkAction = () => async (dispatch, getState) => {
  try {
    const urls = [
      'Match/getallclient',
      'CategoriesMatch/getallclient',
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
