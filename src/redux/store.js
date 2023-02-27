import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import các reducer cần thiết
import rootReducer from './reducers';

// tạo store với root reducer đã được combine
const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default store;
