import { home } from '../pages/home/logic/reducer'
import { about } from '../pages/gioi-thieu/logic/reducer'
import { match } from '../pages/giai-dau/logic/reducer'
import { topRank } from '@/components/topRank/logic/reducer'
import { authReducer } from '@/components/auth/logic/reducer'
import { gift } from '../pages/doi-qua/logic/reducer'
import { loading } from '../pages/reducer'
import { mission } from '../pages/nhiem-vu/logic/reducer'
import { spinGiftItem } from '../pages/vong-quay-may-man/logic/reducer'
import { userDetail } from '../pages/hoi-vien/logic/reducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  home,
  topRank,
  about,
  match,
  authReducer,
  gift,
  loading,
  mission,
  spinGiftItem,
  userDetail,
})

export default rootReducer
