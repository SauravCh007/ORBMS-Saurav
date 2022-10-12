
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  SETTINGS_GETSETTINGS_SUCCESS,
  SETTINGS_SETMODE_SUCCESS,
} from '../actions/types';

export const getSettings = () => {
  return (dispatch) => {
    AsyncStorage.getItem('appMode')
    .then((mode) => {
      updateMode(mode ? mode : 'light', dispatch);
    })
  }
}

export const setAppMode = ({ mode }) => {
  return (dispatch) => {
    AsyncStorage.setItem('appMode', mode);
    updateMode(mode, dispatch);
  }
}

const updateMode = (mode, dispatch) => {
  let theme = {
    mode: 'light',
    bgPrimary: global.color_white,
    bgSecondary: global.color_ltgray,
    bgTertiary: global.color_ltmedgray,
    bgFourthiary: global.color_medgray,
    textPrimary: global.color_darkgray,
    textSecondary: global.color_medgray,
    textTertiary: global.color_ltmedgray,
    themeColor: global.color_theme,
    green: global.color_green,
    turquoise: global.color_turquoise,
    blue: global.color_blue,
    purple: global.color_purple,
    red: global.color_red,
    yellow: global.color_yellow,
    separator: global.color_separator,
    inputBg: global.color_ltmedgray,
    tagsContainer: 'rgba(0,0,0,0.08)',
  }
  switch (mode) {
    case 'dark':
      theme = {
        ...theme,
        mode: 'dark',
        bgPrimary: global.color_black,
        bgSecondary: global.color_black2,
        bgTertiary: global.color_black3,

        textPrimary: global.color_ltmedgray,
        textSecondary: global.color_gray,
        textTertiary: global.color_darkgray,

        separator: global.color_separator_dark,
        inputBg: global.color_black3,
        tagsContainer: 'rgba(255,255,255,0.08)',
      }
      break;
    default:

  }
  dispatch({ type: SETTINGS_SETMODE_SUCCESS, payload: { theme } });
}
