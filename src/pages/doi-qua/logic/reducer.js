import { axiosGet } from '../../../utils/api'
import { getGift, getGiftCategory } from './action'
import {
  OPEN_GIFTTRANSACTION_MODAL,
  CLOSE_GIFTTRANSACTION_MODAL,
  GIFTTRANSACTION_DATA,
} from './action'

const initialState = {
  giftData: [],
  categoryGiftData: [],
  loginModalOpen: false,
  giftTransactionData: {
    Active: '',
    CreateDate: '',
    CreateUser: '',
    UserId: '',
  },
}

export const gift = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_GIFTTRANSACTION_MODAL:
      return { ...state, openGiftTransactionModal: true }
    case CLOSE_GIFTTRANSACTION_MODAL:
      return { ...state, CLOSE_GIFTTRANSACTION_MODAL: false }
    case GIFTTRANSACTION_DATA:
      return {
        ...state,
        signUpData: {
          ...state.giftTransactionData,
          ...action.payload.giftTransactionData,
        },
      }
    case 'GET_GIFT':
      return {
        ...state,
        giftData: action.payload,
      }
    case 'GET_GIFTCATEGORY':
      return {
        ...state,
        categoryGiftData: action.payload,
      }
    default:
      return state
  }
}

export const giftTransaction = () => async (dispatch, getState) => {
  try {
    const { authReducer } = getState()
    const giftTransaction = authReducer && authReducer.giftTransactionData
    const data = {
      Active: giftTransaction.Active,
      CreateDate: giftTransaction.CreateDate,
      CreateUser: giftTransaction.CreateUser,
      UserId: giftTransaction.UserId,
    }
    const createGift = await axiosPost('api/UserGift/create', data)
    // await dispatch(getMatch(matchRes));
  } catch (error) {
    console.log(error)
  }
}

export const getAllDataThunkAction = () => async (dispatch, getState) => {
  try {
    const [giftData, categoryGiftData] = await Promise.all([
      axiosGet('Gift/getallclient'),
      axiosGet('CategoriesGift/getallclient'),
    ])
    await dispatch(getGift(giftData))
    await dispatch(getGiftCategory(categoryGiftData))
  } catch (error) {
    console.log(error)
  }
}
