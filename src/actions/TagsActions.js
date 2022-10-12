import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  API_BASE_URL,
  API_CMD_GETTAGS,
  API_CMD_ADDCONTACTTAGS,
  API_CMD_REMOVETAG,

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

export const getTags = () => {
  return (dispatch, getState) => {
    const { user } = getState().auth;

    if (user && user.uid) {
      dispatch({ type: TAGS_GETTAGS_LOADING });

      let url = new URL(API_BASE_URL);
      let params = {
        cmd: API_CMD_GETTAGS,
        uid: user.uid,
      };
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

      fetch(url)
      .then(response => response.json())
      .then(json => {
        console.log('tagslist');
        console.log(json);

        if (json.error && json.msg) {
          dispatch({ type: TAGS_GETTAGS_FAIL, payload: 'An error has occured' });
        } else {
          //Alert.alert(json);
          dispatch({ type: TAGS_GETTAGS_SUCCESS, payload: json });
        }
      })
      .catch((error) => {
        dispatch({ type: TAGS_GETTAGS_FAIL, payload: error.message });
      });
    } else {

    }
  }
}

export const addTagsToContact = ({ cid, tags }) => {
  return (dispatch, getState) => {
    const { user } = getState().auth;
    if (user && user.uid) {
      dispatch({ type: TAGS_ADDTAG_LOADING });

      let url = new URL(API_BASE_URL);
      let params = {
        cmd: API_CMD_ADDCONTACTTAGS,
        uid: user.uid,
        cid,
      };

      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

      tags.forEach(item => {
        url = `${url}&tag_id[]=${item}`
      });

      fetch(url)
      .then(response => response.json())
      .then(json => {
        if (json.error && json.msg) {
          //Alert.alert(JSON.stringify(json));
          dispatch({ type: TAGS_ADDTAG_FAIL, payload: 'An error has occured' });
        } else {
          //Alert.alert(JSON.stringify(json));
          dispatch({ type: TAGS_ADDTAG_SUCCESS, payload: json });
          dispatch({ type: TAGS_IDLE });
        }
      })
      .catch((error) => {
        //Alert.alert(error.message);
        console.log('add tag error' + error);
        dispatch({ type: TAGS_ADDTAG_FAIL, payload: error.message });
      });
    } else {

    }
  }
}





export const removeTagToContact = ({ cid, tags }) => {       
  return (dispatch, getState) => {
    const { user } = getState().auth;
    if (user && user.uid) {
      dispatch({ type: TAGS_REMOVETAG_LOADING });

      let url = new URL(API_BASE_URL);
      let params = {
        cmd: API_CMD_REMOVETAG,
        uid: user.uid,
        cid,
      };
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

      tags.forEach(item => {
        url = `${url}&contact_tag_ids[]=${item}`
      });


      fetch(url)
      .then(response => response.json())
      .then(json => {
        if (json.error && json.msg) {
          //Alert.alert(JSON.stringify(json));
          dispatch({ type: TAGS_REMOVETAG_FAIL, payload: 'An error has occured' });
          dispatch({ type: TAGS_IDLE });
        } else {
          //Alert.alert(JSON.stringify(json));
          dispatch({ type: TAGS_REMOVETAG_SUCCESS });
          dispatch({ type: TAGS_IDLE });
        }
      })
      .catch((error) => {
        //Alert.alert(error.message);
        dispatch({ type: TAGS_REMOVETAG_FAIL, payload: error.message });
        dispatch({ type: TAGS_IDLE });
      });
    } else {

    }
  }
}
