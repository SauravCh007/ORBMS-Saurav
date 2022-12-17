import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  API_BASE_URL,
  AUTH_LOGIN_API_BASE_URL,
  API_CMD_LOGINVERIFY,
  API_CMD_FORGOTPASSWORD,
  API_CMD_LOGINPASSWORDLESS,
  API_CMD_RESETPASSWORDLINK,
  API_CMD_USERINFO,
  API_CMD_UPDATEUSERINFO,
  API_CMD_CHANGEPASSWORD,
  AUTH_LOGIN_OTP_VERIFY_API_BASE_URL,
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

export const checkIfLogged = () => {
  return dispatch => {
    dispatch({type: AUTH_CHECKLOGGED_LOADING});
    AsyncStorage.getItem('userLogged')
      .then(userLogged => {
        if (userLogged) {
          let user = JSON.parse(userLogged);
          dispatch({type: AUTH_CHECKLOGGED_SUCCESS, payload: user});
        } else {
          dispatch({type: AUTH_CHECKLOGGED_FAIL, payload: 'No logged user'});
        }
      })
      .catch(error => {
        dispatch({type: AUTH_CHECKLOGGED_FAIL, payload: error.message});
      });
  };
};

export const resetPasswordLink = ({email}) => {
  return dispatch => {
    dispatch({type: AUTH_RESETPASSWORDLINK_LOADING});
    var url = new URL(API_BASE_URL),
      params = {
        cmd: API_CMD_RESETPASSWORDLINK,
        email,
      };
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key]),
    );

    fetch(url)
      .then(response => response.json())
      .then(json => {
        console.log('RESET PASSWORD' + JSON.stringify(json));
        if (json.error && json.msg) {
          dispatch({
            type: AUTH_RESETPASSWORDLINK_FAIL,
            payload: 'An error has occured',
          });
        } else {
          dispatch({type: AUTH_RESETPASSWORDLINK_SUCCESS, payload: json});
        }
      })
      .catch(error => {
        dispatch({type: AUTH_RESETPASSWORDLINK_FAIL, payload: error.message});
      });
  };
};

export const changePassword = ({oldPassword, newPassword}) => {
  return dispatch => {
    dispatch({type: AUTH_CHANGEPASSWORD_LOADING});

    var url = new URL(API_BASE_URL),
      params = {
        cmd: API_CMD_CHANGEPASSWORD,
        oldPassword: oldPassword,
        password: newPassword,
      };
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key]),
    );

    fetch(url)
      .then(response => response.json())
      .then(json => {
        console.log('CHANGE PASSWORD' + JSON.stringify(json));
        if (json.error && json.msg) {
          dispatch({
            type: AUTH_CHANGEPASSWORD_FAIL,
            payload: 'An error has occured',
          });
        } else {
          dispatch({type: AUTH_CHANGEPASSWORD_SUCCESS}); //, payload: json });
        }
      })
      .catch(error => {
        dispatch({type: AUTH_CHANGEPASSWORD_FAIL, payload: error.message});
      });
  };
};

export const loginUser = ({email, password}) => {
  return dispatch => {
    dispatch({type: AUTH_LOGIN_LOADING});

    var url = new URL(API_BASE_URL),
      params = {
        cmd: API_CMD_LOGINVERIFY,
        email,
        password,
      };
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key]),
    );
    console.log("loginUser url",url)
    fetch(url)

      .then(response => response.json())
      .then(json => {
        if (json.error && json.msg) {
          dispatch({
            type: AUTH_LOGIN_FAIL,
            payload: `An error has occured:\n${json.msg}`,
          });
        } else {
          //Alert.alert(json.uid);
          dispatch({type: AUTH_LOGIN_SUCCESS, payload: json});
          AsyncStorage.setItem('userLogged', JSON.stringify(json));
        }
      })
      .catch(error => {
        Alert.alert("Error from login",JSON.stringify(error));
        dispatch({type: AUTH_LOGIN_FAIL, payload: error.message});
      });
  };
};

export const getUserInfo = () => {
  return (dispatch, getState) => {
    const {user} = getState().auth;
    //if (user && user.uid) {
    dispatch({type: AUTH_LOGIN_LOADING});

    var url = new URL(API_BASE_URL),
      params = {
        cmd: API_CMD_USERINFO,
        uid: user.uid,
        // uid: '16128',
      };
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key]),
    );

    fetch(url)
      .then(response => response.json())
      .then(json => {
        console.log('response of get user info is as follows ', json);
        if (json.error && json.msg) {
          //Alert.alert(JSON.stringify(json));
          dispatch({type: AUTH_USERINFO_FAIL, payload: 'An error has occured'});
        } else {
          //Alert.alert(JSON.stringify(json));
          dispatch({type: AUTH_USERINFO_SUCCESS, payload: json});
          AsyncStorage.setItem(
            'userLogged',
            JSON.stringify({...user, ...json}),
          );
        }
      })
      .catch(error => {
        //Alert.alert('test');
        dispatch({type: AUTH_USERINFO_FAIL, payload: error.message});
      });
    //}
  };
};

