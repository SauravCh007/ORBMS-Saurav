import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  API_BASE_URL,
  API_CMD_GETTASKTYPES,
  API_CMD_ADDTASK,
  API_CMD_EDITTASK,
  API_CMD_CALENDARTASKS,
  API_CMD_DELETETASK,
  API_CMD_USER_TASKS,
  API_CMD_TASKDETAILS,
  API_CMD_ALLTASK,
  TASK_SETSEARCHKEY,
  TASK_GETTASKTYPES_LOADING,
  TASK_GETTASKTYPES_SUCCESS,
  TASK_GETTASKTYPES_FAIL,
  TASK_ADDTASK_LOADING,
  TASK_ADDTASK_SUCCESS,
  TASK_ADDTASK_FAIL,
  TASK_EDITTASK_LOADING,
  TASK_EDITTASK_SUCCESS,
  TASK_EDITTASK_FAIL,
  TASK_CALENDARTASKS_LOADING,
  TASK_CALENDARTASKS_SUCCESS,
  TASK_CALENDARTASKS_FAIL,
  TASK_DELETETASK_LOADING,
  TASK_DELETETASK_SUCCESS,
  TASK_DELETETASK_FAIL,
  TASK_USERTASKS_LOADING,
  TASK_USERTASKS_SUCCESS,
  TASK_USERTASKS_FAIL,
  TASK_TASKDETAILS_LOADING,
  TASK_TASKDETAILS_SUCCESS,
  TASK_TASKDETAILS_FAIL,
  ALL_TASK_LOADING,
  ALL_TASK_SUCCESS,
  ALL_TASK_FAIL,
  TASK_IDLE,
  ALL_DSC_TASK_LOADING,
  ALL_DSC_TASK_SUCCESS,
  ALL_DSC_TASK_FAIL,
} from '../actions/types';

