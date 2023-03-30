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
      const userMissionList = [...state.userMission];
      userMissionList.push(...action.payload);
      const uniqueObjects = userMissionList.filter((item, index, self) =>
        index === self.findIndex(t => t.Id === item.Id)
      );
      return {
        ...state,
        userMission: uniqueObjects,
      };
    default:
      return state
  }
}

export const getMissionDataThunkAction = () => async (dispatch, getState) => {
  try {
    dispatch(startLoading());
    const urls = [
      'Campaign/getallclient',
    ];

    const [ missionRes ] = await Promise.all(
      urls.map(url => axiosGet(url))
    );

    await dispatch(getMission(missionRes));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(stopLoading());
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
    const now = new Date();
    const startOfWeek = new Date(now);
    const diff = now.getDay() - 1;
    startOfWeek.setDate(now.getDate() - diff);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    const data ={
      "UserId": authReducer && authReducer.user && authReducer.user.userid,
      "CampaignId": idCamp,
      "FromDate": startOfWeek,
      "ToDate": endOfWeek
    }
    const response = await axiosPost(url, data, dispatch);
    response ? await dispatch(getUserMission(response)) : null;
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(stopLoading());
  }
};

export const createMissionComplete = ({idCamp, createDate}) => async (dispatch, getState) => {
  try {
    dispatch(startLoading());
    const url = 'UserCampaign/create';
    const { authReducer } = getState();
    const userID = authReducer && authReducer.user && authReducer.user.userid;
    const userName = authReducer && authReducer.user && authReducer.user.username;
    const now = new Date(createDate);
    const data ={
      "UserId": userID,
      "CampaignId": idCamp,
      "CreateDate": now,
      "CreateUser": userName,
      "Active": true,
    }
    const response = await axiosPost(url, data, dispatch);
    console.log('response create',response);
    response ? await dispatch(getUserMission([response])) : null;
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(stopLoading());
  }
};