import { axiosGet } from '../../../utils/api'
import { getDataUser, getAllUser, getAllFriendByUserId } from './action'

const initialState = {
  userData: [],
  allUser: [],
  userFriend: [],
}

console.log(initialState.allUser)

export const userDetail = (state = initialState, action) => {
  switch (action.type) {
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
