export const OPEN_GIFTTRANSACTION_MODAL = 'OPEN_GIFTTRANSACTION_MODAL'
export const CLOSE_GIFTTRANSACTION_MODAL = 'CLOSE_GIFTTRANSACTION_MODAL'
export const GIFTTRANSACTION_DATA = 'GIFTTRANSACTION_DATA'

export const giftTransactionAction = (res) => ({
  type: GIFTTRANSACTION_DATA,
  payload: res,
})

export const openGiftTransactionModal = () => ({
  type: OPEN_GIFTTRANSACTION_MODAL,
})

export const closeGiftTransactionModal = () => ({
  type: CLOSE_GIFTTRANSACTION_MODAL,
})

export const getGift = (res) => {
  return {
    type: 'GET_GIFT',
    payload: res,
  }
}

export const getCategoryGift = (res) => {
  return {
    type: 'GET_CATEGORYGIFT',
    payload: res,
  }
}
