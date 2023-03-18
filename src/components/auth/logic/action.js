export const OPEN_LOGIN_MODAL = "OPEN_LOGIN_MODAL";
export const CLOSE_LOGIN_MODAL = "CLOSE_LOGIN_MODAL";
export const OPEN_REGISTER_MODAL = "OPEN_REGISTER_MODAL";
export const CLOSE_REGISTER_MODAL = "CLOSE_REGISTER_MODAL";
export const OPEN_FORGET_PASSWORD_MODAL = "OPEN_FORGET_PASSWORD_MODAL";
export const CLOSE_FORGET_PASSWORD_MODAL = "CLOSE_FORGET_PASSWORD_MODAL";
export const FORGET_DATA = "FORGET_DATA";
export const SIGNUP_DATA = "SIGNUP_DATA";
export const LOGIN_ACTION = "LOGIN_ACTION";

export const openLoginModal = () => ({
  type: OPEN_LOGIN_MODAL,
});

export const closeLoginModal = () => ({
  type: CLOSE_LOGIN_MODAL,
});

export const openRegisterModal = () => ({
  type: OPEN_REGISTER_MODAL,
});

export const closeRegisterModal = () => ({
  type: CLOSE_REGISTER_MODAL,
});

export const openForgetPasswordModal = () => ({
  type: OPEN_FORGET_PASSWORD_MODAL,
});

export const closeForgetPasswordModal = () => ({
  type: CLOSE_FORGET_PASSWORD_MODAL,
});

export const forgetDataAction = (res) => ({
  type: FORGET_DATA,
  payload: res
});

export const signDataAction = (res) => ({
  type: SIGNUP_DATA,
  payload: res
});

export const loginAction = (res) => ({
  type: LOGIN_ACTION,
  payload: res
});