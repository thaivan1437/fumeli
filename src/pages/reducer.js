// reducer.js
const initialState = {
  loading: false,
};

export const loading = (state = initialState, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'STOP_LOADING':
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
