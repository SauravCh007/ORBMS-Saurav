import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  API_BASE_URL,
  API_CMD_CONTACTLIST,
  API_CMD_GETCONTACTCOUNTS,
  API_CMD_GETCONTACTINFO,
  API_CMD_UPDATECONTACTINFO,
  API_CMD_DELETECONTACT,
  API_CMD_USERINFO,
  API_CMD_ADDCONTACT,
  API_CMD_UPDATE_RATINGS,
  API_CMD_CONTACTS_WITH_RATINGS,
  CONTACT_CONTACTLIST_LOADING,
  CONTACT_CONTACTLIST_SUCCESS,
  CONTACT_CONTACTLIST_FAIL,
  CONTACT_SETCONTACTINFO_SUCCESS,
  CONTACT_GETCONTACTCOUNTS_LOADING,
  CONTACT_GETCONTACTCOUNTS_SUCCESS,
  CONTACT_GETCONTACTCOUNTS_FAIL,
  CONTACT_GETCONTACTINFO_LOADING,
  CONTACT_GETCONTACTINFO_SUCCESS,
  CONTACT_GETCONTACTINFO_FAIL,
  CONTACT_UPDATECONTACTINFO_LOADING,
  CONTACT_UPDATECONTACTINFO_SUCCESS,
  CONTACT_UPDATECONTACTINFO_FAIL,
  CONTACT_DELETECONTACT_LOADING,
  CONTACT_DELETECONTACT_SUCCESS,
  CONTACT_DELETECONTACT_FAIL,
  CONTACT_ADDCONTACT_LOADING,
  CONTACT_ADDCONTACT_SUCCESS,
  CONTACT_ADDCONTACT_FAIL,
  CONTACT_CONTACTSWITHRATINGS_LOADING,
  CONTACT_CONTACTSWITHRATINGS_SUCCESS,
  CONTACT_CONTACTSWITHRATINGS_FAIL,
  CONTACT_UPDATERATINGS_LOADING,
  CONTACT_UPDATERATINGS_SUCCESS,
  CONTACT_UPDATERATINGS_FAIL,
  CONTACT_SETSEARCHKEY,
  CONTACT_IDLE,
} from '../actions/types';

export const getContactList = (parameters, flag = 0) => {
  return (dispatch, getState) => {
    const {user} = getState().auth;

    if (user && user.uid) {
      dispatch({type: CONTACT_CONTACTLIST_LOADING});

      let url = new URL(API_BASE_URL);
      let params = {
        cmd: API_CMD_CONTACTLIST,
        uid: user.uid,
        start: 0,
        length: parameters && parameters.limit ? parameters.limit : 20,
      };

      if (
        parameters &&
        console.log("parameters",parameters),
        parameters ?.searchKeyword &&
        parameters.searchKeyword !== ''
      ) {
        params = {...params, search_key: parameters.searchKeyword};
      }

      Object.keys(params).forEach(key =>
        url.searchParams.append(key, params[key]),
      );

      if (parameters) {
        if (parameters.groups) {
          parameters.groups.forEach((item, index) => {
            url += `&group_id[]=${encodeURIComponent(item)}`;
          });
        } else if (parameters.campaigns) {
          parameters.campaigns.forEach((item, index) => {
            url += `&campaign_id[]=${encodeURIComponent(item)}`;
          });
        } else if (parameters.tags) {
          parameters.tags.forEach((item, index) => {
            console.log(item, 'item');
            url += `&tag[]=${encodeURIComponent(item)}`;
          });
        }
      }

      if (flag == 1) {
        console.log('url===>.>>.>>>', url);
        fetch(url)
          .then(response => response.json())
          .then(json => {
            // console.log(json, '11111111111111111111111111111111');
            if (json.error && json.msg) {
              dispatch({
                type: CONTACT_CONTACTLIST_FAIL,
                payload: 'An error has occured',
              });
            } else {
              //Alert.alert(json);
              AsyncStorage.setItem('getContactList', JSON.stringify(json));
              dispatch({type: CONTACT_CONTACTLIST_SUCCESS, payload: json});
            }
          })
          .catch(error => {
            dispatch({type: CONTACT_CONTACTLIST_FAIL, payload: error.message});
          });
      } else {
        AsyncStorage.getItem('getContactList').then(response => {
          if (response != '' && response != null) {
            // console.log(JSON.parse(response), 'response', JSON.parse(response));
            if (parameters.limit <= JSON.parse(response).length) {
              dispatch({
                type: CONTACT_CONTACTLIST_SUCCESS,
                payload: JSON.parse(response),
              });
            } else {
              // console.log('from api getContactList1*******************************');
              fetch(url)
                .then(response => response.json())
                .then(json => {
                  // console.log(json, '11111111111111111111111111111111');
                  if (json.error && json.msg) {
                    dispatch({
                      type: CONTACT_CONTACTLIST_FAIL,
                      payload: 'An error has occured',
                    });
                  } else {
                    //Alert.alert(json);
                    AsyncStorage.setItem(
                      'getContactList',
                      JSON.stringify(json),
                    );
                    dispatch({
                      type: CONTACT_CONTACTLIST_SUCCESS,
                      payload: json,
                    });
                  }
                })
                .catch(error => {
                  dispatch({
                    type: CONTACT_CONTACTLIST_FAIL,
                    payload: error.message,
                  });
                });
            }
            dispatch({
              type: CONTACT_CONTACTLIST_SUCCESS,
              payload: JSON.parse(response),
            });
          } else {
            // console.log('from api getContactList2*******************************');
            fetch(url)
              .then(response => response.json())
              .then(json => {
                // console.log(json, '11111111111111111111111111111111');
                if (json.error && json.msg) {
                  dispatch({
                    type: CONTACT_CONTACTLIST_FAIL,
                    payload: 'An error has occured',
                  });
                } else {
                  //Alert.alert(json);
                  AsyncStorage.setItem('getContactList', JSON.stringify(json));
                  dispatch({type: CONTACT_CONTACTLIST_SUCCESS, payload: json});
                }
              })
              .catch(error => {
                dispatch({
                  type: CONTACT_CONTACTLIST_FAIL,
                  payload: error.message,
                });
              });
          }
        });
      }
    } else {
    }
  };
};

