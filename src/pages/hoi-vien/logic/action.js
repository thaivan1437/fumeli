export const getUserGift = (res) => {
  return {
    type: "GET_USER_GIFT",
    payload: res,
  };
};

export const getUserGiftHistory = (res) => {
  return {
    type: "GET_USER_GIFT_HISTORY",
    payload: res,
  };
};

export const getFriends = (res) => {
  return {
    type: "GET_FRIENDS",
    payload: res,
  };
};

export const getUserDetail = (res) => {
  return {
    type: "GET_USER_DETAIL",
    payload: res,
  };
};

export const getActivitiesHistory = (res) => {
  return {
    type: "GET_ACTIVITY_HISTORY",
    payload: res,
  };
};
export const getGivePointsHistory = (res) => {
  return {
    type: "GET_GIVE_POINTS_HISTORY",
    payload: res,
  };
};

export const getSpinsHistory = (res) => {
  return {
    type: "GET_SPINS_HISTORY",
    payload: res,
  };
};
