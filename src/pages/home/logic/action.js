export const getMission = (res) => {
  return {
    type: 'GET_MISSION',
    payload: res,
  };
};

export const getMatchCategory = (res) => {
  return {
    type: 'GET_MATCH_CATEGORY',
    payload: res,
  };
};

export const getMatch = (res) => {
  return{
    type: 'GET_MATCH',
    payload: res,
  };
};
export const getVideo = (res) => {
  return{
    type: 'GET_VIDEO',
    payload: res,
  };
};
export const getMiniGame = (res) => {
  return{
    type: 'GET_MINIGAME',
    payload: res,
  };
};
export const getSlider = (res) => {
  return{
    type: 'GET_SLIDER',
    payload: res,
  };
};