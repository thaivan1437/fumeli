import { axiosGet } from '../../../utils/api'
import { getGift } from './action'

const initialState = {
  giftData: [],
}

export const gift = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_GIFT':
      return {
        ...state,
        giftData: action.payload,
      }
    default:
      return state
  }
}

export const getAllDataThunkAction = () => async (dispatch, getState) => {
  try {
    const [gift] = await Promise.all([
      axiosGet('Gift/getallclient'),
    ])
    dispatch(getGift(gift))
  } catch (error) {
    console.log(error)
  }
}
