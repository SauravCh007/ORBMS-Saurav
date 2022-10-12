import { Alert } from 'react-native';
import {
  SETTINGS_GETSETTINGS_SUCCESS,
  SETTINGS_SETMODE_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  settingsStatus: '',
  settingsError: '',
  theme: {}
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SETTINGS_GETSETTINGS_SUCCESS:
      return { ...state,
        settingsStatus: action.type,
        ...action.payload,
      };
    case SETTINGS_SETMODE_SUCCESS:
      return { ...state,
        settingsStatus: action.type,
        ...action.payload
      };
    default:
      return state;
  }
};
