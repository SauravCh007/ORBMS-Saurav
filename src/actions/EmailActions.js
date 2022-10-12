import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  API_BASE_URL,
  API_CMD_GETEMAILTEMPLATES,
  API_CMD_GETINBOXEMAILS,
  API_CMD_GETSENTEMAILS,
  API_CMD_GETTRASHEMAILS,
  API_CMD_READSTATUSEMAIL,
  API_CMD_DELETEEMAIL,
  API_CMD_SENDEMAIL,
  API_CMD_EMAILACCOUNTS,
  API_CMD_MARKEMAILSEEN,

  EMAIL_GETEMAILTEMPLATES_LOADING,
  EMAIL_GETEMAILTEMPLATES_SUCCESS,
  EMAIL_GETEMAILTEMPLATES_FAIL,
  EMAIL_INBOXMAIL_LOADING,
  EMAIL_INBOXMAIL_SUCCESS,
  EMAIL_INBOXMAIL_FAIL,
  EMAIL_SENTMAIL_LOADING,
  EMAIL_SENTMAIL_SUCCESS,
  EMAIL_SENTMAIL_FAIL,
  EMAIL_TRASHMAIL_LOADING,
  EMAIL_TRASHMAIL_SUCCESS,
  EMAIL_TRASHMAIL_FAIL,
  EMAIL_READSTATUS_LOADING,
  EMAIL_READSTATUS_SUCCESS,
  EMAIL_READSTATUS_FAIL,
  EMAIL_DELETEEMAIL_LOADING,
  EMAIL_DELETEEMAIL_SUCCESS,
  EMAIL_DELETEEMAIL_FAIL,
  EMAIL_SENDEMAIL_LOADING,
  EMAIL_SENDEMAIL_SUCCESS,
  EMAIL_SENDEMAIL_FAIL,
  
  EMAIL_SETCURRENTMAILBOX_SUCCESS,

  EMAIL_GETMAILBOXES_LOADING,
  EMAIL_GETMAILBOXES_SUCCESS,
  EMAIL_GETMAILBOXES_FAIL,

  EMAIL_SCHEDULED_SUCCESS,
  EMAIL_ARCHIVED_SUCCESS,
  EMAIL_SPAM_SUCCESS,

  EMAIL_MOVEEMAIL_LOADING,
  EMAIL_MOVEEMAIL_SUCCESS,
  EMAIL_MOVEEMAIL_FAIL,
  EMAIL_MOVEALLEMAIL_SUCCESS,

  EMAIL_TOGGLE_SEENFILTER,

  API_CMD_IMAPMOVETRASH,
  API_CMD_IMAPMOVEINBOX,
  API_CMD_IMAPMOVESPAM,
  API_CMD_IMAPMOVEARCHIVE,

  EMAIL_MARKASSEEN_LOADING,
  EMAIL_MARKASSEEN_SUCCESS,
  EMAIL_MARKASSEEN_FAIL,

  EMAIL_MAILBOXNOTIFS_SUCCESS

} from '../actions/types';