export const getContactsWithRatings = (parameters, flag = 0) => {
  return (dispatch, getState) => {
    const {user} = getState().auth;

    if (user && user.uid) {
      dispatch({type: CONTACT_CONTACTSWITHRATINGS_LOADING});

      let url = new URL(API_BASE_URL);
      let params = {
        cmd: API_CMD_CONTACTS_WITH_RATINGS,
        uid: user.uid,
        start: 0,
        orderby: 'rating_desc',
        length: parameters && parameters.limit ? parameters.limit : 20,
      };

      if (
        parameters &&
        console.log("parameters",parameters),
        parameters?.searchKeyword &&
        parameters.searchKeyword !== ''
      ) {
        params = {...params, search_key: parameters.searchKeyword};
      }

      Object.keys(params).forEach(key =>
        url.searchParams.append(key, params[key]),
      );

      if (parameters) {
        if (parameters.groups) {
          parameters.groups.forEach((item, index) => {
            url += `&group_id[]=${item}`;
          });
        } else if (parameters.campaigns) {
          parameters.campaigns.forEach((item, index) => {
            url += `&campaign_id[]=${item}`;
          });
        } else if (parameters.tags) {
          parameters.tags.forEach((item, index) => {
            url += `&tag[]=${item}`;
          });
        }
      }

      if (flag == 1) {
        fetch(url)
          .then(response => response.json())
          .then(json => {
            console.log(json, '2222222222');
            if (json.error && json.msg) {
              dispatch({
                type: CONTACT_CONTACTSWITHRATINGS_FAIL,
                payload: 'An error has occured',
              });
            } else {
              //Alert.alert(json);
              AsyncStorage.setItem(
                'getContactsWithRatings',
                JSON.stringify(json),
              );
              dispatch({
                type: CONTACT_CONTACTSWITHRATINGS_SUCCESS,
                payload: json,
              });
            }
          })
          .catch(error => {
            dispatch({
              type: CONTACT_CONTACTSWITHRATINGS_FAIL,
              payload: error.message,
            });
          });
      } else {
        AsyncStorage.getItem('getContactsWithRatings').then(response => {
          if (response != '' && response != null) {
            // console.log(parameters.limit, 'parameters.limit');
            if (parameters.limit <= JSON.parse(response).length) {
              dispatch({
                type: CONTACT_CONTACTSWITHRATINGS_SUCCESS,
                payload: JSON.parse(response),
              });
            } else {
              // console.log('from api getContactsWithRatings1*******************************');
              fetch(url)
                .then(response => response.json())
                .then(json => {
                  console.log(json, '2222222222');
                  if (json.error && json.msg) {
                    dispatch({
                      type: CONTACT_CONTACTSWITHRATINGS_FAIL,
                      payload: 'An error has occured',
                    });
                  } else {
                    //Alert.alert(json);
                    AsyncStorage.setItem(
                      'getContactsWithRatings',
                      JSON.stringify(json),
                    );
                    dispatch({
                      type: CONTACT_CONTACTSWITHRATINGS_SUCCESS,
                      payload: json,
                    });
                  }
                })
                .catch(error => {
                  dispatch({
                    type: CONTACT_CONTACTSWITHRATINGS_FAIL,
                    payload: error.message,
                  });
                });
            }
          } else {
            // console.log('from api getContactsWithRatings2*******************************');
            fetch(url)
              .then(response => response.json())
              .then(json => {
                // console.log(json, '222222222222222');
                if (json.error && json.msg) {
                  dispatch({
                    type: CONTACT_CONTACTSWITHRATINGS_FAIL,
                    payload: 'An error has occured',
                  });
                } else {
                  //Alert.alert(json);
                  AsyncStorage.setItem(
                    'getContactsWithRatings',
                    JSON.stringify(json),
                  );
                  dispatch({
                    type: CONTACT_CONTACTSWITHRATINGS_SUCCESS,
                    payload: json,
                  });
                }
              })
              .catch(error => {
                dispatch({
                  type: CONTACT_CONTACTSWITHRATINGS_FAIL,
                  payload: error.message,
                });
              });
          }
        });
      }
    } else {
    }
  };
};

