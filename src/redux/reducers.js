import {reducerExample} from '../pages/redux-example/logic/reducer';
import { about } from '../pages/about/logic/reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  reducerExample: reducerExample,
  about
});

export default rootReducer;
