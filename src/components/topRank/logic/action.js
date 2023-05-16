export const getTopRank = (res) => {
  return {
    type: "GET_TOPRANK",
    payload: res,
  };
};

export const getFpointByUser = (res) => {
  return {
    type: "GET_FPOINT_USER",
    payload: res,
  };
};