export const getImapEmails = ({ box, email, searchkey, flag=2 }) => {
  return (dispatch, getState) => {
    const { user } = getState().auth;
    if (user && user.uid) {
      dispatch({ type: EMAIL_INBOXMAIL_LOADING });

      // Alert.alert(user.uid)

      let url = new URL(API_BASE_URL);
      let params = {
        uid: user.uid,
        cmd: 'get_imap_emails',
        box: box,
        email_account: email,
        
        /*
        uid: '17812',//user.uid,
        cmd: 'get_imap_emails',
        box,
        email_account: 'Marcus@warriordistributing.com',
        */

        //start,
        //size,
      };

      if (searchkey && searchkey !== '') {
        params['searchkey'] = searchkey;
      }

      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

      console.log(url, 'emailUrl');
      if(flag == 1) {
        fetch(url)
        .then(response => response.json())
        .then(json => {
          console.log('get imap - ', json);
          if (json.error && json.msg) {
            dispatch({ type: EMAIL_INBOXMAIL_FAIL, payload: 'An error has occured' });
          } else {
            AsyncStorage.setItem(`${email}+${box}`, JSON.stringify(json));
            // Alert.alert('success');
            //console.log('get imap  - ' + email +' - ' + `${box} - ` + JSON.stringify(json));
            switch (box) {
              case global.box_inbox:
                dispatch({ type: EMAIL_INBOXMAIL_SUCCESS, payload: { [`${email}`] : json } });

                if (json) {
                  let count = 0;
                  json.forEach(item => {
                    if (!item.seen) {
                      count += 1;
                    }
                  });

                  // Alert.alert('found - ' + count);
                  let newObj = {};
                  newObj[`${email}`] = count;

                  dispatch({ type: EMAIL_MAILBOXNOTIFS_SUCCESS, payload: newObj });
                  // Alert.alert('found - ' + count);
                }
                break;
              case global.box_sent:
                dispatch({ type: EMAIL_SENTMAIL_SUCCESS, payload: { [`${email}`] : json } });
                break;
              case global.box_scheduled:
                dispatch({ type: EMAIL_SCHEDULED_SUCCESS, payload: { [`${email}`] : json } });
                break;
              case global.box_archive:
                dispatch({ type: EMAIL_ARCHIVED_SUCCESS, payload: { [`${email}`] : json } });
                break;
              case global.box_trash:
                dispatch({ type: EMAIL_TRASHMAIL_SUCCESS, payload: { [`${email}`] : json } });
                break;
              case global.box_spam:
                dispatch({ type: EMAIL_SPAM_SUCCESS, payload: { [`${email}`] : json } });
                break;
              default:
                // dispatch({ type: EMAIL_INBOXMAIL_SUCCESS, payload: json });
                dispatch({ type: EMAIL_INBOXMAIL_FAIL, payload: 'Unkown Box' });
                break;
            }
            // dispatch({ type: EMAIL_INBOXMAIL_SUCCESS, payload: json });
          }
        })
        .catch((error) => {
          // Alert.alert(JSON.stringify(error));
          //console.log('get imap error - ' + error);
          dispatch({ type: EMAIL_INBOXMAIL_FAIL, payload: error.message });
        });
      } else {
        AsyncStorage.getItem(`${email}+${box}`).then((response) => {
          if (response != '' && response != null) {
            // console.log('Call from local storage ******************');
            let data = JSON.parse(response);
            console.log(data, 'data from local storage*****************');
            switch (box) {
              case global.box_inbox:
                dispatch({ type: EMAIL_INBOXMAIL_SUCCESS, payload: { [`${email}`] : data } });
  
                if (data) {
                  let count = 0;
                  data.forEach(item => {
                    if (!item.seen) {
                      count += 1;
                    }
                  });
  
                  // Alert.alert('found - ' + count);
                  let newObj = {};
                  newObj[`${email}`] = count;
  
                  dispatch({ type: EMAIL_MAILBOXNOTIFS_SUCCESS, payload: newObj });
                  // Alert.alert('found - ' + count);
                }
                break;
              case global.box_sent:
                dispatch({ type: EMAIL_SENTMAIL_SUCCESS, payload: { [`${email}`] : data } });
                break;
              case global.box_scheduled:
                dispatch({ type: EMAIL_SCHEDULED_SUCCESS, payload: { [`${email}`] : data } });
                break;
              case global.box_archive:
                dispatch({ type: EMAIL_ARCHIVED_SUCCESS, payload: { [`${email}`] : data } });
                break;
              case global.box_trash:
                dispatch({ type: EMAIL_TRASHMAIL_SUCCESS, payload: { [`${email}`] : data } });
                break;
              case global.box_spam:
                dispatch({ type: EMAIL_SPAM_SUCCESS, payload: { [`${email}`] : data } });
                break;
              default:
                // dispatch({ type: EMAIL_INBOXMAIL_SUCCESS, payload: json });
                dispatch({ type: EMAIL_INBOXMAIL_FAIL, payload: 'Unkown Box' });
                break;
            }
          } else {
            // console.log('Call from api ******************');
            fetch(url)
            .then(response => response.json())
            .then(json => {
              // console.log('get imap - ' + JSON.stringify(json));
              if (json.error && json.msg) {
                dispatch({ type: EMAIL_INBOXMAIL_FAIL, payload: 'An error has occured' });
              } else {
                AsyncStorage.setItem(`${email}+${box}`, JSON.stringify(json));
                // Alert.alert('success');
                //console.log('get imap  - ' + email +' - ' + `${box} - ` + JSON.stringify(json));
                switch (box) {
                  case global.box_inbox:
                    dispatch({ type: EMAIL_INBOXMAIL_SUCCESS, payload: { [`${email}`] : json } });
  
                    if (json) {
                      let count = 0;
                      json.forEach(item => {
                        if (!item.seen) {
                          count += 1;
                        }
                      });
  
                      // Alert.alert('found - ' + count);
                      let newObj = {};
                      newObj[`${email}`] = count;
  
                      dispatch({ type: EMAIL_MAILBOXNOTIFS_SUCCESS, payload: newObj });
                      // Alert.alert('found - ' + count);
                    }
                    break;
                  case global.box_sent:
                    dispatch({ type: EMAIL_SENTMAIL_SUCCESS, payload: { [`${email}`] : json } });
                    break;
                  case global.box_scheduled:
                    dispatch({ type: EMAIL_SCHEDULED_SUCCESS, payload: { [`${email}`] : json } });
                    break;
                  case global.box_archive:
                    dispatch({ type: EMAIL_ARCHIVED_SUCCESS, payload: { [`${email}`] : json } });
                    break;
                  case global.box_trash:
                    dispatch({ type: EMAIL_TRASHMAIL_SUCCESS, payload: { [`${email}`] : json } });
                    break;
                  case global.box_spam:
                    dispatch({ type: EMAIL_SPAM_SUCCESS, payload: { [`${email}`] : json } });
                    break;
                  default:
                    // dispatch({ type: EMAIL_INBOXMAIL_SUCCESS, payload: json });
                    dispatch({ type: EMAIL_INBOXMAIL_FAIL, payload: 'Unkown Box' });
                    break;
                }
                // dispatch({ type: EMAIL_INBOXMAIL_SUCCESS, payload: json });
              }
            })
            .catch((error) => {
              // Alert.alert(JSON.stringify(error));
              //console.log('get imap error - ' + error);
              dispatch({ type: EMAIL_INBOXMAIL_FAIL, payload: error.message });
            });
          }
        })
      }
    }
  }
}

