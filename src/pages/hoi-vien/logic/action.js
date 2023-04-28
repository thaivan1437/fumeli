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
