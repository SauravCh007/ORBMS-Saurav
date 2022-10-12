import { Alert } from 'react-native';
import {
  API_BASE_URL,
  API_CMD_GETCAMPAIGNS,
  API_CMD_ADDCAMPAIGNSTOCONTACT,
  API_CMD_CAMPAIGNSEDIT,
  API_CMD_REMOVECAMPAIGN,

  CAMPAIGN_GETCAMPAIGNS_LOADING,
  CAMPAIGN_GETCAMPAIGNS_SUCCESS,
  CAMPAIGN_GETCAMPAIGNS_FAIL,
  CAMPAIGN_ADDCAMPAIGNSTOCONTACT_LOADING,
  CAMPAIGN_ADDCAMPAIGNSTOCONTACT_SUCCESS,
  CAMPAIGN_ADDCAMPAIGNSTOCONTACT_FAIL,
  CAMPAIGN_EDITCAMPAIGN_LOADING,
  CAMPAIGN_EDITCAMPAIGN_SUCCESS,
  CAMPAIGN_EDITCAMPAIGN_FAIL,
  CAMPAIGN_REMOVECAMPAIGN_LOADING,
  CAMPAIGN_REMOVECAMPAIGN_SUCCESS,
  CAMPAIGN_REMOVECAMPAIGN_FAIL,
  CAMPAIGN_IDLE,
} from '../actions/types';

export const getCampaigns = () => {
  return (dispatch, getState) => {
    const { user } = getState().auth;

    if (user && user.uid) {
      dispatch({ type: CAMPAIGN_GETCAMPAIGNS_LOADING });

      let url = new URL(API_BASE_URL);
      let params = {
        cmd: API_CMD_GETCAMPAIGNS,
        uid: user.uid,
      };
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

      fetch(url)
      .then(response => response.json())
      .then(json => {
        if (json.error && json.msg) {
          dispatch({ type: CAMPAIGN_GETCAMPAIGNS_FAIL, payload: 'An error has occured' });
        } else {
          //Alert.alert(json);
          dispatch({ type: CAMPAIGN_GETCAMPAIGNS_SUCCESS, payload: json });
        }
      })
      .catch((error) => {
        dispatch({ type: CAMPAIGN_GETCAMPAIGNS_FAIL, payload: error.message });
      });
    } else {

    }
  }
}


export const addCampaignsToContact = ({ cid, cp_gid }) => {
  return (dispatch, getState) => {
    const { user } = getState().auth;
    if (user && user.uid) {
      dispatch({ type: CAMPAIGN_ADDCAMPAIGNSTOCONTACT_FAIL });

      let url = new URL(API_BASE_URL);
      let params = {
        cmd: API_CMD_ADDCAMPAIGNSTOCONTACT,
        uid: user.uid,
        cid,
        cp_gid,
      };

      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

      fetch(url)
      .then(response => response.json())
      .then(json => {
        if (json.error && json.msg) {
          //Alert.alert(JSON.stringify(json));
          dispatch({ type: CAMPAIGN_ADDCAMPAIGNSTOCONTACT_FAIL, payload: 'An error has occured' });
          dispatch({ type: CAMPAIGN_IDLE });
        } else {
          //Alert.alert(JSON.stringify(json));
          dispatch({ type: CAMPAIGN_ADDCAMPAIGNSTOCONTACT_SUCCESS, payload: json });
          dispatch({ type: CAMPAIGN_IDLE });
        }
      })
      .catch((error) => {
        //Alert.alert(error.message);
        dispatch({ type: CAMPAIGN_ADDCAMPAIGNSTOCONTACT_FAIL, payload: error.message });
        dispatch({ type: CAMPAIGN_IDLE });
      });
    } else {

    }
  }
}

export const removeCampaignToContact = ({ cid }) => {       // NOT ARRAY
  return (dispatch, getState) => {
    const { user } = getState().auth;
    if (user && user.uid) {
      dispatch({ type: CAMPAIGN_REMOVECAMPAIGN_LOADING });

      let url = new URL(API_BASE_URL);
      let params = {
        cmd: API_CMD_REMOVECAMPAIGN,
        uid: user.uid,
        cid,
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
          dispatch({ type: CAMPAIGN_REMOVECAMPAIGN_FAIL, payload: 'An error has occured' });
          dispatch({ type: CAMPAIGN_IDLE });
        } else {
          //Alert.alert(JSON.stringify(json));
          dispatch({ type: CAMPAIGN_REMOVECAMPAIGN_SUCCESS });
          dispatch({ type: CAMPAIGN_IDLE });
        }
      })
      .catch((error) => {
        //Alert.alert(error.message);
        dispatch({ type: CAMPAIGN_REMOVECAMPAIGN_FAIL, payload: error.message });
        dispatch({ type: CAMPAIGN_IDLE });
      });
    } else {

    }
  }
}
