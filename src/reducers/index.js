import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import SettingsReducer from './SettingsReducer';
import ContactsReducer from './ContactsReducer';
import GroupsReducer from './GroupsReducer';
import CampaignsReducer from './CampaignsReducer';
import TagsReducer from './TagsReducer';
import EmailsReducer from './EmailsReducer';
import TasksReducer from './TasksReducer';

export default combineReducers({
  auth: AuthReducer,
  settings: SettingsReducer,
  contacts: ContactsReducer,
  groups: GroupsReducer,
  campaigns: CampaignsReducer,
  tags: TagsReducer,
  emails: EmailsReducer,
  tasks: TasksReducer,
});
