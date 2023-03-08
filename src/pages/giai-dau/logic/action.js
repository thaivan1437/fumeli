export const getMatch = (res) => {
  return {
    type: 'GET_MATCH',
    payload: res,
  }
}

export const getMatchCategory = (res) => {
  return {
    type: 'GET_MATCH_CATEGORY',
    payload: res,
  };
};