export const setCurrentMailbox = ({ email }) => {
  return (dispatch) => {
    dispatch({ type: EMAIL_SETCURRENTMAILBOX_SUCCESS, payload: email });
  }
}
export const sendEmail = ({ email }) => {
  return (dispatch, getState) => {
    const { user } = getState().auth;
    if (user && user.uid) {
      dispatch({ type: EMAIL_SENDEMAIL_LOADING });

      //console.log("SENDING");

      let url = new URL(API_BASE_URL);
      let params = {
        cmd: 'send_email',
        uid: user.uid,
        // ...email,
      };
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

      //console.log('send email - ' + JSON.stringify(url));

      let formData = new FormData();
      let keys = Object.keys(email);
      keys.forEach(item => {
        formData.append(item, email[item]);
      });

      formData.append('uid', user.uid);

      //console.log('post email - ' + JSON.stringify(formData));
      console.log(url, formData, 'url formdata ===>');

      fetch(url, {
        method: 'post',
        body: formData
      })
      .then(response => response.json())
      .then(json => {
        //console.log('email sent = ' + JSON.stringify(json));
        if (json.error && json.msg) {
          dispatch({ type: EMAIL_SENDEMAIL_FAIL, payload: 'An error has occured' });
        } else {

          if (!json.success) {
            dispatch({ type: EMAIL_SENDEMAIL_FAIL, payload: json.message ? json.message : 'An error has occured' });

          } else {
            dispatch({ type: EMAIL_SENDEMAIL_SUCCESS, payload: json.message ? json.message : 'Email sent' });
          }
          // Alert.alert('success');
        }
      })
      .catch((error) => {
        //console.log(error.message);
        dispatch({ type: EMAIL_SENDEMAIL_FAIL, payload: error.message });
      });
    }
  }
}

