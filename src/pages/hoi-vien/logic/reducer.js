import { axiosGet } from '@/utils/api'
import { getUserGift, getUserGiftHistory, getFriends, getUserDetail, getDataUser, getAllUser, getAllFriendByUserId } from './action'

const initialState = {
  userGift: [],
  userGiftHistory: [],
  friends: [],
  userDetail: [],
  userData: [],
  allUser: [],
  userFriend: [],
}

console.log(initialState.allUser)

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
    case 'GET_USER_DETAIL':
      return {
        ...state,
        userDetail: action.payload,
      }
    case 'GET_DATAUSER':
      return {
        ...state,
        userData: action.payload,
      }
    case 'GET_ALLUSER':
      return {
        ...state,
        allUser: action.payload,
      }
    case 'GET_ALLUSERFRIEND':
      return {
        ...state,
        userFriend: action.payload,
      }
    default:
      return state
  }
}

export const getUserGiftData = (props) => async (dispatch, getState) => {
  console.log('props', props)
  const {userId} = props;
  const gift = await axiosGet(`UserGift/getallclientbyuserid/${userId}`, dispatch);
  const userDetail = await axiosGet(`appUser/detail/${userId}`, dispatch);
  console.log(gift)
  if (typeof(gift) !== 'undefined') {
    dispatch(getUserGift(gift));
    dispatch(getUserDetail(userDetail));
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

export const sendPoint = (id) => async (dispatch, getState) => {
  try {
    dispatch(startLoading());
    const url = 'appUser/sendactiveemail';
    const data ={
      "Id": id,
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

const USER_DETAIL_API_ENDPOINT = 'appUser/detail/'

let data = []
if (typeof window !== 'undefined') {
  const userData = localStorage.getItem('user')
  if (userData) {
    data = JSON.parse(userData)
  }
}

export const getAllDataThunkAction = () => async (dispatch, getState) => {
  try {
    const [userDataResponse, allUserResponse, userFriendResponse] =
      await Promise.all([
        axiosGet(`${USER_DETAIL_API_ENDPOINT}${data.userid}`),
        axiosGet('appUser/getallclientbyuserrole?role=user'),
        axiosGet(`UserFriend/getallclientbyuserid/${data.userid}`),
      ])

    await dispatch(getDataUser(userDataResponse))
    await dispatch(getAllUser(allUserResponse))
    await dispatch(getAllFriendByUserId(userFriendResponse))
  } catch (error) {
    console.log(error)
  }
}
