import { axiosPost } from '@/utils/api';
import {
  OPEN_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL,
  OPEN_REGISTER_MODAL,
  CLOSE_REGISTER_MODAL,
  OPEN_FORGET_PASSWORD_MODAL,
  CLOSE_FORGET_PASSWORD_MODAL,
  FORGET_DATA,
  forgetDataAction,
  SIGNUP_DATA,
  LOGIN_ACTION,
  // signDataAction
} from "./action";

const initialState = {
  loginModalOpen: false,
  registerModalOpen: false,
  forgetPasswordModalOpen: false,
  forgetData: {
    email: '',
    message: ''
  },
  signUpData: {
    FullName: '',
    UserName: '',
    Email: '',
    PhoneNumber: '',
    Password: '',
    InviteCode: '',
    ConfirmPassword: ''
  },
  user: {}
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_LOGIN_MODAL:
      return { ...state, loginModalOpen: true };
    case CLOSE_LOGIN_MODAL:
      return { ...state, loginModalOpen: false };
    case OPEN_REGISTER_MODAL:
      return { ...state, registerModalOpen: true };
    case CLOSE_REGISTER_MODAL:
      return { ...state, registerModalOpen: false };
    case OPEN_FORGET_PASSWORD_MODAL:
      return { ...state, forgetPasswordModalOpen: true };
    case CLOSE_FORGET_PASSWORD_MODAL:
      return { ...state, forgetPasswordModalOpen: false };
    case FORGET_DATA:
      return { ...state, ...action.payload };
    case SIGNUP_DATA:
      return { 
        ...state,
        signUpData: {
          ...state.signUpData,
          ...action.payload.signUpData
        }
      };
    case LOGIN_ACTION:
      return { 
        ...state,
        user: action.payload
      };
      
    default:
      return state;
  }
};

export const signUp = () => async (dispatch, getState) => {
  try {
    const { authReducer } = getState();
    const signUp = authReducer && authReducer.signUpData;
    const data = {
      FullName: signUp.FullName,
      UserName: signUp.UserName,
      Email: signUp.Email,
      PhoneNumber: signUp.PhoneNumber,
      Password: signUp.Password,
      InviteCode: signUp.InviteCode,
    };
    const sendEmailForget = await axiosPost('appUser/add', data);
    console.log('sendEmailForget',sendEmailForget)
    // await dispatch(getMatch(matchRes));
  } catch (error) {
    console.log(error);
    dispatch(forgetDataAction({ forgetData: {['message']: error?.data?.Message}}))
  }
}

export const sendEmailResetPass = () => async (dispatch, getState) => {
  try {
    const { authReducer } = getState();
    const data = { email: authReducer.forgetData.email };
    const sendEmailForget = await axiosPost('appUser/sendresetpassword', data, dispatch);
    dispatch(forgetDataAction({ forgetData: {['message']: sendEmailForget?.data?.Message}}))
  } catch (error) {
    console.log(error);
    dispatch(forgetDataAction({ forgetData: {['message']: error.data.Message}}))
  }
}