export const moveEmail = ({ eids, cmd, from, to }) => {
  return (dispatch, getState) => {


    const { user } = getState().auth;
    if (user && user.uid) {
      dispatch({ type: EMAIL_MOVEEMAIL_LOADING });

      let url = new URL(API_BASE_URL);
      let params = {
        cmd,
        uid: user.uid,
        from, 
        to,
        'eids[]': eids,
      };
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

      console.log('move params ' , url, params);

      fetch(url)
      .then(response => response.json())
      .then(json => {
        console.log('move email = ', json);
        if (json.error && json.msg) {
          dispatch({ type: EMAIL_MOVEEMAIL_FAIL, payload: 'An error has occured' });
        } else {
          dispatch({ type: EMAIL_MOVEEMAIL_SUCCESS, payload: json });
        }
      })
      .catch((error) => {
        dispatch({ type: EMAIL_MOVEEMAIL_FAIL, payload: error.message });
      });
    }
  }
}

export const moveAllEmail = ({ cmd, from, to, email_account}) => {
  return (dispatch, getState) => {


    const { user } = getState().auth;
    if (user && user.uid) {
      dispatch({ type: EMAIL_MOVEEMAIL_LOADING });

      let url = new URL(API_BASE_URL);
      let params = {
        cmd,
        uid: user.uid,
        from, 
        to,
        email_account
      };
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

      console.log('mass move params ' , url, params);

      fetch(url)
      .then(response => response.json())
      .then(json => {
        console.log('move email = ', json);
        if (json.error && json.msg) {
          dispatch({ type: EMAIL_MOVEEMAIL_FAIL, payload: 'An error has occured' });
        } else {
          dispatch({ type: EMAIL_MOVEALLEMAIL_SUCCESS, payload: json });
        }
      })
      .catch((error) => {
        dispatch({ type: EMAIL_MOVEEMAIL_FAIL, payload: error.message });
      });
    }
  }
}

export const getEmailTemplates = () => {
  return (dispatch, getState) => {

    const { user } = getState().auth;
    if (user && user.uid) {
      dispatch({ type: EMAIL_GETEMAILTEMPLATES_LOADING });

      let url = new URL(API_BASE_URL);
      let params = {
        cmd: 'get_email_templates',
        uid: user.uid,
      };
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))



      fetch(url)
      .then(response => response.json())
      .then(json => {
        console.log('templates = ' + JSON.stringify(json));
        if (json.error && json.msg) {
          dispatch({ type: EMAIL_GETEMAILTEMPLATES_FAIL, payload: 'An error has occured' });
        } else {
          // Alert.alert('success');
          dispatch({ type: EMAIL_GETEMAILTEMPLATES_SUCCESS, payload: json });
        }
      })
      .catch((error) => {
        dispatch({ type: EMAIL_GETEMAILTEMPLATES_FAIL, payload: error.message });
      });
    }
  }
}

export const getMailboxes = () => {
  return (dispatch, getState) => {
    const { user } = getState().auth;
    if (user && user.uid) {
      dispatch({ type: EMAIL_GETMAILBOXES_LOADING });

      let url = new URL(API_BASE_URL);
      let params = {
        cmd: API_CMD_EMAILACCOUNTS,
        uid: user.uid,
      };
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
      fetch(url)
      .then(response => response.json())
      .then(json => {
        if (json.error && json.msg) {
          dispatch({ type: EMAIL_GETMAILBOXES_FAIL, payload: 'An error has occured' });
        } else {
          // Alert.alert('success');
          console.log('mailboxes = ', json);
          dispatch({ type: EMAIL_GETMAILBOXES_SUCCESS, payload: json });
        }
      })
      .catch((error) => {
        dispatch({ type: EMAIL_GETMAILBOXES_FAIL, payload: error.message });
      });
    }
  }
}

