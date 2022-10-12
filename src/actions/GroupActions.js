import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  API_BASE_URL,
  API_CMD_GETGROUPS,
  API_CMD_ADDGROUPSTOCONTACT,
  API_CMD_REMOVEGROUPTOCONTACT,
  API_CMD_GROUPSEDIT,

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

export const getGroups = () => {
  return (dispatch, getState) => {
    const { user } = getState().auth;

    if (user && user.uid) {
      dispatch({ type: GROUP_GETGROUPS_LOADING });

      let url = new URL(API_BASE_URL);
      let params = {
        cmd: API_CMD_GETGROUPS,
        uid: user.uid,
      };
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

      fetch(url)
      .then(response => response.json())
      .then(json => {
        if (json.error && json.msg) {
          dispatch({ type: GROUP_GETGROUPS_FAIL, payload: 'An error has occured' });
        } else {
          //Alert.alert(json);
          dispatch({ type: GROUP_GETGROUPS_SUCCESS, payload: json });
        }
      })
      .catch((error) => {
        dispatch({ type: GROUP_GETGROUPS_FAIL, payload: error.message });
      });
    } else {

    }
  }
}

export const addGroupsToContact = ({ cid, gid }) => {
  return (dispatch, getState) => {
    const { user } = getState().auth;
    if (user && user.uid) {
      dispatch({ type: GROUP_ADDGROUPTOCONTACT_LOADING });

      let url = new URL(API_BASE_URL);
      let params = {
        cmd: API_CMD_ADDGROUPSTOCONTACT,
        uid: user.uid,
        cid,
      };

      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

      gid.forEach(item => {
        url = `${url}&gid[]=${item}`
      });

      fetch(url)
      .then(response => response.json())
      .then(json => {
        if (json.error && json.msg) {
          //Alert.alert(JSON.stringify(json));
          dispatch({ type: GROUP_ADDGROUPTOCONTACT_FAIL, payload: 'An error has occured' });
        } else {
          //Alert.alert(JSON.stringify(json));
          dispatch({ type: GROUP_ADDGROUPTOCONTACT_SUCCESS, payload: json });
          dispatch({ type: GROUP_IDLE });
        }
      })
      .catch((error) => {
        //Alert.alert(error.message);
        dispatch({ type: GROUP_ADDGROUPTOCONTACT_FAIL, payload: error.message });
      });
    } else {

    }
  }
}


export const removeGroupToContact = ({ cid, gid }) => {       // NOT ARRAY
  return (dispatch, getState) => {
    const { user } = getState().auth;
    if (user && user.uid) {
      dispatch({ type: GROUP_REMOVEGROUPTOCONTACT_LOADING });

      let url = new URL(API_BASE_URL);
      let params = {
        cmd: API_CMD_REMOVEGROUPTOCONTACT,
        uid: user.uid,
        cid,
        gid,
      };
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

      /*
      gid.forEach(item => {
        url = `${url}&gid[]=${item}`
      });
      */


      fetch(url)
      .then(response => response.json())
      .then(json => {
        if (json.error && json.msg) {
          //Alert.alert(JSON.stringify(json));
          dispatch({ type: GROUP_REMOVEGROUPTOCONTACT_FAIL, payload: 'An error has occured' });
          dispatch({ type: GROUP_IDLE });
        } else {
          //Alert.alert(JSON.stringify(json));
          dispatch({ type: GROUP_REMOVEGROUPTOCONTACT_SUCCESS });
          dispatch({ type: GROUP_IDLE });
        }
      })
      .catch((error) => {
        //Alert.alert(error.message);
        dispatch({ type: GROUP_REMOVEGROUPTOCONTACT_FAIL, payload: error.message });
        dispatch({ type: GROUP_IDLE });
      });
    } else {

    }
  }
}