export const updateUserInfo = ({updates}) => {
  return (dispatch, getState) => {
    const {user} = getState().auth;
    //if (user && user.uid) {
    dispatch({type: AUTH_UPDATEUSERINFO_LOADING});

    var url = new URL(API_BASE_URL),
      params = {
        cmd: API_CMD_UPDATEUSERINFO,
        uid: user.uid,
        //first_name: 'ray',
      };
      console.log("sending update userinfor payload ==>>>",params)
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key]),
    );

    //let urlString = `${API_BASE_URL}?uid=${user.uid}&cmd=${API_CMD_UPDATEUSERINFO}`

    let formData = new FormData();
    let keys = Object.keys(updates);
    keys.forEach(item => {
      formData.append(item, updates[item]);
    });
    console.log('params we are sending is as follows ', formData, url);
    fetch(url, {
      method: 'post',
      body: formData,
    })
      .then(response => response.json())
      .then(json => {
        console.log('post result - ' + JSON.stringify(json));
        if (json.error && json.msg) {
          //Alert.alert(JSON.stringify(json));
          dispatch({
            type: AUTH_UPDATEUSERINFO_FAIL,
            payload: 'An error has occured',
          });
        } else {
          //Alert.alert(JSON.stringify(json));
          let updatedUser = user;
          updatedUser = {...updatedUser, ...updates};

          dispatch({type: AUTH_UPDATEUSERINFO_SUCCESS, payload: updatedUser});
          AsyncStorage.setItem('userLogged', JSON.stringify(updatedUser));
          // AsyncStorage.removeItem('userLogged');
        }
      })
      .catch(error => {
        //Alert.alert('test');
        console.log(error);
        dispatch({type: AUTH_UPDATEUSERINFO_FAIL, payload: error.message});
      });
    //}
  };
};

export const signOutUser = () => {
  return dispatch => {
    AsyncStorage.getAllKeys()
      .then(keys => AsyncStorage.multiRemove(keys))
      .then(() => {
        // console.log(keys, 'keys+++++++++++++')
        // alert('success'));
        dispatch({type: AUTH_SIGNOUT_SUCCESS});
      });
    // AsyncStorage.multiRemove('userLogged')
    // .then(() => {
    //   dispatch({ type: AUTH_SIGNOUT_SUCCESS });
    // });
  };
};

export const checkLoginAuthUser = ({
  client_id,
  connection,
  phone_number,
  send,
}) => {
  return dispatch => {
    dispatch({type: AUTH_SIGNIN_LOADING});

    var url = new URL(AUTH_LOGIN_API_BASE_URL);
    let requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        client_id,
        connection,
        phone_number,
        send,
      }),
    };
    {
      console.log('TTTTT', requestOptions);
    }
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(json => {
        if (json.error && json.msg) {
          {
            console.log('TYTYTY', json.msg);
          }
          dispatch({
            type: AUTH_SIGNIN_FAIL,
            payload: `An error has occured:\n${json.msg}`,
          });
        } else {
          //Alert.alert(json.uid);

          {
            console.log('TYTYTY52' + json.error);
          }

          if (json.error) {
            {
              console.log('IF ERROR' + JSON.stringify(json));
            }
          } else {
            {
              console.log('ELSE ERROR' + JSON.stringify(json));
            }

            // AsyncStorage.setItem('userLogged', JSON.stringify(json));
          }

          dispatch({type: AUTH_SIGNIN_SUCCESS, payload: json});
        }
      })
      .catch(error => {
        Alert.alert(JSON.stringify(error));
        {
          console.log('TYTYTY8', error);
        }

        dispatch({type: AUTH_SIGNIN_FAIL, payload: error.message});
      });
  };
};

export const checkOTPAuthUser = ({
  grant_type,
  client_id,
  username,
  otp,
  realm,
  audience,
  scope,
}) => {
  return dispatch => {
    dispatch({type: AUTH_OTP_LOADING});

    var url = new URL(AUTH_LOGIN_OTP_VERIFY_API_BASE_URL);
    let requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        grant_type,
        client_id,
        username,
        otp,
        realm,
        audience,
        scope,
      }),
    };
    {
      console.log('TTTTT', requestOptions);
    }
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(json => {
        if (json.error && json.msg) {
          {
            console.log('TYTYTY', json.msg);
          }
          dispatch({
            type: AUTH_OTP_FAIL,
            payload: `An error has occured:\n${json.msg}`,
          });
        } else {
          //Alert.alert(json.uid);

          {
            console.log('TYTYTY52' + json.error);
          }

          if (json.error) {
            {
              console.log('IF ERROR' + JSON.stringify(json));
            }
          } else {
            {
              console.log(
                '+++++++++++++++ELSE ERROR',
                json,
                JSON.stringify(json),
              );
            }

            //AsyncStorage.setItem('userLogged', JSON.stringify(json));
          }

          dispatch({type: AUTH_OTP_SUCCESS, payload: json});
        }
      })
      .catch(error => {
        Alert.alert(JSON.stringify(error));
        {
          console.log('***********TYTYTY8', error);
        }

        dispatch({type: AUTH_OTP_FAIL, payload: error.message});
      });
  };
};

export const loginPasswordLess = ({token}) => {
  console.log('came in login password leess', token);
  return dispatch => {
    dispatch({type: AUTH_PASSWORDLESS_LOADING});
    // var token=AsyncStorage.getItem(('userIdToken'));
    var url = new URL(API_BASE_URL),
      params = {
        cmd: API_CMD_LOGINPASSWORDLESS,
        token,
      };
    console.log('&&&&&&&&&&&&&&&&url is as follows ', url);
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key]),
    );
    console.log('&&&&&&&&&&&&&&&&url is as follows ', url);

    fetch(url)
      .then(response => {
        console.log('response is as follows ', response);
        return response.json();
      })
      .then(json => {
        if (json.error && json.msg) {
          dispatch({
            type: AUTH_PASSWORDLESS_FAIL,
            payload: `An error has occured:\n${json.msg}`,
          });
        } else {
          //Alert.alert(json.uid);
          dispatch({type: AUTH_PASSWORDLESS_SUCCESS, payload: json});
          AsyncStorage.setItem('userLogged', JSON.stringify(json));
        }
      })
      .catch(error => {
        console.log('came in login password less', error);
        Alert.alert(error.error);
        dispatch({type: AUTH_PASSWORDLESS_FAIL, payload: error.message});
      });
  };
};