export const getEmailInbox = ({ start, size }) => {
  return (dispatch, getState) => {
    const { user } = getState().auth;
    if (user && user.uid) {
      dispatch({ type: EMAIL_INBOXMAIL_LOADING });

      let url = new URL(API_BASE_URL);
      let params = {
        cmd: API_CMD_GETINBOXEMAILS,
        uid: user.uid,
        start,
        size,
      };
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

      fetch(url)
      .then(response => response.json())
      .then(json => {
        if (json.error && json.msg) {
          dispatch({ type: EMAIL_INBOXMAIL_FAIL, payload: 'An error has occured' });
        } else {
          // Alert.alert('success');
          console.log('getEmailInbox = ' + JSON.stringify(json));
          dispatch({ type: EMAIL_INBOXMAIL_SUCCESS, payload: json });
        }
      })
      .catch((error) => {
        dispatch({ type: EMAIL_INBOXMAIL_FAIL, payload: error.message });
      });
    }
  }
}

export const getEmailSent = ({ start, size }) => {
  return (dispatch, getState) => {
    const { user } = getState().auth;
    if (user && user.uid) {
      dispatch({ type: EMAIL_SENTMAIL_LOADING });

      let url = new URL(API_BASE_URL);
      let params = {
        cmd: API_CMD_GETINBOXEMAILS,
        uid: user.uid,
        start,
        size,
      };
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

      fetch(url)
      .then(response => response.json())
      .then(json => {
        if (json.error && json.msg) {
          dispatch({ type: EMAIL_SENTMAIL_FAIL, payload: 'An error has occured' });
        } else {
          //Alert.alert(json);
          console.log('getEmailSent = ' + JSON.stringify(json));
          dispatch({ type: EMAIL_SENTMAIL_SUCCESS, payload: json });
        }
      })
      .catch((error) => {
        dispatch({ type: EMAIL_SENTMAIL_FAIL, payload: error.message });
      });
    }
  }
}

export const getEmailTrash = ({ start, size }) => {
  return (dispatch, getState) => {
    const { user } = getState().auth;
    if (user && user.uid) {
      dispatch({ type: EMAIL_TRASHMAIL_LOADING });

      let url = new URL(API_BASE_URL);
      let params = {
        cmd: API_CMD_GETTRASHEMAILS,
        uid: user.uid,
        start,
        size,
      };
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

      fetch(url)
      .then(response => response.json())
      .then(json => {
        if (json.error && json.msg) {
          dispatch({ type: EMAIL_TRASHMAIL_FAIL, payload: 'An error has occured' });
        } else {
          //Alert.alert(json);
          console.log('getEmailTrash = ' + JSON.stringify(json));
          dispatch({ type: EMAIL_TRASHMAIL_SUCCESS, payload: json });
        }
      })
      .catch((error) => {
        dispatch({ type: EMAIL_TRASHMAIL_FAIL, payload: error.message });
      });
    }
  }
}

export const toggleSeenFilter = () => {
  return (dispatch, getState) => {
    const { emailHideSeen } = getState().emails;
    dispatch({ type: EMAIL_TOGGLE_SEENFILTER, payload: !emailHideSeen });

  }
}

export const markEmailAsSeen = ({ eid, box, email_account }) => {
  return (dispatch, getState) => {
    const { user } = getState().auth;
    if (user && user.uid) {
      dispatch({ type: EMAIL_MARKASSEEN_LOADING });

      let url = new URL(API_BASE_URL);
      let params = {
        cmd: API_CMD_MARKEMAILSEEN,
        uid: user.uid,
        eid,
        box,
        email_account,
      };
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

      fetch(url)
      .then(response => response.json())
      .then(json => {
        //console.log('MARK AS SEEN ' + JSON.stringify(json));
        if (json.error && json.msg) {
          dispatch({ type: EMAIL_MARKASSEEN_FAIL, payload: 'An error has occured' });
        } else {
          //Alert.alert(json);
          dispatch({ type: EMAIL_MARKASSEEN_SUCCESS, payload: json });
        }
      })
      .catch((error) => {
        dispatch({ type: EMAIL_MARKASSEEN_FAIL, payload: error.message });
      });
    }
  }
}
