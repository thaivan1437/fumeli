export const getSpinGameItem = (res) => {
  return {
    type: 'GET_SPINGAMEITEM',
    payload: res,
  }
}

export const getImgSpinGame = (res) => {
  return {
    type: 'GET_IMGSPINGAME',
    payload: res,
  }
}
