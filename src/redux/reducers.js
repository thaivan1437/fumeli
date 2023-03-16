import { reducerExample } from '../pages/redux-example/logic/reducer';
import { home } from '../pages/home/logic/reducer';
import { about } from '../pages/gioi-thieu/logic/reducer';
import { match } from '../pages/giai-dau/logic/reducer';
import { topRank } from '@/components/topRank/logic/reducer';
import { authReducer } from '@/components/auth/logic/reducer';
import { gift } from '../pages/doi-qua/logic/reducer'
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  reducerExample: reducerExample,
  home,
  topRank,
  about,
  match,
  authReducer,
  gift,
});

export default rootReducer;
