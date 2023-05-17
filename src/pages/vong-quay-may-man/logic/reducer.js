import { axiosGet } from '../../../utils/api'
import { getSpinGameItem, getImgSpinGame, getSpinTurn,getSpinTurnValue } from './action'

const initialState = {
  spinGiftItem: [],
  imgSpinGame: [],
  spinturn: [],
  spinTurnValue: [],
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
    case 'GET_SPINTURN':
      return {
        ...state,
        spinturn: action.payload,
      }
      case 'GET_SPINTURNVALUE':
        return {
          ...state,
          spinTurnValue: action.payload,
        }
    default:
      return state
  }
}

let data = []
if (typeof window !== 'undefined') {
  const userData = localStorage.getItem('user')
  if (userData) {
    data = JSON.parse(userData)
  }
}
export const getAllDataThunkAction = () => async (dispatch, getState) => {
  try {
    const urls = [
      'api/SpinGame/detail/getallclientbyspingameid/2',
      'api/Campaign/getsinglebyid?ID=4',
      `api/UserSpinGame/getallclientbyuserid/${data.userid}`,
      'api/config/getsinglebyid?key=BuySpinGameTurn'
    ]

    const [spinGiftItem, imgSpinGame, spinturn,spinTurnValue] = await Promise.all(
      urls.map((url) => axiosGet(url, dispatch))
    )
    await dispatch(getSpinGameItem(spinGiftItem))
    await dispatch(getImgSpinGame(imgSpinGame))
    await dispatch(getSpinTurn(spinturn))
    await dispatch(getSpinTurnValue(spinTurnValue))
  } catch (error) {
    console.log(error)
  }
}
