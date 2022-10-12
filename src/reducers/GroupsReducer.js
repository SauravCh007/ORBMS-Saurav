import { Alert } from 'react-native';
import {
  GROUP_GETGROUPS_LOADING,
  GROUP_GETGROUPS_SUCCESS,
  GROUP_GETGROUPS_FAIL,
  GROUP_ADDGROUPTOCONTACT_LOADING,
  GROUP_ADDGROUPTOCONTACT_SUCCESS,
  GROUP_ADDGROUPTOCONTACT_FAIL,
  GROUP_REMOVEGROUPTOCONTACT_LOADING,
  GROUP_REMOVEGROUPTOCONTACT_SUCCESS,
  GROUP_REMOVEGROUPTOCONTACT_FAIL,
  GROUP_GROUPSEDIT_LOADING,
  GROUP_GROUPSEDIT_SUCCESS,
  GROUP_GROUPSEDIT_FAIL,
  GROUP_IDLE,
} from '../actions/types';

const INITIAL_STATE = {
  groupsStatus: '',
  groupsError: '',
  groupsList: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GROUP_GETGROUPS_LOADING:
    case GROUP_ADDGROUPTOCONTACT_LOADING:
    case GROUP_REMOVEGROUPTOCONTACT_LOADING:
    case GROUP_GROUPSEDIT_LOADING:

    case GROUP_ADDGROUPTOCONTACT_SUCCESS:
    case GROUP_REMOVEGROUPTOCONTACT_SUCCESS:
    case GROUP_IDLE:
      return { ...state, groupsStatus: action.type };
    case GROUP_GETGROUPS_SUCCESS:
      return { ...state, groupsStatus: action.type, groupsList: action.payload };
    case GROUP_GETGROUPS_FAIL:
    case GROUP_ADDGROUPTOCONTACT_FAIL:
    case GROUP_REMOVEGROUPTOCONTACT_FAIL:
    case GROUP_GROUPSEDIT_FAIL:
      return { ...state, groupsStatus: action.type, groupsError: action.payload };
    default:
      return state;
  }
};
