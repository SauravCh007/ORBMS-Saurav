import { Alert } from 'react-native';
import {
  TAGS_GETTAGS_LOADING,
  TAGS_GETTAGS_SUCCESS,
  TAGS_GETTAGS_FAIL,
  TAGS_ADDTAG_LOADING,
  TAGS_ADDTAG_SUCCESS,
  TAGS_ADDTAG_FAIL,
  TAGS_REMOVETAG_LOADING,
  TAGS_REMOVETAG_SUCCESS,
  TAGS_REMOVETAG_FAIL,
  TAGS_IDLE,
} from '../actions/types';

const INITIAL_STATE = {
  tagsStatus: '',
  tagsError: '',
  tagsList: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TAGS_GETTAGS_LOADING:
    case TAGS_ADDTAG_LOADING:
    case TAGS_ADDTAG_SUCCESS:
    case TAGS_REMOVETAG_LOADING:
    case TAGS_REMOVETAG_SUCCESS:
    case TAGS_IDLE:
      return { ...state, tagsStatus: action.type };
    case TAGS_GETTAGS_SUCCESS:
      return { ...state, tagsStatus: action.type, tagsList: action.payload };
    case TAGS_GETTAGS_FAIL:
    case TAGS_ADDTAG_FAIL:
    case TAGS_REMOVETAG_FAIL:
      return { ...state, tagsStatus: action.type, tagsError: action.payload };
    default:
      return state;
  }
};
