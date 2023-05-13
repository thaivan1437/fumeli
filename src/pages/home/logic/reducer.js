
import {axiosGet} from '@/utils/api';
import { getMatch, getVideo, getMiniGame, getMission, getMatchCategory, getSlider, getConfigMission } from './action';
import { startLoading, stopLoading  } from '../../action';

const initialState = {
  match: [],
  video: [],
  miniGame: [],
  mission: [],
  matchCategory: [],
  slider: [],
  configMission: []
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
    case 'GET_CONFIG_MISSION':
      return {
        ...state,
        configMission: action.payload,
      };
    default:
      return state
  }
}

// http://api-demowebsite.cdktcnqn.edu.vn/api/Match/getallclient
export const getSlideAndMissionData = () => async (dispatch, getState) => {
  try {
    dispatch(startLoading());
    const urls = [
      'api/Campaign/getallclient',
      'api/Slider/getallclient',
      'api/config',
    ];

    const [mission, slider, configMission] = await Promise.all(
      urls.map(url => axiosGet(url, dispatch))
    );

    await dispatch(getMission(mission));
    await dispatch(getSlider(slider));
    await dispatch(getConfigMission(configMission));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(stopLoading());
  }
};

export const getVideoAndMiniGameData = () => async (dispatch, getState) => {
  try {
    const urls = [
      'api/Media/getallclient',
      'api/MiniGame/getallclient',
    ];

    const [videoRes, miniGameRes ] = await Promise.all(
      urls.map(url => axiosGet(url, dispatch))
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
      'api/Match/getallclient',
      'api/CategoriesMatch/getallclient',
    ];

    const [ matchRes, matchCategory ] = await Promise.all(
      urls.map(url => axiosGet(url, dispatch))
    );

    await dispatch(getMatch(matchRes));
    await dispatch(getMatchCategory(matchCategory));
  } catch (error) {
    console.log(error);
  }
};
