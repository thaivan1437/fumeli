import { axiosGet } from '../../../utils/api'
import { getSpinGameItem } from './action'
import { getImgSpinGame } from './action'

const initialState = {
  spinGiftItem: [],
  imgSpinGame: [],
}

export const spinGiftItem = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_SPINGAMEITEM':
      return {
        ...state,
        spinGiftItem: action.payload,
      }
    case 'GET_IMGSPINGAME':
      return {
        ...state,
        imgSpinGame: action.payload,
      }
    default:
      return state
  }
}

export const getAllDataThunkAction = () => async (dispatch, getState) => {
  // try {
  //   const [spinGiftItem] = await Promise.all([axiosGet('/SpinGame/detail/getallclientbyspingameid/2')])

  //   await dispatch(getSpinGameItem(spinGiftItem))
  // } catch (error) {
  //   console.log(error)
  // }

  try {
    const urls = [
      '/SpinGame/detail/getallclientbyspingameid/2',
      '/Campaign/getsinglebyid?ID=4',
    ]

    const [spinGiftItem, imgSpinGame] = await Promise.all(
      urls.map((url) => axiosGet(url, dispatch))
    )

    await dispatch(getSpinGameItem(spinGiftItem))
    await dispatch(getImgSpinGame(imgSpinGame))
  } catch (error) {
    console.log(error)
  }
}
