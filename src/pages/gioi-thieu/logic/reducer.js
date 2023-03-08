import { axiosGet } from '../../../utils/api'
import { getAbout } from './action'

const initialState = {
  aboutData: [],
}

export const about = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ABOUT':
      return {
        ...state,
        aboutData: action.payload,
      }
    default:
      return state
  }
}

export const getAllDataThunkAction = () => async (dispatch, getState) => {
  try {
    const [about] = await Promise.all([
      axiosGet('http://api-demowebsite.cdktcnqn.edu.vn/api/About/getabouts'),
    ])
    dispatch(getAbout(about));
  } catch (error) {
    console.log(error)
  }
}
