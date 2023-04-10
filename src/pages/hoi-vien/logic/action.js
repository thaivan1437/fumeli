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
