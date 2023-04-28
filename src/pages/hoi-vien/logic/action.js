export const getUserGift = (res) => {
  return {
    type: 'GET_USER_GIFT',
    payload: res,
  }
}

export const getUserGiftHistory = (res) => {
  return {
    type: 'GET_USER_GIFT_HISTORY',
    payload: res,
  }
}

export const getFriends = (res) => {
  return {
    type: 'GET_FRIENDS',
    payload: res,
  }
}

export const getUserDetail = (res) => {
  return {
    type: 'GET_USER_DETAIL',
    payload: res,
  }
}
export const getDataUser = (res) => ({
  type: 'GET_DATAUSER',
  payload: res,
})

export const getAllUser = (res) => ({
  type: 'GET_ALLUSER',
  payload: res,
})

export const getAllFriendByUserId = (res) => ({
  type: 'GET_ALLUSERFRIEND',
  payload: res,
})
