import {reducerExample} from '../pages/redux-example/logic/reducer';
import {home} from '../pages/home/logic/reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  reducerExample: reducerExample,
  home,
});

export default rootReducer;
