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

export const getSpinTurn = (res) => {
  return {
    type: 'GET_SPINTURN',
    payload: res,
  }
}
