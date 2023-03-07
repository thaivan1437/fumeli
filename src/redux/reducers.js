import { reducerExample } from '../pages/redux-example/logic/reducer';
import { home } from '../pages/home/logic/reducer';
import { topRank } from '@/components/topRank/logic/reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  reducerExample: reducerExample,
  home,
  topRank
});

export default rootReducer;
