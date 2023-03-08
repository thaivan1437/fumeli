import { reducerExample } from '../pages/redux-example/logic/reducer';
import { home } from '../pages/home/logic/reducer';
import { about } from '../pages/about/logic/reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  reducerExample: reducerExample,
  home,
  about
});

export default rootReducer;