export const getCalendarTasks = ({year, month, flag = 0}) => {
  return (dispatch, getState) => {
    const {user} = getState().auth;

    if (user && user.uid) {
      dispatch({type: TASK_CALENDARTASKS_LOADING});

      let url = new URL(API_BASE_URL);
      let params = {
        cmd: API_CMD_CALENDARTASKS,
        uid: user.uid,
        year,
        month,
      };
      Object.keys(params).forEach(key =>
        url.searchParams.append(key, params[key]),
      );

      if (flag == 1) {
        // console.log(url, 'calendar task url===>');
        fetch(url)
          .then(response => response.json())
          .then(json => {
            if (json.error && json.msg) {
              dispatch({
                type: TASK_CALENDARTASKS_FAIL,
                payload: 'An error has occured',
              });
            } else {
              //Alert.alert(json);
              AsyncStorage.setItem(`${year}+${month}`, JSON.stringify(json));
              console.log('tasks from api- **********', json);
              dispatch({type: TASK_CALENDARTASKS_SUCCESS, payload: json});
            }
          })
          .catch(error => {
            dispatch({type: TASK_CALENDARTASKS_FAIL, payload: error.message});
          });
      } else {
        AsyncStorage.getItem(`${year}+${month}`).then(response => {
          if (response != '' && response != null) {
            console.log(
              'tasks from local storage- **********',
              JSON.parse(response),
            );
            dispatch({
              type: TASK_CALENDARTASKS_SUCCESS,
              payload: JSON.parse(response),
            });
          } else {
            fetch(url)
              .then(response => response.json())
              .then(json => {
                if (json.error && json.msg) {
                  dispatch({
                    type: TASK_CALENDARTASKS_FAIL,
                    payload: 'An error has occured',
                  });
                } else {
                  //Alert.alert(json);
                  AsyncStorage.setItem(
                    `${year}+${month}`,
                    JSON.stringify(json),
                  );
                  console.log('tasks from api- **********', json);
                  dispatch({type: TASK_CALENDARTASKS_SUCCESS, payload: json});
                }
              })
              .catch(error => {
                dispatch({
                  type: TASK_CALENDARTASKS_FAIL,
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

export const setCalendarDate = calendarDate => {
  return dispatch => {
    dispatch({type: TASK_CALENDARTASKS_FAIL, payload: calendarDate});
  };
};

export const getTaskTypes = () => {
  return (dispatch, getState) => {
    const {user} = getState().auth;

    if (user && user.uid) {
      dispatch({type: TASK_GETTASKTYPES_LOADING});

      let url = new URL(API_BASE_URL);
      let params = {
        cmd: API_CMD_GETTASKTYPES,
        uid: user.uid,
      };
      Object.keys(params).forEach(key =>
        url.searchParams.append(key, params[key]),
      );
      console.log('url we are sending is as followw s', url);
      fetch(url)
        .then(response => response.json())
        
        .then(json => {
          console.log('task ', json);
          if (json.error && json.msg) {
            dispatch({
              type: TASK_GETTASKTYPES_FAIL,
              payload: 'An error has occured',
            });
          } else {
            //Alert.alert(json);
            console.log('task success here ', json);
            dispatch({type: TASK_GETTASKTYPES_SUCCESS, payload: json});
          }
        })
        .catch(error => {
          console.log('task error here is as follows ', error);
          dispatch({type: TASK_GETTASKTYPES_FAIL, payload: error.message});
        });
    } else {
    }
  };
};

export const saveTask = parameters => {
  return (dispatch, getState) => {
    const {user} = getState().auth;

    if (user && user.uid && parameters.title && parameters.date) {
      dispatch({type: TASK_ADDTASK_LOADING});
      console.log('data we are sending is as follows ', {
        cmd: API_CMD_ADDTASK,
        uid: user.uid,
        cid: parameters.cid,
        title: parameters.title,
        date: parameters.date,
      });
      var url = new URL(API_BASE_URL),
        params = {
          cmd: API_CMD_ADDTASK,
          uid: user.uid,
          cid: parameters.cid,
          title: parameters.title,
          date: parameters.date,
        };
      console.log('vvvv', params);
      if (parameters.comment && parameters.comment !== '') {
        params = {...params, comment: parameters.comment};
      }
      if (parameters.type && parameters.type !== '') {
        params = {...params, type: parameters.type};
      }

      Object.keys(params).forEach(key =>
        url.searchParams.append(key, params[key]),
      );
      console.log(url, 'url=>>>>>>>>>>>>');
      fetch(url)
        .then(response => response.json())
        .then(json => {
          console.log(json, '+++++++________ggg');

          if (json.error && json.msg) {
            dispatch({
              type: TASK_ADDTASK_FAIL,
              payload: 'An error has occured',
            });
          } else {
            console.log('set task');
            AsyncStorage.setItem('newTask', JSON.stringify(true));
            dispatch({type: TASK_ADDTASK_SUCCESS, payload: json});
            dispatch({type: TASK_IDLE});
          }
        })
        .catch(error => {
          dispatch({type: TASK_ADDTASK_FAIL, payload: error.message});
        });
    }
  };
};

export const editTask = parameters => {
  return (dispatch, getState) => {
    const {user} = getState().auth;
    if (user && user.uid && parameters.title) {
      dispatch({type: TASK_EDITTASK_LOADING});

      var url = new URL(API_BASE_URL),
        params = {
          cmd: API_CMD_EDITTASK,
          uid: user.uid,
          task_did: parameters.did,
          task_title: parameters.title,
        };

      if (parameters.comment && parameters.comment !== '') {
        params = {...params, task_comment: parameters.comment};
      }
      if (parameters.date && parameters.date !== '') {
        params = {...params, task_date: parameters.date};
      }
      if (parameters.type && parameters.type !== '') {
        params = {...params, task_type: parameters.type};
      }
      if (parameters.status && parameters.status !== '') {
        params = {...params, status: parameters.status};
      }

      Object.keys(params).forEach(key =>
        url.searchParams.append(key, params[key]),
      );
      console.log(url, 'edit task===>', parameters);
      fetch(url)
        .then(response => response.json())
        .then(json => {
          if (json.error && json.msg) {
            dispatch({
              type: TASK_EDITTASK_FAIL,
              payload: 'An error has occured',
            });
          } else {
            dispatch({type: TASK_EDITTASK_SUCCESS, payload: json});
            dispatch({type: TASK_IDLE});
          }
        })
        .catch(error => {
          dispatch({type: TASK_EDITTASK_FAIL, payload: error.message});
        });
    }
  };
};

export const deleteTask = parameters => {
  return (dispatch, getState) => {
    const {user} = getState().auth;

    if (user && user.uid) {
      dispatch({type: TASK_DELETETASK_LOADING});

      var url = new URL(API_BASE_URL),
        params = {
          cmd: API_CMD_DELETETASK,
          uid: user.uid,
          did: parameters.did,
        };
      Object.keys(params).forEach(key =>
        url.searchParams.append(key, params[key]),
      );

      fetch(url)
        .then(response => response.json())
        .then(json => {
          if (json.error && json.msg) {
            dispatch({
              type: TASK_DELETETASK_FAIL,
              payload: 'An error has occured',
            });
          } else {
            dispatch({type: TASK_DELETETASK_SUCCESS, payload: json});
            dispatch({type: TASK_IDLE});
          }
        })
        .catch(error => {
          dispatch({type: TASK_DELETETASK_FAIL, payload: error.message});
        });
    }
  };
};

export const getAscendingList = parameters => {
  return (dispatch, getState) => {
    const {user} = getState().auth;
    if (user && user.uid) {
      dispatch({type: ALL_TASK_LOADING});

      var url = new URL(API_BASE_URL),
        params = {
          cmd: API_CMD_ALLTASK,
          uid: user.uid,
          year: parameters.year,
          month: parameters.month,
          type: parameters.type,
          sort: parameters.sort,
          search_key: parameters.search_key,
          complete_task: parameters.complete_task,
          active_task: parameters.active_task,
        };

      Object.keys(params).forEach(key =>
        url.searchParams.append(key, params[key]),
      );
      console.log(url, 'all task===>', parameters);
      console.log('all task===>', parameters + '========' + url);
      fetch(url)
        .then(response => response.json())
        .then(json => {
          if (json.error && json.msg) {
            dispatch({type: ALL_TASK_FAIL, payload: 'An error has occured'});
          } else {
            {
              console.log('TESTTETS', json);
            }
            dispatch({type: ALL_TASK_SUCCESS, payload: json});
            dispatch({type: TASK_IDLE});
          }
        })
        .catch(error => {
          dispatch({type: ALL_TASK_FAIL, payload: error.message});
        });
    }
  };
};

export const getDesendingList = parameters => {
  return (dispatch, getState) => {
    const {user} = getState().auth;
    if (user && user.uid) {
      dispatch({type: ALL_DSC_TASK_LOADING});

      var url = new URL(API_BASE_URL),
        params = {
          cmd: API_CMD_ALLTASK,
          uid: user.uid,
          year: parameters.year,
          month: parameters.month,
          type: parameters.type,
          sort: parameters.sort,
          search_key: parameters.search_key,
          complete_task: parameters.complete_task,
          active_task: parameters.active_task,
        };

      Object.keys(params).forEach(key =>
        url.searchParams.append(key, params[key]),
      );
      console.log(url, 'all task===>', parameters);
      console.log('all task===>', parameters + '========' + url);
      fetch(url)
        .then(response => response.json())
        .then(json => {
          if (json.error && json.msg) {
            dispatch({
              type: ALL_DSC_TASK_FAIL,
              payload: 'An error has occured',
            });
          } else {
            {
              console.log('TESTTETS', json);
            }
            dispatch({type: ALL_DSC_TASK_SUCCESS, payload: json});
            dispatch({type: TASK_IDLE});
          }
        })
        .catch(error => {
          dispatch({type: ALL_DSC_TASK_FAIL, payload: error.message});
        });
    }
  };
};

export const setTaskSearchKey = key => {
  return dispatch => {
    dispatch({type: TASK_SETSEARCHKEY, payload: key});
  };
};
