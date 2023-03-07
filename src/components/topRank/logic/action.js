export const getTopRank = (res) => {
  return{
    type: 'GET_TOPRANK',
    payload: res,
  };
};