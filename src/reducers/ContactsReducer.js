import { Alert } from 'react-native';
import {
  CONTACT_CONTACTLIST_LOADING,
  CONTACT_CONTACTLIST_SUCCESS,
  CONTACT_CONTACTLIST_FAIL,
  CONTACT_GETCONTACTCOUNTS_LOADING,
  CONTACT_GETCONTACTCOUNTS_SUCCESS,
  CONTACT_GETCONTACTCOUNTS_FAIL,
  CONTACT_SETCONTACTINFO_SUCCESS,
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

const INITIAL_STATE = {
  contactsStatus: '',
  contactsError: '',
  contactsList: [],
  contactsWithRatings: [],
  contactInfo: {},
  contactCounts: {},
  contactsSearchKey: '',
  contactAddedData: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONTACT_CONTACTLIST_LOADING:
    case CONTACT_GETCONTACTCOUNTS_LOADING:
    case CONTACT_GETCONTACTINFO_LOADING:
    case CONTACT_CONTACTSWITHRATINGS_LOADING:
    case CONTACT_UPDATECONTACTINFO_LOADING:
    case CONTACT_UPDATECONTACTINFO_SUCCESS:
    case CONTACT_ADDCONTACT_LOADING:
    case CONTACT_ADDCONTACT_SUCCESS:
      return { ...state, contactsStatus: action.type, contactAddedData: action.payload };
    case CONTACT_UPDATERATINGS_LOADING:
    case CONTACT_DELETECONTACT_LOADING:
    case CONTACT_DELETECONTACT_SUCCESS:
      return { ...state, contactsStatus: action.type };
    case CONTACT_IDLE:

    case NOTES_ADDNOTE_LOADING:
    case NOTES_ADDNOTE_SUCCESS:
    case NOTES_EDITNOTE_LOADING:
    case NOTES_EDITNOTE_SUCCESS:
    case NOTES_DELETENOTE_LOADING:
    case NOTES_DELETENOTE_SUCCESS:

      return { ...state, contactsStatus: action.type };
    case CONTACT_CONTACTLIST_SUCCESS:
      return { ...state, contactsStatus: action.type, contactsList: action.payload };
    case CONTACT_CONTACTSWITHRATINGS_SUCCESS:
      return { ...state, contactsStatus: action.type, contactsWithRatings: action.payload };
    case CONTACT_GETCONTACTCOUNTS_SUCCESS:
      return { ...state, contactsStatus: action.type, contactCounts: action.payload };
    case CONTACT_SETCONTACTINFO_SUCCESS:
      return { ...state, contactsStatus: action.type, contactInfo: {...action.payload} };
    case CONTACT_GETCONTACTINFO_SUCCESS:
      return { ...state, contactsStatus: action.type, contactInfo: {...state.contactInfo, ...action.payload} };
    case CONTACT_SETSEARCHKEY:
      return { ...state, contactsStatus: action.type, contactsSearchKey: action.payload };
    case CONTACT_CONTACTLIST_FAIL:
    case CONTACT_GETCONTACTCOUNTS_FAIL:
    case CONTACT_GETCONTACTINFO_FAIL:
    case CONTACT_UPDATECONTACTINFO_FAIL:
    case CONTACT_DELETECONTACT_FAIL:
    case CONTACT_ADDCONTACT_FAIL:
    case CONTACT_CONTACTSWITHRATINGS_FAIL:
    case CONTACT_UPDATERATINGS_FAIL:

    case NOTES_ADDNOTE_FAIL:
    case NOTES_EDITNOTE_FAIL:
    case NOTES_DELETENOTE_FAIL:
      return { ...state, contactsStatus: action.type, contactsError: action.payload };
    default:
      return state;
  }
};
