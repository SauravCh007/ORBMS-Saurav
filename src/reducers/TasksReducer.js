import { Alert } from 'react-native';
import {
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
  TASK_SETCALENDARMDATE,
  TASK_IDLE,
  ALL_TASK_LOADING,
  ALL_TASK_SUCCESS,
  ALL_TASK_FAIL,

  ALL_DSC_TASK_LOADING,
  ALL_DSC_TASK_SUCCESS,
  ALL_DSC_TASK_FAIL,
  TASK_SETSEARCHKEY
} from '../actions/types';

const INITIAL_STATE = {
  tasksStatus: '',
  tasksError: '',
  tasksList: [],
  tasksCalendarTasks: [],
  taskTypes: [],
  allTaskList: [],
  dscTaskList: [],
  tasksCalendarDate: null,
  taskSearchKey: ''
};

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case TASK_GETTASKTYPES_LOADING:
    case TASK_ADDTASK_LOADING:
    case TASK_EDITTASK_LOADING:
    case TASK_CALENDARTASKS_LOADING:
    case TASK_DELETETASK_LOADING:
    case TASK_USERTASKS_LOADING:
    case TASK_TASKDETAILS_LOADING:
    case TASK_ADDTASK_SUCCESS:
    case TASK_EDITTASK_SUCCESS:
    case TASK_DELETETASK_SUCCESS:
    case ALL_TASK_LOADING:
    case ALL_DSC_TASK_LOADING:
    case TASK_IDLE:
      return { ...state, tasksStatus: action.type };
    case TASK_USERTASKS_SUCCESS:
      return { ...state, tasksStatus: action.type, tasksList: action.payload };
    case TASK_CALENDARTASKS_SUCCESS:
      return { ...state, tasksStatus: action.type, tasksCalendarTasks: action.payload };
    case TASK_GETTASKTYPES_SUCCESS:
      return { ...state, tasksStatus: action.type, taskTypes: action.payload };
    case ALL_TASK_SUCCESS:
      return { ...state, tasksStatus: action.type, allTaskList: action.payload };

    case ALL_DSC_TASK_SUCCESS:
      return { ...state, tasksStatus: action.type, dscTaskList: action.payload };
    case TASK_SETCALENDARMDATE:
      return { ...state, tasksStatus: action.type, tasksCalendarMonth: action.payload };
    case TASK_GETTASKTYPES_FAIL:
    case TASK_ADDTASK_FAIL:
    case TASK_EDITTASK_FAIL:
    case TASK_CALENDARTASKS_FAIL:
    case TASK_DELETETASK_FAIL:
    case TASK_USERTASKS_FAIL:
    case TASK_USERTASKS_FAIL:
    case ALL_TASK_FAIL:
    case ALL_DSC_TASK_FAIL:
      return { ...state, tasksStatus: action.type, tasksError: action.payload };
   case TASK_SETSEARCHKEY:
     return { ...state, tasksStatus: action.type, taskSearchKey: action.payload };
    default:
      return state;
  }
};
