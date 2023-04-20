import { axiosGet } from '@/utils/api'
import { getUserGift, getUserGiftHistory, getFriends } from './action'

const initialState = {
  userGift: [],
  userGiftHistory: [],
  friends: [],
}

export const userDetail = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER_GIFT':
      return {
        ...state,
        userGift: action.payload,
      }
    case 'GET_USER_GIFT':
      return {
        ...state,
        userGiftHistory: action.payload,
      }
    case 'GET_FRIENDS':
      return {
        ...state,
        friends: action.payload,
      }
    default:
      return state
  }
}

export const getUserGiftData = (props) => async (dispatch, getState) => {
  console.log('props', props)
  const {userId} = props;
  const gift = await axiosGet(`UserGift/getallclientbyuserid/${userId}`, dispatch);
  console.log(gift)
  if (typeof(gift) !== 'undefined') {
    dispatch(getUserGift(gift));
  } else {
    console.log('cc')
  }
}

export const getUserGiftHistoryData = (props) => async (dispatch, getState) => {
  console.log('props', props)
  const {userId} = props;
  const gift = await axiosGet(`UserGiftSpin/getalladminbyuserid/${userId}`, dispatch);
  console.log(gift)
  if (typeof(gift) !== 'undefined') {
    dispatch(getUserGiftHistory(gift));
  } else {
    console.log('cc')
  }
}

export const sendPoint = (idCamp) => async (dispatch, getState) => {
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

export const getFriendsData = (props) => async (dispatch, getState) => {
  console.log('props', props)
  const {userId} = props;
  const friends = await axiosGet(`UserFriend/getallclientbyuserid/${userId}`, dispatch);
  console.log(friends)
  if (typeof(friends) !== 'undefined') {
    dispatch(getFriends(friends));
  } else {
    console.log('cc')
  }
}
