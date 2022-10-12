import { Alert } from 'react-native';
import {
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
  EMAIL_GETMAILBOXES_LOADING,
  EMAIL_GETMAILBOXES_SUCCESS,
  EMAIL_GETMAILBOXES_FAIL,
  EMAIL_SETCURRENTMAILBOX_SUCCESS,
  EMAIL_MOVEEMAIL_LOADING,
  EMAIL_MOVEEMAIL_SUCCESS,
  EMAIL_MOVEEMAIL_FAIL,
  EMAIL_MOVEALLEMAIL_SUCCESS,

  EMAIL_SCHEDULED_SUCCESS,
  EMAIL_ARCHIVED_SUCCESS,
  EMAIL_SPAM_SUCCESS,
  EMAIL_TOGGLE_SEENFILTER,

  EMAIL_MARKASSEEN_LOADING,
  EMAIL_MARKASSEEN_SUCCESS,
  EMAIL_MARKASSEEN_FAIL,

  EMAIL_MAILBOXNOTIFS_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  emailStatus: '',
  emailError: '',
  emailInbox: {},
  emailScheduled: {},
  emailArchived: {},
  emailSent: {},
  emailTrash: {},
  emailSpam: {},
  emailRead: [],
  emailMailboxes: [],
  emailCurrentMailbox: '',
  emailTemplates: [],
  emailHideSeen: false,
  emailNotifs: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_GETEMAILTEMPLATES_LOADING:
    case EMAIL_INBOXMAIL_LOADING:
    case EMAIL_SENTMAIL_LOADING:
    case EMAIL_TRASHMAIL_LOADING:
    case EMAIL_READSTATUS_LOADING:
    case EMAIL_DELETEEMAIL_LOADING:
    case EMAIL_SENDEMAIL_LOADING:
    case EMAIL_MOVEEMAIL_LOADING:
    case EMAIL_MARKASSEEN_LOADING:
    case EMAIL_MARKASSEEN_SUCCESS:
      return { ...state, emailStatus: action.type };
    case EMAIL_MOVEEMAIL_SUCCESS:
      return { ...state, emailStatus: action.type };
    case EMAIL_MOVEALLEMAIL_SUCCESS:
      return { ...state, emailStatus: action.type}
    case EMAIL_INBOXMAIL_SUCCESS:
      return { ...state, emailStatus: action.type, emailInbox: { ...state.emailInbox, ...action.payload } };
    case EMAIL_SENTMAIL_SUCCESS:
      return { ...state, emailStatus: action.type, emailSent: { ...state.emailSent, ...action.payload } };
    case EMAIL_TRASHMAIL_SUCCESS:
      return { ...state, emailStatus: action.type, emailTrash: { ...state.emailTrash, ...action.payload } };
    case EMAIL_SCHEDULED_SUCCESS:
      return { ...state, emailStatus: action.type, emailScheduled: { ...state.emailScheduled, ...action.payload } };
    case EMAIL_ARCHIVED_SUCCESS:
      return { ...state, emailStatus: action.type, emailArchived: { ...state.emailArchived, ...action.payload } };
    case EMAIL_SPAM_SUCCESS:
      return { ...state, emailStatus: action.type, emailSpam: { ...state.emailSpam, ...action.payload } };
    case EMAIL_GETMAILBOXES_SUCCESS:
      return { ...state, emailStatus: action.type, emailMailboxes: action.payload };
    case EMAIL_SETCURRENTMAILBOX_SUCCESS:
      return { ...state, emailStatus: action.type, emailCurrentMailbox: action.payload };
    case EMAIL_GETEMAILTEMPLATES_SUCCESS:
      return { ...state, emailStatus: action.type, emailTemplates: action.payload };
    case EMAIL_SENDEMAIL_SUCCESS:
      return { ...state, emailStatus: action.type, emailError: action.payload };
    case EMAIL_TOGGLE_SEENFILTER:
      return { ...state, emailStatus: action.type, emailHideSeen: action.payload };
    case EMAIL_MAILBOXNOTIFS_SUCCESS:
      return { ...state, emailStatus: action.type, emailNotifs: {...state.emailNotifs, ...action.payload } };
    case EMAIL_GETEMAILTEMPLATES_FAIL:
    case EMAIL_INBOXMAIL_FAIL:
    case EMAIL_SENTMAIL_FAIL:
    case EMAIL_TRASHMAIL_FAIL:
    case EMAIL_READSTATUS_FAIL:
    case EMAIL_DELETEEMAIL_FAIL:
    case EMAIL_SENDEMAIL_FAIL:
    case EMAIL_GETMAILBOXES_FAIL:
    case EMAIL_MOVEEMAIL_FAIL:
    case EMAIL_MARKASSEEN_FAIL:
      return { ...state, emailStatus: action.type, emailError: action.payload };
    default:
      return state;
  }
};
