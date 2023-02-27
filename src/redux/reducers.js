import {reducerExample} from '../pages/redux-example/logic/reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  reducerExample: reducerExample,
});

export default rootReducer;
