export const getMission = (res) => {
  return {
    type: 'GET_MISSION',
    payload: res,
  }
}

export const getMissionCategory = (res) => {
  return {
    type: 'GET_MISSION_CATEGORY',
    payload: res,
  };
};

export const getUserMission = (res) => {
  return {
    type: 'GET_USER_MISSION',
    payload: res,
  };
};

export const getConfigMission = (res) => {
  return {
    type: 'GET_CONFIG_MISSION',
    payload: res,
  };
};