import {
  API_BASE_URL,
  API_CMD_ADDNOTE,
  API_CMD_EDITNOTE,
  API_CMD_DELETENOTE,

  NOTES_ADDNOTE_LOADING,
  NOTES_ADDNOTE_SUCCESS,
  NOTES_ADDNOTE_FAIL,
  NOTES_EDITNOTE_LOADING,
  NOTES_EDITNOTE_SUCCESS,
  NOTES_EDITNOTE_FAIL,
  NOTES_DELETENOTE_LOADING,
  NOTES_DELETENOTE_SUCCESS,
  NOTES_DELETENOTE_FAIL,
} from '../actions/types';

export const saveNote = (parameters) => {
  return (dispatch, getState) => {
    const { user } = getState().auth;
    if (user && user.uid) {
      dispatch({ type: NOTES_ADDNOTE_LOADING });

      var url = new URL(API_BASE_URL),
      params = {
        cmd: API_CMD_ADDNOTE,
        uid: user.uid,
        cid: parameters.cid,
        content: parameters.content,
      };
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

      fetch(url)
      .then(response => response.json())
      .then(json => {
        if (json.error && json.msg) {
          dispatch({ type: NOTES_ADDNOTE_FAIL, payload: 'An error has occured' });
        } else {
          dispatch({ type: NOTES_ADDNOTE_SUCCESS, payload: json });
        }
      })
      .catch((error) => {
        dispatch({ type: NOTES_ADDNOTE_FAIL, payload: error.message });
      });
    }
  }
}

export const editNote = (parameters) => {
  return (dispatch, getState) => {
    const { user } = getState().auth;

    if (user && user.uid) {
      dispatch({ type: NOTES_EDITNOTE_LOADING });

      var url = new URL(API_BASE_URL),
      params = {
        cmd: API_CMD_EDITNOTE,
        uid: user.uid,
        cid: parameters.cid,
        nid: parameters.nid,
        content: parameters.content,
      };
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

      fetch(url)
      .then(response => response.json())
      .then(json => {
        if (json.error && json.msg) {
          dispatch({ type: NOTES_EDITNOTE_FAIL, payload: 'An error has occured' });
        } else {
          dispatch({ type: NOTES_EDITNOTE_SUCCESS, payload: json });
        }
      })
      .catch((error) => {
        dispatch({ type: NOTES_EDITNOTE_FAIL, payload: error.message });
      });
    }
  }
}


export const deleteNote = (parameters) => {
  return (dispatch, getState) => {
    const { user } = getState().auth;

    if (user && user.uid) {
      dispatch({ type: NOTES_DELETENOTE_LOADING });

      var url = new URL(API_BASE_URL),
      params = {
        cmd: API_CMD_DELETENOTE,
        uid: user.uid,
        cid: parameters.cid,
        nid: parameters.nid,
      };
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

      fetch(url)
      .then(response => response.json())
      .then(json => {
        if (json.error && json.msg) {
          dispatch({ type: NOTES_DELETENOTE_FAIL, payload: 'An error has occured' });
        } else {
          dispatch({ type: NOTES_DELETENOTE_SUCCESS, payload: json });
        }
      })
      .catch((error) => {
        dispatch({ type: NOTES_DELETENOTE_FAIL, payload: error.message });
      });
    }
  }
}