export const setContactInfo = ({contactInfo}) => {
  return dispatch => {
    dispatch({type: CONTACT_SETCONTACTINFO_SUCCESS, payload: contactInfo});
  };
};

export const getContactInfo = ({contactInfo}) => {
  return (dispatch, getState) => {
    const {user} = getState().auth;

    dispatch({type: CONTACT_GETCONTACTINFO_LOADING});

    let url = new URL(API_BASE_URL);
    let params = {
      cmd: API_CMD_GETCONTACTINFO,
      uid:
        typeof contactInfo.uid == 'undefined'
          ? contactInfo.contact_details.uid
          : contactInfo.uid,
      cid: contactInfo.cid,
    };
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key]),
    );
    console.log(url, 'url====>');
    fetch(url)
      .then(response => response.json())
      .then(json => {
        //console.log('CONTACT DETAIL');
        //console.log(JSON.stringify(json));
        if (json.error && json.msg) {
          dispatch({
            type: CONTACT_GETCONTACTINFO_FAIL,
            payload: 'An error has occured',
          });
        } else {
          console.log(json, 'getContactInfojson');
          dispatch({type: CONTACT_GETCONTACTINFO_SUCCESS, payload: json});
        }
      })
      .catch(error => {
        dispatch({type: CONTACT_GETCONTACTINFO_FAIL, payload: error.message});
      });
  };
};

export const getContactCounts = () => {
  return (dispatch, getState) => {
    const {user} = getState().auth;
    if (user && user.uid) {
      dispatch({type: CONTACT_GETCONTACTCOUNTS_LOADING});
      let url = new URL(API_BASE_URL);
      let params = {
        cmd: API_CMD_GETCONTACTCOUNTS,
        uid: user.uid,
      };
      Object.keys(params).forEach(key =>
        url.searchParams.append(key, params[key]),
      );
      fetch(url)
        .then(response => response.json())
        .then(json => {
          if (json.error && json.msg) {
            dispatch({
              type: CONTACT_GETCONTACTCOUNTS_FAIL,
              payload: 'An error has occured',
            });
          } else {
            //Alert.alert(JSON.stringify(json));
            dispatch({type: CONTACT_GETCONTACTCOUNTS_SUCCESS, payload: json});
          }
        })
        .catch(error => {
          dispatch({
            type: CONTACT_GETCONTACTCOUNTS_FAIL,
            payload: error.message,
          });
        });
    }
  };
};

export const updateContactInfo = contactParams => {
  return (dispatch, getState) => {
    const {user} = getState().auth;
    if (user && user.uid) {
      dispatch({type: CONTACT_UPDATECONTACTINFO_LOADING});
      let url = new URL(API_BASE_URL);
      let params = {
        cmd: API_CMD_UPDATECONTACTINFO,
        uid: user.uid,
        ...contactParams,
      };
      Object.keys(params).forEach(key =>
        url.searchParams.append(key, params[key]),
      );
      fetch(url)
        .then(response => response.json())
        .then(json => {
          if (json.error && json.msg) {
            //Alert.alert(JSON.stringify(json));
            dispatch({
              type: CONTACT_UPDATECONTACTINFO_FAIL,
              payload: 'An error has occured',
            });
          } else {
            //Alert.alert(JSON.stringify(json));
            dispatch({type: CONTACT_UPDATECONTACTINFO_SUCCESS});
          }
        })
        .catch(error => {
          //Alert.alert(error.message);
          dispatch({
            type: CONTACT_UPDATECONTACTINFO_FAIL,
            payload: error.message,
          });
        });
    }

    /*
    dispatch({ type: CONTACT_UPDATECONTACTINFO_LOADING });
    let url = new URL(API_BASE_URL);
    let params = {
      cmd: API_CMD_UPDATECONTACTINFO,
      uid: user.uid,
      uid: '16128',
      ...updateParams,
    };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    fetch(url)
    .then(response => response.json())
    .then(json => {
      if (json.error && json.msg) {
        //Alert.alert(JSON.stringify(json));
        dispatch({ type: CONTACT_UPDATECONTACTINFO_FAIL, payload: 'An error has occured' });
      } else {
        //Alert.alert(JSON.stringify(json));
        dispatch({ type: CONTACT_UPDATECONTACTINFO_SUCCESS, payload: json });
      }
    })
    .catch((error) => {
      //Alert.alert(error.message);
      dispatch({ type: CONTACT_UPDATECONTACTINFO_FAIL, payload: error.message });
    });
    */
  };
};

