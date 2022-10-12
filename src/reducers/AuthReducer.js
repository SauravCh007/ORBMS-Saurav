import {Alert} from 'react-native';
import {
  AUTH_LOGIN_LOADING,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL,
  AUTH_FORGOTPASSWORD_LOADING,
  AUTH_FORGOTPASSWORD_SUCCESS,
  AUTH_FORGOTPASSWORD_FAIL,
  AUTH_RESETPASSWORDLINK_LOADING,
  AUTH_RESETPASSWORDLINK_SUCCESS,
  AUTH_RESETPASSWORDLINK_FAIL,
  AUTH_USERINFO_LOADING,
  AUTH_USERINFO_SUCCESS,
  AUTH_USERINFO_FAIL,
  AUTH_UPDATEUSERINFO_LOADING,
  AUTH_UPDATEUSERINFO_SUCCESS,
  AUTH_UPDATEUSERINFO_FAIL,
  AUTH_CHECKLOGGED_LOADING,
  AUTH_CHECKLOGGED_SUCCESS,
  AUTH_CHECKLOGGED_FAIL,
  AUTH_SIGNOUT_SUCCESS,
  AUTH_CHANGEPASSWORD_LOADING,
  AUTH_CHANGEPASSWORD_SUCCESS,
  AUTH_CHANGEPASSWORD_FAIL,
  AUTH_SIGNIN_LOADING,
  AUTH_SIGNIN_SUCCESS,
  AUTH_SIGNIN_FAIL,
  AUTH_OTP_LOADING,
  AUTH_OTP_SUCCESS,
  AUTH_OTP_FAIL,
  AUTH_PASSWORDLESS_LOADING,
  AUTH_PASSWORDLESS_SUCCESS,
  AUTH_PASSWORDLESS_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
  user: null,
  authStatus: '',
  authError: '',
  authUserToken: null,
  authOTP: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_CHECKLOGGED_LOADING:
    case AUTH_LOGIN_LOADING:
    case AUTH_FORGOTPASSWORD_LOADING:
    case AUTH_RESETPASSWORDLINK_LOADING:
    case AUTH_USERINFO_LOADING:
    case AUTH_SIGNIN_LOADING:
    case AUTH_SIGNOUT_SUCCESS:
    case AUTH_RESETPASSWORDLINK_LOADING:
    case AUTH_RESETPASSWORDLINK_SUCCESS:
    case AUTH_UPDATEUSERINFO_LOADING:
    case AUTH_CHANGEPASSWORD_LOADING:
    case AUTH_OTP_LOADING:

    case AUTH_CHANGEPASSWORD_SUCCESS:
      return {...state, authStatus: action.type};
    case AUTH_CHECKLOGGED_SUCCESS:
    case AUTH_LOGIN_SUCCESS:
    case AUTH_PASSWORDLESS_SUCCESS:
      return {...state, authStatus: action.type, user: action.payload};
    case AUTH_SIGNIN_SUCCESS:
      return {...state, authStatus: action.type, authUserToken: action.payload};
    case AUTH_OTP_SUCCESS:
      return {...state, authStatus: action.type, authOTP: action.payload};
    case AUTH_USERINFO_SUCCESS:
    case AUTH_UPDATEUSERINFO_SUCCESS:
      return {
        ...state,
        authStatus: action.type,
        user: {...state.user, ...action.payload},
      };
    case AUTH_CHECKLOGGED_FAIL:
    case AUTH_LOGIN_FAIL:
    case AUTH_FORGOTPASSWORD_FAIL:
    case AUTH_RESETPASSWORDLINK_FAIL:
    case AUTH_USERINFO_FAIL:
    case AUTH_RESETPASSWORDLINK_FAIL:
    case AUTH_UPDATEUSERINFO_FAIL:
    case AUTH_CHANGEPASSWORD_FAIL:
    case AUTH_SIGNIN_FAIL:
    case AUTH_OTP_FAIL:
    case AUTH_PASSWORDLESS_FAIL:
      return {...state, authStatus: action.type, authError: action.payload};
    default:
      return state;
  }
};
