import { axiosGet } from '@/utils/api'
import { getUserGift, getUserGiftHistory } from './action'

const initialState = {
  userGift: [],
  userGiftHistory: [],
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