export const addContact = contactParams => {
  return (dispatch, getState) => {
    const {user} = getState().auth;
    if (user && user.uid) {
      dispatch({type: CONTACT_ADDCONTACT_LOADING});
      let url = new URL(API_BASE_URL);
      let params = {
        cmd: API_CMD_ADDCONTACT,
        uid: user.uid,
        ...contactParams,
      };
      Object.keys(params).forEach(key =>
        url.searchParams.append(key, params[key]),
      );
      console.log('fecth url of add contact is as followxs ', url);
      fetch(url)
        .then(response => response.json())
        .then(json => {
          if (json.error && json.msg) {
            //Alert.alert(JSON.stringify(json));
            dispatch({
              type: CONTACT_ADDCONTACT_FAIL,
              payload: 'An error has occured',
            });
          } else {
            //Alert.alert(JSON.stringify(json));
            console.log(json, 'json');
            dispatch({type: CONTACT_ADDCONTACT_SUCCESS, payload: json});
          }
        })
        .catch(error => {
          //Alert.alert(error.message);
          dispatch({type: CONTACT_ADDCONTACT_FAIL, payload: error.message});
        });
    }
  };
};

export const deleteContact = ({cid}) => {
  return (dispatch, getState) => {
    const {user} = getState().auth;
    if (user && user.uid) {
      dispatch({type: CONTACT_DELETECONTACT_LOADING});
      let url = new URL(API_BASE_URL);
      let params = {
        cmd: API_CMD_DELETECONTACT,
        uid: user.uid,
        cid,
      };
      Object.keys(params).forEach(key =>
        url.searchParams.append(key, params[key]),
      );
      fetch(url)
        .then(response => response.json())
        .then(json => {
          if (json.error && json.msg) {
            //Alert.alert(JSON.stringify(json));
            dispatch({
              type: CONTACT_DELETECONTACT_FAIL,
              payload: 'An error has occured',
            });
          } else {
            //Alert.alert(JSON.stringify(json));
            console.log('delete success');
            dispatch({type: CONTACT_DELETECONTACT_SUCCESS, payload: json});
            // dispatch({ type: CONTACT_IDLE });
          }
        })
        .catch(error => {
          //Alert.alert(error.message);
          dispatch({type: CONTACT_DELETECONTACT_FAIL, payload: error.message});
        });
    }
  };
};

export const updateRatings = ({cid, rating}) => {
  return (dispatch, getState) => {
    const {user} = getState().auth;
    if (user && user.uid) {
      dispatch({type: CONTACT_UPDATERATINGS_LOADING});
      let url = new URL(API_BASE_URL);
      let params = {
        cmd: API_CMD_UPDATE_RATINGS,
        uid: user.uid,
        cid,
        rating,
      };
      Object.keys(params).forEach(key =>
        url.searchParams.append(key, params[key]),
      );
      fetch(url)
        .then(response => response.json())
        .then(json => {
          //console.log(json);
          if (json.error && json.msg) {
            //Alert.alert(JSON.stringify(json));
            dispatch({
              type: CONTACT_UPDATERATINGS_FAIL,
              payload: 'An error has occured',
            });
          } else {
            //Alert.alert(JSON.stringify(json));
            dispatch({type: CONTACT_UPDATERATINGS_SUCCESS});
          }
        })
        .catch(error => {
          //Alert.alert(error.message);
          dispatch({type: CONTACT_UPDATERATINGS_FAIL, payload: error.message});
        });
    }
  };
};

export const setSearchKey = key => {
  return dispatch => {
    dispatch({type: CONTACT_SETSEARCHKEY, payload: key});
  };
};
