import { axiosGet, axiosPost } from '@/utils/api'
import { getMission, getMissionCategory, getUserMission } from './action'
import { startLoading, stopLoading  } from '../../action';

const initialState = {
  mission: [],
  missionCategory: [],
  userMission: []
}

export const mission = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MISSION':
      return {
        ...state,
        mission: action.payload,
      };
    case 'GET_MISSION_CATEGORY':
      return {
        ...state,
        missionCategory: action.payload,
      };
    case 'GET_USER_MISSION':
      return {
        ...state,
        userMission: action.payload,
      };
    default:
      return state
  }
}

export const getMissionDataThunkAction = () => async (dispatch, getState) => {
  try {
    const urls = [
      'Campaign/getallclient',
    ];

    const [ missionRes ] = await Promise.all(
      urls.map(url => axiosGet(url))
    );

    await dispatch(getMission(missionRes));
  } catch (error) {
    console.log(error);
  }
};

export const getMissionCategoryDataThunkAction = () => async (dispatch, getState) => {
  try {
    const urls = [
      'CategoriesCampaign/getallclient'
    ];

    const [ missionCategories ] = await Promise.all(
      urls.map(url => axiosGet(url))
    );

    await dispatch(getMissionCategory(missionCategories));
  } catch (error) {
    console.log(error);
  }
};

export const getMissionComplete = (idCamp) => async (dispatch, getState) => {
  try {
    dispatch(startLoading());
    const url = 'UserCampaign/getusercampaignbyuserid';
    const { authReducer } = getState();
    const data ={
      "UserId": authReducer && authReducer.user && authReducer.user.userid,
      "CampaignId": idCamp,
      "FromDate": "2023-03-17 12:00:00 AM",
      "ToDate": "2023-03-22 12:00:00 AM"
    }

    const response = await axiosPost(url, data);
    console.log('response', response, authReducer , idCamp);

    await dispatch(getUserMission(response.data));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(stopLoading());
  }
};