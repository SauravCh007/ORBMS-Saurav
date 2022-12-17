// // import React, {Component} from 'react';
// // import {
// //   View,
// //   Text,
// //   ScrollView,
// //   StyleSheet,
// //   Image,
// //   FlatList,
// //   TouchableOpacity,
// //   Animated,
// //   Clipboard,
// //   Alert,
// //   Easing,
// //   Linking,
// //   SafeAreaView,
// //   BackHandler,
// //   SwipeableFlatList,
// //   TouchableHighlight,
// //   Dimensions,
// // } from 'react-native';
// // import Collapsible from 'react-native-collapsible';
// // import {connect} from 'react-redux';
// // import Swipeout from 'react-native-swipeout';
// // import Swipeable from 'react-native-swipeable';
// // import Rating from 'react-native-rating-simple';
// // import Toast, {DURATION} from 'react-native-easy-toast';
// // import {mimeWordsDecode} from 'emailjs-mime-codec';

// // import {
// //   timestampToMonthDayTime,
// //   timespan,
// //   cleanEmailBodyPreview,
// //   formatMobileNumber,
// //   FormatTime,
// // } from '../utils/Helper';
// // import {
// //   HeaderButton,
// //   MiniButton,
// //   StarButton,
// //   TaskItem,
// //   NoteItem,
// //   EmailItem,
// //   FormButton,
// //   ModalAlert,
// //   ModalChecklist,
// //   ModalBottom,
// //   GroupsItem,
// //   GroupsItemEmpty,
// //   IndicatorBottom,
// //   CalendarTaskItem,
// // } from '../common';
// // import {
// //   getContactList,
// //   getContactsWithRatings,
// //   getContactInfo,
// //   deleteContact,
// //   updateRatings,
// //   getGroups,
// //   addGroupsToContact,
// //   removeGroupToContact,
// //   getCampaigns,
// //   addCampaignsToContact,
// //   removeCampaignToContact,
// //   getTags,
// //   addTagsToContact,
// //   removeTagToContact,
// //   deleteNote,
// //   editTask,
// //   deleteTask,
// //   getMailboxes,
// // } from '../actions';
// // import {
// //   CONTACT_GETCONTACTINFO_LOADING,
// //   CONTACT_DELETECONTACT_LOADING,
// //   CONTACT_DELETECONTACT_SUCCESS,
// //   CONTACT_DELETECONTACT_FAIL,
// //   LISTTYPE_GROUPS,
// //   LISTTYPE_CAMPAIGNS,
// //   LISTTYPE_TAGS,
// //   GROUP_ADDGROUPTOCONTACT_SUCCESS,
// //   GROUP_REMOVEGROUPTOCONTACT_SUCCESS,
// //   CAMPAIGN_ADDCAMPAIGNSTOCONTACT_SUCCESS,
// //   CAMPAIGN_REMOVECAMPAIGN_SUCCESS,
// //   TAGS_ADDTAG_SUCCESS,
// //   TAGS_REMOVETAG_SUCCESS,
// //   TASK_EDITTASK_SUCCESS,
// //   TASK_DELETETASK_SUCCESS,
// //   TASK_IDLE,
// // } from '../actions/types';
// // import moment from 'moment';
// // import {borderRadius} from 'styled-system';

// // class ContactDetails extends Component {
// //   _isMounted = false;
// //   static navigationOptions = ({navigation}) => {
// //     const {params} = navigation.state;
// //     return params;
// //   };

// //   constructor(props) {
// //     super(props);
// //     this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
// //     this.state = {
// //       scrollY: new Animated.Value(0),
// //       listGroups: [
// //         'Team Member',
// //         'Manufacturer',
// //         'Retailer',
// //         'Marketing Launch Company',
// //       ],
// //       moreInfoList: [
// //         {title: 'Email', value: 'juandelacruz@company.com'},
// //         {title: 'Mobile Number', value: '0987654321'},
// //         {title: 'Website', value: 'juandelacruz.com'},
// //         {title: 'Address', value: 'City Name, Country, 1234'},
// //       ],

// //       showMoreInfo: false,
// //       showCompletedTask: true,

// //       // MODAL ALERT
// //       alertVisible: false,
// //       alertTitle: '',
// //       alertMessage: '',
// //       alertButtons: [
// //         {text: 'OK', onPress: () => this.setState({alertVisible: false})},
// //       ],
// //       alertIcon: null,

// //       alertListVisible: false,
// //       alertListTitle: '',
// //       alertListData: [],
// //       alertListSelected: [],
// //       alertListSave: () => {},
// //       alertListType: '',

// //       showMenu: false,

// //       rating: 0,

// //       swipeable: null,

// //       currentlyOpenSwipeable: null,
// //       loadMoreVisible: true,
// //       viewMore: false,
// //       notesViewMore: false,
// //       emailViewMore: false,
// //     };
// //     this.selectedRow;
// //     this.component = [];
// //   }

// //   handleBackButtonClick() {
// //     // this.props.navigation.goBack(null);
// //     this.props.getContactList(this.props.route.params.contact, 1);
// //     // setTimeout(() => {
// //     this.props.getContactsWithRatings(
// //       this.props.route.params.contactWithRating,
// //       1,
// //     );
// //     // }, 500);
// //     this.props.selectInfo = this.props.route.params.selectInfo;
// //     this.props.navigation.navigate('ContactsStack', {
// //       select: this.props.route.params.selectInfo,
// //     });
// //     return true;
// //   }

// //   componentWillMount() {
// //     this._isMounted = true;
// //     if (this._isMounted) {
// //       BackHandler.addEventListener(
// //         'hardwareBackPress',
// //         this.handleBackButtonClick,
// //       );
// //       this.props.navigation.setOptions({
// //         headerLeft: () => (
// //           <View style={global.styles.headerButtonsContainer}>
// //             <HeaderButton
// //               icon={global.icon_leftarrow}
// //               onPress={() => this.handleBackButtonClick()}
// //               mode={this.props.settings.theme.mode}
// //             />
// //           </View>
// //         ),
// //         headerRight: () => (
// //           <View style={global.styles.headerButtonsContainer}>
// //             <HeaderButton
// //               icon={global.icon_dots}
// //               mode={this.props.settings.theme.mode}
// //               onPress={() => this.setState({showMenu: true})}
// //             />
// //           </View>
// //         ),
// //       });

// //       if (this.props.route.params.contactInfo) {
// //         console.log(
// //           this.props.route.params.contactInfo,
// //           'this.props.route.params.contactInfo',
// //         );
// //         this.props.getContactInfo({
// //           contactInfo: this.props.route.params.contactInfo,
// //         });
// //       }

// //       // this.props.getGroups();

// //       this.setState({rating: 3});
// //     }
// //     this.props.getMailboxes();

// //     // this.forceUpdate();
// //   }

// //   componentWillUnmount() {
// //     this._isMounted = false;
// //     BackHandler.removeEventListener(
// //       'hardwareBackPress',
// //       this.handleBackButtonClick,
// //     );
// //   }

// //   refresh() {
// //     console.log(this.props.contactInfo, 'this.props.contactInfo');
// //     this.props.getContactInfo({contactInfo: this.props.contactInfo});
// //   }

// //   componentWillReceiveProps(nextProps) {
// //     console.log(nextProps, 'nextProps===>');
// //     if (nextProps.contactsStatus === CONTACT_DELETECONTACT_LOADING) {
// //       console.log(nextProps, 'nextProps===>123');
// //       this.props.navigation.goBack();
// //     }

// //     if (
// //       (this.props.tasksStatus === TASK_EDITTASK_SUCCESS &&
// //         nextProps.tasksStatus === TASK_IDLE) ||
// //       (this.props.tasksStatus === TASK_DELETETASK_SUCCESS &&
// //         nextProps.tasksStatus === TASK_IDLE)
// //     ) {
// //       this.refresh();
// //     }

// //     if (nextProps.groupsStatus === GROUP_ADDGROUPTOCONTACT_SUCCESS) {
// //       this.setState({alertListVisible: false});
// //       setTimeout(() => {
// //         this.refresh();
// //       }, 300);
// //     } else if (nextProps.groupsStatus === GROUP_REMOVEGROUPTOCONTACT_SUCCESS) {
// //       setTimeout(() => {
// //         this.refresh();
// //       }, 300);
// //     }

// //     if (nextProps.campaignsStatus === CAMPAIGN_ADDCAMPAIGNSTOCONTACT_SUCCESS) {
// //       this.setState({alertListVisible: false});
// //       setTimeout(() => {
// //         this.refresh();
// //       }, 300);
// //     } else if (nextProps.campaignsStatus === CAMPAIGN_REMOVECAMPAIGN_SUCCESS) {
// //       setTimeout(() => {
// //         this.refresh();
// //       }, 300);
// //     }

// //     if (nextProps.tagsStatus === TAGS_ADDTAG_SUCCESS) {
// //       this.setState({alertListVisible: false});
// //       setTimeout(() => {
// //         this.refresh();
// //       }, 300);
// //     } else if (nextProps.tagsStatus === TAGS_REMOVETAG_SUCCESS) {
// //       this.setState({alertListVisible: false});
// //       setTimeout(() => {
// //         this.refresh();
// //       }, 300);
// //     }

// //     // this.setState({ rating: nextProps.contactInfo.rating });
// //     // this.updateAlertList(nextProps);
// //   }

// //   prepareSelected() {
// //     let c = this.props.contactInfo;
// //     let selected = [];
// //     switch (this.state.alertListType) {
// //       case LISTTYPE_GROUPS:
// //         if (c.groups && c.groups.length > 0) {
// //           c.groups.forEach(item => {
// //             selected.push(item.gid);
// //           });
// //         }
// //         // Alert.alert(`${selected.length}`)
// //         this.setState({alertListSelected: selected});
// //         break;
// //       case LISTTYPE_CAMPAIGNS:
// //         if (c.campaigns && c.campaigns.length > 0 && c.campaigns[0] !== false) {
// //           c.campaigns.forEach(item => {
// //             if (item && item.cp_gid) {
// //               selected.push(item.cp_gid);
// //             }
// //           });
// //         }
// //         this.setState({alertListSelected: selected});
// //         break;
// //       case LISTTYPE_TAGS:
// //         if (c.tags && c.tags.length > 0) {
// //           c.tags.forEach(item => {
// //             selected.push(item);
// //           });
// //         }
// //         this.setState({alertListSelected: selected});
// //         break;
// //       default:
// //     }
// //   }

// //   toggleAlertList(tag) {
// //     let selected = this.state.alertListSelected;
// //     if (selected.some(x => x.tag === tag.tag)) {
// //       const index = selected.findIndex(x => x.tag === tag.tag);
// //       selected.splice(index, 1);
// //     } else {
// //       selected.push(tag);
// //     }
// //     this.setState({alertListSelected: selected});
// //   }

// //   toggleGroups(id) {
// //     let selected = this.state.alertListSelected;
// //     if (selected.includes(id)) {
// //       const index = selected.indexOf(id);
// //       selected.splice(index, 1);
// //     } else {
// //       selected.push(id);
// //     }
// //     this.setState({alertListSelected: selected});
// //   }

// //   renderAlertList() {
// //     let list = [];
// //     // ssAlert.alert(this.state.alertListType);
// //     switch (this.state.alertListType) {
// //       case LISTTYPE_GROUPS:
// //         this.props.groupsList.map(item => {
// //           list.push({
// //             text: item.name,
// //             checked: this.state.alertListSelected.includes(item.gid),
// //             onPress: () => this.toggleGroups(item.gid),
// //           });
// //         });
// //         break;
// //       case LISTTYPE_CAMPAIGNS:
// //         this.props.campaignsList.map(item => {
// //           list.push({
// //             text: item.name,
// //             checked: this.state.alertListSelected.includes(item.cp_gid),
// //             //onPress: () => this.toggleAlertList(item.cp_gid)
// //             onPress: () => this.setState({alertListSelected: [item.cp_gid]}),
// //           });
// //         });
// //         break;
// //       case LISTTYPE_TAGS:
// //         this.props.tagsList.map(item => {
// //           list.push({
// //             text: item.tag,
// //             checked: this.state.alertListSelected.some(x => x.tag === item.tag),
// //             onPress: () => this.toggleAlertList(item),
// //           });
// //         });
// //         break;
// //       default:
// //     }
// //     // Alert.alert(JSON.stringify(list));
// //     return list;
// //   }

// //   handleQuickButton(action) {
// //     let c = this.props.contactInfo;
// //     c = c.contact_details ? c.contact_details : c;
// //     switch (action) {
// //       case 'phone':
// //         Linking.openURL(`tel:${c.phone}`);
// //         break;
// //       case 'text':
// //         Linking.openURL(`sms:${c.phone}&body=`);
// //         break;
// //       case 'email':
// //         this.props.navigation.navigate('EmailComposeStack', {
// //           screen: 'EmailCompose',
// //           params: {
// //             contacts: [c],
// //             email: [c],
// //           },
// //         });

// //         break;

// //       case 'edit':
// //         this.props.navigation.navigate('ContactAdd', {
// //           title: 'Edit Contact',
// //           contact: c,
// //           onNavigateBack: this.refresh.bind(this),
// //         });
// //         break;
// //       case 'delete':
// //         this.setState({
// //           alertVisible: true,
// //           alertTitle: 'Delete Contact',
// //           alertMessage: 'Are you sure you want to delete this contact?',
// //           alertButtons: [
// //             {
// //               text: 'Cancel',
// //               onPress: () => this.setState({alertVisible: false}),
// //               type: 'cancel',
// //             },
// //             {
// //               text: 'Delete',
// //               onPress: () => {
// //                 this.setState({alertVisible: false});
// //                 this.props.deleteContact({cid: c.cid});
// //               },
// //             },
// //           ],
// //           alertIcon: null,
// //         });
// //         break;
// //       default:
// //     }
// //   }

// //   renderMenuOptions() {
// //     let c = this.props.contactInfo;
// //     c = c.contact_details ? c.contact_details : c;

// //     let options = [
// //       {
// //         text: 'Edit Contact',
// //         onPress: () => {
// //           this.setState({showMenu: false});
// //           setTimeout(() => {
// //             this.handleQuickButton('edit');
// //           }, 400);
// //         },
// //       },
// //       {
// //         text: 'Email ' + c.email,
// //         onPress: () => {
// //           this.setState({showMenu: false});
// //           setTimeout(() => {
// //             this.handleQuickButton('email');
// //           }, 400);
// //         },
// //       },
// //       {
// //         text: 'Call ' + c.phone,
// //         onPress: () => {
// //           this.setState({showMenu: false});
// //           setTimeout(() => {
// //             this.handleQuickButton('phone');
// //           }, 400);
// //         },
// //       },
// //       {
// //         text: 'Send SMS to ' + c.phone,
// //         onPress: () => {
// //           this.setState({showMenu: false});
// //           setTimeout(() => {
// //             this.handleQuickButton('text');
// //           }, 400);
// //         },
// //       },
// //       {
// //         text: 'Delete Contact',
// //         onPress: () => {
// //           this.setState({showMenu: false});
// //           setTimeout(() => {
// //             this.handleQuickButton('delete');
// //           }, 400);
// //         },
// //       },
// //       {
// //         type: 'gap',
// //         gapSize: 30,
// //       },
// //       {
// //         text: '+ Add Groups',
// //         onPress: () => {
// //           this.setState({showMenu: false});
// //           setTimeout(() => {
// //             this.addIconPressed('groups');
// //           }, 400);
// //         },
// //       },
// //       {
// //         text: '+ Add Tags',
// //         onPress: () => {
// //           this.setState({showMenu: false});
// //           setTimeout(() => {
// //             this.addIconPressed('tags');
// //           }, 400);
// //         },
// //       },
// //       {
// //         text: '+ Add Campaigns',
// //         onPress: () => {
// //           this.setState({showMenu: false});
// //           setTimeout(() => {
// //             this.addIconPressed('campaigns');
// //           }, 400);
// //         },
// //       },
// //       {
// //         text: '+ Add Task',
// //         onPress: () => {
// //           this.setState({showMenu: false});
// //           setTimeout(() => {
// //             this.addIconPressed('tasks');
// //           }, 400);
// //         },
// //       },
// //       {
// //         text: '+ Add Note',
// //         onPress: () => {
// //           this.setState({showMenu: false});
// //           setTimeout(() => {
// //             this.addIconPressed('notes');
// //           }, 400);
// //         },
// //       },
// //     ];
// //     return options;
// //   }

// //   addIconPressed(key) {
// //     let c = this.props.contactInfo;
// //     console.log(c, 'key++++++++++++++++++++');
// //     switch (key) {
// //       case 'groups':
// //         this.setState(
// //           {
// //             alertListVisible: true,
// //             alertListTitle: 'Add Groups',
// //             alertListData: [],
// //             alertListType: LISTTYPE_GROUPS,
// //             alertListSave: () => {
// //               this.state.alertListVisible = false;
// //               let toAdd = [];
// //               let toRemove = [];
// //               // console.log(key, 'key1++++++++++++++++++++');
// //               if (c.groups && c.groups.length > 0) {
// //                 c.groups.forEach(item => {
// //                   if (!this.state.alertListSelected.includes(item.gid)) {
// //                     toRemove.push(item.gid);
// //                   }
// //                 });
// //               }

// //               this.state.alertListSelected.forEach(item => {
// //                 if (
// //                   !c.groups ||
// //                   (c.groups && !c.groups.some(x => x.gid === item))
// //                 ) {
// //                   toAdd.push(item);
// //                 }
// //               });

// //               if (toRemove.length > 0) {
// //                 toRemove.forEach(item => {
// //                   this.props.removeGroupToContact({cid: c.cid, gid: [item]});
// //                 });
// //               }

// //               this.props.addGroupsToContact({
// //                 cid: c.cid,
// //                 gid: toAdd, //this.state.alertListSelected,
// //               });
// //             },
// //           },
// //           () => this.prepareSelected(),
// //         );
// //         this.props.getGroups();
// //         break;
// //       case 'tags':
// //         this.setState(
// //           {
// //             alertListVisible: true,
// //             alertListTitle: 'Add Tags',
// //             alertListData: [],
// //             alertListType: LISTTYPE_TAGS,
// //             alertListSave: () => {
// //               this.state.alertListVisible = false;
// //               let toAdd = [];
// //               let toRemove = [];

// //               if (c.tags && c.tags.length > 0) {
// //                 c.tags.forEach(item => {
// //                   if (
// //                     !this.state.alertListSelected.some(x => x.tag === item.tag)
// //                   ) {
// //                     toRemove.push(item);
// //                   }
// //                 });
// //               }

// //               this.state.alertListSelected.forEach(item => {
// //                 if (
// //                   !c.tags ||
// //                   (c.tags &&
// //                     !c.tags.some(
// //                       x => x.contact_tag_id === item.contact_tag_id,
// //                     ) &&
// //                     this.props.tagsList.some(x => x.id === item.id))
// //                 ) {
// //                   toAdd.push(item.id);
// //                 }
// //               });

// //               if (toRemove.length > 0) {
// //                 let contact_tag_ids = [];
// //                 toRemove.forEach(item => {
// //                   contact_tag_ids.push(item.contact_tag_id);
// //                   // this.props.removeTagToContact({ cid: c.cid, id: [item] })
// //                 });
// //                 this.props.removeTagToContact({
// //                   cid: c.cid,
// //                   tags: contact_tag_ids,
// //                 });
// //               }

// //               console.log('tags to add: ' + JSON.stringify(toAdd));

// //               this.props.addTagsToContact({
// //                 cid: c.cid,
// //                 tags: toAdd, //this.state.alertListSelected,
// //               });
// //             },
// //           },
// //           () => this.prepareSelected(),
// //         );
// //         this.props.getTags();
// //         break;
// //       case 'campaigns':
// //         this.setState(
// //           {
// //             alertListVisible: true,
// //             alertListTitle: 'Add Campaigns',
// //             alertListData: [],
// //             alertListType: LISTTYPE_CAMPAIGNS,
// //             alertListSave: () => {
// //               this.state.alertListVisible = false;
// //               if (this.state.alertListSelected.length > 0) {
// //                 this.props.addCampaignsToContact({
// //                   cid: c.cid,
// //                   cp_gid: this.state.alertListSelected[0],
// //                 });
// //               } else {
// //                 this.setState({alertListVisible: false});
// //               }
// //             },
// //           },
// //           () => this.prepareSelected(),
// //         );
// //         this.props.getCampaigns();
// //         break;
// //       case 'tasks':
// //         this.props.navigation.navigate('NewTask', {
// //           title: 'New Task',
// //           contact: c,
// //           route: 'ContactDetails',
// //           onNavigateBack: this.refresh.bind(this),
// //         });
// //         break;
// //       case 'notes':
// //         this.props.navigation.navigate('NewNote', {
// //           cid: c.cid,
// //           onNavigateBack: this.refresh.bind(this),
// //         });
// //         break;
// //       default:
// //         break;
// //     }
// //   }


// //   setDateTimeFormat = date => {
// //     // console.log(date, 'date');
// //     return (
// //       date.split(' ')[0].split('-')[1] +
// //       '-' +
// //       date.split(' ')[0].split('-')[2] +
// //       '-' +
// //       date.split(' ')[0].split('-')[0] +
// //       ' (' +
// //       FormatTime(date.split(' ')[1]) +
// //       ')'
// //     );
// //   };

// //   setDateTimeFormatForSend = date => {
// //     return (
// //       date.split(' ')[0].split('-')[1] +
// //       '-' +
// //       date.split(' ')[0].split('-')[2] +
// //       '-' +
// //       date.split(' ')[0].split('-')[0] +
// //       ' ' +
// //       FormatTime(date.split(' ')[1]) +
// //       ''
// //     );
// //   };

// //   setDateTimeFormatForEmail = dateTime => {
// //     let date =
// //       `${('0' + (new Date(dateTime).getMonth() + 1)).slice(-2)}-${(
// //         '0' + new Date(dateTime).getDate()
// //       ).slice(-2)}-${new Date(dateTime).getFullYear()} (` +
// //       FormatTime(
// //         ('0' + new Date(dateTime).getHours()).slice(-2) +
// //           ':' +
// //           ('0' + new Date(dateTime).getMinutes()).slice(-2) +
// //           ':' +
// //           ('0' + new Date(dateTime).getSeconds()).slice(-2),
// //       ) +
// //       ')';
// //     // console.log(date, 'date');
// //     return date;
// //   };

// //   setDateTimeForNote(dateTime) {
// //     return `${new Date(`${dateTime} UTC`).getFullYear()}-${(
// //       '0' +
// //       (new Date(`${dateTime} UTC`).getMonth() + 1)
// //     ).slice(-2)}-${('0' + new Date(`${dateTime} UTC`).getDate()).slice(-2)} ${
// //       ('0' + new Date(`${dateTime} UTC`).getHours()).slice(-2) +
// //       ':' +
// //       ('0' + new Date(`${dateTime} UTC`).getMinutes()).slice(-2) +
// //       ':' +
// //       ('0' + new Date(`${dateTime} UTC`).getSeconds()).slice(-2)
// //     }`;
// //   }

// //   taskRender() {
// //     // console.log(this.props.contactInfo,'taskes++++++++++++++++++++++++');
// //     let task = [];
// //     for (let data of this.props.contactInfo.tasks) {
// //       task.push({
// //         title: data.title,
// //         date: this.setDateTimeFormat(data.date),
// //         dateTime: this.setDateTimeFormatForSend(data.date),
// //         did: data.did,
// //         completed_date: data.completed_date,
// //         comment: data.comment,
// //         notify: data.notify,
// //         status: data.status,
// //         type: data.type,
// //       });
// //     }
// //     return task;
// //   }

// //   notesRender() {
// //     console.log(this.props.contactInfo.notes, 'this.props.contactInfo.notes');
// //     let notes = [];
// //     for (let data of this.props.contactInfo.notes) {
// //       let date = moment.utc(data.date, 'YYYY-MM-DD HH:mm:ss');
// //       console.log(date.local().format('YYYY-MM-DD HH:mm:ss'), 'moment date');
// //       notes.push({
// //         cid: data.cid,
// //         content: data.content,
// //         date: this.setDateTimeFormat(
// //           date.local().format('YYYY-MM-DD HH:mm:ss'),
// //         ),
// //         nid: data.nid,
// //         uid: data.uid,
// //       });
// //     }
// //     console.log(notes, 'notes');
// //     return notes;
// //   }

// //   onOpen = (event, gestureState, swipeable) => {
// //     if (
// //       this.state.currentlyOpenSwipeable &&
// //       this.state.currentlyOpenSwipeable !== swipeable
// //     ) {
// //       this.state.currentlyOpenSwipeable.recenter();
// //     }
// //     this.setState({currentlyOpenSwipeable: swipeable});
// //   };

// //   onClose = () => {
// //     this.setState({currentlyOpenSwipeable: null});
// //   };

// //   closeAll = () => {
// //     if (this.state.currentlyOpenSwipeable) {
// //       this.state.currentlyOpenSwipeable.recenter();
// //     }
// //   };

// //   render() {
// //     const headerOpacity = this.state.scrollY.interpolate({
// //       inputRange: [0, global.headerHeight + 50],
// //       outputRange: [-1, 1],
// //       extrapolate: 'clamp',
// //     });
// //     let c = this.props.contactInfo;
// //     let cd = c.contact_details ? c.contact_details : c;
// //     console.log(cd, 'c.history');
// //     console.log("edited CompanyName", cd.companyname);
// //     let moreInfo = [
// //       {title: 'First Name', value: cd.first_name, key: 'first_name'},
// //       {title: 'Last Name', value: cd.last_name, key: 'last_name'},
// //       {title: 'Email', value: cd.email, key: 'companyname'},
// //       {title: 'Mobile Number', value: cd.phone, key: 'phone'},
// //       {title: 'Company Name', value: cd.companyname, key: 'companyname'},
// //       {title: 'Website', value: cd.website, key: 'website'},
// //       {title: 'Address', value: cd.address, key: 'address'},
// //       //{ title: 'Facebook URL', value: cd.address, key: 'address' },
// //       {title: 'City', value: cd.city, key: 'city'},
// //       {title: 'State', value: cd.state, key: 'state'},
// //       {title: 'Zip', value: cd.zip, key: 'zip'},
// //     ];

// //     return (
// //       <View
// //         style={[
// //           global.styles.screenContainer,
// //           {backgroundColor: this.props.settings.theme.bgSecondary},
// //         ]}
// //         onStartShouldSetResponder={() => this.closeAll()}>
// //         <ScrollView
// //           style={{}}
// //           scrollEventThrottle={16}
// //           onScroll={Animated.event(
// //             [
// //               {
// //                 //useNativeDriver:true,
// //                 nativeEvent: {contentOffset: {y: this.state.scrollY}},
// //               },
// //             ],
// //             {useNativeDriver: false},
// //           )}
// //           contentContainerStyle={{
// //             paddingTop: global.headerHeight + 30,
// //             paddingHorizontal: 20,
// //             paddingBottom: 60,
// //           }}>
// //           <View style={[styles.mainInfoContainer]}>
// //             <View
// //               style={[
// //                 styles.mainInfoInnerContainer,
// //                 {backgroundColor: this.props.settings.theme.bgPrimary},
// //               ]}>
// //               <View style={{marginBottom: 20, alignItems: 'center'}}>
// //                 <Text
// //                   style={[
// //                     styles.mainInfoTitle,
// //                     {color: this.props.settings.theme.textPrimary},
// //                   ]}>
// //                   {cd.fullname}
// //                 </Text>
// //                 <Text
// //                   style={[
// //                     styles.mainInfoSubtitle,
// //                     {color: this.props.settings.theme.textSecondary},
// //                   ]}>
// //                   {cd.companyname}
// //                 </Text>
// //               </View>
// //               <Rating
// //                 key={c.rating}
// //                 rating={parseInt(c.rating)}
// //                 fullStar={
// //                   <Image
// //                     source={global.icon_star}
// //                     style={{
// //                       width: 20,
// //                       height: 20,
// //                       tintColor: global.color_yellow,
// //                       marginHorizontal: 3,
// //                     }}
// //                   />
// //                 }
// //                 emptyStar={
// //                   <Image
// //                     source={global.icon_star}
// //                     style={{
// //                       width: 20,
// //                       height: 20,
// //                       tintColor: global.color_medgray,
// //                       marginHorizontal: 3,
// //                     }}
// //                   />
// //                 }
// //                 starSize={30}
// //                 // onChangeMove={rating => { this.setState({ rating1: rating }); }}
// //                 onChange={rating => {
// //                   // Alert.alert(`${rating}`)
// //                   this.props.updateRatings({cid: c.cid, rating});
// //                 }}
// //               />
// //               <View style={styles.quickButtonsContainer}>
// //                 <MiniButton
// //                   icon={global.icon_phone}
// //                   color={global.color_green}
// //                   onPress={() => this.handleQuickButton('phone')}
// //                 />
// //                 <MiniButton
// //                   icon={global.icon_sms}
// //                   color={global.color_turquoise}
// //                   onPress={() => this.handleQuickButton('text')}
// //                 />
// //                 <MiniButton
// //                   icon={global.icon_email}
// //                   color={global.color_blue}
// //                   onPress={() => this.handleQuickButton('email')}
// //                 />
// //                 <MiniButton
// //                   icon={global.icon_pencil}
// //                   color={global.color_purple}
// //                   onPress={() => this.handleQuickButton('edit')}
// //                 />
// //                 <MiniButton
// //                   icon={global.icon_delete}
// //                   color={global.color_red}
// //                   onPress={() => this.handleQuickButton('delete')}
// //                 />
// //               </View>
// //               <View style={{width: '100%'}}>
// //                 <Collapsible
// //                   collapsed={!this.state.showMoreInfo}
// //                   style={styles.moreInfoContainer}>
// //                   {moreInfo.map(item => {
// //                     return item.value && item.value !== '' ? (
// //                       <TouchableOpacity
// //                         key={item.key}
// //                         onPress={() => {
// //                           Clipboard.setString(item.value);
// //                           this.refs.toast.show('Copied to Clipboard', 1000);
// //                         }}
// //                         style={styles.moreInfoItem}>
// //                         <Text
// //                           style={[
// //                             styles.moreInfoItemTitle,
// //                             {color: this.props.settings.theme.textSecondary},
// //                           ]}>
// //                           {item.title}
// //                         </Text>
// //                         <Text
// //                           style={[
// //                             styles.moreInfoItemValue,
// //                             {color: this.props.settings.theme.textPrimary},
// //                           ]}>
// //                           {item.key === 'phone'
// //                             ? formatMobileNumber(item.value)
// //                             : item.value}
// //                         </Text>
// //                       </TouchableOpacity>
// //                     ) : null;
// //                   })}
// //                 </Collapsible>
// //               </View>
// //               <TouchableOpacity
// //                 style={[
// //                   styles.moreInfoBtn,
// //                   {
// //                     //position: 'relative',
// //                     //bottom: 0,
// //                     zIndex: 2,
// //                   },
// //                 ]}
// //                 onPress={() =>
// //                   this.setState({showMoreInfo: !this.state.showMoreInfo})
// //                 }>
// //                 <Text
// //                   style={[
// //                     styles.moreInfoBtnText,
// //                     {color: this.props.settings.theme.bgPrimary},
// //                   ]}>
// //                   {this.state.showMoreInfo ? 'less' : 'more'} info
// //                 </Text>
// //               </TouchableOpacity>
// //             </View>
// //             <View style={styles.avatarContainer}>
// //               <View
// //                 style={[
// //                   styles.avatarImgContainer,
// //                   {backgroundColor: this.props.settings.theme.bgSecondary},
// //                 ]}>
// //                 {this.props.contactInfo.avatar ? (
// //                   <Image
// //                     style={global.styles.imgCover}
// //                     source={{uri: this.props.contactInfo.avatar}}
// //                   />
// //                 ) : (
// //                   <Text
// //                     style={[
// //                       styles.avatarInitials,
// //                       {color: this.props.settings.theme.textSecondary},
// //                     ]}>
// //                     {cd.first_name && cd.first_name.length > 0
// //                       ? cd.first_name.charAt(0)
// //                       : ''}
// //                     {cd.last_name && cd.last_name.length > 0
// //                       ? cd.last_name.charAt(0)
// //                       : ''}
// //                   </Text>
// //                 )}
// //               </View>
// //             </View>
// //           </View>
// //           <View style={styles.segmentTitleContainer}>
// //             <Text
// //               style={[
// //                 styles.segmentTitle,
// //                 {color: this.props.settings.theme.textPrimary},
// //               ]}>
// //               Groups
// //             </Text>
// //             <PlusButton
// //               onPress={() => this.addIconPressed('groups')}
// //               tintColor={this.props.settings.theme.bgPrimary}
// //             />
// //           </View>

// //           <View
// //             style={[
// //               global.styles.tagsContainer,
// //               {backgroundColor: this.props.settings.theme.tagsContainer},
// //             ]}>
// //             {!c.groups ? (
// //               <GroupsItemEmpty
// //                 title={'No groups'}
// //                 textColor={this.props.settings.theme.textSecondary}
// //               />
// //             ) : (
// //               c.groups.map(item => {
// //                 return (
// //                   <GroupsItem
// //                     key={item.gid}
// //                     title={item && item.name ? item.name : ''}
// //                     bgColor={this.props.settings.theme.bgPrimary}
// //                     textColor={this.props.settings.theme.textPrimary}
// //                     onPressDelete={() =>
// //                       this.props.removeGroupToContact({
// //                         cid: c.cid,
// //                         gid: item.gid,
// //                       })
// //                     }
// //                   />
// //                 );
// //               })
// //             )}
// //           </View>

// //           <View style={styles.segmentTitleContainer}>
// //             <Text
// //               style={[
// //                 styles.segmentTitle,
// //                 {color: this.props.settings.theme.textPrimary},
// //               ]}>
// //               Tags
// //             </Text>
// //             <PlusButton
// //               onPress={() => this.addIconPressed('tags')}
// //               tintColor={this.props.settings.theme.bgPrimary}
// //             />
// //           </View>
// //           <View
// //             style={[
// //               global.styles.tagsContainer,
// //               {backgroundColor: this.props.settings.theme.tagsContainer},
// //             ]}>
// //             {c.tags && c.tags.length > 0 ? (
// //               c.tags.map(item => {
// //                 return (
// //                   <GroupsItem
// //                     key={item.contact_tag_id}
// //                     title={item.tag}
// //                     bgColor={this.props.settings.theme.bgPrimary}
// //                     textColor={this.props.settings.theme.textPrimary}
// //                     onPressDelete={() =>
// //                       this.props.removeTagToContact({
// //                         cid: c.cid,
// //                         tags: [item.contact_tag_id],
// //                       })
// //                     }
// //                   />
// //                 );
// //               })
// //             ) : (
// //               <GroupsItemEmpty
// //                 title={'No tags'}
// //                 textColor={this.props.settings.theme.textSecondary}
// //               />
// //             )}
// //           </View>

// //           <View style={styles.segmentTitleContainer}>
// //             <Text
// //               style={[
// //                 styles.segmentTitle,
// //                 {color: this.props.settings.theme.textPrimary},
// //               ]}>
// //               Campaigns
// //             </Text>
// //             <PlusButton
// //               onPress={() => this.addIconPressed('campaigns')}
// //               tintColor={this.props.settings.theme.bgPrimary}
// //             />
// //           </View>
// //           <View
// //             style={[
// //               global.styles.tagsContainer,
// //               {backgroundColor: this.props.settings.theme.tagsContainer},
// //             ]}>
// //             {c.campaigns &&
// //             c.campaigns.length > 0 &&
// //             c.campaigns[0] !== false &&
// //             c.campaigns[0] ? (
// //               c.campaigns.map(item => {
// //                 return (
// //                   <GroupsItem
// //                     key={item?.name}
// //                     title={item?.name}
// //                     bgColor={this.props.settings.theme.bgPrimary}
// //                     textColor={this.props.settings.theme.textPrimary}
// //                     onPressDelete={() =>
// //                       this.props.removeCampaignToContact({cid: c.cid})
// //                     }
// //                   />
// //                 );
// //               })
// //             ) : (
// //               <GroupsItemEmpty
// //                 title={'No campaigns'}
// //                 textColor={this.props.settings.theme.textSecondary}
// //               />
// //             )}
// //           </View>

// //           <View
// //             style={[
// //               styles.segmentTitleContainer,
// //               {justifyContent: 'space-between'},
// //             ]}>
// //             <View style={global.styles.inlineBlock}>
// //               <Text
// //                 style={[
// //                   styles.segmentTitle,
// //                   {color: this.props.settings.theme.textPrimary},
// //                 ]}>
// //                 Tasks
// //               </Text>
// //               <PlusButton
// //                 onPress={() => this.addIconPressed('tasks')}
// //                 tintColor={this.props.settings.theme.bgPrimary}
// //               />
// //             </View>
// //             {/*
// //               <MiniButton
// //                 onPress={() => this.setState({ showCompletedTask: !this.state.showCompletedTask }) }
// //                 icon={global.icon_dots} size={25}
// //                 style={{ backgroundColor: 'rgba(0,0,0,0.0)', alignSelf: 'flex-end'}}
// //                 iconStyle={{ tintColor: this.props.settings.theme.textPrimary }}
// //                 bgColor={this.props.settings.theme.bgPrimary}
// //               />
// //               */}
// //             <TouchableOpacity
// //               style={{
// //                 padding: 5,
// //                 borderRadius: 5,
// //                 backgroundColor: global.color_theme,
// //               }}
// //               onPress={() => this.setState({viewMore: !this.state.viewMore})}>
// //               <Image
// //                 style={{
// //                   width: 14,
// //                   height: 14,
// //                   resizeMode: 'contain',
// //                   tintColor: global.color_white,
// //                 }}
// //                 source={
// //                   this.state.viewMore
// //                     ? global.icon_dropdown
// //                     : global.icon_rightarrow
// //                 }
// //               />
// //             </TouchableOpacity>
// //           </View>

// //           <View style={{flex: 1}}>
// //             {c.tasks && c.tasks.length > 0 ? (
// //               c.tasks.length > 3 && !this.state.viewMore ? (
// //                 <View style={{marginHorizontal: -30}}>
// //                   {c.tasks.map((item, index) => {
// //                     if (index <= 2) {
// //                       return (
// //                         <Collapsible
// //                           collapsed={!this.state.showCompletedTask && active}
// //                           style={{width: '100%'}}>
// //                           <Swipeable
// //                             ref={c => {
// //                               this.selectedRow = c;
// //                             }}
// //                             rightButtons={[
// //                               <TouchableOpacity
// //                                 style={[
// //                                   styles.rightSwipeItem,
// //                                   {backgroundColor: global.color_purple},
// //                                 ]}
// //                                 onPress={() => {
// //                                   this.props.navigation.navigate('NewTask', {
// //                                     title: 'Edit Task',
// //                                     contact: c,
// //                                     task: item,
// //                                     route: 'ContactDetails',
// //                                     onNavigateBack: this.refresh.bind(this),
// //                                   });
// //                                   this.closeAll();
// //                                 }}>
// //                                 <MiniButton
// //                                   icon={global.icon_pencil}
// //                                   color={global.color_purple}
// //                                   style={{marginLeft: 1, marginBottom: -5}}
// //                                   onPress={() => {
// //                                     this.props.navigation.navigate('NewTask', {
// //                                       title: 'Edit Task',
// //                                       contact: c,
// //                                       task: item,
// //                                       route: 'ContactDetails',
// //                                       onNavigateBack: this.refresh.bind(this),
// //                                     });
// //                                     this.closeAll();
// //                                   }}
// //                                 />
// //                                 <Text
// //                                   style={{
// //                                     color: global.color_white,
// //                                     marginLeft: 5,
// //                                     marginBottom: 5,
// //                                   }}>
// //                                   Edit
// //                                 </Text>
// //                               </TouchableOpacity>,
// //                               <TouchableOpacity
// //                                 style={[
// //                                   styles.rightSwipeItem,
// //                                   {backgroundColor: global.color_red},
// //                                 ]}
// //                                 onPress={() => {
// //                                   this.setState({
// //                                     alertVisible: true,
// //                                     alertTitle: 'Delete Task',
// //                                     alertMessage:
// //                                       'Are you sure you want to delete this task?',
// //                                     alertButtons: [
// //                                       {
// //                                         text: 'Cancel',
// //                                         onPress: () =>
// //                                           this.setState({alertVisible: false}),
// //                                         type: 'cancel',
// //                                       },
// //                                       {
// //                                         text: 'Delete',
// //                                         onPress: () => {
// //                                           this.setState({alertVisible: false});
// //                                           this.props.deleteTask({
// //                                             did: item.did,
// //                                           });
// //                                         },
// //                                       },
// //                                     ],
// //                                     alertIcon: null,
// //                                   });
// //                                   this.closeAll();
// //                                 }}>
// //                                 <MiniButton
// //                                   icon={global.icon_delete}
// //                                   color={global.color_red}
// //                                   style={{marginLeft: -5, marginBottom: -4}}
// //                                   onPress={() => {
// //                                     this.setState({
// //                                       alertVisible: true,
// //                                       alertTitle: 'Delete Task',
// //                                       alertMessage:
// //                                         'Are you sure you want to delete this task?',
// //                                       alertButtons: [
// //                                         {
// //                                           text: 'Cancel',
// //                                           onPress: () =>
// //                                             this.setState({
// //                                               alertVisible: false,
// //                                             }),
// //                                           type: 'cancel',
// //                                         },
// //                                         {
// //                                           text: 'Delete',
// //                                           onPress: () => {
// //                                             this.setState({
// //                                               alertVisible: false,
// //                                             });
// //                                             this.props.deleteTask({
// //                                               did: item.did,
// //                                             });
// //                                           },
// //                                         },
// //                                       ],
// //                                       alertIcon: null,
// //                                     });
// //                                     this.closeAll();
// //                                   }}
// //                                 />
// //                                 <Text style={styles.iconStyle}>Delete</Text>
// //                               </TouchableOpacity>,
// //                             ]}
// //                             onRightButtonsOpenRelease={this.onOpen}
// //                             onRightButtonsCloseRelease={this.onClose}>
// //                             <TaskItem
// //                               title={item.title}
// //                               subtitle={item.date + ' ' + item.type}
// //                               active={item.status === '1'}
// //                               bgColor={this.props.settings.theme.bgPrimary}
// //                               textColor={this.props.settings.theme.textPrimary}
// //                               onPress={() =>
// //                                 this.props.navigation.navigate('NewTask', {
// //                                   title: 'Edit Task',
// //                                   contact: c,
// //                                   task: item,
// //                                   route: 'ContactDetails',
// //                                   onNavigateBack: this.refresh.bind(this),
// //                                 })
// //                               }
// //                               onPressCheckbox={() => {
// //                                 let task = this.props.route.params.task;
// //                                 let params = {
// //                                   did: item.did,
// //                                   title: item.title,
// //                                   status: item.status === '1' ? '0' : '1',
// //                                 };

// //                                 this.props.editTask(params);
// //                               }}
// //                             />
// //                           </Swipeable>
// //                           {/* <SwipeRow
// //       style={{}}
// //       ref={(c) => { this.component[index] = c }}
// //       leftOpenValue={75}
// //       rightOpenValue={-75}
// //       onRowOpen={() => {
// //         if (this.selectedRow && this.selectedRow !== this.component[index]) { this.selectedRow._root.closeRow(); }
// //         this.selectedRow = this.component[index]
// //       }}
// //       body={
// //         <TaskItem
// //           title={item.title}
// //           subtitle={item.date}
// //           active={item.status==='1'}
// //           bgColor={this.props.settings.theme.bgPrimary}
// //           textColor={this.props.settings.theme.textPrimary}
// //           onPress={() => this.props.navigation.navigate('NewTask', {
// //             title: 'Edit Task',
// //             contact: c,
// //             task: item,
// //             route: 'ContactDetails',
// //             onNavigateBack: this.refresh.bind(this)
// //           })}
// //           onPressCheckbox={() => {
// //             let task = this.props.route.params.task;
// //             let params = {
// //               did: item.did,
// //               title: item.title,
// //               status: item.status==='1' ? '0' : '1'
// //             };

// //             this.props.editTask(params);
// //           }}
// //         />
// //       } */}
// //                         </Collapsible>
// //                       );
// //                     }
// //                     //  else if (index == 3){
// //                     //   return (<TouchableOpacity style={{ width:'100%', alignItems:'center', borderRadius:10 , marginTop:10 ,  }} onPress={() => this.setState({viewMore: true})}>
// //                     //     <Text style={{padding:15 , color:'white', fontSize:15, fontWeight:'bold', backgroundColor: global.color_theme,paddingHorizontal:40, borderRadius: 24, overflow:'hidden'}}>View More</Text>
// //                     //   </TouchableOpacity>)
// //                     // } else {
// //                     //   return <View/>
// //                     // }
// //                   })}
// //                 </View>
// //               ) : (
// //                 <FlatList
// //                   style={{marginHorizontal: -30}}
// //                   contentContainerStyle={[{}]}
// //                   data={this.taskRender()}
// //                   extraData={c.tasks}
// //                   showsVerticalScrollIndicator={false}
// //                   keyExtractor={(item, index) => `list-item-${index}`}
// //                   renderItem={({item, index}) => {
// //                     return (
// //                       <Collapsible
// //                         collapsed={!this.state.showCompletedTask && active}
// //                         style={{width: '100%'}}>
// //                         <Swipeable
// //                           ref={c => {
// //                             this.selectedRow = c;
// //                           }}
// //                           rightButtons={[
// //                             <TouchableOpacity
// //                               style={[
// //                                 styles.rightSwipeItem,
// //                                 {backgroundColor: global.color_purple},
// //                               ]}
// //                               onPress={() => {
// //                                 this.props.navigation.navigate('NewTask', {
// //                                   title: 'Edit Task',
// //                                   contact: c,
// //                                   task: item,
// //                                   route: 'ContactDetails',
// //                                   onNavigateBack: this.refresh.bind(this),
// //                                 });
// //                                 this.closeAll();
// //                               }}>
// //                               <MiniButton
// //                                 icon={global.icon_pencil}
// //                                 color={global.color_purple}
// //                                 style={{marginLeft: 1, marginBottom: -5}}
// //                                 onPress={() => {
// //                                   this.props.navigation.navigate('NewTask', {
// //                                     title: 'Edit Task',
// //                                     contact: c,
// //                                     task: item,
// //                                     route: 'ContactDetails',
// //                                     onNavigateBack: this.refresh.bind(this),
// //                                   });
// //                                   this.closeAll();
// //                                 }}
// //                               />
// //                               <Text
// //                                 style={{
// //                                   color: global.color_white,
// //                                   marginLeft: 5,
// //                                   marginBottom: 5,
// //                                 }}>
// //                                 Edit
// //                               </Text>
// //                             </TouchableOpacity>,
// //                             <TouchableOpacity
// //                               style={[
// //                                 styles.rightSwipeItem,
// //                                 {backgroundColor: global.color_red},
// //                               ]}
// //                               onPress={() => {
// //                                 this.setState({
// //                                   alertVisible: true,
// //                                   alertTitle: 'Delete Task',
// //                                   alertMessage:
// //                                     'Are you sure you want to delete this task?',
// //                                   alertButtons: [
// //                                     {
// //                                       text: 'Cancel',
// //                                       onPress: () =>
// //                                         this.setState({alertVisible: false}),
// //                                       type: 'cancel',
// //                                     },
// //                                     {
// //                                       text: 'Delete',
// //                                       onPress: () => {
// //                                         this.setState({alertVisible: false});
// //                                         this.props.deleteTask({did: item.did});
// //                                       },
// //                                     },
// //                                   ],
// //                                   alertIcon: null,
// //                                 });
// //                                 this.closeAll();
// //                               }}>
// //                               <MiniButton
// //                                 icon={global.icon_delete}
// //                                 color={global.color_red}
// //                                 style={{marginLeft: -5, marginBottom: -4}}
// //                                 onPress={() => {
// //                                   this.setState({
// //                                     alertVisible: true,
// //                                     alertTitle: 'Delete Task',
// //                                     alertMessage:
// //                                       'Are you sure you want to delete this task?',
// //                                     alertButtons: [
// //                                       {
// //                                         text: 'Cancel',
// //                                         onPress: () =>
// //                                           this.setState({alertVisible: false}),
// //                                         type: 'cancel',
// //                                       },
// //                                       {
// //                                         text: 'Delete',
// //                                         onPress: () => {
// //                                           this.setState({alertVisible: false});
// //                                           this.props.deleteTask({
// //                                             did: item.did,
// //                                           });
// //                                         },
// //                                       },
// //                                     ],
// //                                     alertIcon: null,
// //                                   });
// //                                   this.closeAll();
// //                                 }}
// //                               />
// //                               <Text style={styles.iconStyle}>Delete</Text>
// //                             </TouchableOpacity>,
// //                           ]}
// //                           onRightButtonsOpenRelease={this.onOpen}
// //                           onRightButtonsCloseRelease={this.onClose}>
// //                           <TaskItem
// //                             title={item.title}
// //                             subtitle={item.date + ' ' + item.type}
// //                             active={item.status === '1'}
// //                             bgColor={this.props.settings.theme.bgPrimary}
// //                             textColor={this.props.settings.theme.textPrimary}
// //                             onPress={() =>
// //                               this.props.navigation.navigate('NewTask', {
// //                                 title: 'Edit Task',
// //                                 contact: c,
// //                                 task: item,
// //                                 route: 'ContactDetails',
// //                                 onNavigateBack: this.refresh.bind(this),
// //                               })
// //                             }
// //                             onPressCheckbox={() => {
// //                               let task = this.props.route.params.task;
// //                               let params = {
// //                                 did: item.did,
// //                                 title: item.title,
// //                                 status: item.status === '1' ? '0' : '1',
// //                               };

// //                               this.props.editTask(params);
// //                             }}
// //                           />
// //                         </Swipeable>
// //                         {/* <SwipeRow
// //                         style={{}}
// //                         ref={(c) => { this.component[index] = c }}
// //                         leftOpenValue={75}
// //                         rightOpenValue={-75}
// //                         onRowOpen={() => {
// //                           if (this.selectedRow && this.selectedRow !== this.component[index]) { this.selectedRow._root.closeRow(); }
// //                           this.selectedRow = this.component[index]
// //                         }}
// //                         body={
// //                           <TaskItem
// //                             title={item.title}
// //                             subtitle={item.date}
// //                             active={item.status==='1'}
// //                             bgColor={this.props.settings.theme.bgPrimary}
// //                             textColor={this.props.settings.theme.textPrimary}
// //                             onPress={() => this.props.navigation.navigate('NewTask', {
// //                               title: 'Edit Task',
// //                               contact: c,
// //                               task: item,
// //                               route: 'ContactDetails',
// //                               onNavigateBack: this.refresh.bind(this)
// //                             })}
// //                             onPressCheckbox={() => {
// //                               let task = this.props.route.params.task;
// //                               let params = {
// //                                 did: item.did,
// //                                 title: item.title,
// //                                 status: item.status==='1' ? '0' : '1'
// //                               };

// //                               this.props.editTask(params);
// //                             }}
// //                           />
// //                         } */}
// //                       </Collapsible>
// //                     );
// //                   }}
// //                 />
// //               )
// //             ) : (
// //               <GroupsItemEmpty
// //                 title={'No tasks'}
// //                 textColor={this.props.settings.theme.textSecondary}
// //               />
// //             )}
// //           </View>

// //           <View
// //             style={[
// //               styles.segmentTitleContainer,
// //               {justifyContent: 'space-between'},
// //             ]}>
// //             <View style={global.styles.inlineBlock}>
// //               <Text
// //                 style={[
// //                   styles.segmentTitle,
// //                   {color: this.props.settings.theme.textPrimary},
// //                 ]}>
// //                 Notes
// //               </Text>
// //               <PlusButton
// //                 onPress={() => this.addIconPressed('notes')}
// //                 tintColor={this.props.settings.theme.bgPrimary}
// //               />
// //             </View>
// //             {/*
// //               <MiniButton
// //               icon={global.icon_dots}
// //               size={25}
// //               style={{ backgroundColor: 'rgba(0,0,0,0.0)', alignSelf: 'flex-end'}} iconStyle={{ tintColor: this.props.settings.theme.textPrimary }} />
// //               */}
// //             <TouchableOpacity
// //               style={{
// //                 padding: 5,
// //                 borderRadius: 5,
// //                 backgroundColor: global.color_theme,
// //               }}
// //               onPress={() =>
// //                 this.setState({notesViewMore: !this.state.notesViewMore})
// //               }>
// //               <Image
// //                 style={{
// //                   width: 14,
// //                   height: 14,
// //                   resizeMode: 'contain',
// //                   tintColor: global.color_white,
// //                 }}
// //                 source={
// //                   this.state.notesViewMore
// //                     ? global.icon_dropdown
// //                     : global.icon_rightarrow
// //                 }
// //               />
// //             </TouchableOpacity>
// //           </View>
// //           <View style={{flex: 1}}>
// //             {c.notes && c.notes.length > 0 ? (
// //               c.notes.length > 3 && !this.state.notesViewMore ? (
// //                 <View style={{marginHorizontal: -30}}>
// //                   {c.notes.map((item, index) => {
// //                     if (index <= 2) {
// //                       return (
// //                         <Swipeable
// //                           ref={c => {
// //                             this.selectedRow = c;
// //                           }}
// //                           rightButtons={[
// //                             <TouchableOpacity
// //                               style={[
// //                                 styles.rightSwipeItem,
// //                                 {backgroundColor: global.color_purple},
// //                               ]}
// //                               onPress={() => {
// //                                 this.props.navigation.navigate('NewNote', {
// //                                   cid: c.cid,
// //                                   note: item,
// //                                   onNavigateBack: this.refresh.bind(this),
// //                                 });
// //                                 this.closeAll();
// //                               }}>
// //                               <MiniButton
// //                                 icon={global.icon_pencil}
// //                                 color={global.color_purple}
// //                                 style={{marginLeft: 1, marginBottom: -5}}
// //                                 onPress={() => {
// //                                   this.props.navigation.navigate('NewNote', {
// //                                     cid: c.cid,
// //                                     note: item,
// //                                     onNavigateBack: this.refresh.bind(this),
// //                                   });
// //                                   this.closeAll();
// //                                 }}
// //                               />
// //                               <Text
// //                                 style={{
// //                                   color: global.color_white,
// //                                   marginLeft: 5,
// //                                   marginBottom: 5,
// //                                 }}>
// //                                 Edit
// //                               </Text>
// //                             </TouchableOpacity>,
// //                             <TouchableOpacity
// //                               style={[
// //                                 styles.rightSwipeItem,
// //                                 {backgroundColor: global.color_red},
// //                               ]}
// //                               onPress={() => {
// //                                 this.setState({
// //                                   alertVisible: true,
// //                                   alertTitle: 'Delete Note',
// //                                   alertMessage:
// //                                     'Are you sure you want to delete this note?',
// //                                   alertButtons: [
// //                                     {
// //                                       text: 'Cancel',
// //                                       onPress: () =>
// //                                         this.setState({alertVisible: false}),
// //                                       type: 'cancel',
// //                                     },
// //                                     {
// //                                       text: 'Delete',
// //                                       onPress: () => {
// //                                         this.setState({alertVisible: false});
// //                                         this.props.deleteNote({
// //                                           cid: c.cid,
// //                                           nid: item.nid,
// //                                         });
// //                                         this.refresh();
// //                                       },
// //                                     },
// //                                   ],
// //                                   alertIcon: null,
// //                                 });
// //                                 this.closeAll();
// //                               }}>
// //                               <MiniButton
// //                                 icon={global.icon_delete}
// //                                 color={global.color_red}
// //                                 style={{marginLeft: -4, marginBottom: -4}}
// //                                 onPress={() => {
// //                                   this.setState({
// //                                     alertVisible: true,
// //                                     alertTitle: 'Delete Note',
// //                                     alertMessage:
// //                                       'Are you sure you want to delete this note?',
// //                                     alertButtons: [
// //                                       {
// //                                         text: 'Cancel',
// //                                         onPress: () =>
// //                                           this.setState({alertVisible: false}),
// //                                         type: 'cancel',
// //                                       },
// //                                       {
// //                                         text: 'Delete',
// //                                         onPress: () => {
// //                                           this.setState({alertVisible: false});
// //                                           this.props.deleteNote({
// //                                             cid: c.cid,
// //                                             nid: item.nid,
// //                                           });
// //                                           this.refresh();
// //                                         },
// //                                       },
// //                                     ],
// //                                     alertIcon: null,
// //                                   });
// //                                   this.closeAll();
// //                                 }}
// //                               />
// //                               <Text style={styles.iconStyle}>Delete</Text>
// //                             </TouchableOpacity>,
// //                           ]}
// //                           onRightButtonsOpenRelease={this.onOpen}
// //                           onRightButtonsCloseRelease={this.onClose}>
// //                           <NoteItem
// //                             title={item.content}
// //                             subtitle={item.date}
// //                             textColor={this.props.settings.theme.textPrimary}
// //                             bgColor={this.props.settings.theme.bgPrimary}
// //                             onPress={() =>
// //                               this.props.navigation.navigate('NewNote', {
// //                                 cid: c.cid,
// //                                 note: item,
// //                                 onNavigateBack: this.refresh.bind(this),
// //                               })
// //                             }
// //                           />
// //                         </Swipeable>
// //                       );
// //                     }
// //                   })}
// //                 </View>
// //               ) : (
// //                 <FlatList
// //                   style={{marginHorizontal: -30}}
// //                   contentContainerStyle={[{}]}
// //                   data={this.notesRender()}
// //                   showsVerticalScrollIndicator={false}
// //                   keyExtractor={(item, index) => `list-item-${index}`}
// //                   renderItem={({item, index}) => {
// //                     const active = index % 2 === 0;
// //                     return (
// //                       <Swipeable
// //                         ref={c => {
// //                           this.selectedRow = c;
// //                         }}
// //                         rightButtons={[
// //                           <TouchableOpacity
// //                             style={[
// //                               styles.rightSwipeItem,
// //                               {backgroundColor: global.color_purple},
// //                             ]}
// //                             onPress={() => {
// //                               this.props.navigation.navigate('NewNote', {
// //                                 cid: c.cid,
// //                                 note: item,
// //                                 onNavigateBack: this.refresh.bind(this),
// //                               });
// //                               this.closeAll();
// //                             }}>
// //                             <MiniButton
// //                               icon={global.icon_pencil}
// //                               color={global.color_purple}
// //                               style={{marginLeft: 1, marginBottom: -5}}
// //                               onPress={() => {
// //                                 this.props.navigation.navigate('NewNote', {
// //                                   cid: c.cid,
// //                                   note: item,
// //                                   onNavigateBack: this.refresh.bind(this),
// //                                 });
// //                                 this.closeAll();
// //                               }}
// //                             />
// //                             <Text
// //                               style={{
// //                                 color: global.color_white,
// //                                 marginLeft: 5,
// //                                 marginBottom: 5,
// //                               }}>
// //                               Edit
// //                             </Text>
// //                           </TouchableOpacity>,
// //                           <TouchableOpacity
// //                             style={[
// //                               styles.rightSwipeItem,
// //                               {backgroundColor: global.color_red},
// //                             ]}
// //                             onPress={() => {
// //                               this.setState({
// //                                 alertVisible: true,
// //                                 alertTitle: 'Delete Note',
// //                                 alertMessage:
// //                                   'Are you sure you want to delete this note?',
// //                                 alertButtons: [
// //                                   {
// //                                     text: 'Cancel',
// //                                     onPress: () =>
// //                                       this.setState({alertVisible: false}),
// //                                     type: 'cancel',
// //                                   },
// //                                   {
// //                                     text: 'Delete',
// //                                     onPress: () => {
// //                                       this.setState({alertVisible: false});
// //                                       this.props.deleteNote({
// //                                         cid: c.cid,
// //                                         nid: item.nid,
// //                                       });
// //                                       this.refresh();
// //                                     },
// //                                   },
// //                                 ],
// //                                 alertIcon: null,
// //                               });
// //                               this.closeAll();
// //                             }}>
// //                             <MiniButton
// //                               icon={global.icon_delete}
// //                               color={global.color_red}
// //                               style={{marginLeft: -4, marginBottom: -4}}
// //                               onPress={() => {
// //                                 this.setState({
// //                                   alertVisible: true,
// //                                   alertTitle: 'Delete Note',
// //                                   alertMessage:
// //                                     'Are you sure you want to delete this note?',
// //                                   alertButtons: [
// //                                     {
// //                                       text: 'Cancel',
// //                                       onPress: () =>
// //                                         this.setState({alertVisible: false}),
// //                                       type: 'cancel',
// //                                     },
// //                                     {
// //                                       text: 'Delete',
// //                                       onPress: () => {
// //                                         this.setState({alertVisible: false});
// //                                         this.props.deleteNote({
// //                                           cid: c.cid,
// //                                           nid: item.nid,
// //                                         });
// //                                         this.refresh();
// //                                       },
// //                                     },
// //                                   ],
// //                                   alertIcon: null,
// //                                 });
// //                                 this.closeAll();
// //                               }}
// //                             />
// //                             <Text style={styles.iconStyle}>Delete</Text>
// //                           </TouchableOpacity>,
// //                         ]}
// //                         onRightButtonsOpenRelease={this.onOpen}
// //                         onRightButtonsCloseRelease={this.onClose}>
// //                         <NoteItem
// //                           title={item.content}
// //                           subtitle={item.date}
// //                           textColor={this.props.settings.theme.textPrimary}
// //                           bgColor={this.props.settings.theme.bgPrimary}
// //                           onPress={() =>
// //                             this.props.navigation.navigate('NewNote', {
// //                               cid: c.cid,
// //                               note: item,
// //                               onNavigateBack: this.refresh.bind(this),
// //                             })
// //                           }
// //                         />
// //                       </Swipeable>
// //                     );
// //                   }}
// //                 />
// //               )
// //             ) : (
// //               <GroupsItemEmpty
// //                 title={'No notes'}
// //                 textColor={this.props.settings.theme.textSecondary}
// //               />
// //             )}
// //           </View>

// //           <View
// //             style={[
// //               styles.segmentTitleContainer,
// //               {justifyContent: 'space-between'},
// //             ]}>
// //             <View style={global.styles.inlineBlock}>
// //               <Text
// //                 style={[
// //                   styles.segmentTitle,
// //                   {color: this.props.settings.theme.textPrimary},
// //                 ]}>
// //                 Email History
// //               </Text>
// //             </View>
// //             <TouchableOpacity
// //               style={{
// //                 padding: 5,
// //                 borderRadius: 5,
// //                 backgroundColor: global.color_theme,
// //               }}
// //               onPress={() =>
// //                 this.setState({emailViewMore: !this.state.emailViewMore})
// //               }>
// //               <Image
// //                 style={{
// //                   width: 14,
// //                   height: 14,
// //                   resizeMode: 'contain',
// //                   tintColor: global.color_white,
// //                 }}
// //                 source={
// //                   this.state.emailViewMore
// //                     ? global.icon_dropdown
// //                     : global.icon_rightarrow
// //                 }
// //               />
// //             </TouchableOpacity>
// //           </View>
// //           {c.history && c.history.emails && c.history.emails.length > 0 ? (
// //             c.history.emails.length > 3 && !this.state.emailViewMore ? (
// //               <View style={{marginHorizontal: -30}}>
// //                 {c.history.emails.map((item, index) => {
// //                   if (index <= 2) {
// //                     const active = index % 2 === 0;
// //                     var swipeoutBtns = [
// //                       {
// //                         text: 'Delete',
// //                         backgroundColor: global.color_red,
// //                       },
// //                     ];
// //                     return (
// //                       <EmailItem
// //                         active={active}
// //                         sender={item.from}
// //                         title={
// //                           item.subject_preview
// //                             ? mimeWordsDecode(item.subject_preview)
// //                             : ''
// //                         }
// //                         subtitle={
// //                           item.body_preview
// //                             ? cleanEmailBodyPreview(item.body_preview)
// //                             : ''
// //                         }
// //                         // timestamp={timestampToMonthDayTime(item.date*1000)}
// //                         timestamp={this.setDateTimeFormatForEmail(
// //                           item.date * 1000,
// //                         )}
// //                         box
// //                         separatorColor={this.props.settings.theme.separator}
// //                         textColor={this.props.settings.theme.textPrimary}
// //                         checkColor={this.props.settings.theme.bgSecondary}
// //                         bgColor={this.props.settings.theme.bgPrimary}
// //                         onPress={() =>
// //                           this.props.navigation.navigate('EmailDetails', {
// //                             emailContent: {...item, html_body: item.body},
// //                             box: 'Back',
// //                             emails: c.history.emails,
// //                             index: index,
// //                           })
// //                         }
// //                         unread={item.read === 0}
// //                       />
// //                     );
// //                   }
// //                 })}
// //               </View>
// //             ) : (
// //               <FlatList
// //                 style={{marginHorizontal: -30}}
// //                 contentContainerStyle={[{}]}
// //                 data={c.history.emails}
// //                 showsVerticalScrollIndicator={false}
// //                 keyExtractor={(item, index) => `list-item-${index}`}
// //                 renderItem={({item, index}) => {
// //                   const active = index % 2 === 0;
// //                   var swipeoutBtns = [
// //                     {
// //                       text: 'Delete',
// //                       backgroundColor: global.color_red,
// //                     },
// //                   ];
// //                   return (
// //                     // <Swipeout right={swipeoutBtns} style={{ backgroundColor: 'transparent' }} autoClose >
// //                     //   <EmailItem
// //                     //   active={active}
// //                     //   sender={item.from}
// //                     //   title={item.subject_preview ? mimeWordsDecode(item.subject_preview) : ''}
// //                     //   subtitle={item.body_preview ? cleanEmailBodyPreview(item.body_preview) : ''}
// //                     //   // timestamp={timestampToMonthDayTime(item.date*1000)}
// //                     //   timestamp={this.setDateTimeFormatForEmail(item.date*1000)}
// //                     //   box
// //                     //   separatorColor={this.props.settings.theme.separator}
// //                     //   textColor={this.props.settings.theme.textPrimary}
// //                     //   checkColor={this.props.settings.theme.bgSecondary}
// //                     //   bgColor={this.props.settings.theme.bgPrimary}
// //                     //   onPress={() => this.props.navigation.navigate('EmailDetails', {
// //                     //     emailContent: {...item, html_body: item.body},
// //                     //     box: 'Back',
// //                     //     emails: c.history.emails,
// //                     //     index: index,
// //                     //   })}
// //                     //   unread={item.read===0} />
// //                     // </Swipeout>
// //                     <EmailItem
// //                       active={active}
// //                       sender={item.from}
// //                       title={
// //                         item.subject_preview
// //                           ? mimeWordsDecode(item.subject_preview)
// //                           : ''
// //                       }
// //                       subtitle={
// //                         item.body_preview
// //                           ? cleanEmailBodyPreview(item.body_preview)
// //                           : ''
// //                       }
// //                       // timestamp={timestampToMonthDayTime(item.date*1000)}
// //                       timestamp={this.setDateTimeFormatForEmail(
// //                         item.date * 1000,
// //                       )}
// //                       box
// //                       separatorColor={this.props.settings.theme.separator}
// //                       textColor={this.props.settings.theme.textPrimary}
// //                       checkColor={this.props.settings.theme.bgSecondary}
// //                       bgColor={this.props.settings.theme.bgPrimary}
// //                       onPress={() =>
// //                         this.props.navigation.navigate('EmailDetails', {
// //                           emailContent: {...item, html_body: item.body},
// //                           box: 'Back',
// //                           emails: c.history.emails,
// //                           index: index,
// //                         })
// //                       }
// //                       unread={item.read === 0}
// //                     />
// //                   );
// //                 }}
// //               />
// //             )
// //           ) : (
// //             <GroupsItemEmpty
// //               title={'No email history'}
// //               textColor={this.props.settings.theme.textSecondary}
// //             />
// //           )}
// //         </ScrollView>
// //         <Animated.View
// //           style={{
// //             backgroundColor: this.props.settings.theme.bgSecondary,
// //             position: 'absolute',
// //             height: global.headerHeight,
// //             top: 0,
// //             left: 0,
// //             right: 0,
// //             opacity: headerOpacity,
// //           }}>
// //           <Text
// //             numberOfLines={1}
// //             style={{
// //               position: 'absolute',
// //               bottom: 10,
// //               alignSelf: 'center',
// //               fontFamily: 'Montserrat-Regular',
// //               fontWeight: '700',
// //               fontSize: 18,
// //               color: this.props.settings.theme.textPrimary,
// //               marginHorizontal: 50,
// //             }}>
// //             {cd.fullname}
// //           </Text>
// //         </Animated.View>

// //         <ModalAlert
// //           onBackdropPress={() => this.setState({alertVisible: false})}
// //           isVisible={this.state.alertVisible}
// //           title={this.state.alertTitle}
// //           message={this.state.alertMessage}
// //           alertIcon={this.state.alertIcon}
// //           buttons={this.state.alertButtons}
// //           dark={this.props.settings.theme.mode === 'dark'}
// //           bgColor={this.props.settings.theme.bgPrimary}
// //           textColor={this.props.settings.theme.textPrimary}
// //         />

// //         <ModalChecklist
// //           isVisible={
// //             this.state.alertListVisible && this.state.alertListType !== ''
// //           }
// //           title={this.state.alertListTitle}
// //           onBackdropPress={() => this.setState({alertListVisible: false})}
// //           list={this.renderAlertList()}
// //           onPressSave={this.state.alertListSave}
// //           bgColor={this.props.settings.theme.bgTertiary}
// //           textColor={this.props.settings.theme.textPrimary}
// //         />
// //         <Toast
// //           ref={'toast'}
// //           style={[
// //             global.styles.toastStyle,
// //             {backgroundColor: this.props.settings.theme.bgPrimary},
// //           ]}
// //           textStyle={[
// //             global.styles.toastTextStyle,
// //             {color: this.props.settings.theme.textPrimary},
// //           ]}
// //         />
// //         {this.props.contactsStatus === CONTACT_DELETECONTACT_LOADING ||
// //         this.props.contactsStatus === CONTACT_GETCONTACTINFO_LOADING ? (
// //           <IndicatorBottom dark={this.props.settings.theme.mode === 'dark'} />
// //         ) : null}

// //         <ModalBottom
// //           onBackdropPress={() => this.setState({showMenu: false})}
// //           isVisible={this.state.showMenu}
// //           dark={this.props.settings.theme.mode === 'dark'}
// //           list={this.renderMenuOptions()}
// //           title={cd.fullname}
// //           buttons={[
// //             {
// //               text: 'Cancel',
// //               type: 'cancel',
// //               onPress: () => this.setState({showMenu: false}),
// //             },
// //           ]}
// //           bgColor={
// //             this.props.settings.theme.mode === 'light'
// //               ? this.props.settings.theme.bgPrimary
// //               : this.props.settings.theme.bgTertiary
// //           }
// //           textColor={this.props.settings.theme.textPrimary}
// //           //hideArrow
// //         />
// //       </View>
// //     );
// //   }
// // }

// // const PlusButton = ({tintColor, onPress, size = 20, iconStyle, style}) => {
// //   return (
// //     <TouchableOpacity
// //       onPress={onPress}
// //       style={{paddingVertical: 5, paddingLeft: 5, paddingRight: 10}}>
// //       <View
// //         style={[
// //           {
// //             width: size,
// //             height: size,
// //             borderRadius: size / 2,
// //             marginHorizontal: 6,
// //             padding: size / 4,
// //             backgroundColor: global.color_theme,
// //           },
// //           style,
// //         ]}>
// //         <Image
// //           source={global.icon_plus}
// //           style={[
// //             {
// //               width: '100%',
// //               height: '100%',
// //               tintColor: tintColor,
// //             },
// //             iconStyle,
// //           ]}
// //         />
// //       </View>
// //     </TouchableOpacity>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   mainInfoInnerContainer: {
// //     backgroundColor: global.color_white,
// //     alignItems: 'center',
// //     borderRadius: 30,
// //     shadowColor: '#432587',
// //     shadowOffset: {width: 0, height: 5},
// //     shadowOpacity: 0.15,
// //     shadowRadius: 10,
// //     elevation: 10,
// //     paddingHorizontal: 30,
// //     paddingTop: 80,
// //     paddingBottom: 40,
// //   },
// //   avatarContainer: {
// //     position: 'absolute',
// //     alignSelf: 'center',
// //     marginTop: -60,
// //     width: 120,
// //     height: 120,
// //     borderRadius: 60,
// //     shadowColor: '#432587',
// //     shadowOffset: {width: 0, height: 3},
// //     shadowOpacity: 0.3,
// //     shadowRadius: 10,
// //     elevation: 10,
// //   },
// //   avatarImgContainer: {
// //     borderRadius: 60,
// //     width: '100%',
// //     height: '100%',
// //     overflow: 'hidden',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   avatarInitials: {
// //     fontFamily: 'Montserrat-Regular',
// //     fontWeight: '700',
// //     fontSize: 30,
// //     color: global.color_gray,
// //     textAlign: 'center',
// //   },
// //   mainInfoTitle: {
// //     fontFamily: 'Montserrat-Regular',
// //     fontWeight: '700',
// //     fontSize: 22,
// //     marginBottom: 2,
// //     color: global.color_darkgray,
// //   },
// //   mainInfoSubtitle: {
// //     fontFamily: 'Montserrat-Regular',
// //     fontWeight: '400',
// //     fontSize: 12,
// //     color: global.color_gray,
// //   },
// //   quickButtonsContainer: {
// //     marginTop: 20,
// //     flexDirection: 'row',
// //   },
// //   starsContainer: {
// //     marginTop: 10,
// //     flexDirection: 'row',
// //   },
// //   segmentTitleContainer: {
// //     marginTop: 30,
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginBottom: 10,
// //   },
// //   segmentTitle: {
// //     fontFamily: 'Montserrat-Regular',
// //     fontWeight: '700',
// //     fontSize: 18,
// //     color: global.color_darkgray,
// //     marginRight: 0,
// //   },
// //   moreInfoBtn: {
// //     width: 100,
// //     height: 30,
// //     borderRadius: 15,
// //     backgroundColor: global.color_theme,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     alignSelf: 'center',
// //     position: 'absolute',
// //     bottom: -15,
// //   },
// //   moreInfoBtnText: {
// //     color: global.color_white,
// //     fontSize: 12,
// //     fontWeight: '700',
// //   },
// //   moreInfoContainer: {
// //     width: '100%',
// //     marginBottom: -20,
// //   },
// //   moreInfoItem: {
// //     width: '100%',
// //     paddingVertical: 15,
// //   },
// //   moreInfoItemTitle: {
// //     color: global.color_medgray,
// //     fontFamily: 'Montserrat-Regular',
// //     fontSize: 11,
// //   },
// //   moreInfoItemValue: {
// //     color: global.color_darkgray,
// //     fontSize: 14,
// //     fontWeight: '500',
// //     fontFamily: 'Montserrat-Regular',
// //   },
// //   rightSwipeItem: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     paddingLeft: 20,
// //   },
// //   iconStyle: {
// //     color: global.color_white,
// //     marginLeft: -9,
// //     marginBottom: 6,
// //   },
// // });

// // const mapStateToProps = ({
// //   settings,
// //   contacts,
// //   groups,
// //   campaigns,
// //   tags,
// //   tasks,
// // }) => {
// //   const {contactInfo, contactsStatus, contactsError} = contacts;
// //   const {groupsStatus, groupsError, groupsList} = groups;
// //   const {campaignsStatus, campaignsError, campaignsList} = campaigns;
// //   const {tagsStatus, tagsError, tagsList} = tags;
// //   const {tasksStatus} = tasks;
// //   return {
// //     settings,
// //     contactInfo,
// //     contactsStatus,
// //     contactsError,
// //     groupsStatus,
// //     groupsError,
// //     groupsList,
// //     campaignsStatus,
// //     campaignsError,
// //     campaignsList,
// //     tagsStatus,
// //     tagsError,
// //     tagsList,
// //     tasksStatus,
// //   };
// // };

// // export default connect(mapStateToProps, {
// //   getContactList,
// //   getContactsWithRatings,
// //   getContactInfo,
// //   deleteContact,
// //   updateRatings,

// //   getGroups,
// //   addGroupsToContact,
// //   removeGroupToContact,

// //   getCampaigns,
// //   addCampaignsToContact,
// //   removeCampaignToContact,

// //   getTags,
// //   addTagsToContact,
// //   removeTagToContact,

// //   deleteNote,

// //   editTask,
// //   deleteTask,
// //   getMailboxes,
// // })(ContactDetails);


// import React, { Component } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   StyleSheet,
//   Image,
//   FlatList,
//   TouchableOpacity,
//   Animated,
//   Clipboard,
//   Alert,
//   Easing,
//   Linking,
//   SafeAreaView,
//   BackHandler,
//   SwipeableFlatList,
//   TouchableHighlight,
//   Dimensions,
// } from 'react-native';
// import Collapsible from 'react-native-collapsible';
// import { connect } from 'react-redux';
// import Swipeout from 'react-native-swipeout';
// import Swipeable from 'react-native-swipeable';
// import Rating from 'react-native-rating-simple';
// import Toast, { DURATION } from 'react-native-easy-toast';
// import { mimeWordsDecode } from 'emailjs-mime-codec';

// import {
//   timestampToMonthDayTime,
//   timespan,
//   cleanEmailBodyPreview,
//   formatMobileNumber,
//   FormatTime,
// } from '../utils/Helper';
// import {
//   HeaderButton,
//   MiniButton,
//   StarButton,
//   TaskItem,
//   NoteItem,
//   EmailItem,
//   FormButton,
//   ModalAlert,
//   ModalChecklist,
//   ModalBottom,
//   GroupsItem,
//   GroupsItemEmpty,
//   IndicatorBottom,
//   CalendarTaskItem,
// } from '../common';
// import {
//   getContactList,
//   getContactsWithRatings,
//   getContactInfo,
//   deleteContact,
//   updateRatings,
//   getGroups,
//   addGroupsToContact,
//   removeGroupToContact,
//   getCampaigns,
//   addCampaignsToContact,
//   removeCampaignToContact,
//   getTags,
//   addTagsToContact,
//   removeTagToContact,
//   deleteNote,
//   editTask,
//   deleteTask,
//   getMailboxes,
// } from '../actions';
// import {
//   CONTACT_GETCONTACTINFO_LOADING,
//   CONTACT_DELETECONTACT_LOADING,
//   CONTACT_DELETECONTACT_SUCCESS,
//   CONTACT_DELETECONTACT_FAIL,
//   LISTTYPE_GROUPS,
//   LISTTYPE_CAMPAIGNS,
//   LISTTYPE_TAGS,
//   GROUP_ADDGROUPTOCONTACT_SUCCESS,
//   GROUP_REMOVEGROUPTOCONTACT_SUCCESS,
//   CAMPAIGN_ADDCAMPAIGNSTOCONTACT_SUCCESS,
//   CAMPAIGN_REMOVECAMPAIGN_SUCCESS,
//   TAGS_ADDTAG_SUCCESS,
//   TAGS_REMOVETAG_SUCCESS,
//   TASK_EDITTASK_SUCCESS,
//   TASK_DELETETASK_SUCCESS,
//   TASK_IDLE,
// } from '../actions/types';
// import moment from 'moment';
// import { borderRadius } from 'styled-system';

// class ContactDetails extends Component {
//   _isMounted = false;
//   static navigationOptions = ({ navigation }) => {
//     const { params } = navigation.state;
//     return params;
//   };

//   constructor(props) {
//     super(props);
//     this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
//     this.state = {
//       scrollY: new Animated.Value(0),
//       listGroups: [
//         'Team Member',
//         'Manufacturer',
//         'Retailer',
//         'Marketing Launch Company',
//       ],
//       moreInfoList: [
//         { title: 'Email', value: 'juandelacruz@company.com' },
//         { title: 'Mobile Number', value: '0987654321' },
//         { title: 'Website', value: 'juandelacruz.com' },
//         { title: 'Address', value: 'City Name, Country, 1234' },
//       ],

//       showMoreInfo: false,
//       showCompletedTask: true,

//       // MODAL ALERT
//       alertVisible: false,
//       alertTitle: '',
//       alertMessage: '',
//       alertButtons: [
//         { text: 'OK', onPress: () => this.setState({ alertVisible: false }) },
//       ],
//       alertIcon: null,

//       alertListVisible: false,
//       alertListTitle: '',
//       alertListData: [],
//       alertListSelected: [],
//       alertListSave: () => { },
//       alertListType: '',

//       showMenu: false,

//       rating: 0,

//       swipeable: null,

//       currentlyOpenSwipeable: null,
//       loadMoreVisible: true,
//       viewMore: false,
//       notesViewMore: false,
//       emailViewMore: false,
//     };
//     this.selectedRow;
//     this.component = [];
//   }

//   handleBackButtonClick() {
//     // this.props.navigation.goBack(null);
//     this.props.getContactList(this.props.route.params.contact, 1);
//     // setTimeout(() => {
//     this.props.getContactsWithRatings(
//       this.props.route.params.contactWithRating,
//       1,
//     );
//     // }, 500);
//     this.props.selectInfo = this.props.route.params.selectInfo;
//     this.props.navigation.navigate('ContactsStack', {
//       select: this.props.route.params.selectInfo,
//     });
//     return true;
//   }

//   componentWillMount() {
//     this._isMounted = true;
//     if (this._isMounted) {
//       BackHandler.addEventListener(
//         'hardwareBackPress',
//         this.handleBackButtonClick,
//       );
//       this.props.navigation.setOptions({
//         headerLeft: () => (
//           <View style={global.styles.headerButtonsContainer}>
//             <HeaderButton
//               icon={global.icon_leftarrow}
//               onPress={() => this.handleBackButtonClick()}
//               mode={this.props.settings.theme.mode}
//             />
//           </View>
//         ),
//         headerRight: () => (
//           <View style={global.styles.headerButtonsContainer}>
//             <HeaderButton
//               icon={global.icon_dots}
//               mode={this.props.settings.theme.mode}
//               onPress={() => this.setState({ showMenu: true })}
//             />
//           </View>
//         ),
//       });

//       if (this.props.route.params.contactInfo) {
//         console.log(
//           this.props.route.params.contactInfo,
//           'this.props.route.params.contactInfo',
//         );
//         this.props.getContactInfo({
//           contactInfo: this.props.route.params.contactInfo,
//         });
//       }

//       // this.props.getGroups();

//       this.setState({ rating: 3 });
//     }
//     this.props.getMailboxes();

//     // this.forceUpdate();
//   }

//   componentWillUnmount() {
//     this._isMounted = false;
//     BackHandler.removeEventListener(
//       'hardwareBackPress',
//       this.handleBackButtonClick,
//     );
//   }

//   refresh() {
//     console.log(this.props.contactInfo, 'this.props.contactInfo');
//     this.props.getContactInfo({ contactInfo: this.props.contactInfo });
//   }

//   componentWillReceiveProps(nextProps) {
//     console.log(nextProps, 'nextProps===>');
//     if (nextProps.contactsStatus === CONTACT_DELETECONTACT_LOADING) {
//       console.log(nextProps, 'nextProps===>123');
//       this.props.navigation.goBack();
//     }

//     if (
//       (this.props.tasksStatus === TASK_EDITTASK_SUCCESS &&
//         nextProps.tasksStatus === TASK_IDLE) ||
//       (this.props.tasksStatus === TASK_DELETETASK_SUCCESS &&
//         nextProps.tasksStatus === TASK_IDLE)
//     ) {
//       this.refresh();
//     }

//     if (nextProps.groupsStatus === GROUP_ADDGROUPTOCONTACT_SUCCESS) {
//       this.setState({ alertListVisible: false });
//       setTimeout(() => {
//         this.refresh();
//       }, 300);
//     } else if (nextProps.groupsStatus === GROUP_REMOVEGROUPTOCONTACT_SUCCESS) {
//       setTimeout(() => {
//         this.refresh();
//       }, 300);
//     }

//     if (nextProps.campaignsStatus === CAMPAIGN_ADDCAMPAIGNSTOCONTACT_SUCCESS) {
//       this.setState({ alertListVisible: false });
//       setTimeout(() => {
//         this.refresh();
//       }, 300);
//     } else if (nextProps.campaignsStatus === CAMPAIGN_REMOVECAMPAIGN_SUCCESS) {
//       setTimeout(() => {
//         this.refresh();
//       }, 300);
//     }

//     if (nextProps.tagsStatus === TAGS_ADDTAG_SUCCESS) {
//       this.setState({ alertListVisible: false });
//       setTimeout(() => {
//         this.refresh();
//       }, 300);
//     } else if (nextProps.tagsStatus === TAGS_REMOVETAG_SUCCESS) {
//       this.setState({ alertListVisible: false });
//       setTimeout(() => {
//         this.refresh();
//       }, 300);
//     }

//     // this.setState({ rating: nextProps.contactInfo.rating });
//     // this.updateAlertList(nextProps);
//   }

//   prepareSelected() {
//     let c = this.props.contactInfo;
//     let selected = [];
//     switch (this.state.alertListType) {
//       case LISTTYPE_GROUPS:
//         if (c.groups && c.groups.length > 0) {
//           c.groups.forEach(item => {
//             selected.push(item.gid);
//           });
//         }
//         // Alert.alert(`${selected.length}`)
//         this.setState({ alertListSelected: selected });
//         break;
//       case LISTTYPE_CAMPAIGNS:
//         if (c.campaigns && c.campaigns.length > 0 && c.campaigns[0] !== false) {
//           c.campaigns.forEach(item => {
//             if (item && item.cp_gid) {
//               selected.push(item.cp_gid);
//             }
//           });
//         }
//         this.setState({ alertListSelected: selected });
//         break;
//       case LISTTYPE_TAGS:
//         if (c.tags && c.tags.length > 0) {
//           c.tags.forEach(item => {
//             selected.push(item);
//           });
//         }
//         this.setState({ alertListSelected: selected });
//         break;
//       default:
//     }
//   }

//   toggleAlertList(tag) {
//     let selected = this.state.alertListSelected;
//     if (selected.some(x => x.tag === tag.tag)) {
//       const index = selected.findIndex(x => x.tag === tag.tag);
//       selected.splice(index, 1);
//     } else {
//       selected.push(tag);
//     }
//     this.setState({ alertListSelected: selected });
//   }

//   toggleGroups(id) {
//     let selected = this.state.alertListSelected;
//     if (selected.includes(id)) {
//       const index = selected.indexOf(id);
//       selected.splice(index, 1);
//     } else {
//       selected.push(id);
//     }
//     this.setState({ alertListSelected: selected });
//   }

//   renderAlertList() {
//     let list = [];
//     // ssAlert.alert(this.state.alertListType);
//     switch (this.state.alertListType) {
//       case LISTTYPE_GROUPS:
//         this.props.groupsList.map(item => {
//           list.push({
//             text: item.name,
//             checked: this.state.alertListSelected.includes(item.gid),
//             onPress: () => this.toggleGroups(item.gid),
//           });
//         });
//         break;
//       case LISTTYPE_CAMPAIGNS:
//         this.props.campaignsList.map(item => {
//           list.push({
//             text: item.name,
//             checked: this.state.alertListSelected.includes(item.cp_gid),
//             //onPress: () => this.toggleAlertList(item.cp_gid)
//             onPress: () => this.setState({ alertListSelected: [item.cp_gid] }),
//           });
//         });
//         break;
//       case LISTTYPE_TAGS:
//         this.props.tagsList.map(item => {
//           list.push({
//             text: item.tag,
//             checked: this.state.alertListSelected.some(x => x.tag === item.tag),
//             onPress: () => this.toggleAlertList(item),
//           });
//         });
//         break;
//       default:
//     }
//     // Alert.alert(JSON.stringify(list));
//     return list;
//   }

//   handleQuickButton(action) {
//     let c = this.props.contactInfo;
//     c = c.contact_details ? c.contact_details : c;
//     switch (action) {
//       case 'phone':
//         Linking.openURL(`tel:${c.phone}`);
//         break;
//       case 'text':
//         Linking.openURL(`sms:${c.phone}&body=`);
//         break;
//       case 'email':
//         this.props.navigation.navigate('EmailComposeStack', {
//           screen: 'EmailCompose',
//           params: {
//             contacts: [c],
//             email: [c],
//           },
//         });

//         break;

//       case 'edit':
//         this.props.navigation.navigate('ContactAdd', {
//           title: 'Edit Contact',
//           contact: c,
//           onNavigateBack: this.refresh.bind(this),
//         });
//         break;
//       case 'delete':
//         this.setState({
//           alertVisible: true,
//           alertTitle: 'Delete Contact',
//           alertMessage: 'Are you sure you want to delete this contact?',
//           alertButtons: [
//             {
//               text: 'Cancel',
//               onPress: () => this.setState({ alertVisible: false }),
//               type: 'cancel',
//             },
//             {
//               text: 'Delete',
//               onPress: () => {
//                 this.setState({ alertVisible: false });
//                 this.props.deleteContact({ cid: c.cid });
//               },
//             },
//           ],
//           alertIcon: null,
//         });
//         break;
//       default:
//     }
//   }

//   renderMenuOptions() {
//     let c = this.props.contactInfo;
//     c = c.contact_details ? c.contact_details : c;

//     let options = [
//       {
//         text: 'Edit Contact',
//         onPress: () => {
//           this.setState({ showMenu: false });
//           setTimeout(() => {
//             this.handleQuickButton('edit');
//           }, 400);
//         },
//       },
//       {
//         text: 'Email ' + c.email,
//         onPress: () => {
//           this.setState({ showMenu: false });
//           setTimeout(() => {
//             this.handleQuickButton('email');
//           }, 400);
//         },
//       },
//       {
//         text: 'Call ' + c.phone,
//         onPress: () => {
//           this.setState({ showMenu: false });
//           setTimeout(() => {
//             this.handleQuickButton('phone');
//           }, 400);
//         },
//       },
//       {
//         text: 'Send SMS to ' + c.phone,
//         onPress: () => {
//           this.setState({ showMenu: false });
//           setTimeout(() => {
//             this.handleQuickButton('text');
//           }, 400);
//         },
//       },
//       {
//         text: 'Delete Contact',
//         onPress: () => {
//           this.setState({ showMenu: false });
//           setTimeout(() => {
//             this.handleQuickButton('delete');
//           }, 400);
//         },
//       },
//       {
//         type: 'gap',
//         gapSize: 30,
//       },
//       {
//         text: '+ Add Groups',
//         onPress: () => {
//           this.setState({ showMenu: false });
//           setTimeout(() => {
//             this.addIconPressed('groups');
//           }, 400);
//         },
//       },
//       {
//         text: '+ Add Tags',
//         onPress: () => {
//           this.setState({ showMenu: false });
//           setTimeout(() => {
//             this.addIconPressed('tags');
//           }, 400);
//         },
//       },
//       {
//         text: '+ Add Campaigns',
//         onPress: () => {
//           this.setState({ showMenu: false });
//           setTimeout(() => {
//             this.addIconPressed('campaigns');
//           }, 400);
//         },
//       },
//       {
//         text: '+ Add Task',
//         onPress: () => {
//           this.setState({ showMenu: false });
//           setTimeout(() => {
//             this.addIconPressed('tasks');
//           }, 400);
//         },
//       },
//       {
//         text: '+ Add Note',
//         onPress: () => {
//           this.setState({ showMenu: false });
//           setTimeout(() => {
//             this.addIconPressed('notes');
//           }, 400);
//         },
//       },
//     ];
//     return options;
//   }

//   addIconPressed(key) {
//     let c = this.props.contactInfo;
//     console.log('key++++++++++++++++++++', c);
//     switch (key) {
//       case 'groups':
//         this.setState(
//           {
//             alertListVisible: true,
//             alertListTitle: 'Add Groups',
//             alertListData: [],
//             alertListType: LISTTYPE_GROUPS,
//             alertListSave: () => {
//               this.state.alertListVisible = false;
//               let toAdd = [];
//               let toRemove = [];
//               // console.log(key, 'key1++++++++++++++++++++');
//               if (c.groups && c.groups.length > 0) {
//                 c.groups.forEach(item => {
//                   if (!this.state.alertListSelected.includes(item.gid)) {
//                     toRemove.push(item.gid);
//                   }
//                 });
//               }

//               this.state.alertListSelected.forEach(item => {
//                 if (
//                   !c.groups ||
//                   (c.groups && !c.groups.some(x => x.gid === item))
//                 ) {
//                   toAdd.push(item);
//                 }
//               });

//               if (toRemove.length > 0) {
//                 toRemove.forEach(item => {
//                   this.props.removeGroupToContact({ cid: c.cid, gid: [item] });
//                 });
//               }

//               this.props.addGroupsToContact({
//                 cid: c.cid,
//                 gid: toAdd, //this.state.alertListSelected,
//               });
//             },
//           },
//           () => this.prepareSelected(),
//         );
//         this.props.getGroups();
//         break;
//       case 'tags':
//         this.setState(
//           {
//             alertListVisible: true,
//             alertListTitle: 'Add Tags',
//             alertListData: [],
//             alertListType: LISTTYPE_TAGS,
//             alertListSave: () => {
//               this.state.alertListVisible = false;
//               let toAdd = [];
//               let toRemove = [];

//               if (c.tags && c.tags.length > 0) {
//                 c.tags.forEach(item => {
//                   if (
//                     !this.state.alertListSelected.some(x => x.tag === item.tag)
//                   ) {
//                     toRemove.push(item);
//                   }
//                 });
//               }

//               this.state.alertListSelected.forEach(item => {
//                 if (
//                   !c.tags ||
//                   (c.tags &&
//                     !c.tags.some(
//                       x => x.contact_tag_id === item.contact_tag_id,
//                     ) &&
//                     this.props.tagsList.some(x => x.id === item.id))
//                 ) {
//                   toAdd.push(item.id);
//                 }
//               });

//               if (toRemove.length > 0) {
//                 let contact_tag_ids = [];
//                 toRemove.forEach(item => {
//                   contact_tag_ids.push(item.contact_tag_id);
//                   // this.props.removeTagToContact({ cid: c.cid, id: [item] })
//                 });
//                 this.props.removeTagToContact({
//                   cid: c.cid,
//                   tags: contact_tag_ids,
//                 });
//               }

//               console.log('tags to add: ' + JSON.stringify(toAdd));

//               this.props.addTagsToContact({
//                 cid: c.cid,
//                 tags: toAdd, //this.state.alertListSelected,
//               });
//             },
//           },
//           () => this.prepareSelected(),
//         );
//         this.props.getTags();
//         break;
//       case 'campaigns':
//         this.setState(
//           {
//             alertListVisible: true,
//             alertListTitle: 'Add Campaigns',
//             alertListData: [],
//             alertListType: LISTTYPE_CAMPAIGNS,
//             alertListSave: () => {
//               this.state.alertListVisible = false;
//               if (this.state.alertListSelected.length > 0) {
//                 this.props.addCampaignsToContact({
//                   cid: c.cid,
//                   cp_gid: this.state.alertListSelected[0],
//                 });
//               } else {
//                 this.setState({ alertListVisible: false });
//               }
//             },
//           },
//           () => this.prepareSelected(),
//         );
//         this.props.getCampaigns();
//         break;
//       case 'tasks':
//         this.props.navigation.navigate('NewTask', {
//           title: 'New Task',
//           contact: c,
//           route: 'ContactDetails',
//           onNavigateBack: this.refresh.bind(this),
//         });
//         break;
//       case 'notes':
//         this.props.navigation.navigate('NewNote', {
//           cid: c.cid,
//           onNavigateBack: this.refresh.bind(this),
//         });
//         break;
//       default:
//         break;
//     }
//   }


//   setDateTimeFormat = date => {
//     // console.log(date, 'date');
//     return (
//       date.split(' ')[0].split('-')[1] +
//       '-' +
//       date.split(' ')[0].split('-')[2] +
//       '-' +
//       date.split(' ')[0].split('-')[0] +
//       ' (' +
//       FormatTime(date.split(' ')[1]) +
//       ')'
//     );
//   };

//   setDateTimeFormatForSend = date => {
//     return (
//       date.split(' ')[0].split('-')[1] +
//       '-' +
//       date.split(' ')[0].split('-')[2] +
//       '-' +
//       date.split(' ')[0].split('-')[0] +
//       ' ' +
//       FormatTime(date.split(' ')[1]) +
//       ''
//     );
//   };

//   setDateTimeFormatForEmail = dateTime => {
//     let date =
//       `${('0' + (new Date(dateTime).getMonth() + 1)).slice(-2)}-${(
//         '0' + new Date(dateTime).getDate()
//       ).slice(-2)}-${new Date(dateTime).getFullYear()} (` +
//       FormatTime(
//         ('0' + new Date(dateTime).getHours()).slice(-2) +
//         ':' +
//         ('0' + new Date(dateTime).getMinutes()).slice(-2) +
//         ':' +
//         ('0' + new Date(dateTime).getSeconds()).slice(-2),
//       ) +
//       ')';
//     // console.log(date, 'date');
//     return date;
//   };

//   setDateTimeForNote(dateTime) {
//     return `${new Date(`${dateTime} UTC`).getFullYear()}-${(
//       '0' +
//       (new Date(`${dateTime} UTC`).getMonth() + 1)
//     ).slice(-2)}-${('0' + new Date(`${dateTime} UTC`).getDate()).slice(-2)} ${('0' + new Date(`${dateTime} UTC`).getHours()).slice(-2) +
//     ':' +
//     ('0' + new Date(`${dateTime} UTC`).getMinutes()).slice(-2) +
//     ':' +
//     ('0' + new Date(`${dateTime} UTC`).getSeconds()).slice(-2)
//       }`;
//   }

//   taskRender() {
//     // console.log(this.props.contactInfo,'taskes++++++++++++++++++++++++');
//     let task = [];
//     for (let data of this.props.contactInfo.tasks) {
//       task.push({
//         title: data.title,
//         date: this.setDateTimeFormat(data.date),
//         dateTime: this.setDateTimeFormatForSend(data.date),
//         did: data.did,
//         completed_date: data.completed_date,
//         comment: data.comment,
//         notify: data.notify,
//         status: data.status,
//         type: data.type,
//       });
//     }
//     return task;
//   }

//   notesRender() {
//     console.log(this.props.contactInfo.notes, 'this.props.contactInfo.notes');
//     let notes = [];
//     for (let data of this.props.contactInfo.notes) {
//       let date = moment.utc(data.date, 'YYYY-MM-DD HH:mm:ss');
//       console.log(date.local().format('YYYY-MM-DD HH:mm:ss'), 'moment date');
//       notes.push({
//         cid: data.cid,
//         content: data.content,
//         date: this.setDateTimeFormat(
//           date.local().format('YYYY-MM-DD HH:mm:ss'),
//         ),
//         nid: data.nid,
//         uid: data.uid,
//       });
//     }
//     console.log(notes, 'notes');
//     return notes;
//   }

//   onOpen = (event, gestureState, swipeable) => {
//     if (
//       this.state.currentlyOpenSwipeable &&
//       this.state.currentlyOpenSwipeable !== swipeable
//     ) {
//       this.state.currentlyOpenSwipeable.recenter();
//     }
//     this.setState({ currentlyOpenSwipeable: swipeable });
//   };

//   onClose = () => {
//     this.setState({ currentlyOpenSwipeable: null });
//   };

//   closeAll = () => {
//     if (this.state.currentlyOpenSwipeable) {
//       this.state.currentlyOpenSwipeable.recenter();
//     }
//   };

//   render() {
//     const headerOpacity = this.state.scrollY.interpolate({
//       inputRange: [0, global.headerHeight + 50],
//       outputRange: [-1, 1],
//       extrapolate: 'clamp',
//     });
//     let c = this.props.contactInfo;
//     let cd = c.contact_details ? c.contact_details : c;
//     console.log(cd, 'c.history');
//     let moreInfo = [
//       { title: 'First Name', value: cd.first_name, key: 'first_name' },
//       { title: 'Last Name', value: cd.last_name, key: 'last_name' },
//       { title: 'Email', value: cd.email, key: 'companyname' },
//       { title: 'Mobile Number', value: cd.phone, key: 'phone' },
//       { title: 'Company Name', value: cd.companyname, key: 'companyname' },
//       { title: 'Website', value: cd.website, key: 'website' },
//       { title: 'Address', value: cd.address, key: 'address' },
//       //{ title: 'Facebook URL', value: cd.address, key: 'address' },
//       { title: 'City', value: cd.city, key: 'city' },
//       { title: 'State', value: cd.state, key: 'state' },
//       { title: 'Zip', value: cd.zip, key: 'zip' },
//     ];

//     return (
//       <View
//         style={[
//           global.styles.screenContainer,
//           { backgroundColor: this.props.settings.theme.bgSecondary },
//         ]}
//         onStartShouldSetResponder={() => this.closeAll()}>
//         <ScrollView
//           style={{}}
//           scrollEventThrottle={16}
//           onScroll={Animated.event(
//             [
//               {
//                 //useNativeDriver:true,
//                 nativeEvent: { contentOffset: { y: this.state.scrollY } },
//               },
//             ],
//             { useNativeDriver: false },
//           )}
//           contentContainerStyle={{
//             paddingTop: global.headerHeight + 30,
//             paddingHorizontal: 20,
//             paddingBottom: 60,
//           }}>
//           <View style={[styles.mainInfoContainer]}>
//             <View
//               style={[
//                 styles.mainInfoInnerContainer,
//                 { backgroundColor: this.props.settings.theme.bgPrimary },
//               ]}>
//               <View style={{ marginBottom: 20, alignItems: 'center' }}>
//                 <Text
//                   style={[
//                     styles.mainInfoTitle,
//                     { color: this.props.settings.theme.textPrimary },
//                   ]}>
//                   {cd.fullname}
//                 </Text>
//                 <Text
//                   style={[
//                     styles.mainInfoSubtitle,
//                     { color: this.props.settings.theme.textSecondary },
//                   ]}>
//                   {cd.companyname}
//                 </Text>
//               </View>
//               <Rating
//                 key={c.rating}
//                 rating={parseInt(c.rating)}
//                 fullStar={
//                   <Image
//                     source={global.icon_star}
//                     style={{
//                       width: 20,
//                       height: 20,
//                       tintColor: global.color_yellow,
//                       marginHorizontal: 3,
//                     }}
//                   />
//                 }
//                 emptyStar={
//                   <Image
//                     source={global.icon_star}
//                     style={{
//                       width: 20,
//                       height: 20,
//                       tintColor: global.color_medgray,
//                       marginHorizontal: 3,
//                     }}
//                   />
//                 }
//                 starSize={30}
//                 // onChangeMove={rating => { this.setState({ rating1: rating }); }}
//                 onChange={rating => {
//                   // Alert.alert(`${rating}`)
//                   this.props.updateRatings({ cid: c.cid, rating });
//                 }}
//               />
//               <View style={styles.quickButtonsContainer}>
//                 <MiniButton
//                   icon={global.icon_phone}
//                   color={global.color_green}
//                   onPress={() => this.handleQuickButton('phone')}
//                 />
//                 <MiniButton
//                   icon={global.icon_sms}
//                   color={global.color_turquoise}
//                   onPress={() => this.handleQuickButton('text')}
//                 />
//                 <MiniButton
//                   icon={global.icon_email}
//                   color={global.color_blue}
//                   onPress={() => this.handleQuickButton('email')}
//                 />
//                 <MiniButton
//                   icon={global.icon_pencil}
//                   color={global.color_purple}
//                   onPress={() => this.handleQuickButton('edit')}
//                 />
//                 <MiniButton
//                   icon={global.icon_delete}
//                   color={global.color_red}
//                   onPress={() => this.handleQuickButton('delete')}
//                 />
//               </View>
//               <View style={{ width: '100%' }}>
//                 <Collapsible
//                   collapsed={!this.state.showMoreInfo}
//                   style={styles.moreInfoContainer}>
//                   {moreInfo.map(item => {
//                     return item.value && item.value !== '' ? (
//                       <TouchableOpacity
//                         key={item.key}
//                         onPress={() => {
//                           Clipboard.setString(item.value);
//                           this.refs.toast.show('Copied to Clipboard', 1000);
//                         }}
//                         style={styles.moreInfoItem}>
//                         <Text
//                           style={[
//                             styles.moreInfoItemTitle,
//                             { color: this.props.settings.theme.textSecondary },
//                           ]}>
//                           {item.title}
//                         </Text>
//                         <Text
//                           style={[
//                             styles.moreInfoItemValue,
//                             { color: this.props.settings.theme.textPrimary },
//                           ]}>
//                           {item.key === 'phone'
//                             ? formatMobileNumber(item.value)
//                             : item.value}
//                         </Text>
//                       </TouchableOpacity>
//                     ) : null;
//                   })}
//                 </Collapsible>
//               </View>
//               <TouchableOpacity
//                 style={[
//                   styles.moreInfoBtn,
//                   {
//                     //position: 'relative',
//                     //bottom: 0,
//                     zIndex: 2,
//                   },
//                 ]}
//                 onPress={() =>
//                   this.setState({ showMoreInfo: !this.state.showMoreInfo })
//                 }>
//                 <Text
//                   style={[
//                     styles.moreInfoBtnText,
//                     { color: this.props.settings.theme.bgPrimary },
//                   ]}>
//                   {this.state.showMoreInfo ? 'less' : 'more'} info
//                 </Text>
//               </TouchableOpacity>
//             </View>
//             <View style={styles.avatarContainer}>
//               <View
//                 style={[
//                   styles.avatarImgContainer,
//                   { backgroundColor: this.props.settings.theme.bgSecondary },
//                 ]}>
//                 {this.props.contactInfo.avatar ? (
//                   <Image
//                     style={global.styles.imgCover}
//                     source={{ uri: this.props.contactInfo.avatar }}
//                   />
//                 ) : (
//                   <Text
//                     style={[
//                       styles.avatarInitials,
//                       { color: this.props.settings.theme.textSecondary },
//                     ]}>
//                     {cd.first_name && cd.first_name.length > 0
//                       ? cd.first_name.charAt(0)
//                       : ''}
//                     {cd.last_name && cd.last_name.length > 0
//                       ? cd.last_name.charAt(0)
//                       : ''}
//                   </Text>
//                 )}
//               </View>
//             </View>
//           </View>
//           <View style={styles.segmentTitleContainer}>
//             <Text
//               style={[
//                 styles.segmentTitle,
//                 { color: this.props.settings.theme.textPrimary },
//               ]}>
//               Groups
//             </Text>
//             <PlusButton
//               onPress={() => this.addIconPressed('groups')}
//               tintColor={this.props.settings.theme.bgPrimary}
//             />
//           </View>

//           <View
//             style={[
//               global.styles.tagsContainer,
//               { backgroundColor: this.props.settings.theme.tagsContainer },
//             ]}>
//             {!c.groups ? (
//               <GroupsItemEmpty
//                 title={'No groups'}
//                 textColor={this.props.settings.theme.textSecondary}
//               />
//             ) : (
//               c.groups.map(item => {
//                 return (
//                   <GroupsItem
//                     key={item.gid}
//                     title={item && item.name ? item.name : ''}
//                     bgColor={this.props.settings.theme.bgPrimary}
//                     textColor={this.props.settings.theme.textPrimary}
//                     onPressDelete={() =>
//                       this.props.removeGroupToContact({
//                         cid: c.cid,
//                         gid: item.gid,
//                       })
//                     }
//                   />
//                 );
//               })
//             )}
//           </View>

//           <View style={styles.segmentTitleContainer}>
//             <Text
//               style={[
//                 styles.segmentTitle,
//                 { color: this.props.settings.theme.textPrimary },
//               ]}>
//               Tags
//             </Text>
//             <PlusButton
//               onPress={() => this.addIconPressed('tags')}
//               tintColor={this.props.settings.theme.bgPrimary}
//             />
//           </View>
//           <View
//             style={[
//               global.styles.tagsContainer,
//               { backgroundColor: this.props.settings.theme.tagsContainer },
//             ]}>
//             {c.tags && c.tags.length > 0 ? (
//               c.tags.map(item => {
//                 return (
//                   <GroupsItem
//                     key={item.contact_tag_id}
//                     title={item.tag}
//                     bgColor={this.props.settings.theme.bgPrimary}
//                     textColor={this.props.settings.theme.textPrimary}
//                     onPressDelete={() =>
//                       this.props.removeTagToContact({
//                         cid: c.cid,
//                         tags: [item.contact_tag_id],
//                       })
//                     }
//                   />
//                 );
//               })
//             ) : (
//               <GroupsItemEmpty
//                 title={'No tags'}
//                 textColor={this.props.settings.theme.textSecondary}
//               />
//             )}
//           </View>

//           <View style={styles.segmentTitleContainer}>
//             <Text
//               style={[
//                 styles.segmentTitle,
//                 { color: this.props.settings.theme.textPrimary },
//               ]}>
//               Campaigns
//             </Text>
//             <PlusButton
//               onPress={() => this.addIconPressed('campaigns')}
//               tintColor={this.props.settings.theme.bgPrimary}
//             />
//           </View>
//           <View
//             style={[
//               global.styles.tagsContainer,
//               { backgroundColor: this.props.settings.theme.tagsContainer },
//             ]}>
//             {c.campaigns &&
//               c.campaigns.length > 0 &&
//               c.campaigns[0] !== false &&
//               c.campaigns[0] ? (
//               c.campaigns.map(item => {
//                 return (
//                   <GroupsItem
//                     key={item?.name}
//                     title={item?.name}
//                     bgColor={this.props.settings.theme.bgPrimary}
//                     textColor={this.props.settings.theme.textPrimary}
//                     onPressDelete={() =>
//                       this.props.removeCampaignToContact({ cid: c.cid })
//                     }
//                   />
//                 );
//               })
//             ) : (
//               <GroupsItemEmpty
//                 title={'No campaigns'}
//                 textColor={this.props.settings.theme.textSecondary}
//               />
//             )}
//           </View>

//           <View
//             style={[
//               styles.segmentTitleContainer,
//               { justifyContent: 'space-between' },
//             ]}>
//             <View style={global.styles.inlineBlock}>
//               <Text
//                 style={[
//                   styles.segmentTitle,
//                   { color: this.props.settings.theme.textPrimary },
//                 ]}>
//                 Tasks
//               </Text>
//               <PlusButton
//                 onPress={(e) => { console.log("PlusButton", e), this.addIconPressed('tasks') }}
//                 tintColor={this.props.settings.theme.bgPrimary}
//               />
//             </View>
//             {/*
//               <MiniButton
//                 onPress={() => this.setState({ showCompletedTask: !this.state.showCompletedTask }) }
//                 icon={global.icon_dots} size={25}
//                 style={{ backgroundColor: 'rgba(0,0,0,0.0)', alignSelf: 'flex-end'}}
//                 iconStyle={{ tintColor: this.props.settings.theme.textPrimary }}
//                 bgColor={this.props.settings.theme.bgPrimary}
//               />
//               */}
//             <TouchableOpacity
//               style={{
//                 padding: 5,
//                 borderRadius: 5,
//                 backgroundColor: global.color_theme,
//               }}
//               onPress={() => this.setState({ viewMore: !this.state.viewMore })}>
//               <Image
//                 style={{
//                   width: 14,
//                   height: 14,
//                   resizeMode: 'contain',
//                   tintColor: global.color_white,
//                 }}
//                 source={
//                   this.state.viewMore
//                     ? global.icon_dropdown
//                     : global.icon_rightarrow
//                 }
//               />
//             </TouchableOpacity>
//           </View>

//           <View style={{ flex: 1 }}>
//             {c.tasks && c.tasks.length > 0 ? (
//               c.tasks.length > 3 && !this.state.viewMore ? (
//                 <View style={{ marginHorizontal: -30 }}>
//                   {c.tasks.map((item, index) => {
//                     if (index <= 2) {
//                       return (
//                         <Collapsible
//                           collapsed={!this.state.showCompletedTask && active}
//                           style={{ width: '100%' }}>
//                           <Swipeable
//                             ref={c => {
//                               this.selectedRow = c;
//                             }}
//                             rightButtons={[
//                               <TouchableOpacity
//                                 style={[
//                                   styles.rightSwipeItem,
//                                   { backgroundColor: global.color_purple },
//                                 ]}
//                                 onPress={() => {
//                                   this.props.navigation.navigate('NewTask', {
//                                     title: 'Edit Task',
//                                     contact: c,
//                                     task: item,
//                                     route: 'ContactDetails',
//                                     onNavigateBack: this.refresh.bind(this),
//                                   });
//                                   this.closeAll();
//                                 }}>
//                                 <MiniButton
//                                   icon={global.icon_pencil}
//                                   color={global.color_purple}
//                                   style={{ marginLeft: 1, marginBottom: -5 }}
//                                   onPress={() => {
//                                     this.props.navigation.navigate('NewTask', {
//                                       title: 'Edit Task',
//                                       contact: c,
//                                       task: item,
//                                       route: 'ContactDetails',
//                                       onNavigateBack: this.refresh.bind(this),
//                                     });
//                                     this.closeAll();
//                                   }}
//                                 />
//                                 <Text
//                                   style={{
//                                     color: global.color_white,
//                                     marginLeft: 5,
//                                     marginBottom: 5,
//                                   }}>
//                                   Edit
//                                 </Text>
//                               </TouchableOpacity>,
//                               <TouchableOpacity
//                                 style={[
//                                   styles.rightSwipeItem,
//                                   { backgroundColor: global.color_red },
//                                 ]}
//                                 onPress={() => {
//                                   this.setState({
//                                     alertVisible: true,
//                                     alertTitle: 'Delete Task',
//                                     alertMessage:
//                                       'Are you sure you want to delete this task?',
//                                     alertButtons: [
//                                       {
//                                         text: 'Cancel',
//                                         onPress: () =>
//                                           this.setState({ alertVisible: false }),
//                                         type: 'cancel',
//                                       },
//                                       {
//                                         text: 'Delete',
//                                         onPress: () => {
//                                           this.setState({ alertVisible: false });
//                                           this.props.deleteTask({
//                                             did: item.did,
//                                           });
//                                         },
//                                       },
//                                     ],
//                                     alertIcon: null,
//                                   });
//                                   this.closeAll();
//                                 }}>
//                                 <MiniButton
//                                   icon={global.icon_delete}
//                                   color={global.color_red}
//                                   style={{ marginLeft: -5, marginBottom: -4 }}
//                                   onPress={() => {
//                                     this.setState({
//                                       alertVisible: true,
//                                       alertTitle: 'Delete Task',
//                                       alertMessage:
//                                         'Are you sure you want to delete this task?',
//                                       alertButtons: [
//                                         {
//                                           text: 'Cancel',
//                                           onPress: () =>
//                                             this.setState({
//                                               alertVisible: false,
//                                             }),
//                                           type: 'cancel',
//                                         },
//                                         {
//                                           text: 'Delete',
//                                           onPress: () => {
//                                             this.setState({
//                                               alertVisible: false,
//                                             });
//                                             this.props.deleteTask({
//                                               did: item.did,
//                                             });
//                                           },
//                                         },
//                                       ],
//                                       alertIcon: null,
//                                     });
//                                     this.closeAll();
//                                   }}
//                                 />
//                                 <Text style={styles.iconStyle}>Delete</Text>
//                               </TouchableOpacity>,
//                             ]}
//                             onRightButtonsOpenRelease={this.onOpen}
//                             onRightButtonsCloseRelease={this.onClose}>
//                             {/* <TaskItem
//                               title={item.item.title}
//                               subtitle={
//                                 this.setDateTimeFormat(item.item.date) + ' ' + item.item.type
//                               }
//                               active={item.item.status === '1'}
//                               bgColor={this.props.settings.theme.bgPrimary}
//                               textColor={this.props.settings.theme.textPrimary}
//                               onPress={() => {
//                                 // console.log('task item - ' + JSON.stringify(item));
//                                 this.props.navigation.navigate('NewTask', {
//                                   title: 'Edit Task',
//                                   contact: item.item.contact,
//                                   //cid: item.item.cid,
//                                   task: item.item,
//                                   route: 'CalendarStack',
//                                   onNavigateBack: this.refresh.bind(this),
//                                 });
//                               }}
//                               onPressCheckbox={(e) => {
//                                 // let task = this.props.route.params.task;
//                                 console.log("onPressCheckbox",e)
//                                 let params = {
//                                   did: item.item.did,
//                                   title: item.item.title,
//                                   status: item.item.status === '1' ? '0' : '1',
//                                 };

//                                 this.props.editTask(params);
//                               }}
//                             /> */}

//                             <TaskItem
//                               title={item.title}
//                               subtitle={item.date}
//                               active={item.status === '1'}
//                               bgColor={this.props.settings.theme.bgPrimary}
//                               textColor={this.props.settings.theme.textPrimary}
//                               onPress={() => this.props.navigation.navigate('NewTask', {
//                                 title: 'Edit Task',
//                                 contact: c,
//                                 task: item,
//                                 route: 'ContactDetails',
//                                 onNavigateBack: this.refresh.bind(this)
//                               })}
//                               onPressCheckbox={() => {
//                                 let task = this.props.route.params.task;
//                                 let params = {
//                                   did: item.did,
//                                   title: item.title,
//                                   status: item.status === '1' ? '0' : '1'
//                                 };

//                                 this.props.editTask(params);
//                               }}
//                             />
//                             {/* <TaskItem
//                               title={item.title}
//                               subtitle={item.date + ' ' + item.type}
//                               active={item.status === '1'}
//                               bgColor={this.props.settings.theme.bgPrimary}
//                               textColor={this.props.settings.theme.textPrimary}
//                               onPress={() =>
//                                 this.props.navigation.navigate('NewTask', {
//                                   title: 'Edit Task',
//                                   contact: c,
//                                   task: item,
//                                   route: 'ContactDetails',
//                                   onNavigateBack: this.refresh.bind(this),
//                                 })
//                               }
//                               onPressCheckbox={(e) => {
//                                 console.log("onPressCheckbox",e)
//                                 let task = this.props.route.params.task;
//                                 let params = {
//                                   did: item.did,
//                                   title: item.title,
//                                   status: item.status === '1' ? '0' : '1',
//                                 };

//                                 this.props.editTask(params);
//                               }}
//                             /> */}
//                           </Swipeable>
//                           {/* <SwipeRow
//       style={{}}
//       ref={(c) => { this.component[index] = c }}
//       leftOpenValue={75}
//       rightOpenValue={-75}
//       onRowOpen={() => {
//         if (this.selectedRow && this.selectedRow !== this.component[index]) { this.selectedRow._root.closeRow(); }
//         this.selectedRow = this.component[index]
//       }}
//       body={
//         <TaskItem
//           title={item.title}
//           subtitle={item.date}
//           active={item.status==='1'}
//           bgColor={this.props.settings.theme.bgPrimary}
//           textColor={this.props.settings.theme.textPrimary}
//           onPress={() => this.props.navigation.navigate('NewTask', {
//             title: 'Edit Task',
//             contact: c,
//             task: item,
//             route: 'ContactDetails',
//             onNavigateBack: this.refresh.bind(this)
//           })}
//           onPressCheckbox={() => {
//             let task = this.props.route.params.task;
//             let params = {
//               did: item.did,
//               title: item.title,
//               status: item.status==='1' ? '0' : '1'
//             };

//             this.props.editTask(params);
//           }}
//         />
//       } */}
//                         </Collapsible>
//                       );
//                     }
//                     //  else if (index == 3){
//                     //   return (<TouchableOpacity style={{ width:'100%', alignItems:'center', borderRadius:10 , marginTop:10 ,  }} onPress={() => this.setState({viewMore: true})}>
//                     //     <Text style={{padding:15 , color:'white', fontSize:15, fontWeight:'bold', backgroundColor: global.color_theme,paddingHorizontal:40, borderRadius: 24, overflow:'hidden'}}>View More</Text>
//                     //   </TouchableOpacity>)
//                     // } else {
//                     //   return <View/>
//                     // }
//                   })}
//                 </View>
//               ) : (
//                 <FlatList
//                   style={{ marginHorizontal: -30 }}
//                   contentContainerStyle={[{}]}
//                   data={this.taskRender()}
//                   extraData={c.tasks}
//                   showsVerticalScrollIndicator={false}
//                   keyExtractor={(item, index) => `list-item-${index}`}
//                   renderItem={({ item, index }) => {
//                     return (
//                       <Collapsible
//                         collapsed={!this.state.showCompletedTask && active}
//                         style={{ width: '100%' }}>
//                         <Swipeable
//                           ref={c => {
//                             this.selectedRow = c;
//                           }}
//                           rightButtons={[
//                             <TouchableOpacity
//                               style={[
//                                 styles.rightSwipeItem,
//                                 { backgroundColor: global.color_purple },
//                               ]}
//                               onPress={() => {
//                                 this.props.navigation.navigate('NewTask', {
//                                   title: 'Edit Task',
//                                   contact: c,
//                                   task: item,
//                                   route: 'ContactDetails',
//                                   onNavigateBack: this.refresh.bind(this),
//                                 });
//                                 this.closeAll();
//                               }}>
//                               <MiniButton
//                                 icon={global.icon_pencil}
//                                 color={global.color_purple}
//                                 style={{ marginLeft: 1, marginBottom: -5 }}
//                                 onPress={() => {
//                                   this.props.navigation.navigate('NewTask', {
//                                     title: 'Edit Task',
//                                     contact: c,
//                                     task: item,
//                                     route: 'ContactDetails',
//                                     onNavigateBack: this.refresh.bind(this),
//                                   });
//                                   this.closeAll();
//                                 }}
//                               />
//                               <Text
//                                 style={{
//                                   color: global.color_white,
//                                   marginLeft: 5,
//                                   marginBottom: 5,
//                                 }}>
//                                 Edit
//                               </Text>
//                             </TouchableOpacity>,
//                             <TouchableOpacity
//                               style={[
//                                 styles.rightSwipeItem,
//                                 { backgroundColor: global.color_red },
//                               ]}
//                               onPress={() => {
//                                 this.setState({
//                                   alertVisible: true,
//                                   alertTitle: 'Delete Task',
//                                   alertMessage:
//                                     'Are you sure you want to delete this task?',
//                                   alertButtons: [
//                                     {
//                                       text: 'Cancel',
//                                       onPress: () =>
//                                         this.setState({ alertVisible: false }),
//                                       type: 'cancel',
//                                     },
//                                     {
//                                       text: 'Delete',
//                                       onPress: () => {
//                                         this.setState({ alertVisible: false });
//                                         this.props.deleteTask({ did: item.did });
//                                       },
//                                     },
//                                   ],
//                                   alertIcon: null,
//                                 });
//                                 this.closeAll();
//                               }}>
//                               <MiniButton
//                                 icon={global.icon_delete}
//                                 color={global.color_red}
//                                 style={{ marginLeft: -5, marginBottom: -4 }}
//                                 onPress={() => {
//                                   this.setState({
//                                     alertVisible: true,
//                                     alertTitle: 'Delete Task',
//                                     alertMessage:
//                                       'Are you sure you want to delete this task?',
//                                     alertButtons: [
//                                       {
//                                         text: 'Cancel',
//                                         onPress: () =>
//                                           this.setState({ alertVisible: false }),
//                                         type: 'cancel',
//                                       },
//                                       {
//                                         text: 'Delete',
//                                         onPress: () => {
//                                           this.setState({ alertVisible: false });
//                                           this.props.deleteTask({
//                                             did: item.did,
//                                           });
//                                         },
//                                       },
//                                     ],
//                                     alertIcon: null,
//                                   });
//                                   this.closeAll();
//                                 }}
//                               />
//                               <Text style={styles.iconStyle}>Delete</Text>
//                             </TouchableOpacity>,
//                           ]}
//                           onRightButtonsOpenRelease={this.onOpen}
//                           onRightButtonsCloseRelease={this.onClose}>
//                           <TaskItem
//                             title={item.title}
//                             subtitle={item.date + ' ' + item.type}
//                             active={item.status === '1'}
//                             bgColor={this.props.settings.theme.bgPrimary}
//                             textColor={this.props.settings.theme.textPrimary}
//                             onPress={() =>
//                               this.props.navigation.navigate('NewTask', {
//                                 title: 'Edit Task',
//                                 contact: c,
//                                 task: item,
//                                 route: 'ContactDetails',
//                                 onNavigateBack: this.refresh.bind(this),
//                               })
//                             }
//                             onPressCheckbox={() => {
//                               let task = this.props.route.params.task;
//                               let params = {
//                                 did: item.did,
//                                 title: item.title,
//                                 status: item.status === '1' ? '0' : '1',
//                               };

//                               this.props.editTask(params);
//                             }}
//                           />
//                         </Swipeable>
//                         {/* <SwipeRow
//                         style={{}}
//                         ref={(c) => { this.component[index] = c }}
//                         leftOpenValue={75}
//                         rightOpenValue={-75}
//                         onRowOpen={() => {
//                           if (this.selectedRow && this.selectedRow !== this.component[index]) { this.selectedRow._root.closeRow(); }
//                           this.selectedRow = this.component[index]
//                         }}
//                         body={
//                           <TaskItem
//                             title={item.title}
//                             subtitle={item.date}
//                             active={item.status==='1'}
//                             bgColor={this.props.settings.theme.bgPrimary}
//                             textColor={this.props.settings.theme.textPrimary}
//                             onPress={() => this.props.navigation.navigate('NewTask', {
//                               title: 'Edit Task',
//                               contact: c,
//                               task: item,
//                               route: 'ContactDetails',
//                               onNavigateBack: this.refresh.bind(this)
//                             })}
//                             onPressCheckbox={() => {
//                               let task = this.props.route.params.task;
//                               let params = {
//                                 did: item.did,
//                                 title: item.title,
//                                 status: item.status==='1' ? '0' : '1'
//                               };

//                               this.props.editTask(params);
//                             }}
//                           />
//                         } */}
//                       </Collapsible>
//                     );
//                   }}
//                 />
//               )
//             ) : (
//               <GroupsItemEmpty
//                 title={'No tasks'}
//                 textColor={this.props.settings.theme.textSecondary}
//               />
//             )}
//           </View>

//           <View
//             style={[
//               styles.segmentTitleContainer,
//               { justifyContent: 'space-between' },
//             ]}>
//             <View style={global.styles.inlineBlock}>
//               <Text
//                 style={[
//                   styles.segmentTitle,
//                   { color: this.props.settings.theme.textPrimary },
//                 ]}>
//                 Notes
//               </Text>
//               <PlusButton
//                 onPress={() => this.addIconPressed('notes')}
//                 tintColor={this.props.settings.theme.bgPrimary}
//               />
//             </View>
//             {/*
//               <MiniButton
//               icon={global.icon_dots}
//               size={25}
//               style={{ backgroundColor: 'rgba(0,0,0,0.0)', alignSelf: 'flex-end'}} iconStyle={{ tintColor: this.props.settings.theme.textPrimary }} />
//               */}
//             <TouchableOpacity
//               style={{
//                 padding: 5,
//                 borderRadius: 5,
//                 backgroundColor: global.color_theme,
//               }}
//               onPress={() =>
//                 this.setState({ notesViewMore: !this.state.notesViewMore })
//               }>
//               <Image
//                 style={{
//                   width: 14,
//                   height: 14,
//                   resizeMode: 'contain',
//                   tintColor: global.color_white,
//                 }}
//                 source={
//                   this.state.notesViewMore
//                     ? global.icon_dropdown
//                     : global.icon_rightarrow
//                 }
//               />
//             </TouchableOpacity>
//           </View>
//           <View style={{ flex: 1 }}>
//             {c.notes && c.notes.length > 0 ? (
//               c.notes.length > 3 && !this.state.notesViewMore ? (
//                 <View style={{ marginHorizontal: -30 }}>
//                   {c.notes.map((item, index) => {
//                     if (index <= 2) {
//                       return (
//                         <Swipeable
//                           ref={c => {
//                             this.selectedRow = c;
//                           }}
//                           rightButtons={[
//                             <TouchableOpacity
//                               style={[
//                                 styles.rightSwipeItem,
//                                 { backgroundColor: global.color_purple },
//                               ]}
//                               onPress={() => {
//                                 this.props.navigation.navigate('NewNote', {
//                                   cid: c.cid,
//                                   note: item,
//                                   onNavigateBack: this.refresh.bind(this),
//                                 });
//                                 this.closeAll();
//                               }}>
//                               <MiniButton
//                                 icon={global.icon_pencil}
//                                 color={global.color_purple}
//                                 style={{ marginLeft: 1, marginBottom: -5 }}
//                                 onPress={() => {
//                                   this.props.navigation.navigate('NewNote', {
//                                     cid: c.cid,
//                                     note: item,
//                                     onNavigateBack: this.refresh.bind(this),
//                                   });
//                                   this.closeAll();
//                                 }}
//                               />
//                               <Text
//                                 style={{
//                                   color: global.color_white,
//                                   marginLeft: 5,
//                                   marginBottom: 5,
//                                 }}>
//                                 Edit
//                               </Text>
//                             </TouchableOpacity>,
//                             <TouchableOpacity
//                               style={[
//                                 styles.rightSwipeItem,
//                                 { backgroundColor: global.color_red },
//                               ]}
//                               onPress={() => {
//                                 this.setState({
//                                   alertVisible: true,
//                                   alertTitle: 'Delete Note',
//                                   alertMessage:
//                                     'Are you sure you want to delete this note?',
//                                   alertButtons: [
//                                     {
//                                       text: 'Cancel',
//                                       onPress: () =>
//                                         this.setState({ alertVisible: false }),
//                                       type: 'cancel',
//                                     },
//                                     {
//                                       text: 'Delete',
//                                       onPress: () => {
//                                         this.setState({ alertVisible: false });
//                                         this.props.deleteNote({
//                                           cid: c.cid,
//                                           nid: item.nid,
//                                         });
//                                         this.refresh();
//                                       },
//                                     },
//                                   ],
//                                   alertIcon: null,
//                                 });
//                                 this.closeAll();
//                               }}>
//                               <MiniButton
//                                 icon={global.icon_delete}
//                                 color={global.color_red}
//                                 style={{ marginLeft: -4, marginBottom: -4 }}
//                                 onPress={() => {
//                                   this.setState({
//                                     alertVisible: true,
//                                     alertTitle: 'Delete Note',
//                                     alertMessage:
//                                       'Are you sure you want to delete this note?',
//                                     alertButtons: [
//                                       {
//                                         text: 'Cancel',
//                                         onPress: () =>
//                                           this.setState({ alertVisible: false }),
//                                         type: 'cancel',
//                                       },
//                                       {
//                                         text: 'Delete',
//                                         onPress: () => {
//                                           this.setState({ alertVisible: false });
//                                           this.props.deleteNote({
//                                             cid: c.cid,
//                                             nid: item.nid,
//                                           });
//                                           this.refresh();
//                                         },
//                                       },
//                                     ],
//                                     alertIcon: null,
//                                   });
//                                   this.closeAll();
//                                 }}
//                               />
//                               <Text style={styles.iconStyle}>Delete</Text>
//                             </TouchableOpacity>,
//                           ]}
//                           onRightButtonsOpenRelease={this.onOpen}
//                           onRightButtonsCloseRelease={this.onClose}>
//                           <NoteItem
//                             title={item.content}
//                             subtitle={item.date}
//                             textColor={this.props.settings.theme.textPrimary}
//                             bgColor={this.props.settings.theme.bgPrimary}
//                             onPress={() =>
//                               this.props.navigation.navigate('NewNote', {
//                                 cid: c.cid,
//                                 note: item,
//                                 onNavigateBack: this.refresh.bind(this),
//                               })
//                             }
//                           />
//                         </Swipeable>
//                       );
//                     }
//                   })}
//                 </View>
//               ) : (
//                 <FlatList
//                   style={{ marginHorizontal: -30 }}
//                   contentContainerStyle={[{}]}
//                   data={this.notesRender()}
//                   showsVerticalScrollIndicator={false}
//                   keyExtractor={(item, index) => `list-item-${index}`}
//                   renderItem={({ item, index }) => {
//                     const active = index % 2 === 0;
//                     return (
//                       <Swipeable
//                         ref={c => {
//                           this.selectedRow = c;
//                         }}
//                         rightButtons={[
//                           <TouchableOpacity
//                             style={[
//                               styles.rightSwipeItem,
//                               { backgroundColor: global.color_purple },
//                             ]}
//                             onPress={() => {
//                               this.props.navigation.navigate('NewNote', {
//                                 cid: c.cid,
//                                 note: item,
//                                 onNavigateBack: this.refresh.bind(this),
//                               });
//                               this.closeAll();
//                             }}>
//                             <MiniButton
//                               icon={global.icon_pencil}
//                               color={global.color_purple}
//                               style={{ marginLeft: 1, marginBottom: -5 }}
//                               onPress={() => {
//                                 this.props.navigation.navigate('NewNote', {
//                                   cid: c.cid,
//                                   note: item,
//                                   onNavigateBack: this.refresh.bind(this),
//                                 });
//                                 this.closeAll();
//                               }}
//                             />
//                             <Text
//                               style={{
//                                 color: global.color_white,
//                                 marginLeft: 5,
//                                 marginBottom: 5,
//                               }}>
//                               Edit
//                             </Text>
//                           </TouchableOpacity>,
//                           <TouchableOpacity
//                             style={[
//                               styles.rightSwipeItem,
//                               { backgroundColor: global.color_red },
//                             ]}
//                             onPress={() => {
//                               this.setState({
//                                 alertVisible: true,
//                                 alertTitle: 'Delete Note',
//                                 alertMessage:
//                                   'Are you sure you want to delete this note?',
//                                 alertButtons: [
//                                   {
//                                     text: 'Cancel',
//                                     onPress: () =>
//                                       this.setState({ alertVisible: false }),
//                                     type: 'cancel',
//                                   },
//                                   {
//                                     text: 'Delete',
//                                     onPress: () => {
//                                       this.setState({ alertVisible: false });
//                                       this.props.deleteNote({
//                                         cid: c.cid,
//                                         nid: item.nid,
//                                       });
//                                       this.refresh();
//                                     },
//                                   },
//                                 ],
//                                 alertIcon: null,
//                               });
//                               this.closeAll();
//                             }}>
//                             <MiniButton
//                               icon={global.icon_delete}
//                               color={global.color_red}
//                               style={{ marginLeft: -4, marginBottom: -4 }}
//                               onPress={() => {
//                                 this.setState({
//                                   alertVisible: true,
//                                   alertTitle: 'Delete Note',
//                                   alertMessage:
//                                     'Are you sure you want to delete this note?',
//                                   alertButtons: [
//                                     {
//                                       text: 'Cancel',
//                                       onPress: () =>
//                                         this.setState({ alertVisible: false }),
//                                       type: 'cancel',
//                                     },
//                                     {
//                                       text: 'Delete',
//                                       onPress: () => {
//                                         this.setState({ alertVisible: false });
//                                         this.props.deleteNote({
//                                           cid: c.cid,
//                                           nid: item.nid,
//                                         });
//                                         this.refresh();
//                                       },
//                                     },
//                                   ],
//                                   alertIcon: null,
//                                 });
//                                 this.closeAll();
//                               }}
//                             />
//                             <Text style={styles.iconStyle}>Delete</Text>
//                           </TouchableOpacity>,
//                         ]}
//                         onRightButtonsOpenRelease={this.onOpen}
//                         onRightButtonsCloseRelease={this.onClose}>
//                         <NoteItem
//                           title={item.content}
//                           subtitle={item.date}
//                           textColor={this.props.settings.theme.textPrimary}
//                           bgColor={this.props.settings.theme.bgPrimary}
//                           onPress={() =>
//                             this.props.navigation.navigate('NewNote', {
//                               cid: c.cid,
//                               note: item,
//                               onNavigateBack: this.refresh.bind(this),
//                             })
//                           }
//                         />
//                       </Swipeable>
//                     );
//                   }}
//                 />
//               )
//             ) : (
//               <GroupsItemEmpty
//                 title={'No notes'}
//                 textColor={this.props.settings.theme.textSecondary}
//               />
//             )}
//           </View>

//           <View
//             style={[
//               styles.segmentTitleContainer,
//               { justifyContent: 'space-between' },
//             ]}>
//             <View style={global.styles.inlineBlock}>
//               <Text
//                 style={[
//                   styles.segmentTitle,
//                   { color: this.props.settings.theme.textPrimary },
//                 ]}>
//                 Email History
//               </Text>
//             </View>
//             <TouchableOpacity
//               style={{
//                 padding: 5,
//                 borderRadius: 5,
//                 backgroundColor: global.color_theme,
//               }}
//               onPress={() =>
//                 this.setState({ emailViewMore: !this.state.emailViewMore })
//               }>
//               <Image
//                 style={{
//                   width: 14,
//                   height: 14,
//                   resizeMode: 'contain',
//                   tintColor: global.color_white,
//                 }}
//                 source={
//                   this.state.emailViewMore
//                     ? global.icon_dropdown
//                     : global.icon_rightarrow
//                 }
//               />
//             </TouchableOpacity>
//           </View>
//           {c.history && c.history.emails && c.history.emails.length > 0 ? (
//             c.history.emails.length > 3 && !this.state.emailViewMore ? (
//               <View style={{ marginHorizontal: -30 }}>
//                 {c.history.emails.map((item, index) => {
//                   if (index <= 2) {
//                     const active = index % 2 === 0;
//                     var swipeoutBtns = [
//                       {
//                         text: 'Delete',
//                         backgroundColor: global.color_red,
//                       },
//                     ];
//                     return (
//                       <EmailItem
//                         active={active}
//                         sender={item.from}
//                         title={
//                           item.subject_preview
//                             ? mimeWordsDecode(item.subject_preview)
//                             : ''
//                         }
//                         subtitle={
//                           item.body_preview
//                             ? cleanEmailBodyPreview(item.body_preview)
//                             : ''
//                         }
//                         // timestamp={timestampToMonthDayTime(item.date*1000)}
//                         timestamp={this.setDateTimeFormatForEmail(
//                           item.date * 1000,
//                         )}
//                         box
//                         separatorColor={this.props.settings.theme.separator}
//                         textColor={this.props.settings.theme.textPrimary}
//                         checkColor={this.props.settings.theme.bgSecondary}
//                         bgColor={this.props.settings.theme.bgPrimary}
//                         onPress={() =>
//                           this.props.navigation.navigate('EmailDetails', {
//                             emailContent: { ...item, html_body: item.body },
//                             box: 'Back',
//                             emails: c.history.emails,
//                             index: index,
//                           })
//                         }
//                         unread={item.read === 0}
//                       />
//                     );
//                   }
//                 })}
//               </View>
//             ) : (
//               <FlatList
//                 style={{ marginHorizontal: -30 }}
//                 contentContainerStyle={[{}]}
//                 data={c.history.emails}
//                 showsVerticalScrollIndicator={false}
//                 keyExtractor={(item, index) => `list-item-${index}`}
//                 renderItem={({ item, index }) => {
//                   const active = index % 2 === 0;
//                   var swipeoutBtns = [
//                     {
//                       text: 'Delete',
//                       backgroundColor: global.color_red,
//                     },
//                   ];
//                   return (
//                     // <Swipeout right={swipeoutBtns} style={{ backgroundColor: 'transparent' }} autoClose >
//                     //   <EmailItem
//                     //   active={active}
//                     //   sender={item.from}
//                     //   title={item.subject_preview ? mimeWordsDecode(item.subject_preview) : ''}
//                     //   subtitle={item.body_preview ? cleanEmailBodyPreview(item.body_preview) : ''}
//                     //   // timestamp={timestampToMonthDayTime(item.date*1000)}
//                     //   timestamp={this.setDateTimeFormatForEmail(item.date*1000)}
//                     //   box
//                     //   separatorColor={this.props.settings.theme.separator}
//                     //   textColor={this.props.settings.theme.textPrimary}
//                     //   checkColor={this.props.settings.theme.bgSecondary}
//                     //   bgColor={this.props.settings.theme.bgPrimary}
//                     //   onPress={() => this.props.navigation.navigate('EmailDetails', {
//                     //     emailContent: {...item, html_body: item.body},
//                     //     box: 'Back',
//                     //     emails: c.history.emails,
//                     //     index: index,
//                     //   })}
//                     //   unread={item.read===0} />
//                     // </Swipeout>
//                     <EmailItem
//                       active={active}
//                       sender={item.from}
//                       title={
//                         item.subject_preview
//                           ? mimeWordsDecode(item.subject_preview)
//                           : ''
//                       }
//                       subtitle={
//                         item.body_preview
//                           ? cleanEmailBodyPreview(item.body_preview)
//                           : ''
//                       }
//                       // timestamp={timestampToMonthDayTime(item.date*1000)}
//                       timestamp={this.setDateTimeFormatForEmail(
//                         item.date * 1000,
//                       )}
//                       box
//                       separatorColor={this.props.settings.theme.separator}
//                       textColor={this.props.settings.theme.textPrimary}
//                       checkColor={this.props.settings.theme.bgSecondary}
//                       bgColor={this.props.settings.theme.bgPrimary}
//                       onPress={() =>
//                         this.props.navigation.navigate('EmailDetails', {
//                           emailContent: { ...item, html_body: item.body },
//                           box: 'Back',
//                           emails: c.history.emails,
//                           index: index,
//                         })
//                       }
//                       unread={item.read === 0}
//                     />
//                   );
//                 }}
//               />
//             )
//           ) : (
//             <GroupsItemEmpty
//               title={'No email history'}
//               textColor={this.props.settings.theme.textSecondary}
//             />
//           )}
//         </ScrollView>
//         <Animated.View
//           style={{
//             backgroundColor: this.props.settings.theme.bgSecondary,
//             position: 'absolute',
//             height: global.headerHeight,
//             top: 0,
//             left: 0,
//             right: 0,
//             opacity: headerOpacity,
//           }}>
//           <Text
//             numberOfLines={1}
//             style={{
//               position: 'absolute',
//               bottom: 10,
//               alignSelf: 'center',
//               fontFamily: 'Montserrat-Regular',
//               fontWeight: '700',
//               fontSize: 18,
//               color: this.props.settings.theme.textPrimary,
//               marginHorizontal: 50,
//             }}>
//             {cd.fullname}
//           </Text>
//         </Animated.View>

//         <ModalAlert
//           onBackdropPress={() => this.setState({ alertVisible: false })}
//           isVisible={this.state.alertVisible}
//           title={this.state.alertTitle}
//           message={this.state.alertMessage}
//           alertIcon={this.state.alertIcon}
//           buttons={this.state.alertButtons}
//           dark={this.props.settings.theme.mode === 'dark'}
//           bgColor={this.props.settings.theme.bgPrimary}
//           textColor={this.props.settings.theme.textPrimary}
//         />

//         <ModalChecklist
//           isVisible={
//             this.state.alertListVisible && this.state.alertListType !== ''
//           }
//           title={this.state.alertListTitle}
//           onBackdropPress={() => this.setState({ alertListVisible: false })}
//           list={this.renderAlertList()}
//           onPressSave={this.state.alertListSave}
//           bgColor={this.props.settings.theme.bgTertiary}
//           textColor={this.props.settings.theme.textPrimary}
//         />
//         <Toast
//           ref={'toast'}
//           style={[
//             global.styles.toastStyle,
//             { backgroundColor: this.props.settings.theme.bgPrimary },
//           ]}
//           textStyle={[
//             global.styles.toastTextStyle,
//             { color: this.props.settings.theme.textPrimary },
//           ]}
//         />
//         {this.props.contactsStatus === CONTACT_DELETECONTACT_LOADING ||
//           this.props.contactsStatus === CONTACT_GETCONTACTINFO_LOADING ? (
//           <IndicatorBottom dark={this.props.settings.theme.mode === 'dark'} />
//         ) : null}

//         <ModalBottom
//           onBackdropPress={() => this.setState({ showMenu: false })}
//           isVisible={this.state.showMenu}
//           dark={this.props.settings.theme.mode === 'dark'}
//           list={this.renderMenuOptions()}
//           title={cd.fullname}
//           buttons={[
//             {
//               text: 'Cancel',
//               type: 'cancel',
//               onPress: () => this.setState({ showMenu: false }),
//             },
//           ]}
//           bgColor={
//             this.props.settings.theme.mode === 'light'
//               ? this.props.settings.theme.bgPrimary
//               : this.props.settings.theme.bgTertiary
//           }
//           textColor={this.props.settings.theme.textPrimary}
//         //hideArrow
//         />
//       </View>
//     );
//   }
// }

// const PlusButton = ({ tintColor, onPress, size = 20, iconStyle, style }) => {
//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       style={{ paddingVertical: 5, paddingLeft: 5, paddingRight: 10 }}>
//       <View
//         style={[
//           {
//             width: size,
//             height: size,
//             borderRadius: size / 2,
//             marginHorizontal: 6,
//             padding: size / 4,
//             backgroundColor: global.color_theme,
//           },
//           style,
//         ]}>
//         <Image
//           source={global.icon_plus}
//           style={[
//             {
//               width: '100%',
//               height: '100%',
//               tintColor: tintColor,
//             },
//             iconStyle,
//           ]}
//         />
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   mainInfoInnerContainer: {
//     backgroundColor: global.color_white,
//     alignItems: 'center',
//     borderRadius: 30,
//     shadowColor: '#432587',
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.15,
//     shadowRadius: 10,
//     elevation: 10,
//     paddingHorizontal: 30,
//     paddingTop: 80,
//     paddingBottom: 40,
//   },
//   avatarContainer: {
//     position: 'absolute',
//     alignSelf: 'center',
//     marginTop: -60,
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     shadowColor: '#432587',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.3,
//     shadowRadius: 10,
//     elevation: 10,
//   },
//   avatarImgContainer: {
//     borderRadius: 60,
//     width: '100%',
//     height: '100%',
//     overflow: 'hidden',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   avatarInitials: {
//     fontFamily: 'Montserrat-Regular',
//     fontWeight: '700',
//     fontSize: 30,
//     color: global.color_gray,
//     textAlign: 'center',
//   },
//   mainInfoTitle: {
//     fontFamily: 'Montserrat-Regular',
//     fontWeight: '700',
//     fontSize: 22,
//     marginBottom: 2,
//     color: global.color_darkgray,
//   },
//   mainInfoSubtitle: {
//     fontFamily: 'Montserrat-Regular',
//     fontWeight: '400',
//     fontSize: 12,
//     color: global.color_gray,
//   },
//   quickButtonsContainer: {
//     marginTop: 20,
//     flexDirection: 'row',
//   },
//   starsContainer: {
//     marginTop: 10,
//     flexDirection: 'row',
//   },
//   segmentTitleContainer: {
//     marginTop: 30,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   segmentTitle: {
//     fontFamily: 'Montserrat-Regular',
//     fontWeight: '700',
//     fontSize: 18,
//     color: global.color_darkgray,
//     marginRight: 0,
//   },
//   moreInfoBtn: {
//     width: 100,
//     height: 30,
//     borderRadius: 15,
//     backgroundColor: global.color_theme,
//     alignItems: 'center',
//     justifyContent: 'center',
//     alignSelf: 'center',
//     position: 'absolute',
//     bottom: -15,
//   },
//   moreInfoBtnText: {
//     color: global.color_white,
//     fontSize: 12,
//     fontWeight: '700',
//   },
//   moreInfoContainer: {
//     width: '100%',
//     marginBottom: -20,
//   },
//   moreInfoItem: {
//     width: '100%',
//     paddingVertical: 15,
//   },
//   moreInfoItemTitle: {
//     color: global.color_medgray,
//     fontFamily: 'Montserrat-Regular',
//     fontSize: 11,
//   },
//   moreInfoItemValue: {
//     color: global.color_darkgray,
//     fontSize: 14,
//     fontWeight: '500',
//     fontFamily: 'Montserrat-Regular',
//   },
//   rightSwipeItem: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingLeft: 20,
//   },
//   iconStyle: {
//     color: global.color_white,
//     marginLeft: -9,
//     marginBottom: 6,
//   },
// });

// const mapStateToProps = ({
//   settings,
//   contacts,
//   groups,
//   campaigns,
//   tags,
//   tasks,
// }) => {
//   const { contactInfo, contactsStatus, contactsError } = contacts;
//   const { groupsStatus, groupsError, groupsList } = groups;
//   const { campaignsStatus, campaignsError, campaignsList } = campaigns;
//   const { tagsStatus, tagsError, tagsList } = tags;
//   const { tasksStatus } = tasks;
//   return {
//     settings,
//     contactInfo,
//     contactsStatus,
//     contactsError,
//     groupsStatus,
//     groupsError,
//     groupsList,
//     campaignsStatus,
//     campaignsError,
//     campaignsList,
//     tagsStatus,
//     tagsError,
//     tagsList,
//     tasksStatus,
//   };
// };

// export default connect(mapStateToProps, {
//   getContactList,
//   getContactsWithRatings,
//   getContactInfo,
//   deleteContact,
//   updateRatings,

//   getGroups,
//   addGroupsToContact,
//   removeGroupToContact,

//   getCampaigns,
//   addCampaignsToContact,
//   removeCampaignToContact,

//   getTags,
//   addTagsToContact,
//   removeTagToContact,

//   deleteNote,

//   editTask,
//   deleteTask,
//   getMailboxes,
// })(ContactDetails);





// import React, {Component} from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   StyleSheet,
//   Image,
//   FlatList,
//   TouchableOpacity,
//   Animated,
//   Clipboard,
//   Alert,
//   Easing,
//   Linking,
//   SafeAreaView,
//   BackHandler,
//   SwipeableFlatList,
//   TouchableHighlight,
//   Dimensions,
// } from 'react-native';
// import Collapsible from 'react-native-collapsible';
// import {connect} from 'react-redux';
// import Swipeout from 'react-native-swipeout';
// import Swipeable from 'react-native-swipeable';
// import Rating from 'react-native-rating-simple';
// import Toast, {DURATION} from 'react-native-easy-toast';
// import {mimeWordsDecode} from 'emailjs-mime-codec';

// import {
//   timestampToMonthDayTime,
//   timespan,
//   cleanEmailBodyPreview,
//   formatMobileNumber,
//   FormatTime,
// } from '../utils/Helper';
// import {
//   HeaderButton,
//   MiniButton,
//   StarButton,
//   TaskItem,
//   NoteItem,
//   EmailItem,
//   FormButton,
//   ModalAlert,
//   ModalChecklist,
//   ModalBottom,
//   GroupsItem,
//   GroupsItemEmpty,
//   IndicatorBottom,
//   CalendarTaskItem,
// } from '../common';
// import {
//   getContactList,
//   getContactsWithRatings,
//   getContactInfo,
//   deleteContact,
//   updateRatings,
//   getGroups,
//   addGroupsToContact,
//   removeGroupToContact,
//   getCampaigns,
//   addCampaignsToContact,
//   removeCampaignToContact,
//   getTags,
//   addTagsToContact,
//   removeTagToContact,
//   deleteNote,
//   editTask,
//   deleteTask,
//   getMailboxes,
// } from '../actions';
// import {
//   CONTACT_GETCONTACTINFO_LOADING,
//   CONTACT_DELETECONTACT_LOADING,
//   CONTACT_DELETECONTACT_SUCCESS,
//   CONTACT_DELETECONTACT_FAIL,
//   LISTTYPE_GROUPS,
//   LISTTYPE_CAMPAIGNS,
//   LISTTYPE_TAGS,
//   GROUP_ADDGROUPTOCONTACT_SUCCESS,
//   GROUP_REMOVEGROUPTOCONTACT_SUCCESS,
//   CAMPAIGN_ADDCAMPAIGNSTOCONTACT_SUCCESS,
//   CAMPAIGN_REMOVECAMPAIGN_SUCCESS,
//   TAGS_ADDTAG_SUCCESS,
//   TAGS_REMOVETAG_SUCCESS,
//   TASK_EDITTASK_SUCCESS,
//   TASK_DELETETASK_SUCCESS,
//   TASK_IDLE,
// } from '../actions/types';
// import moment from 'moment';
// import {borderRadius} from 'styled-system';

// class ContactDetails extends Component {
//   _isMounted = false;
//   static navigationOptions = ({navigation}) => {
//     const {params} = navigation.state;
//     return params;
//   };

//   constructor(props) {
//     super(props);
//     this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
//     this.state = {
//       scrollY: new Animated.Value(0),
//       listGroups: [
//         'Team Member',
//         'Manufacturer',
//         'Retailer',
//         'Marketing Launch Company',
//       ],
//       moreInfoList: [
//         {title: 'Email', value: 'juandelacruz@company.com'},
//         {title: 'Mobile Number', value: '0987654321'},
//         {title: 'Website', value: 'juandelacruz.com'},
//         {title: 'Address', value: 'City Name, Country, 1234'},
//       ],

//       showMoreInfo: false,
//       showCompletedTask: true,

//       // MODAL ALERT
//       alertVisible: false,
//       alertTitle: '',
//       alertMessage: '',
//       alertButtons: [
//         {text: 'OK', onPress: () => this.setState({alertVisible: false})},
//       ],
//       alertIcon: null,

//       alertListVisible: false,
//       alertListTitle: '',
//       alertListData: [],
//       alertListSelected: [],
//       alertListSave: () => {},
//       alertListType: '',

//       showMenu: false,

//       rating: 0,

//       swipeable: null,

//       currentlyOpenSwipeable: null,
//       loadMoreVisible: true,
//       viewMore: false,
//       notesViewMore: false,
//       emailViewMore: false,
//     };
//     this.selectedRow;
//     this.component = [];
//   }

//   handleBackButtonClick() {
//     // this.props.navigation.goBack(null);
//     this.props.getContactList(this.props.route.params.contact, 1);
//     // setTimeout(() => {
//     this.props.getContactsWithRatings(
//       this.props.route.params.contactWithRating,
//       1,
//     );
//     // }, 500);
//     this.props.selectInfo = this.props.route.params.selectInfo;
//     this.props.navigation.navigate('ContactsStack', {
//       select: this.props.route.params.selectInfo,
//     });
//     return true;
//   }

//   componentWillMount() {
//     this._isMounted = true;
//     if (this._isMounted) {
//       BackHandler.addEventListener(
//         'hardwareBackPress',
//         this.handleBackButtonClick,
//       );
//       this.props.navigation.setOptions({
//         headerLeft: () => (
//           <View style={global.styles.headerButtonsContainer}>
//             <HeaderButton
//               icon={global.icon_leftarrow}
//               onPress={() => this.handleBackButtonClick()}
//               mode={this.props.settings.theme.mode}
//             />
//           </View>
//         ),
//         headerRight: () => (
//           <View style={global.styles.headerButtonsContainer}>
//             <HeaderButton
//               icon={global.icon_dots}
//               mode={this.props.settings.theme.mode}
//               onPress={() => this.setState({showMenu: true})}
//             />
//           </View>
//         ),
//       });

//       if (this.props.route.params.contactInfo) {
//         console.log(
//           this.props.route.params.contactInfo,
//           'this.props.route.params.contactInfo',
//         );
//         this.props.getContactInfo({
//           contactInfo: this.props.route.params.contactInfo,
//         });
//       }

//       // this.props.getGroups();

//       this.setState({rating: 3});
//     }
//     this.props.getMailboxes();

//     // this.forceUpdate();
//   }

//   componentWillUnmount() {
//     this._isMounted = false;
//     BackHandler.removeEventListener(
//       'hardwareBackPress',
//       this.handleBackButtonClick,
//     );
//   }

//   refresh() {
//     console.log(this.props.contactInfo, 'this.props.contactInfo');
//     this.props.getContactInfo({contactInfo: this.props.contactInfo});
//   }

//   componentWillReceiveProps(nextProps) {
//     console.log(nextProps, 'nextProps===>');
//     if (nextProps.contactsStatus === CONTACT_DELETECONTACT_LOADING) {
//       console.log(nextProps, 'nextProps===>123');
//       this.props.navigation.goBack();
//     }

//     if (
//       (this.props.tasksStatus === TASK_EDITTASK_SUCCESS &&
//         nextProps.tasksStatus === TASK_IDLE) ||
//       (this.props.tasksStatus === TASK_DELETETASK_SUCCESS &&
//         nextProps.tasksStatus === TASK_IDLE)
//     ) {
//       this.refresh();
//     }

//     if (nextProps.groupsStatus === GROUP_ADDGROUPTOCONTACT_SUCCESS) {
//       this.setState({alertListVisible: false});
//       setTimeout(() => {
//         this.refresh();
//       }, 300);
//     } else if (nextProps.groupsStatus === GROUP_REMOVEGROUPTOCONTACT_SUCCESS) {
//       setTimeout(() => {
//         this.refresh();
//       }, 300);
//     }

//     if (nextProps.campaignsStatus === CAMPAIGN_ADDCAMPAIGNSTOCONTACT_SUCCESS) {
//       this.setState({alertListVisible: false});
//       setTimeout(() => {
//         this.refresh();
//       }, 300);
//     } else if (nextProps.campaignsStatus === CAMPAIGN_REMOVECAMPAIGN_SUCCESS) {
//       setTimeout(() => {
//         this.refresh();
//       }, 300);
//     }

//     if (nextProps.tagsStatus === TAGS_ADDTAG_SUCCESS) {
//       this.setState({alertListVisible: false});
//       setTimeout(() => {
//         this.refresh();
//       }, 300);
//     } else if (nextProps.tagsStatus === TAGS_REMOVETAG_SUCCESS) {
//       this.setState({alertListVisible: false});
//       setTimeout(() => {
//         this.refresh();
//       }, 300);
//     }

//     // this.setState({ rating: nextProps.contactInfo.rating });
//     // this.updateAlertList(nextProps);
//   }

//   prepareSelected() {
//     let c = this.props.contactInfo;
//     let selected = [];
//     switch (this.state.alertListType) {
//       case LISTTYPE_GROUPS:
//         if (c.groups && c.groups.length > 0) {
//           c.groups.forEach(item => {
//             selected.push(item.gid);
//           });
//         }
//         // Alert.alert(`${selected.length}`)
//         this.setState({alertListSelected: selected});
//         break;
//       case LISTTYPE_CAMPAIGNS:
//         if (c.campaigns && c.campaigns.length > 0 && c.campaigns[0] !== false) {
//           c.campaigns.forEach(item => {
//             if (item && item.cp_gid) {
//               selected.push(item.cp_gid);
//             }
//           });
//         }
//         this.setState({alertListSelected: selected});
//         break;
//       case LISTTYPE_TAGS:
//         if (c.tags && c.tags.length > 0) {
//           c.tags.forEach(item => {
//             selected.push(item);
//           });
//         }
//         this.setState({alertListSelected: selected});
//         break;
//       default:
//     }
//   }

//   toggleAlertList(tag) {
//     let selected = this.state.alertListSelected;
//     if (selected.some(x => x.tag === tag.tag)) {
//       const index = selected.findIndex(x => x.tag === tag.tag);
//       selected.splice(index, 1);
//     } else {
//       selected.push(tag);
//     }
//     this.setState({alertListSelected: selected});
//   }

//   toggleGroups(id) {
//     let selected = this.state.alertListSelected;
//     if (selected.includes(id)) {
//       const index = selected.indexOf(id);
//       selected.splice(index, 1);
//     } else {
//       selected.push(id);
//     }
//     this.setState({alertListSelected: selected});
//   }

//   renderAlertList() {
//     let list = [];
//     // ssAlert.alert(this.state.alertListType);
//     switch (this.state.alertListType) {
//       case LISTTYPE_GROUPS:
//         this.props.groupsList.map(item => {
//           list.push({
//             text: item.name,
//             checked: this.state.alertListSelected.includes(item.gid),
//             onPress: () => this.toggleGroups(item.gid),
//           });
//         });
//         break;
//       case LISTTYPE_CAMPAIGNS:
//         this.props.campaignsList.map(item => {
//           list.push({
//             text: item.name,
//             checked: this.state.alertListSelected.includes(item.cp_gid),
//             //onPress: () => this.toggleAlertList(item.cp_gid)
//             onPress: () => this.setState({alertListSelected: [item.cp_gid]}),
//           });
//         });
//         break;
//       case LISTTYPE_TAGS:
//         this.props.tagsList.map(item => {
//           list.push({
//             text: item.tag,
//             checked: this.state.alertListSelected.some(x => x.tag === item.tag),
//             onPress: () => this.toggleAlertList(item),
//           });
//         });
//         break;
//       default:
//     }
//     // Alert.alert(JSON.stringify(list));
//     return list;
//   }

//   handleQuickButton(action) {
//     let c = this.props.contactInfo;
//     c = c.contact_details ? c.contact_details : c;
//     switch (action) {
//       case 'phone':
//         Linking.openURL(`tel:${c.phone}`);
//         break;
//       case 'text':
//         Linking.openURL(`sms:${c.phone}&body=`);
//         break;
//       case 'email':
//         this.props.navigation.navigate('EmailComposeStack', {
//           screen: 'EmailCompose',
//           params: {
//             contacts: [c],
//             email: [c],
//           },
//         });

//         break;

//       case 'edit':
//         this.props.navigation.navigate('ContactAdd', {
//           title: 'Edit Contact',
//           contact: c,
//           onNavigateBack: this.refresh.bind(this),
//         });
//         break;
//       case 'delete':
//         this.setState({
//           alertVisible: true,
//           alertTitle: 'Delete Contact',
//           alertMessage: 'Are you sure you want to delete this contact?',
//           alertButtons: [
//             {
//               text: 'Cancel',
//               onPress: () => this.setState({alertVisible: false}),
//               type: 'cancel',
//             },
//             {
//               text: 'Delete',
//               onPress: () => {
//                 this.setState({alertVisible: false});
//                 this.props.deleteContact({cid: c.cid});
//               },
//             },
//           ],
//           alertIcon: null,
//         });
//         break;
//       default:
//     }
//   }

//   renderMenuOptions() {
//     let c = this.props.contactInfo;
//     c = c.contact_details ? c.contact_details : c;

//     let options = [
//       {
//         text: 'Edit Contact',
//         onPress: () => {
//           this.setState({showMenu: false});
//           setTimeout(() => {
//             this.handleQuickButton('edit');
//           }, 400);
//         },
//       },
//       {
//         text: 'Email ' + c.email,
//         onPress: () => {
//           this.setState({showMenu: false});
//           setTimeout(() => {
//             this.handleQuickButton('email');
//           }, 400);
//         },
//       },
//       {
//         text: 'Call ' + c.phone,
//         onPress: () => {
//           this.setState({showMenu: false});
//           setTimeout(() => {
//             this.handleQuickButton('phone');
//           }, 400);
//         },
//       },
//       {
//         text: 'Send SMS to ' + c.phone,
//         onPress: () => {
//           this.setState({showMenu: false});
//           setTimeout(() => {
//             this.handleQuickButton('text');
//           }, 400);
//         },
//       },
//       {
//         text: 'Delete Contact',
//         onPress: () => {
//           this.setState({showMenu: false});
//           setTimeout(() => {
//             this.handleQuickButton('delete');
//           }, 400);
//         },
//       },
//       {
//         type: 'gap',
//         gapSize: 30,
//       },
//       {
//         text: '+ Add Groups',
//         onPress: () => {
//           this.setState({showMenu: false});
//           setTimeout(() => {
//             this.addIconPressed('groups');
//           }, 400);
//         },
//       },
//       {
//         text: '+ Add Tags',
//         onPress: () => {
//           this.setState({showMenu: false});
//           setTimeout(() => {
//             this.addIconPressed('tags');
//           }, 400);
//         },
//       },
//       {
//         text: '+ Add Campaigns',
//         onPress: () => {
//           this.setState({showMenu: false});
//           setTimeout(() => {
//             this.addIconPressed('campaigns');
//           }, 400);
//         },
//       },
//       {
//         text: '+ Add Task',
//         onPress: () => {
//           this.setState({showMenu: false});
//           setTimeout(() => {
//             this.addIconPressed('tasks');
//           }, 400);
//         },
//       },
//       {
//         text: '+ Add Note',
//         onPress: () => {
//           this.setState({showMenu: false});
//           setTimeout(() => {
//             this.addIconPressed('notes');
//           }, 400);
//         },
//       },
//     ];
//     return options;
//   }

//   addIconPressed(key) {
//     let c = this.props.contactInfo;
//     console.log(c, 'key++++++++++++++++++++');
//     switch (key) {
//       case 'groups':
//         this.setState(
//           {
//             alertListVisible: true,
//             alertListTitle: 'Add Groups',
//             alertListData: [],
//             alertListType: LISTTYPE_GROUPS,
//             alertListSave: () => {
//               this.state.alertListVisible = false;
//               let toAdd = [];
//               let toRemove = [];
//               // console.log(key, 'key1++++++++++++++++++++');
//               if (c.groups && c.groups.length > 0) {
//                 c.groups.forEach(item => {
//                   if (!this.state.alertListSelected.includes(item.gid)) {
//                     toRemove.push(item.gid);
//                   }
//                 });
//               }

//               this.state.alertListSelected.forEach(item => {
//                 if (
//                   !c.groups ||
//                   (c.groups && !c.groups.some(x => x.gid === item))
//                 ) {
//                   toAdd.push(item);
//                 }
//               });

//               if (toRemove.length > 0) {
//                 toRemove.forEach(item => {
//                   this.props.removeGroupToContact({cid: c.cid, gid: [item]});
//                 });
//               }

//               this.props.addGroupsToContact({
//                 cid: c.cid,
//                 gid: toAdd, //this.state.alertListSelected,
//               });
//             },
//           },
//           () => this.prepareSelected(),
//         );
//         this.props.getGroups();
//         break;
//       case 'tags':
//         this.setState(
//           {
//             alertListVisible: true,
//             alertListTitle: 'Add Tags',
//             alertListData: [],
//             alertListType: LISTTYPE_TAGS,
//             alertListSave: () => {
//               this.state.alertListVisible = false;
//               let toAdd = [];
//               let toRemove = [];

//               if (c.tags && c.tags.length > 0) {
//                 c.tags.forEach(item => {
//                   if (
//                     !this.state.alertListSelected.some(x => x.tag === item.tag)
//                   ) {
//                     toRemove.push(item);
//                   }
//                 });
//               }

//               this.state.alertListSelected.forEach(item => {
//                 if (
//                   !c.tags ||
//                   (c.tags &&
//                     !c.tags.some(
//                       x => x.contact_tag_id === item.contact_tag_id,
//                     ) &&
//                     this.props.tagsList.some(x => x.id === item.id))
//                 ) {
//                   toAdd.push(item.id);
//                 }
//               });

//               if (toRemove.length > 0) {
//                 let contact_tag_ids = [];
//                 toRemove.forEach(item => {
//                   contact_tag_ids.push(item.contact_tag_id);
//                   // this.props.removeTagToContact({ cid: c.cid, id: [item] })
//                 });
//                 this.props.removeTagToContact({
//                   cid: c.cid,
//                   tags: contact_tag_ids,
//                 });
//               }

//               console.log('tags to add: ' + JSON.stringify(toAdd));

//               this.props.addTagsToContact({
//                 cid: c.cid,
//                 tags: toAdd, //this.state.alertListSelected,
//               });
//             },
//           },
//           () => this.prepareSelected(),
//         );
//         this.props.getTags();
//         break;
//       case 'campaigns':
//         this.setState(
//           {
//             alertListVisible: true,
//             alertListTitle: 'Add Campaigns',
//             alertListData: [],
//             alertListType: LISTTYPE_CAMPAIGNS,
//             alertListSave: () => {
//               this.state.alertListVisible = false;
//               if (this.state.alertListSelected.length > 0) {
//                 this.props.addCampaignsToContact({
//                   cid: c.cid,
//                   cp_gid: this.state.alertListSelected[0],
//                 });
//               } else {
//                 this.setState({alertListVisible: false});
//               }
//             },
//           },
//           () => this.prepareSelected(),
//         );
//         this.props.getCampaigns();
//         break;
//       case 'tasks':
//         this.props.navigation.navigate('NewTask', {
//           title: 'New Task',
//           contact: c,
//           route: 'ContactDetails',
//           onNavigateBack: this.refresh.bind(this),
//         });
//         break;
//       case 'notes':
//         this.props.navigation.navigate('NewNote', {
//           cid: c.cid,
//           onNavigateBack: this.refresh.bind(this),
//         });
//         break;
//       default:
//         break;
//     }
//   }


//   setDateTimeFormat = date => {
//     // console.log(date, 'date');
//     return (
//       date.split(' ')[0].split('-')[1] +
//       '-' +
//       date.split(' ')[0].split('-')[2] +
//       '-' +
//       date.split(' ')[0].split('-')[0] +
//       ' (' +
//       FormatTime(date.split(' ')[1]) +
//       ')'
//     );
//   };

//   setDateTimeFormatForSend = date => {
//     return (
//       date.split(' ')[0].split('-')[1] +
//       '-' +
//       date.split(' ')[0].split('-')[2] +
//       '-' +
//       date.split(' ')[0].split('-')[0] +
//       ' ' +
//       FormatTime(date.split(' ')[1]) +
//       ''
//     );
//   };

//   setDateTimeFormatForEmail = dateTime => {
//     let date =
//       `${('0' + (new Date(dateTime).getMonth() + 1)).slice(-2)}-${(
//         '0' + new Date(dateTime).getDate()
//       ).slice(-2)}-${new Date(dateTime).getFullYear()} (` +
//       FormatTime(
//         ('0' + new Date(dateTime).getHours()).slice(-2) +
//           ':' +
//           ('0' + new Date(dateTime).getMinutes()).slice(-2) +
//           ':' +
//           ('0' + new Date(dateTime).getSeconds()).slice(-2),
//       ) +
//       ')';
//     // console.log(date, 'date');
//     return date;
//   };

//   setDateTimeForNote(dateTime) {
//     return `${new Date(`${dateTime} UTC`).getFullYear()}-${(
//       '0' +
//       (new Date(`${dateTime} UTC`).getMonth() + 1)
//     ).slice(-2)}-${('0' + new Date(`${dateTime} UTC`).getDate()).slice(-2)} ${
//       ('0' + new Date(`${dateTime} UTC`).getHours()).slice(-2) +
//       ':' +
//       ('0' + new Date(`${dateTime} UTC`).getMinutes()).slice(-2) +
//       ':' +
//       ('0' + new Date(`${dateTime} UTC`).getSeconds()).slice(-2)
//     }`;
//   }

//   taskRender() {
//     // console.log(this.props.contactInfo,'taskes++++++++++++++++++++++++');
//     let task = [];
//     for (let data of this.props.contactInfo.tasks) {
//       task.push({
//         title: data.title,
//         date: this.setDateTimeFormat(data.date),
//         dateTime: this.setDateTimeFormatForSend(data.date),
//         did: data.did,
//         completed_date: data.completed_date,
//         comment: data.comment,
//         notify: data.notify,
//         status: data.status,
//         type: data.type,
//       });
//     }
//     return task;
//   }

//   notesRender() {
//     console.log(this.props.contactInfo.notes, 'this.props.contactInfo.notes');
//     let notes = [];
//     for (let data of this.props.contactInfo.notes) {
//       let date = moment.utc(data.date, 'YYYY-MM-DD HH:mm:ss');
//       console.log(date.local().format('YYYY-MM-DD HH:mm:ss'), 'moment date');
//       notes.push({
//         cid: data.cid,
//         content: data.content,
//         date: this.setDateTimeFormat(
//           date.local().format('YYYY-MM-DD HH:mm:ss'),
//         ),
//         nid: data.nid,
//         uid: data.uid,
//       });
//     }
//     console.log(notes, 'notes');
//     return notes;
//   }

//   onOpen = (event, gestureState, swipeable) => {
//     if (
//       this.state.currentlyOpenSwipeable &&
//       this.state.currentlyOpenSwipeable !== swipeable
//     ) {
//       this.state.currentlyOpenSwipeable.recenter();
//     }
//     this.setState({currentlyOpenSwipeable: swipeable});
//   };

//   onClose = () => {
//     this.setState({currentlyOpenSwipeable: null});
//   };

//   closeAll = () => {
//     if (this.state.currentlyOpenSwipeable) {
//       this.state.currentlyOpenSwipeable.recenter();
//     }
//   };

//   render() {
//     const headerOpacity = this.state.scrollY.interpolate({
//       inputRange: [0, global.headerHeight + 50],
//       outputRange: [-1, 1],
//       extrapolate: 'clamp',
//     });
//     let c = this.props.contactInfo;
//     let cd = c.contact_details ? c.contact_details : c;
//     console.log(cd, 'c.history');
//     let moreInfo = [
//       {title: 'First Name', value: cd.first_name, key: 'first_name'},
//       {title: 'Last Name', value: cd.last_name, key: 'last_name'},
//       {title: 'Email', value: cd.email, key: 'companyname'},
//       {title: 'Mobile Number', value: cd.phone, key: 'phone'},
//       {title: 'Company Name', value: cd.companyname, key: 'companyname'},
//       {title: 'Website', value: cd.website, key: 'website'},
//       {title: 'Address', value: cd.address, key: 'address'},
//       //{ title: 'Facebook URL', value: cd.address, key: 'address' },
//       {title: 'City', value: cd.city, key: 'city'},
//       {title: 'State', value: cd.state, key: 'state'},
//       {title: 'Zip', value: cd.zip, key: 'zip'},
//     ];

//     return (
//       <View
//         style={[
//           global.styles.screenContainer,
//           {backgroundColor: this.props.settings.theme.bgSecondary},
//         ]}
//         onStartShouldSetResponder={() => this.closeAll()}>
//         <ScrollView
//           style={{}}
//           scrollEventThrottle={16}
//           onScroll={Animated.event(
//             [
//               {
//                 //useNativeDriver:true,
//                 nativeEvent: {contentOffset: {y: this.state.scrollY}},
//               },
//             ],
//             {useNativeDriver: false},
//           )}
//           contentContainerStyle={{
//             paddingTop: global.headerHeight + 30,
//             paddingHorizontal: 20,
//             paddingBottom: 60,
//           }}>
//           <View style={[styles.mainInfoContainer]}>
//             <View
//               style={[
//                 styles.mainInfoInnerContainer,
//                 {backgroundColor: this.props.settings.theme.bgPrimary},
//               ]}>
//               <View style={{marginBottom: 20, alignItems: 'center'}}>
//                 <Text
//                   style={[
//                     styles.mainInfoTitle,
//                     {color: this.props.settings.theme.textPrimary},
//                   ]}>
//                   {cd.fullname}
//                 </Text>
//                 <Text
//                   style={[
//                     styles.mainInfoSubtitle,
//                     {color: this.props.settings.theme.textSecondary},
//                   ]}>
//                   {cd.companyname}
//                 </Text>
//               </View>
//               <Rating
//                 key={c.rating}
//                 rating={parseInt(c.rating)}
//                 fullStar={
//                   <Image
//                     source={global.icon_star}
//                     style={{
//                       width: 20,
//                       height: 20,
//                       tintColor: global.color_yellow,
//                       marginHorizontal: 3,
//                     }}
//                   />
//                 }
//                 emptyStar={
//                   <Image
//                     source={global.icon_star}
//                     style={{
//                       width: 20,
//                       height: 20,
//                       tintColor: global.color_medgray,
//                       marginHorizontal: 3,
//                     }}
//                   />
//                 }
//                 starSize={30}
//                 // onChangeMove={rating => { this.setState({ rating1: rating }); }}
//                 onChange={rating => {
//                   // Alert.alert(`${rating}`)
//                   this.props.updateRatings({cid: c.cid, rating});
//                 }}
//               />
//               <View style={styles.quickButtonsContainer}>
//                 <MiniButton
//                   icon={global.icon_phone}
//                   color={global.color_green}
//                   onPress={() => this.handleQuickButton('phone')}
//                 />
//                 <MiniButton
//                   icon={global.icon_sms}
//                   color={global.color_turquoise}
//                   onPress={() => this.handleQuickButton('text')}
//                 />
//                 <MiniButton
//                   icon={global.icon_email}
//                   color={global.color_blue}
//                   onPress={() => this.handleQuickButton('email')}
//                 />
//                 <MiniButton
//                   icon={global.icon_pencil}
//                   color={global.color_purple}
//                   onPress={() => this.handleQuickButton('edit')}
//                 />
//                 <MiniButton
//                   icon={global.icon_delete}
//                   color={global.color_red}
//                   onPress={() => this.handleQuickButton('delete')}
//                 />
//               </View>
//               <View style={{width: '100%'}}>
//                 <Collapsible
//                   collapsed={!this.state.showMoreInfo}
//                   style={styles.moreInfoContainer}>
//                   {moreInfo.map(item => {
//                     return item.value && item.value !== '' ? (
//                       <TouchableOpacity
//                         key={item.key}
//                         onPress={() => {
//                           Clipboard.setString(item.value);
//                           this.refs.toast.show('Copied to Clipboard', 1000);
//                         }}
//                         style={styles.moreInfoItem}>
//                         <Text
//                           style={[
//                             styles.moreInfoItemTitle,
//                             {color: this.props.settings.theme.textSecondary},
//                           ]}>
//                           {item.title}
//                         </Text>
//                         <Text
//                           style={[
//                             styles.moreInfoItemValue,
//                             {color: this.props.settings.theme.textPrimary},
//                           ]}>
//                           {item.key === 'phone'
//                             ? formatMobileNumber(item.value)
//                             : item.value}
//                         </Text>
//                       </TouchableOpacity>
//                     ) : null;
//                   })}
//                 </Collapsible>
//               </View>
//               <TouchableOpacity
//                 style={[
//                   styles.moreInfoBtn,
//                   {
//                     //position: 'relative',
//                     //bottom: 0,
//                     zIndex: 2,
//                   },
//                 ]}
//                 onPress={() =>
//                   this.setState({showMoreInfo: !this.state.showMoreInfo})
//                 }>
//                 <Text
//                   style={[
//                     styles.moreInfoBtnText,
//                     {color: this.props.settings.theme.bgPrimary},
//                   ]}>
//                   {this.state.showMoreInfo ? 'less' : 'more'} info
//                 </Text>
//               </TouchableOpacity>
//             </View>
//             <View style={styles.avatarContainer}>
//               <View
//                 style={[
//                   styles.avatarImgContainer,
//                   {backgroundColor: this.props.settings.theme.bgSecondary},
//                 ]}>
//                 {this.props.contactInfo.avatar ? (
//                   <Image
//                     style={global.styles.imgCover}
//                     source={{uri: this.props.contactInfo.avatar}}
//                   />
//                 ) : (
//                   <Text
//                     style={[
//                       styles.avatarInitials,
//                       {color: this.props.settings.theme.textSecondary},
//                     ]}>
//                     {cd.first_name && cd.first_name.length > 0
//                       ? cd.first_name.charAt(0)
//                       : ''}
//                     {cd.last_name && cd.last_name.length > 0
//                       ? cd.last_name.charAt(0)
//                       : ''}
//                   </Text>
//                 )}
//               </View>
//             </View>
//           </View>
//           <View style={styles.segmentTitleContainer}>
//             <Text
//               style={[
//                 styles.segmentTitle,
//                 {color: this.props.settings.theme.textPrimary},
//               ]}>
//               Groups
//             </Text>
//             <PlusButton
//               onPress={() => this.addIconPressed('groups')}
//               tintColor={this.props.settings.theme.bgPrimary}
//             />
//           </View>

//           <View
//             style={[
//               global.styles.tagsContainer,
//               {backgroundColor: this.props.settings.theme.tagsContainer},
//             ]}>
//             {!c.groups ? (
//               <GroupsItemEmpty
//                 title={'No groups'}
//                 textColor={this.props.settings.theme.textSecondary}
//               />
//             ) : (
//               c.groups.map(item => {
//                 return (
//                   <GroupsItem
//                     key={item.gid}
//                     title={item && item.name ? item.name : ''}
//                     bgColor={this.props.settings.theme.bgPrimary}
//                     textColor={this.props.settings.theme.textPrimary}
//                     onPressDelete={() =>
//                       this.props.removeGroupToContact({
//                         cid: c.cid,
//                         gid: item.gid,
//                       })
//                     }
//                   />
//                 );
//               })
//             )}
//           </View>

//           <View style={styles.segmentTitleContainer}>
//             <Text
//               style={[
//                 styles.segmentTitle,
//                 {color: this.props.settings.theme.textPrimary},
//               ]}>
//               Tags
//             </Text>
//             <PlusButton
//               onPress={() => this.addIconPressed('tags')}
//               tintColor={this.props.settings.theme.bgPrimary}
//             />
//           </View>
//           <View
//             style={[
//               global.styles.tagsContainer,
//               {backgroundColor: this.props.settings.theme.tagsContainer},
//             ]}>
//             {c.tags && c.tags.length > 0 ? (
//               c.tags.map(item => {
//                 return (
//                   <GroupsItem
//                     key={item.contact_tag_id}
//                     title={item.tag}
//                     bgColor={this.props.settings.theme.bgPrimary}
//                     textColor={this.props.settings.theme.textPrimary}
//                     onPressDelete={() =>
//                       this.props.removeTagToContact({
//                         cid: c.cid,
//                         tags: [item.contact_tag_id],
//                       })
//                     }
//                   />
//                 );
//               })
//             ) : (
//               <GroupsItemEmpty
//                 title={'No tags'}
//                 textColor={this.props.settings.theme.textSecondary}
//               />
//             )}
//           </View>

//           <View style={styles.segmentTitleContainer}>
//             <Text
//               style={[
//                 styles.segmentTitle,
//                 {color: this.props.settings.theme.textPrimary},
//               ]}>
//               Campaigns
//             </Text>
//             <PlusButton
//               onPress={() => this.addIconPressed('campaigns')}
//               tintColor={this.props.settings.theme.bgPrimary}
//             />
//           </View>
//           <View
//             style={[
//               global.styles.tagsContainer,
//               {backgroundColor: this.props.settings.theme.tagsContainer},
//             ]}>
//             {c.campaigns &&
//             c.campaigns.length > 0 &&
//             c.campaigns[0] !== false &&
//             c.campaigns[0] ? (
//               c.campaigns.map(item => {
//                 return (
//                   <GroupsItem
//                     key={item?.name}
//                     title={item?.name}
//                     bgColor={this.props.settings.theme.bgPrimary}
//                     textColor={this.props.settings.theme.textPrimary}
//                     onPressDelete={() =>
//                       this.props.removeCampaignToContact({cid: c.cid})
//                     }
//                   />
//                 );
//               })
//             ) : (
//               <GroupsItemEmpty
//                 title={'No campaigns'}
//                 textColor={this.props.settings.theme.textSecondary}
//               />
//             )}
//           </View>

//           <View
//             style={[
//               styles.segmentTitleContainer,
//               {justifyContent: 'space-between'},
//             ]}>
//             <View style={global.styles.inlineBlock}>
//               <Text
//                 style={[
//                   styles.segmentTitle,
//                   {color: this.props.settings.theme.textPrimary},
//                 ]}>
//                 Tasks
//               </Text>
//               <PlusButton
//                 onPress={() => this.addIconPressed('tasks')}
//                 tintColor={this.props.settings.theme.bgPrimary}
//               />
//             </View>
//             {/*
//               <MiniButton
//                 onPress={() => this.setState({ showCompletedTask: !this.state.showCompletedTask }) }
//                 icon={global.icon_dots} size={25}
//                 style={{ backgroundColor: 'rgba(0,0,0,0.0)', alignSelf: 'flex-end'}}
//                 iconStyle={{ tintColor: this.props.settings.theme.textPrimary }}
//                 bgColor={this.props.settings.theme.bgPrimary}
//               />
//               */}
//             <TouchableOpacity
//               style={{
//                 padding: 5,
//                 borderRadius: 5,
//                 backgroundColor: global.color_theme,
//               }}
//               onPress={() => this.setState({viewMore: !this.state.viewMore})}>
//               <Image
//                 style={{
//                   width: 14,
//                   height: 14,
//                   resizeMode: 'contain',
//                   tintColor: global.color_white,
//                 }}
//                 source={
//                   this.state.viewMore
//                     ? global.icon_dropdown
//                     : global.icon_rightarrow
//                 }
//               />
//             </TouchableOpacity>
//           </View>

//           <View style={{flex: 1}}>
//             {c.tasks && c.tasks.length > 0 ? (
//               c.tasks.length > 3 && !this.state.viewMore ? (
//                 <View style={{marginHorizontal: -30}}>
//                   {c.tasks.map((item, index) => {
//                     if (index <= 2) {
//                       return (
//                         <Collapsible
//                           collapsed={!this.state.showCompletedTask && active}
//                           style={{width: '100%'}}>
//                           <Swipeable
//                             ref={c => {
//                               this.selectedRow = c;
//                             }}
//                             rightButtons={[
//                               <TouchableOpacity
//                                 style={[
//                                   styles.rightSwipeItem,
//                                   {backgroundColor: global.color_purple},
//                                 ]}
//                                 onPress={() => {
//                                   this.props.navigation.navigate('NewTask', {
//                                     title: 'Edit Task',
//                                     contact: c,
//                                     task: item,
//                                     route: 'ContactDetails',
//                                     onNavigateBack: this.refresh.bind(this),
//                                   });
//                                   this.closeAll();
//                                 }}>
//                                 <MiniButton
//                                   icon={global.icon_pencil}
//                                   color={global.color_purple}
//                                   style={{marginLeft: 1, marginBottom: -5}}
//                                   onPress={() => {
//                                     this.props.navigation.navigate('NewTask', {
//                                       title: 'Edit Task',
//                                       contact: c,
//                                       task: item,
//                                       route: 'ContactDetails',
//                                       onNavigateBack: this.refresh.bind(this),
//                                     });
//                                     this.closeAll();
//                                   }}
//                                 />
//                                 <Text
//                                   style={{
//                                     color: global.color_white,
//                                     marginLeft: 5,
//                                     marginBottom: 5,
//                                   }}>
//                                   Edit
//                                 </Text>
//                               </TouchableOpacity>,
//                               <TouchableOpacity
//                                 style={[
//                                   styles.rightSwipeItem,
//                                   {backgroundColor: global.color_red},
//                                 ]}
//                                 onPress={() => {
//                                   this.setState({
//                                     alertVisible: true,
//                                     alertTitle: 'Delete Task',
//                                     alertMessage:
//                                       'Are you sure you want to delete this task?',
//                                     alertButtons: [
//                                       {
//                                         text: 'Cancel',
//                                         onPress: () =>
//                                           this.setState({alertVisible: false}),
//                                         type: 'cancel',
//                                       },
//                                       {
//                                         text: 'Delete',
//                                         onPress: () => {
//                                           this.setState({alertVisible: false});
//                                           this.props.deleteTask({
//                                             did: item.did,
//                                           });
//                                         },
//                                       },
//                                     ],
//                                     alertIcon: null,
//                                   });
//                                   this.closeAll();
//                                 }}>
//                                 <MiniButton
//                                   icon={global.icon_delete}
//                                   color={global.color_red}
//                                   style={{marginLeft: -5, marginBottom: -4}}
//                                   onPress={() => {
//                                     this.setState({
//                                       alertVisible: true,
//                                       alertTitle: 'Delete Task',
//                                       alertMessage:
//                                         'Are you sure you want to delete this task?',
//                                       alertButtons: [
//                                         {
//                                           text: 'Cancel',
//                                           onPress: () =>
//                                             this.setState({
//                                               alertVisible: false,
//                                             }),
//                                           type: 'cancel',
//                                         },
//                                         {
//                                           text: 'Delete',
//                                           onPress: () => {
//                                             this.setState({
//                                               alertVisible: false,
//                                             });
//                                             this.props.deleteTask({
//                                               did: item.did,
//                                             });
//                                           },
//                                         },
//                                       ],
//                                       alertIcon: null,
//                                     });
//                                     this.closeAll();
//                                   }}
//                                 />
//                                 <Text style={styles.iconStyle}>Delete</Text>
//                               </TouchableOpacity>,
//                             ]}
//                             onRightButtonsOpenRelease={this.onOpen}
//                             onRightButtonsCloseRelease={this.onClose}>
//                             <TaskItem
//                               title={item.title}
//                               subtitle={item.date + ' ' + item.type}
//                               active={item.status === '1'}
//                               bgColor={this.props.settings.theme.bgPrimary}
//                               textColor={this.props.settings.theme.textPrimary}
//                               onPress={() =>
//                                 this.props.navigation.navigate('NewTask', {
//                                   title: 'Edit Task',
//                                   contact: c,
//                                   task: item,
//                                   route: 'ContactDetails',
//                                   onNavigateBack: this.refresh.bind(this),
//                                 })
//                               }
//                               onPressCheckbox={() => {
//                                 let task = this.props.route.params.task;
//                                 let params = {
//                                   did: item.did,
//                                   title: item.title,
//                                   status: item.status === '1' ? '0' : '1',
//                                 };

//                                 this.props.editTask(params);
//                               }}
//                             />
//                           </Swipeable>
//                           {/* <SwipeRow
//       style={{}}
//       ref={(c) => { this.component[index] = c }}
//       leftOpenValue={75}
//       rightOpenValue={-75}
//       onRowOpen={() => {
//         if (this.selectedRow && this.selectedRow !== this.component[index]) { this.selectedRow._root.closeRow(); }
//         this.selectedRow = this.component[index]
//       }}
//       body={
//         <TaskItem
//           title={item.title}
//           subtitle={item.date}
//           active={item.status==='1'}
//           bgColor={this.props.settings.theme.bgPrimary}
//           textColor={this.props.settings.theme.textPrimary}
//           onPress={() => this.props.navigation.navigate('NewTask', {
//             title: 'Edit Task',
//             contact: c,
//             task: item,
//             route: 'ContactDetails',
//             onNavigateBack: this.refresh.bind(this)
//           })}
//           onPressCheckbox={() => {
//             let task = this.props.route.params.task;
//             let params = {
//               did: item.did,
//               title: item.title,
//               status: item.status==='1' ? '0' : '1'
//             };

//             this.props.editTask(params);
//           }}
//         />
//       } */}
//                         </Collapsible>
//                       );
//                     }
//                     //  else if (index == 3){
//                     //   return (<TouchableOpacity style={{ width:'100%', alignItems:'center', borderRadius:10 , marginTop:10 ,  }} onPress={() => this.setState({viewMore: true})}>
//                     //     <Text style={{padding:15 , color:'white', fontSize:15, fontWeight:'bold', backgroundColor: global.color_theme,paddingHorizontal:40, borderRadius: 24, overflow:'hidden'}}>View More</Text>
//                     //   </TouchableOpacity>)
//                     // } else {
//                     //   return <View/>
//                     // }
//                   })}
//                 </View>
//               ) : (
//                 <FlatList
//                   style={{marginHorizontal: -30}}
//                   contentContainerStyle={[{}]}
//                   data={this.taskRender()}
//                   extraData={c.tasks}
//                   showsVerticalScrollIndicator={false}
//                   keyExtractor={(item, index) => `list-item-${index}`}
//                   renderItem={({item, index}) => {
//                     return (
//                       <Collapsible
//                         collapsed={!this.state.showCompletedTask && active}
//                         style={{width: '100%'}}>
//                         <Swipeable
//                           ref={c => {
//                             this.selectedRow = c;
//                           }}
//                           rightButtons={[
//                             <TouchableOpacity
//                               style={[
//                                 styles.rightSwipeItem,
//                                 {backgroundColor: global.color_purple},
//                               ]}
//                               onPress={() => {
//                                 this.props.navigation.navigate('NewTask', {
//                                   title: 'Edit Task',
//                                   contact: c,
//                                   task: item,
//                                   route: 'ContactDetails',
//                                   onNavigateBack: this.refresh.bind(this),
//                                 });
//                                 this.closeAll();
//                               }}>
//                               <MiniButton
//                                 icon={global.icon_pencil}
//                                 color={global.color_purple}
//                                 style={{marginLeft: 1, marginBottom: -5}}
//                                 onPress={() => {
//                                   this.props.navigation.navigate('NewTask', {
//                                     title: 'Edit Task',
//                                     contact: c,
//                                     task: item,
//                                     route: 'ContactDetails',
//                                     onNavigateBack: this.refresh.bind(this),
//                                   });
//                                   this.closeAll();
//                                 }}
//                               />
//                               <Text
//                                 style={{
//                                   color: global.color_white,
//                                   marginLeft: 5,
//                                   marginBottom: 5,
//                                 }}>
//                                 Edit
//                               </Text>
//                             </TouchableOpacity>,
//                             <TouchableOpacity
//                               style={[
//                                 styles.rightSwipeItem,
//                                 {backgroundColor: global.color_red},
//                               ]}
//                               onPress={() => {
//                                 this.setState({
//                                   alertVisible: true,
//                                   alertTitle: 'Delete Task',
//                                   alertMessage:
//                                     'Are you sure you want to delete this task?',
//                                   alertButtons: [
//                                     {
//                                       text: 'Cancel',
//                                       onPress: () =>
//                                         this.setState({alertVisible: false}),
//                                       type: 'cancel',
//                                     },
//                                     {
//                                       text: 'Delete',
//                                       onPress: () => {
//                                         this.setState({alertVisible: false});
//                                         this.props.deleteTask({did: item.did});
//                                       },
//                                     },
//                                   ],
//                                   alertIcon: null,
//                                 });
//                                 this.closeAll();
//                               }}>
//                               <MiniButton
//                                 icon={global.icon_delete}
//                                 color={global.color_red}
//                                 style={{marginLeft: -5, marginBottom: -4}}
//                                 onPress={() => {
//                                   this.setState({
//                                     alertVisible: true,
//                                     alertTitle: 'Delete Task',
//                                     alertMessage:
//                                       'Are you sure you want to delete this task?',
//                                     alertButtons: [
//                                       {
//                                         text: 'Cancel',
//                                         onPress: () =>
//                                           this.setState({alertVisible: false}),
//                                         type: 'cancel',
//                                       },
//                                       {
//                                         text: 'Delete',
//                                         onPress: () => {
//                                           this.setState({alertVisible: false});
//                                           this.props.deleteTask({
//                                             did: item.did,
//                                           });
//                                         },
//                                       },
//                                     ],
//                                     alertIcon: null,
//                                   });
//                                   this.closeAll();
//                                 }}
//                               />
//                               <Text style={styles.iconStyle}>Delete</Text>
//                             </TouchableOpacity>,
//                           ]}
//                           onRightButtonsOpenRelease={this.onOpen}
//                           onRightButtonsCloseRelease={this.onClose}>
//                           <TaskItem
//                             title={item.title}
//                             subtitle={item.date + ' ' + item.type}
//                             active={item.status === '1'}
//                             bgColor={this.props.settings.theme.bgPrimary}
//                             textColor={this.props.settings.theme.textPrimary}
//                             onPress={() =>
//                               this.props.navigation.navigate('NewTask', {
//                                 title: 'Edit Task',
//                                 contact: c,
//                                 task: item,
//                                 route: 'ContactDetails',
//                                 onNavigateBack: this.refresh.bind(this),
//                               })
//                             }
//                             onPressCheckbox={() => {
//                               let task = this.props.route.params.task;
//                               let params = {
//                                 did: item.did,
//                                 title: item.title,
//                                 status: item.status === '1' ? '0' : '1',
//                               };

//                               this.props.editTask(params);
//                             }}
//                           />
//                         </Swipeable>
//                         {/* <SwipeRow
//                         style={{}}
//                         ref={(c) => { this.component[index] = c }}
//                         leftOpenValue={75}
//                         rightOpenValue={-75}
//                         onRowOpen={() => {
//                           if (this.selectedRow && this.selectedRow !== this.component[index]) { this.selectedRow._root.closeRow(); }
//                           this.selectedRow = this.component[index]
//                         }}
//                         body={
//                           <TaskItem
//                             title={item.title}
//                             subtitle={item.date}
//                             active={item.status==='1'}
//                             bgColor={this.props.settings.theme.bgPrimary}
//                             textColor={this.props.settings.theme.textPrimary}
//                             onPress={() => this.props.navigation.navigate('NewTask', {
//                               title: 'Edit Task',
//                               contact: c,
//                               task: item,
//                               route: 'ContactDetails',
//                               onNavigateBack: this.refresh.bind(this)
//                             })}
//                             onPressCheckbox={() => {
//                               let task = this.props.route.params.task;
//                               let params = {
//                                 did: item.did,
//                                 title: item.title,
//                                 status: item.status==='1' ? '0' : '1'
//                               };

//                               this.props.editTask(params);
//                             }}
//                           />
//                         } */}
//                       </Collapsible>
//                     );
//                   }}
//                 />
//               )
//             ) : (
//               <GroupsItemEmpty
//                 title={'No tasks'}
//                 textColor={this.props.settings.theme.textSecondary}
//               />
//             )}
//           </View>

//           <View
//             style={[
//               styles.segmentTitleContainer,
//               {justifyContent: 'space-between'},
//             ]}>
//             <View style={global.styles.inlineBlock}>
//               <Text
//                 style={[
//                   styles.segmentTitle,
//                   {color: this.props.settings.theme.textPrimary},
//                 ]}>
//                 Notes
//               </Text>
//               <PlusButton
//                 onPress={() => this.addIconPressed('notes')}
//                 tintColor={this.props.settings.theme.bgPrimary}
//               />
//             </View>
//             {/*
//               <MiniButton
//               icon={global.icon_dots}
//               size={25}
//               style={{ backgroundColor: 'rgba(0,0,0,0.0)', alignSelf: 'flex-end'}} iconStyle={{ tintColor: this.props.settings.theme.textPrimary }} />
//               */}
//             <TouchableOpacity
//               style={{
//                 padding: 5,
//                 borderRadius: 5,
//                 backgroundColor: global.color_theme,
//               }}
//               onPress={() =>
//                 this.setState({notesViewMore: !this.state.notesViewMore})
//               }>
//               <Image
//                 style={{
//                   width: 14,
//                   height: 14,
//                   resizeMode: 'contain',
//                   tintColor: global.color_white,
//                 }}
//                 source={
//                   this.state.notesViewMore
//                     ? global.icon_dropdown
//                     : global.icon_rightarrow
//                 }
//               />
//             </TouchableOpacity>
//           </View>
//           <View style={{flex: 1}}>
//             {c.notes && c.notes.length > 0 ? (
//               c.notes.length > 3 && !this.state.notesViewMore ? (
//                 <View style={{marginHorizontal: -30}}>
//                   {c.notes.map((item, index) => {
//                     if (index <= 2) {
//                       return (
//                         <Swipeable
//                           ref={c => {
//                             this.selectedRow = c;
//                           }}
//                           rightButtons={[
//                             <TouchableOpacity
//                               style={[
//                                 styles.rightSwipeItem,
//                                 {backgroundColor: global.color_purple},
//                               ]}
//                               onPress={() => {
//                                 this.props.navigation.navigate('NewNote', {
//                                   cid: c.cid,
//                                   note: item,
//                                   onNavigateBack: this.refresh.bind(this),
//                                 });
//                                 this.closeAll();
//                               }}>
//                               <MiniButton
//                                 icon={global.icon_pencil}
//                                 color={global.color_purple}
//                                 style={{marginLeft: 1, marginBottom: -5}}
//                                 onPress={() => {
//                                   this.props.navigation.navigate('NewNote', {
//                                     cid: c.cid,
//                                     note: item,
//                                     onNavigateBack: this.refresh.bind(this),
//                                   });
//                                   this.closeAll();
//                                 }}
//                               />
//                               <Text
//                                 style={{
//                                   color: global.color_white,
//                                   marginLeft: 5,
//                                   marginBottom: 5,
//                                 }}>
//                                 Edit
//                               </Text>
//                             </TouchableOpacity>,
//                             <TouchableOpacity
//                               style={[
//                                 styles.rightSwipeItem,
//                                 {backgroundColor: global.color_red},
//                               ]}
//                               onPress={() => {
//                                 this.setState({
//                                   alertVisible: true,
//                                   alertTitle: 'Delete Note',
//                                   alertMessage:
//                                     'Are you sure you want to delete this note?',
//                                   alertButtons: [
//                                     {
//                                       text: 'Cancel',
//                                       onPress: () =>
//                                         this.setState({alertVisible: false}),
//                                       type: 'cancel',
//                                     },
//                                     {
//                                       text: 'Delete',
//                                       onPress: () => {
//                                         this.setState({alertVisible: false});
//                                         this.props.deleteNote({
//                                           cid: c.cid,
//                                           nid: item.nid,
//                                         });
//                                         this.refresh();
//                                       },
//                                     },
//                                   ],
//                                   alertIcon: null,
//                                 });
//                                 this.closeAll();
//                               }}>
//                               <MiniButton
//                                 icon={global.icon_delete}
//                                 color={global.color_red}
//                                 style={{marginLeft: -4, marginBottom: -4}}
//                                 onPress={() => {
//                                   this.setState({
//                                     alertVisible: true,
//                                     alertTitle: 'Delete Note',
//                                     alertMessage:
//                                       'Are you sure you want to delete this note?',
//                                     alertButtons: [
//                                       {
//                                         text: 'Cancel',
//                                         onPress: () =>
//                                           this.setState({alertVisible: false}),
//                                         type: 'cancel',
//                                       },
//                                       {
//                                         text: 'Delete',
//                                         onPress: () => {
//                                           this.setState({alertVisible: false});
//                                           this.props.deleteNote({
//                                             cid: c.cid,
//                                             nid: item.nid,
//                                           });
//                                           this.refresh();
//                                         },
//                                       },
//                                     ],
//                                     alertIcon: null,
//                                   });
//                                   this.closeAll();
//                                 }}
//                               />
//                               <Text style={styles.iconStyle}>Delete</Text>
//                             </TouchableOpacity>,
//                           ]}
//                           onRightButtonsOpenRelease={this.onOpen}
//                           onRightButtonsCloseRelease={this.onClose}>
//                           <NoteItem
//                             title={item.content}
//                             subtitle={item.date}
//                             textColor={this.props.settings.theme.textPrimary}
//                             bgColor={this.props.settings.theme.bgPrimary}
//                             onPress={() =>
//                               this.props.navigation.navigate('NewNote', {
//                                 cid: c.cid,
//                                 note: item,
//                                 onNavigateBack: this.refresh.bind(this),
//                               })
//                             }
//                           />
//                         </Swipeable>
//                       );
//                     }
//                   })}
//                 </View>
//               ) : (
//                 <FlatList
//                   style={{marginHorizontal: -30}}
//                   contentContainerStyle={[{}]}
//                   data={this.notesRender()}
//                   showsVerticalScrollIndicator={false}
//                   keyExtractor={(item, index) => `list-item-${index}`}
//                   renderItem={({item, index}) => {
//                     const active = index % 2 === 0;
//                     return (
//                       <Swipeable
//                         ref={c => {
//                           this.selectedRow = c;
//                         }}
//                         rightButtons={[
//                           <TouchableOpacity
//                             style={[
//                               styles.rightSwipeItem,
//                               {backgroundColor: global.color_purple},
//                             ]}
//                             onPress={() => {
//                               this.props.navigation.navigate('NewNote', {
//                                 cid: c.cid,
//                                 note: item,
//                                 onNavigateBack: this.refresh.bind(this),
//                               });
//                               this.closeAll();
//                             }}>
//                             <MiniButton
//                               icon={global.icon_pencil}
//                               color={global.color_purple}
//                               style={{marginLeft: 1, marginBottom: -5}}
//                               onPress={() => {
//                                 this.props.navigation.navigate('NewNote', {
//                                   cid: c.cid,
//                                   note: item,
//                                   onNavigateBack: this.refresh.bind(this),
//                                 });
//                                 this.closeAll();
//                               }}
//                             />
//                             <Text
//                               style={{
//                                 color: global.color_white,
//                                 marginLeft: 5,
//                                 marginBottom: 5,
//                               }}>
//                               Edit
//                             </Text>
//                           </TouchableOpacity>,
//                           <TouchableOpacity
//                             style={[
//                               styles.rightSwipeItem,
//                               {backgroundColor: global.color_red},
//                             ]}
//                             onPress={() => {
//                               this.setState({
//                                 alertVisible: true,
//                                 alertTitle: 'Delete Note',
//                                 alertMessage:
//                                   'Are you sure you want to delete this note?',
//                                 alertButtons: [
//                                   {
//                                     text: 'Cancel',
//                                     onPress: () =>
//                                       this.setState({alertVisible: false}),
//                                     type: 'cancel',
//                                   },
//                                   {
//                                     text: 'Delete',
//                                     onPress: () => {
//                                       this.setState({alertVisible: false});
//                                       this.props.deleteNote({
//                                         cid: c.cid,
//                                         nid: item.nid,
//                                       });
//                                       this.refresh();
//                                     },
//                                   },
//                                 ],
//                                 alertIcon: null,
//                               });
//                               this.closeAll();
//                             }}>
//                             <MiniButton
//                               icon={global.icon_delete}
//                               color={global.color_red}
//                               style={{marginLeft: -4, marginBottom: -4}}
//                               onPress={() => {
//                                 this.setState({
//                                   alertVisible: true,
//                                   alertTitle: 'Delete Note',
//                                   alertMessage:
//                                     'Are you sure you want to delete this note?',
//                                   alertButtons: [
//                                     {
//                                       text: 'Cancel',
//                                       onPress: () =>
//                                         this.setState({alertVisible: false}),
//                                       type: 'cancel',
//                                     },
//                                     {
//                                       text: 'Delete',
//                                       onPress: () => {
//                                         this.setState({alertVisible: false});
//                                         this.props.deleteNote({
//                                           cid: c.cid,
//                                           nid: item.nid,
//                                         });
//                                         this.refresh();
//                                       },
//                                     },
//                                   ],
//                                   alertIcon: null,
//                                 });
//                                 this.closeAll();
//                               }}
//                             />
//                             <Text style={styles.iconStyle}>Delete</Text>
//                           </TouchableOpacity>,
//                         ]}
//                         onRightButtonsOpenRelease={this.onOpen}
//                         onRightButtonsCloseRelease={this.onClose}>
//                         <NoteItem
//                           title={item.content}
//                           subtitle={item.date}
//                           textColor={this.props.settings.theme.textPrimary}
//                           bgColor={this.props.settings.theme.bgPrimary}
//                           onPress={() =>
//                             this.props.navigation.navigate('NewNote', {
//                               cid: c.cid,
//                               note: item,
//                               onNavigateBack: this.refresh.bind(this),
//                             })
//                           }
//                         />
//                       </Swipeable>
//                     );
//                   }}
//                 />
//               )
//             ) : (
//               <GroupsItemEmpty
//                 title={'No notes'}
//                 textColor={this.props.settings.theme.textSecondary}
//               />
//             )}
//           </View>

//           <View
//             style={[
//               styles.segmentTitleContainer,
//               {justifyContent: 'space-between'},
//             ]}>
//             <View style={global.styles.inlineBlock}>
//               <Text
//                 style={[
//                   styles.segmentTitle,
//                   {color: this.props.settings.theme.textPrimary},
//                 ]}>
//                 Email History
//               </Text>
//             </View>
//             <TouchableOpacity
//               style={{
//                 padding: 5,
//                 borderRadius: 5,
//                 backgroundColor: global.color_theme,
//               }}
//               onPress={() =>
//                 this.setState({emailViewMore: !this.state.emailViewMore})
//               }>
//               <Image
//                 style={{
//                   width: 14,
//                   height: 14,
//                   resizeMode: 'contain',
//                   tintColor: global.color_white,
//                 }}
//                 source={
//                   this.state.emailViewMore
//                     ? global.icon_dropdown
//                     : global.icon_rightarrow
//                 }
//               />
//             </TouchableOpacity>
//           </View>
//           {c.history && c.history.emails && c.history.emails.length > 0 ? (
//             c.history.emails.length > 3 && !this.state.emailViewMore ? (
//               <View style={{marginHorizontal: -30}}>
//                 {c.history.emails.map((item, index) => {
//                   if (index <= 2) {
//                     const active = index % 2 === 0;
//                     var swipeoutBtns = [
//                       {
//                         text: 'Delete',
//                         backgroundColor: global.color_red,
//                       },
//                     ];
//                     return (
//                       <EmailItem
//                         active={active}
//                         sender={item.from}
//                         title={
//                           item.subject_preview
//                             ? mimeWordsDecode(item.subject_preview)
//                             : ''
//                         }
//                         subtitle={
//                           item.body_preview
//                             ? cleanEmailBodyPreview(item.body_preview)
//                             : ''
//                         }
//                         // timestamp={timestampToMonthDayTime(item.date*1000)}
//                         timestamp={this.setDateTimeFormatForEmail(
//                           item.date * 1000,
//                         )}
//                         box
//                         separatorColor={this.props.settings.theme.separator}
//                         textColor={this.props.settings.theme.textPrimary}
//                         checkColor={this.props.settings.theme.bgSecondary}
//                         bgColor={this.props.settings.theme.bgPrimary}
//                         onPress={() =>
//                           this.props.navigation.navigate('EmailDetails', {
//                             emailContent: {...item, html_body: item.body},
//                             box: 'Back',
//                             emails: c.history.emails,
//                             index: index,
//                           })
//                         }
//                         unread={item.read === 0}
//                       />
//                     );
//                   }
//                 })}
//               </View>
//             ) : (
//               <FlatList
//                 style={{marginHorizontal: -30}}
//                 contentContainerStyle={[{}]}
//                 data={c.history.emails}
//                 showsVerticalScrollIndicator={false}
//                 keyExtractor={(item, index) => `list-item-${index}`}
//                 renderItem={({item, index}) => {
//                   const active = index % 2 === 0;
//                   var swipeoutBtns = [
//                     {
//                       text: 'Delete',
//                       backgroundColor: global.color_red,
//                     },
//                   ];
//                   return (
//                     // <Swipeout right={swipeoutBtns} style={{ backgroundColor: 'transparent' }} autoClose >
//                     //   <EmailItem
//                     //   active={active}
//                     //   sender={item.from}
//                     //   title={item.subject_preview ? mimeWordsDecode(item.subject_preview) : ''}
//                     //   subtitle={item.body_preview ? cleanEmailBodyPreview(item.body_preview) : ''}
//                     //   // timestamp={timestampToMonthDayTime(item.date*1000)}
//                     //   timestamp={this.setDateTimeFormatForEmail(item.date*1000)}
//                     //   box
//                     //   separatorColor={this.props.settings.theme.separator}
//                     //   textColor={this.props.settings.theme.textPrimary}
//                     //   checkColor={this.props.settings.theme.bgSecondary}
//                     //   bgColor={this.props.settings.theme.bgPrimary}
//                     //   onPress={() => this.props.navigation.navigate('EmailDetails', {
//                     //     emailContent: {...item, html_body: item.body},
//                     //     box: 'Back',
//                     //     emails: c.history.emails,
//                     //     index: index,
//                     //   })}
//                     //   unread={item.read===0} />
//                     // </Swipeout>
//                     <EmailItem
//                       active={active}
//                       sender={item.from}
//                       title={
//                         item.subject_preview
//                           ? mimeWordsDecode(item.subject_preview)
//                           : ''
//                       }
//                       subtitle={
//                         item.body_preview
//                           ? cleanEmailBodyPreview(item.body_preview)
//                           : ''
//                       }
//                       // timestamp={timestampToMonthDayTime(item.date*1000)}
//                       timestamp={this.setDateTimeFormatForEmail(
//                         item.date * 1000,
//                       )}
//                       box
//                       separatorColor={this.props.settings.theme.separator}
//                       textColor={this.props.settings.theme.textPrimary}
//                       checkColor={this.props.settings.theme.bgSecondary}
//                       bgColor={this.props.settings.theme.bgPrimary}
//                       onPress={() =>
//                         this.props.navigation.navigate('EmailDetails', {
//                           emailContent: {...item, html_body: item.body},
//                           box: 'Back',
//                           emails: c.history.emails,
//                           index: index,
//                         })
//                       }
//                       unread={item.read === 0}
//                     />
//                   );
//                 }}
//               />
//             )
//           ) : (
//             <GroupsItemEmpty
//               title={'No email history'}
//               textColor={this.props.settings.theme.textSecondary}
//             />
//           )}
//         </ScrollView>
//         <Animated.View
//           style={{
//             backgroundColor: this.props.settings.theme.bgSecondary,
//             position: 'absolute',
//             height: global.headerHeight,
//             top: 0,
//             left: 0,
//             right: 0,
//             opacity: headerOpacity,
//           }}>
//           <Text
//             numberOfLines={1}
//             style={{
//               position: 'absolute',
//               bottom: 10,
//               alignSelf: 'center',
//               fontFamily: 'Montserrat-Regular',
//               fontWeight: '700',
//               fontSize: 18,
//               color: this.props.settings.theme.textPrimary,
//               marginHorizontal: 50,
//             }}>
//             {cd.fullname}
//           </Text>
//         </Animated.View>

//         <ModalAlert
//           onBackdropPress={() => this.setState({alertVisible: false})}
//           isVisible={this.state.alertVisible}
//           title={this.state.alertTitle}
//           message={this.state.alertMessage}
//           alertIcon={this.state.alertIcon}
//           buttons={this.state.alertButtons}
//           dark={this.props.settings.theme.mode === 'dark'}
//           bgColor={this.props.settings.theme.bgPrimary}
//           textColor={this.props.settings.theme.textPrimary}
//         />

//         <ModalChecklist
//           isVisible={
//             this.state.alertListVisible && this.state.alertListType !== ''
//           }
//           title={this.state.alertListTitle}
//           onBackdropPress={() => this.setState({alertListVisible: false})}
//           list={this.renderAlertList()}
//           onPressSave={this.state.alertListSave}
//           bgColor={this.props.settings.theme.bgTertiary}
//           textColor={this.props.settings.theme.textPrimary}
//         />
//         <Toast
//           ref={'toast'}
//           style={[
//             global.styles.toastStyle,
//             {backgroundColor: this.props.settings.theme.bgPrimary},
//           ]}
//           textStyle={[
//             global.styles.toastTextStyle,
//             {color: this.props.settings.theme.textPrimary},
//           ]}
//         />
//         {this.props.contactsStatus === CONTACT_DELETECONTACT_LOADING ||
//         this.props.contactsStatus === CONTACT_GETCONTACTINFO_LOADING ? (
//           <IndicatorBottom dark={this.props.settings.theme.mode === 'dark'} />
//         ) : null}

//         <ModalBottom
//           onBackdropPress={() => this.setState({showMenu: false})}
//           isVisible={this.state.showMenu}
//           dark={this.props.settings.theme.mode === 'dark'}
//           list={this.renderMenuOptions()}
//           title={cd.fullname}
//           buttons={[
//             {
//               text: 'Cancel',
//               type: 'cancel',
//               onPress: () => this.setState({showMenu: false}),
//             },
//           ]}
//           bgColor={
//             this.props.settings.theme.mode === 'light'
//               ? this.props.settings.theme.bgPrimary
//               : this.props.settings.theme.bgTertiary
//           }
//           textColor={this.props.settings.theme.textPrimary}
//           //hideArrow
//         />
//       </View>
//     );
//   }
// }

// const PlusButton = ({tintColor, onPress, size = 20, iconStyle, style}) => {
//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       style={{paddingVertical: 5, paddingLeft: 5, paddingRight: 10}}>
//       <View
//         style={[
//           {
//             width: size,
//             height: size,
//             borderRadius: size / 2,
//             marginHorizontal: 6,
//             padding: size / 4,
//             backgroundColor: global.color_theme,
//           },
//           style,
//         ]}>
//         <Image
//           source={global.icon_plus}
//           style={[
//             {
//               width: '100%',
//               height: '100%',
//               tintColor: tintColor,
//             },
//             iconStyle,
//           ]}
//         />
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   mainInfoInnerContainer: {
//     backgroundColor: global.color_white,
//     alignItems: 'center',
//     borderRadius: 30,
//     shadowColor: '#432587',
//     shadowOffset: {width: 0, height: 5},
//     shadowOpacity: 0.15,
//     shadowRadius: 10,
//     elevation: 10,
//     paddingHorizontal: 30,
//     paddingTop: 80,
//     paddingBottom: 40,
//   },
//   avatarContainer: {
//     position: 'absolute',
//     alignSelf: 'center',
//     marginTop: -60,
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     shadowColor: '#432587',
//     shadowOffset: {width: 0, height: 3},
//     shadowOpacity: 0.3,
//     shadowRadius: 10,
//     elevation: 10,
//   },
//   avatarImgContainer: {
//     borderRadius: 60,
//     width: '100%',
//     height: '100%',
//     overflow: 'hidden',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   avatarInitials: {
//     fontFamily: 'Montserrat-Regular',
//     fontWeight: '700',
//     fontSize: 30,
//     color: global.color_gray,
//     textAlign: 'center',
//   },
//   mainInfoTitle: {
//     fontFamily: 'Montserrat-Regular',
//     fontWeight: '700',
//     fontSize: 22,
//     marginBottom: 2,
//     color: global.color_darkgray,
//   },
//   mainInfoSubtitle: {
//     fontFamily: 'Montserrat-Regular',
//     fontWeight: '400',
//     fontSize: 12,
//     color: global.color_gray,
//   },
//   quickButtonsContainer: {
//     marginTop: 20,
//     flexDirection: 'row',
//   },
//   starsContainer: {
//     marginTop: 10,
//     flexDirection: 'row',
//   },
//   segmentTitleContainer: {
//     marginTop: 30,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   segmentTitle: {
//     fontFamily: 'Montserrat-Regular',
//     fontWeight: '700',
//     fontSize: 18,
//     color: global.color_darkgray,
//     marginRight: 0,
//   },
//   moreInfoBtn: {
//     width: 100,
//     height: 30,
//     borderRadius: 15,
//     backgroundColor: global.color_theme,
//     alignItems: 'center',
//     justifyContent: 'center',
//     alignSelf: 'center',
//     position: 'absolute',
//     bottom: -15,
//   },
//   moreInfoBtnText: {
//     color: global.color_white,
//     fontSize: 12,
//     fontWeight: '700',
//   },
//   moreInfoContainer: {
//     width: '100%',
//     marginBottom: -20,
//   },
//   moreInfoItem: {
//     width: '100%',
//     paddingVertical: 15,
//   },
//   moreInfoItemTitle: {
//     color: global.color_medgray,
//     fontFamily: 'Montserrat-Regular',
//     fontSize: 11,
//   },
//   moreInfoItemValue: {
//     color: global.color_darkgray,
//     fontSize: 14,
//     fontWeight: '500',
//     fontFamily: 'Montserrat-Regular',
//   },
//   rightSwipeItem: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingLeft: 20,
//   },
//   iconStyle: {
//     color: global.color_white,
//     marginLeft: -9,
//     marginBottom: 6,
//   },
// });

// const mapStateToProps = ({
//   settings,
//   contacts,
//   groups,
//   campaigns,
//   tags,
//   tasks,
// }) => {
//   const {contactInfo, contactsStatus, contactsError} = contacts;
//   const {groupsStatus, groupsError, groupsList} = groups;
//   const {campaignsStatus, campaignsError, campaignsList} = campaigns;
//   const {tagsStatus, tagsError, tagsList} = tags;
//   const {tasksStatus} = tasks;
//   return {
//     settings,
//     contactInfo,
//     contactsStatus,
//     contactsError,
//     groupsStatus,
//     groupsError,
//     groupsList,
//     campaignsStatus,
//     campaignsError,
//     campaignsList,
//     tagsStatus,
//     tagsError,
//     tagsList,
//     tasksStatus,
//   };
// };

// export default connect(mapStateToProps, {
//   getContactList,
//   getContactsWithRatings,
//   getContactInfo,
//   deleteContact,
//   updateRatings,

//   getGroups,
//   addGroupsToContact,
//   removeGroupToContact,

//   getCampaigns,
//   addCampaignsToContact,
//   removeCampaignToContact,

//   getTags,
//   addTagsToContact,
//   removeTagToContact,

//   deleteNote,

//   editTask,
//   deleteTask,
//   getMailboxes,
// })(ContactDetails);






import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Animated,
  Clipboard,
  Alert,
  Easing,
  Linking,
  SafeAreaView,
  BackHandler,
  SwipeableFlatList,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';
import Swipeable from 'react-native-swipeable';
import Rating from 'react-native-rating-simple';
import Toast, { DURATION } from 'react-native-easy-toast';
import { mimeWordsDecode } from 'emailjs-mime-codec';

import {
  timestampToMonthDayTime,
  timespan,
  cleanEmailBodyPreview,
  formatMobileNumber,
  FormatTime,
} from '../utils/Helper';
import {
  HeaderButton,
  MiniButton,
  StarButton,
  TaskItem,
  NoteItem,
  EmailItem,
  FormButton,
  ModalAlert,
  ModalChecklist,
  ModalBottom,
  GroupsItem,
  GroupsItemEmpty,
  IndicatorBottom,
  CalendarTaskItem,
} from '../common';
import {
  getContactList,
  getContactsWithRatings,
  getContactInfo,
  deleteContact,
  updateRatings,
  getGroups,
  addGroupsToContact,
  removeGroupToContact,
  getCampaigns,
  addCampaignsToContact,
  removeCampaignToContact,
  getTags,
  addTagsToContact,
  removeTagToContact,
  deleteNote,
  editTask,
  deleteTask,
  getMailboxes,
} from '../actions';
import {
  CONTACT_GETCONTACTINFO_LOADING,
  CONTACT_DELETECONTACT_LOADING,
  CONTACT_DELETECONTACT_SUCCESS,
  CONTACT_DELETECONTACT_FAIL,
  LISTTYPE_GROUPS,
  LISTTYPE_CAMPAIGNS,
  LISTTYPE_TAGS,
  GROUP_ADDGROUPTOCONTACT_SUCCESS,
  GROUP_REMOVEGROUPTOCONTACT_SUCCESS,
  CAMPAIGN_ADDCAMPAIGNSTOCONTACT_SUCCESS,
  CAMPAIGN_REMOVECAMPAIGN_SUCCESS,
  TAGS_ADDTAG_SUCCESS,
  TAGS_REMOVETAG_SUCCESS,
  TASK_EDITTASK_SUCCESS,
  TASK_DELETETASK_SUCCESS,
  TASK_IDLE,
} from '../actions/types';
import moment from 'moment';
import { borderRadius } from 'styled-system';

class ContactDetails extends Component {
  _isMounted = false;
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return params;
  };

  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      scrollY: new Animated.Value(0),
      listGroups: [
        'Team Member',
        'Manufacturer',
        'Retailer',
        'Marketing Launch Company',
      ],
      moreInfoList: [
        { title: 'Email', value: 'juandelacruz@company.com' },
        { title: 'Mobile Number', value: '0987654321' },
        { title: 'Website', value: 'juandelacruz.com' },
        { title: 'Address', value: 'City Name, Country, 1234' },
      ],

      showMoreInfo: false,
      showCompletedTask: true,

      // MODAL ALERT
      alertVisible: false,
      alertTitle: '',
      alertMessage: '',
      alertButtons: [
        { text: 'OK', onPress: () => this.setState({ alertVisible: false }) },
      ],
      alertIcon: null,

      alertListVisible: false,
      alertListTitle: '',
      alertListData: [],
      alertListSelected: [],
      alertListSave: () => { },
      alertListType: '',

      showMenu: false,

      rating: 0,

      swipeable: null,

      currentlyOpenSwipeable: null,
      loadMoreVisible: true,
      viewMore: false,
      notesViewMore: false,
      emailViewMore: false,
    };
    this.selectedRow;
    this.component = [];
  }

  handleBackButtonClick() {
    // this.props.navigation.goBack(null);
    this.props.getContactList(this.props.route.params.contact, 1);
    // setTimeout(() => {
    this.props.getContactsWithRatings(
      this.props.route.params.contactWithRating,
      1,
    );
    // }, 500);
    this.props.selectInfo = this.props.route.params.selectInfo;
    this.props.navigation.navigate('ContactsStack', {
      select: this.props.route.params.selectInfo,
    });
    return true;
  }

  componentWillMount() {
    this._isMounted = true;
    if (this._isMounted) {
      BackHandler.addEventListener(
        'hardwareBackPress',
        this.handleBackButtonClick,
      );
      this.props.navigation.setOptions({
        headerLeft: () => (
          <View style={global.styles.headerButtonsContainer}>
            <HeaderButton
              icon={global.icon_leftarrow}
              onPress={() => this.handleBackButtonClick()}
              mode={this.props.settings.theme.mode}
            />
          </View>
        ),
        headerRight: () => (
          <View style={global.styles.headerButtonsContainer}>
            <HeaderButton
              icon={global.icon_dots}
              mode={this.props.settings.theme.mode}
              onPress={() => this.setState({ showMenu: true })}
            />
          </View>
        ),
      });

      if (this.props.route.params.contactInfo) {
        console.log(
          this.props.route.params.contactInfo,
          'this.props.route.params.contactInfo',
        );
        this.props.getContactInfo({
          contactInfo: this.props.route.params.contactInfo,
        });
      }

      // this.props.getGroups();

      this.setState({ rating: 3 });
    }
    this.props.getMailboxes();

    // this.forceUpdate();
  }

  componentWillUnmount() {
    this._isMounted = false;
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  refresh() {
    console.log(this.props.contactInfo, 'this.props.contactInfo');
    this.props.getContactInfo({ contactInfo: this.props.contactInfo });
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps, 'nextProps===>');
    if (nextProps.contactsStatus === CONTACT_DELETECONTACT_LOADING) {
      console.log(nextProps, 'nextProps===>123');
      this.props.navigation.goBack();
    }

    if (
      (this.props.tasksStatus === TASK_EDITTASK_SUCCESS &&
        nextProps.tasksStatus === TASK_IDLE) ||
      (this.props.tasksStatus === TASK_DELETETASK_SUCCESS &&
        nextProps.tasksStatus === TASK_IDLE)
    ) {
      this.refresh();
    }

    if (nextProps.groupsStatus === GROUP_ADDGROUPTOCONTACT_SUCCESS) {
      this.setState({ alertListVisible: false });
      setTimeout(() => {
        this.refresh();
      }, 300);
    } else if (nextProps.groupsStatus === GROUP_REMOVEGROUPTOCONTACT_SUCCESS) {
      setTimeout(() => {
        this.refresh();
      }, 300);
    }

    if (nextProps.campaignsStatus === CAMPAIGN_ADDCAMPAIGNSTOCONTACT_SUCCESS) {
      this.setState({ alertListVisible: false });
      setTimeout(() => {
        this.refresh();
      }, 300);
    } else if (nextProps.campaignsStatus === CAMPAIGN_REMOVECAMPAIGN_SUCCESS) {
      setTimeout(() => {
        this.refresh();
      }, 300);
    }

    if (nextProps.tagsStatus === TAGS_ADDTAG_SUCCESS) {
      this.setState({ alertListVisible: false });
      setTimeout(() => {
        this.refresh();
      }, 300);
    } else if (nextProps.tagsStatus === TAGS_REMOVETAG_SUCCESS) {
      this.setState({ alertListVisible: false });
      setTimeout(() => {
        this.refresh();
      }, 300);
    }

    // this.setState({ rating: nextProps.contactInfo.rating });
    // this.updateAlertList(nextProps);
  }

  prepareSelected() {
    let c = this.props.contactInfo;
    let selected = [];
    switch (this.state.alertListType) {
      case LISTTYPE_GROUPS:
        if (c.groups && c.groups.length > 0) {
          c.groups.forEach(item => {
            selected.push(item.gid);
          });
        }
        // Alert.alert(`${selected.length}`)
        this.setState({ alertListSelected: selected });
        break;
      case LISTTYPE_CAMPAIGNS:
        if (c.campaigns && c.campaigns.length > 0 && c.campaigns[0] !== false) {
          c.campaigns.forEach(item => {
            if (item && item.cp_gid) {
              selected.push(item.cp_gid);
            }
          });
        }
        this.setState({ alertListSelected: selected });
        break;
      case LISTTYPE_TAGS:
        if (c.tags && c.tags.length > 0) {
          c.tags.forEach(item => {
            selected.push(item);
          });
        }
        this.setState({ alertListSelected: selected });
        break;
      default:
    }
  }

  toggleAlertList(tag) {
    let selected = this.state.alertListSelected;
    if (selected.some(x => x.tag === tag.tag)) {
      const index = selected.findIndex(x => x.tag === tag.tag);
      selected.splice(index, 1);
    } else {
      selected.push(tag);
    }
    this.setState({ alertListSelected: selected });
  }

  toggleGroups(id) {
    let selected = this.state.alertListSelected;
    if (selected.includes(id)) {
      const index = selected.indexOf(id);
      selected.splice(index, 1);
    } else {
      selected.push(id);
    }
    this.setState({ alertListSelected: selected });
  }

  renderAlertList() {
    let list = [];
    // ssAlert.alert(this.state.alertListType);
    switch (this.state.alertListType) {
      case LISTTYPE_GROUPS:
        this.props.groupsList.map(item => {
          list.push({
            text: item.name,
            checked: this.state.alertListSelected.includes(item.gid),
            onPress: () => this.toggleGroups(item.gid),
          });
        });
        break;
      case LISTTYPE_CAMPAIGNS:
        this.props.campaignsList.map(item => {
          list.push({
            text: item.name,
            checked: this.state.alertListSelected.includes(item.cp_gid),
            //onPress: () => this.toggleAlertList(item.cp_gid)
            onPress: () => this.setState({ alertListSelected: [item.cp_gid] }),
          });
        });
        break;
      case LISTTYPE_TAGS:
        this.props.tagsList.map(item => {
          list.push({
            text: item.tag,
            checked: this.state.alertListSelected.some(x => x.tag === item.tag),
            onPress: () => this.toggleAlertList(item),
          });
        });
        break;
      default:
    }
    // Alert.alert(JSON.stringify(list));
    return list;
  }

  handleQuickButton(action) {
    let c = this.props.contactInfo;
    c = c.contact_details ? c.contact_details : c;
    switch (action) {
      case 'phone':
        Linking.openURL(`tel:${c.phone}`);
        break;
      case 'text':
        Linking.openURL(`sms:${c.phone}&body=`);
        break;
      case 'email':
        this.props.navigation.navigate('EmailComposeStack', {
          screen: 'EmailCompose',
          params: {
            contacts: [c],
            email: [c],
          },
        });

        break;

      case 'edit':
        this.props.navigation.navigate('ContactAdd', {
          title: 'Edit Contact',
          contact: c,
          onNavigateBack: this.refresh.bind(this),
        });
        break;
      case 'delete':
        this.setState({
          alertVisible: true,
          alertTitle: 'Delete Contact',
          alertMessage: 'Are you sure you want to delete this contact?',
          alertButtons: [
            {
              text: 'Cancel',
              onPress: () => this.setState({ alertVisible: false }),
              type: 'cancel',
            },
            {
              text: 'Delete',
              onPress: () => {
                this.setState({ alertVisible: false });
                this.props.deleteContact({ cid: c.cid });
              },
            },
          ],
          alertIcon: null,
        });
        break;
      default:
    }
  }

  renderMenuOptions() {
    let c = this.props.contactInfo;
    c = c.contact_details ? c.contact_details : c;

    let options = [
      {
        text: 'Edit Contact',
        onPress: () => {
          this.setState({ showMenu: false });
          setTimeout(() => {
            this.handleQuickButton('edit');
          }, 400);
        },
      },
      {
        text: 'Email ' + c.email,
        onPress: () => {
          this.setState({ showMenu: false });
          setTimeout(() => {
            this.handleQuickButton('email');
          }, 400);
        },
      },
      {
        text: 'Call ' + c.phone,
        onPress: () => {
          this.setState({ showMenu: false });
          setTimeout(() => {
            this.handleQuickButton('phone');
          }, 400);
        },
      },
      {
        text: 'Send SMS to ' + c.phone,
        onPress: () => {
          this.setState({ showMenu: false });
          setTimeout(() => {
            this.handleQuickButton('text');
          }, 400);
        },
      },
      {
        text: 'Delete Contact',
        onPress: () => {
          this.setState({ showMenu: false });
          setTimeout(() => {
            this.handleQuickButton('delete');
          }, 400);
        },
      },
      {
        type: 'gap',
        gapSize: 30,
      },
      {
        text: '+ Add Groups',
        onPress: () => {
          this.setState({ showMenu: false });
          setTimeout(() => {
            this.addIconPressed('groups');
          }, 400);
        },
      },
      {
        text: '+ Add Tags',
        onPress: () => {
          this.setState({ showMenu: false });
          setTimeout(() => {
            this.addIconPressed('tags');
          }, 400);
        },
      },
      {
        text: '+ Add Campaigns',
        onPress: () => {
          this.setState({ showMenu: false });
          setTimeout(() => {
            this.addIconPressed('campaigns');
          }, 400);
        },
      },
      {
        text: '+ Add Task',
        onPress: () => {
          this.setState({ showMenu: false });
          setTimeout(() => {
            this.addIconPressed('tasks');
          }, 400);
        },
      },
      {
        text: '+ Add Note',
        onPress: () => {
          this.setState({ showMenu: false });
          setTimeout(() => {
            this.addIconPressed('notes');
          }, 400);
        },
      },
    ];
    return options;
  }

  addIconPressed(key) {
    let c = this.props.contactInfo;
    console.log(c, 'key++++++++++++++++++++');
    switch (key) {
      case 'groups':
        this.setState(
          {
            alertListVisible: true,
            alertListTitle: 'Add Groups',
            alertListData: [],
            alertListType: LISTTYPE_GROUPS,
            alertListSave: () => {
              this.state.alertListVisible = false;
              let toAdd = [];
              let toRemove = [];
              // console.log(key, 'key1++++++++++++++++++++');
              if (c.groups && c.groups.length > 0) {
                c.groups.forEach(item => {
                  if (!this.state.alertListSelected.includes(item.gid)) {
                    toRemove.push(item.gid);
                  }
                });
              }

              this.state.alertListSelected.forEach(item => {
                if (
                  !c.groups ||
                  (c.groups && !c.groups.some(x => x.gid === item))
                ) {
                  toAdd.push(item);
                }
              });

              if (toRemove.length > 0) {
                toRemove.forEach(item => {
                  this.props.removeGroupToContact({ cid: c.cid, gid: [item] });
                });
              }

              this.props.addGroupsToContact({
                cid: c.cid,
                gid: toAdd, //this.state.alertListSelected,
              });
            },
          },
          () => this.prepareSelected(),
        );
        this.props.getGroups();
        break;
      case 'tags':
        this.setState(
          {
            alertListVisible: true,
            alertListTitle: 'Add Tags',
            alertListData: [],
            alertListType: LISTTYPE_TAGS,
            alertListSave: () => {
              this.state.alertListVisible = false;
              let toAdd = [];
              let toRemove = [];

              if (c.tags && c.tags.length > 0) {
                c.tags.forEach(item => {
                  if (
                    !this.state.alertListSelected.some(x => x.tag === item.tag)
                  ) {
                    toRemove.push(item);
                  }
                });
              }

              this.state.alertListSelected.forEach(item => {
                if (
                  !c.tags ||
                  (c.tags &&
                    !c.tags.some(
                      x => x.contact_tag_id === item.contact_tag_id,
                    ) &&
                    this.props.tagsList.some(x => x.id === item.id))
                ) {
                  toAdd.push(item.id);
                }
              });

              if (toRemove.length > 0) {
                let contact_tag_ids = [];
                toRemove.forEach(item => {
                  contact_tag_ids.push(item.contact_tag_id);
                  // this.props.removeTagToContact({ cid: c.cid, id: [item] })
                });
                this.props.removeTagToContact({
                  cid: c.cid,
                  tags: contact_tag_ids,
                });
              }

              console.log('tags to add: ' + JSON.stringify(toAdd));

              this.props.addTagsToContact({
                cid: c.cid,
                tags: toAdd, //this.state.alertListSelected,
              });
            },
          },
          () => this.prepareSelected(),
        );
        this.props.getTags();
        break;
      case 'campaigns':
        this.setState(
          {
            alertListVisible: true,
            alertListTitle: 'Add Campaigns',
            alertListData: [],
            alertListType: LISTTYPE_CAMPAIGNS,
            alertListSave: () => {
              this.state.alertListVisible = false;
              if (this.state.alertListSelected.length > 0) {
                this.props.addCampaignsToContact({
                  cid: c.cid,
                  cp_gid: this.state.alertListSelected[0],
                });
              } else {
                this.setState({ alertListVisible: false });
              }
            },
          },
          () => this.prepareSelected(),
        );
        this.props.getCampaigns();
        break;
      case 'tasks':
        this.props.navigation.navigate('NewTask', {
          title: 'New Task',
          contact: c,
          route: 'ContactDetails',
          onNavigateBack: this.refresh.bind(this),
        });
        break;
      case 'notes':
        this.props.navigation.navigate('NewNote', {
          cid: c.cid,
          onNavigateBack: this.refresh.bind(this),
        });
        break;
      default:
        break;
    }
  }


  setDateTimeFormat = date => {
    // console.log(date, 'date');
    return (
      date.split(' ')[0].split('-')[1] +
      '-' +
      date.split(' ')[0].split('-')[2] +
      '-' +
      date.split(' ')[0].split('-')[0] +
      ' (' +
      FormatTime(date.split(' ')[1]) +
      ')'
    );
  };

  setDateTimeFormatForSend = date => {
    return (
      date.split(' ')[0].split('-')[1] +
      '-' +
      date.split(' ')[0].split('-')[2] +
      '-' +
      date.split(' ')[0].split('-')[0] +
      ' ' +
      FormatTime(date.split(' ')[1]) +
      ''
    );
  };

  setDateTimeFormatForEmail = dateTime => {
    let date =
      `${('0' + (new Date(dateTime).getMonth() + 1)).slice(-2)}-${(
        '0' + new Date(dateTime).getDate()
      ).slice(-2)}-${new Date(dateTime).getFullYear()} (` +
      FormatTime(
        ('0' + new Date(dateTime).getHours()).slice(-2) +
        ':' +
        ('0' + new Date(dateTime).getMinutes()).slice(-2) +
        ':' +
        ('0' + new Date(dateTime).getSeconds()).slice(-2),
      ) +
      ')';
    // console.log(date, 'date');
    return date;
  };

  setDateTimeForNote(dateTime) {
    return `${new Date(`${dateTime} UTC`).getFullYear()}-${(
      '0' +
      (new Date(`${dateTime} UTC`).getMonth() + 1)
    ).slice(-2)}-${('0' + new Date(`${dateTime} UTC`).getDate()).slice(-2)} ${('0' + new Date(`${dateTime} UTC`).getHours()).slice(-2) +
      ':' +
      ('0' + new Date(`${dateTime} UTC`).getMinutes()).slice(-2) +
      ':' +
      ('0' + new Date(`${dateTime} UTC`).getSeconds()).slice(-2)
      }`;
  }

  taskRender() {
    // console.log(this.props.contactInfo,'taskes++++++++++++++++++++++++');
    let task = [];
    for (let data of this.props.contactInfo.tasks) {
      console.log("taskRender",data.date)
      console.log("taskRender",this.setDateTimeFormat(data.date))
      console.log("taskRender",this.setDateTimeFormatForSend(data.date))
      task.push({
        title: data.title,
        date: this.setDateTimeFormat(data.date),
        dateTime: data.date,
        did: data.did,
        completed_date: data.completed_date,
        comment: data.comment,
        notify: data.notify,
        status: data.status,
        type: data.type,
      });
    }
    return task;
  }

  notesRender() {
    console.log(this.props.contactInfo.notes, 'this.props.contactInfo.notes');
    let notes = [];
    for (let data of this.props.contactInfo.notes) {
      let date = moment.utc(data.date, 'YYYY-MM-DD HH:mm:ss');
      console.log(date.local().format('YYYY-MM-DD HH:mm:ss'), 'moment date');
      notes.push({
        cid: data.cid,
        content: data.content,
        date: this.setDateTimeFormat(
          date.local().format('YYYY-MM-DD HH:mm:ss'),
        ),
        nid: data.nid,
        uid: data.uid,
      });
    }
    console.log(notes, 'notes');
    return notes;
  }

  onOpen = (event, gestureState, swipeable) => {
    if (
      this.state.currentlyOpenSwipeable &&
      this.state.currentlyOpenSwipeable !== swipeable
    ) {
      this.state.currentlyOpenSwipeable.recenter();
    }
    this.setState({ currentlyOpenSwipeable: swipeable });
  };

  onClose = () => {
    this.setState({ currentlyOpenSwipeable: null });
  };

  closeAll = () => {
    if (this.state.currentlyOpenSwipeable) {
      this.state.currentlyOpenSwipeable.recenter();
    }
  };

  render() {
    const headerOpacity = this.state.scrollY.interpolate({
      inputRange: [0, global.headerHeight + 50],
      outputRange: [-1, 1],
      extrapolate: 'clamp',
    });
    let c = this.props.contactInfo;
    let cd = c.contact_details ? c.contact_details : c;
    console.log(cd, 'c.history');
    let moreInfo = [
      { title: 'First Name', value: cd.first_name, key: 'first_name' },
      { title: 'Last Name', value: cd.last_name, key: 'last_name' },
      { title: 'Email', value: cd.email, key: 'companyname' },
      { title: 'Mobile Number', value: cd.phone, key: 'phone' },
      { title: 'Company Name', value: cd.companyname, key: 'companyname' },
      { title: 'Website', value: cd.website, key: 'website' },
      { title: 'Address', value: cd.address, key: 'address' },
      //{ title: 'Facebook URL', value: cd.address, key: 'address' },
      { title: 'City', value: cd.city, key: 'city' },
      { title: 'State', value: cd.state, key: 'state' },
      { title: 'Zip', value: cd.zip, key: 'zip' },
    ];

    return (
      <View
        style={[
          global.styles.screenContainer,
          { backgroundColor: this.props.settings.theme.bgSecondary },
        ]}
        onStartShouldSetResponder={() => this.closeAll()}>
        <ScrollView
          style={{}}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                //useNativeDriver:true,
                nativeEvent: { contentOffset: { y: this.state.scrollY } },
              },
            ],
            { useNativeDriver: false },
          )}
          contentContainerStyle={{
            paddingTop: global.headerHeight + 30,
            paddingHorizontal: 20,
            paddingBottom: 60,
          }}>
          <View style={[styles.mainInfoContainer]}>
            <View
              style={[
                styles.mainInfoInnerContainer,
                { backgroundColor: this.props.settings.theme.bgPrimary },
              ]}>
              <View style={{ marginBottom: 20, alignItems: 'center' }}>
                <Text
                  style={[
                    styles.mainInfoTitle,
                    { color: this.props.settings.theme.textPrimary },
                  ]}>
                  {cd.fullname}
                </Text>
                <Text
                  style={[
                    styles.mainInfoSubtitle,
                    { color: this.props.settings.theme.textSecondary },
                  ]}>
                  {cd.companyname}
                </Text>
              </View>
              <Rating
                key={c.rating}
                rating={parseInt(c.rating)}
                fullStar={
                  <Image
                    source={global.icon_star}
                    style={{
                      width: 20,
                      height: 20,
                      tintColor: global.color_yellow,
                      marginHorizontal: 3,
                    }}
                  />
                }
                emptyStar={
                  <Image
                    source={global.icon_star}
                    style={{
                      width: 20,
                      height: 20,
                      tintColor: global.color_medgray,
                      marginHorizontal: 3,
                    }}
                  />
                }
                starSize={30}
                // onChangeMove={rating => { this.setState({ rating1: rating }); }}
                onChange={rating => {
                  // Alert.alert(`${rating}`)
                  this.props.updateRatings({ cid: c.cid, rating });
                }}
              />
              <View style={styles.quickButtonsContainer}>
                <MiniButton
                  icon={global.icon_phone}
                  color={global.color_green}
                  onPress={() => this.handleQuickButton('phone')}
                />
                <MiniButton
                  icon={global.icon_sms}
                  color={global.color_turquoise}
                  onPress={() => this.handleQuickButton('text')}
                />
                <MiniButton
                  icon={global.icon_email}
                  color={global.color_blue}
                  onPress={() => this.handleQuickButton('email')}
                />
                <MiniButton
                  icon={global.icon_pencil}
                  color={global.color_purple}
                  onPress={() => this.handleQuickButton('edit')}
                />
                <MiniButton
                  icon={global.icon_delete}
                  color={global.color_red}
                  onPress={() => this.handleQuickButton('delete')}
                />
              </View>
              <View style={{ width: '100%' }}>
                <Collapsible
                  collapsed={!this.state.showMoreInfo}
                  style={styles.moreInfoContainer}>
                  {moreInfo.map(item => {
                    return item.value && item.value !== '' ? (
                      <TouchableOpacity
                        key={item.key}
                        onPress={() => {
                          Clipboard.setString(item.value);
                          this.refs.toast.show('Copied to Clipboard', 1000);
                        }}
                        style={styles.moreInfoItem}>
                        <Text
                          style={[
                            styles.moreInfoItemTitle,
                            { color: this.props.settings.theme.textSecondary },
                          ]}>
                          {item.title}
                        </Text>
                        <Text
                          style={[
                            styles.moreInfoItemValue,
                            { color: this.props.settings.theme.textPrimary },
                          ]}>
                          {item.key === 'phone'
                            ? formatMobileNumber(item.value)
                            : item.value}
                        </Text>
                      </TouchableOpacity>
                    ) : null;
                  })}
                </Collapsible>
              </View>
              <TouchableOpacity
                style={[
                  styles.moreInfoBtn,
                  {
                    //position: 'relative',
                    //bottom: 0,
                    zIndex: 2,
                  },
                ]}
                onPress={() =>
                  this.setState({ showMoreInfo: !this.state.showMoreInfo })
                }>
                <Text
                  style={[
                    styles.moreInfoBtnText,
                    { color: this.props.settings.theme.bgPrimary },
                  ]}>
                  {this.state.showMoreInfo ? 'less' : 'more'} info
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.avatarContainer}>
              <View
                style={[
                  styles.avatarImgContainer,
                  { backgroundColor: this.props.settings.theme.bgSecondary },
                ]}>
                {this.props.contactInfo.avatar ? (
                  <Image
                    style={global.styles.imgCover}
                    source={{ uri: this.props.contactInfo.avatar }}
                  />
                ) : (
                  <Text
                    style={[
                      styles.avatarInitials,
                      { color: this.props.settings.theme.textSecondary },
                    ]}>
                    {cd.first_name && cd.first_name.length > 0
                      ? cd.first_name.charAt(0)
                      : ''}
                    {cd.last_name && cd.last_name.length > 0
                      ? cd.last_name.charAt(0)
                      : ''}
                  </Text>
                )}
              </View>
            </View>
          </View>
          <View style={styles.segmentTitleContainer}>
            <Text
              style={[
                styles.segmentTitle,
                { color: this.props.settings.theme.textPrimary },
              ]}>
              Groups
            </Text>
            <PlusButton
              onPress={() => this.addIconPressed('groups')}
              tintColor={this.props.settings.theme.bgPrimary}
            />
          </View>

          <View
            style={[
              global.styles.tagsContainer,
              { backgroundColor: this.props.settings.theme.tagsContainer },
            ]}>
            {!c.groups ? (
              <GroupsItemEmpty
                title={'No groups'}
                textColor={this.props.settings.theme.textSecondary}
              />
            ) : (
              c.groups.map(item => {
                return (
                  <GroupsItem
                    key={item.gid}
                    title={item && item.name ? item.name : ''}
                    bgColor={this.props.settings.theme.bgPrimary}
                    textColor={this.props.settings.theme.textPrimary}
                    onPressDelete={() =>
                      this.props.removeGroupToContact({
                        cid: c.cid,
                        gid: item.gid,
                      })
                    }
                  />
                );
              })
            )}
          </View>

          <View style={styles.segmentTitleContainer}>
            <Text
              style={[
                styles.segmentTitle,
                { color: this.props.settings.theme.textPrimary },
              ]}>
              Tags
            </Text>
            <PlusButton
              onPress={() => this.addIconPressed('tags')}
              tintColor={this.props.settings.theme.bgPrimary}
            />
          </View>
          <View
            style={[
              global.styles.tagsContainer,
              { backgroundColor: this.props.settings.theme.tagsContainer },
            ]}>
            {c.tags && c.tags.length > 0 ? (
              c.tags.map(item => {
                return (
                  <GroupsItem
                    key={item.contact_tag_id}
                    title={item.tag}
                    bgColor={this.props.settings.theme.bgPrimary}
                    textColor={this.props.settings.theme.textPrimary}
                    onPressDelete={() =>
                      this.props.removeTagToContact({
                        cid: c.cid,
                        tags: [item.contact_tag_id],
                      })
                    }
                  />
                );
              })
            ) : (
              <GroupsItemEmpty
                title={'No tags'}
                textColor={this.props.settings.theme.textSecondary}
              />
            )}
          </View>

          <View style={styles.segmentTitleContainer}>
            <Text
              style={[
                styles.segmentTitle,
                { color: this.props.settings.theme.textPrimary },
              ]}>
              Campaigns
            </Text>
            <PlusButton
              onPress={() => this.addIconPressed('campaigns')}
              tintColor={this.props.settings.theme.bgPrimary}
            />
          </View>
          <View
            style={[
              global.styles.tagsContainer,
              { backgroundColor: this.props.settings.theme.tagsContainer },
            ]}>
            {c.campaigns &&
              c.campaigns.length > 0 &&
              c.campaigns[0] !== false &&
              c.campaigns[0] ? (
              c.campaigns.map(item => {
                return (
                  <GroupsItem
                    key={item?.name}
                    title={item?.name}
                    bgColor={this.props.settings.theme.bgPrimary}
                    textColor={this.props.settings.theme.textPrimary}
                    onPressDelete={() =>
                      this.props.removeCampaignToContact({ cid: c.cid })
                    }
                  />
                );
              })
            ) : (
              <GroupsItemEmpty
                title={'No campaigns'}
                textColor={this.props.settings.theme.textSecondary}
              />
            )}
          </View>

          <View
            style={[
              styles.segmentTitleContainer,
              { justifyContent: 'space-between' },
            ]}>
            <View style={global.styles.inlineBlock}>
              <Text
                style={[
                  styles.segmentTitle,
                  { color: this.props.settings.theme.textPrimary },
                ]}>
                Tasks
              </Text>
              <PlusButton
                onPress={() => this.addIconPressed('tasks')}
                tintColor={this.props.settings.theme.bgPrimary}
              />
            </View>
            {/*
              <MiniButton
                onPress={() => this.setState({ showCompletedTask: !this.state.showCompletedTask }) }
                icon={global.icon_dots} size={25}
                style={{ backgroundColor: 'rgba(0,0,0,0.0)', alignSelf: 'flex-end'}}
                iconStyle={{ tintColor: this.props.settings.theme.textPrimary }}
                bgColor={this.props.settings.theme.bgPrimary}
              />
              */}
            <TouchableOpacity
              style={{
                padding: 5,
                borderRadius: 5,
                backgroundColor: global.color_theme,
              }}
              onPress={() => this.setState({ viewMore: !this.state.viewMore })}>
              <Image
                style={{
                  width: 14,
                  height: 14,
                  resizeMode: 'contain',
                  tintColor: global.color_white,
                }}
                source={
                  this.state.viewMore
                    ? global.icon_dropdown
                    : global.icon_rightarrow
                }
              />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }}>
            {c.tasks && c.tasks.length > 0 ? (
              c.tasks.length > 3 && !this.state.viewMore ? (
                <View style={{ marginHorizontal: -30 }}>
                  {c.tasks.map((item, index) => {

                    if (index <= 2) {
                      return (
                        <Collapsible
                          collapsed={!this.state.showCompletedTask && active}
                          style={{ width: '100%' }}>
                          <Swipeable
                            ref={c => {
                              this.selectedRow = c;
                            }}
                            rightButtons={[
                              <TouchableOpacity
                                style={[
                                  styles.rightSwipeItem,
                                  { backgroundColor: global.color_purple },
                                ]}
                                onPress={() => {
                                  console.log("itemitem", item)
                                  this.props.navigation.navigate('NewTask', {
                                    title: 'Edit Task',
                                    contact: c,
                                    task: item,
                                    route: 'ContactDetails',
                                    onNavigateBack: this.refresh.bind(this),
                                  });
                                  this.closeAll();
                                }}>
                                <MiniButton
                                  icon={global.icon_pencil}
                                  color={global.color_purple}
                                  style={{ marginLeft: 1, marginBottom: -5 }}
                                  onPress={() => {
                                    console.log("itemitem", item)
                                    this.props.navigation.navigate('NewTask', {
                                      title: 'Edit Task',
                                      contact: c,
                                      task: item,
                                      route: 'ContactDetails',
                                      onNavigateBack: this.refresh.bind(this),
                                    });
                                    this.closeAll();
                                  }}
                                />
                                <Text
                                  style={{
                                    color: global.color_white,
                                    marginLeft: 5,
                                    marginBottom: 5,
                                  }}>
                                  Edit
                                </Text>
                              </TouchableOpacity>,
                              <TouchableOpacity
                                style={[
                                  styles.rightSwipeItem,
                                  { backgroundColor: global.color_red },
                                ]}
                                onPress={() => {
                                  this.setState({
                                    alertVisible: true,
                                    alertTitle: 'Delete Task',
                                    alertMessage:
                                      'Are you sure you want to delete this task?',
                                    alertButtons: [
                                      {
                                        text: 'Cancel',
                                        onPress: () =>
                                          this.setState({ alertVisible: false }),
                                        type: 'cancel',
                                      },
                                      {
                                        text: 'Delete',
                                        onPress: () => {
                                          this.setState({ alertVisible: false });
                                          this.props.deleteTask({
                                            did: item.did,
                                          });
                                        },
                                      },
                                    ],
                                    alertIcon: null,
                                  });
                                  this.closeAll();
                                }}>
                                <MiniButton
                                  icon={global.icon_delete}
                                  color={global.color_red}
                                  style={{ marginLeft: -5, marginBottom: -4 }}
                                  onPress={() => {
                                    this.setState({
                                      alertVisible: true,
                                      alertTitle: 'Delete Task',
                                      alertMessage:
                                        'Are you sure you want to delete this task?',
                                      alertButtons: [
                                        {
                                          text: 'Cancel',
                                          onPress: () =>
                                            this.setState({
                                              alertVisible: false,
                                            }),
                                          type: 'cancel',
                                        },
                                        {
                                          text: 'Delete',
                                          onPress: () => {
                                            this.setState({
                                              alertVisible: false,
                                            });
                                            this.props.deleteTask({
                                              did: item.did,
                                            });
                                          },
                                        },
                                      ],
                                      alertIcon: null,
                                    });
                                    this.closeAll();
                                  }}
                                />
                                <Text style={styles.iconStyle}>Delete</Text>
                              </TouchableOpacity>,
                            ]}
                            onRightButtonsOpenRelease={this.onOpen}
                            onRightButtonsCloseRelease={this.onClose}>
                            <TaskItem
                              title={item.title}
                              subtitle={item.date + ' ' + item.type}
                              active={item.status === '1'}
                              bgColor={this.props.settings.theme.bgPrimary}
                              textColor={this.props.settings.theme.textPrimary}
                              onPress={() => {
                                console.log("itemitem", item)
                                this.props.navigation.navigate('NewTask', {
                                  title: 'Edit Task',
                                  contact: c,
                                  task: item,
                                  route: 'ContactDetails',
                                  onNavigateBack: this.refresh.bind(this),
                                })
                              }
                              }
                              onPressCheckbox={() => {
                                let task = this.props.route.params.task;
                                let params = {
                                  did: item.did,
                                  title: item.title,
                                  status: item.status === '1' ? '0' : '1',
                                };

                                this.props.editTask(params);
                              }}
                            />
                          </Swipeable>
                          {/* <SwipeRow
      style={{}}
      ref={(c) => { this.component[index] = c }}
      leftOpenValue={75}
      rightOpenValue={-75}
      onRowOpen={() => {
        if (this.selectedRow && this.selectedRow !== this.component[index]) { this.selectedRow._root.closeRow(); }
        this.selectedRow = this.component[index]
      }}
      body={
        <TaskItem
          title={item.title}
          subtitle={item.date}
          active={item.status==='1'}
          bgColor={this.props.settings.theme.bgPrimary}
          textColor={this.props.settings.theme.textPrimary}
          onPress={() => this.props.navigation.navigate('NewTask', {
            title: 'Edit Task',
            contact: c,
            task: item,
            route: 'ContactDetails',
            onNavigateBack: this.refresh.bind(this)
          })}
          onPressCheckbox={() => {
            let task = this.props.route.params.task;
            let params = {
              did: item.did,
              title: item.title,
              status: item.status==='1' ? '0' : '1'
            };

            this.props.editTask(params);
          }}
        />
      } */}
                        </Collapsible>
                      );
                    }
                    //  else if (index == 3){
                    //   return (<TouchableOpacity style={{ width:'100%', alignItems:'center', borderRadius:10 , marginTop:10 ,  }} onPress={() => this.setState({viewMore: true})}>
                    //     <Text style={{padding:15 , color:'white', fontSize:15, fontWeight:'bold', backgroundColor: global.color_theme,paddingHorizontal:40, borderRadius: 24, overflow:'hidden'}}>View More</Text>
                    //   </TouchableOpacity>)
                    // } else {
                    //   return <View/>
                    // }
                  })}
                </View>
              ) : (
                <FlatList
                  style={{ marginHorizontal: -30 }}
                  contentContainerStyle={[{}]}
                  data={this.taskRender()}
                  extraData={c.tasks}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => `list-item-${index}`}
                  renderItem={({ item, index }) => {
                    return (
                      <Collapsible
                        collapsed={!this.state.showCompletedTask && active}
                        style={{ width: '100%' }}>
                        <Swipeable
                          ref={c => {
                            this.selectedRow = c;
                          }}
                          rightButtons={[
                            <TouchableOpacity
                              style={[
                                styles.rightSwipeItem,
                                { backgroundColor: global.color_purple },
                              ]}
                              onPress={() => {
                                console.log("itemitem",item)
                                this.props.navigation.navigate('NewTask', {
                                  title: 'Edit Task',
                                  contact: c,
                                  task: item,
                                  route: 'ContactDetails',
                                  onNavigateBack: this.refresh.bind(this),
                                });
                                this.closeAll();
                              }}>
                              <MiniButton
                                icon={global.icon_pencil}
                                color={global.color_purple}
                                style={{ marginLeft: 1, marginBottom: -5 }}
                                onPress={() => {
                                  console.log("itemitem",item)
                                  this.props.navigation.navigate('NewTask', {
                                    title: 'Edit Task',
                                    contact: c,
                                    task: item,
                                    route: 'ContactDetails',
                                    onNavigateBack: this.refresh.bind(this),
                                  });
                                  this.closeAll();
                                }}
                              />
                              <Text
                                style={{
                                  color: global.color_white,
                                  marginLeft: 5,
                                  marginBottom: 5,
                                }}>
                                Edit
                              </Text>
                            </TouchableOpacity>,
                            <TouchableOpacity
                              style={[
                                styles.rightSwipeItem,
                                { backgroundColor: global.color_red },
                              ]}
                              onPress={() => {
                                this.setState({
                                  alertVisible: true,
                                  alertTitle: 'Delete Task',
                                  alertMessage:
                                    'Are you sure you want to delete this task?',
                                  alertButtons: [
                                    {
                                      text: 'Cancel',
                                      onPress: () =>
                                        this.setState({ alertVisible: false }),
                                      type: 'cancel',
                                    },
                                    {
                                      text: 'Delete',
                                      onPress: () => {
                                        this.setState({ alertVisible: false });
                                        this.props.deleteTask({ did: item.did });
                                      },
                                    },
                                  ],
                                  alertIcon: null,
                                });
                                this.closeAll();
                              }}>
                              <MiniButton
                                icon={global.icon_delete}
                                color={global.color_red}
                                style={{ marginLeft: -5, marginBottom: -4 }}
                                onPress={() => {
                                  this.setState({
                                    alertVisible: true,
                                    alertTitle: 'Delete Task',
                                    alertMessage:
                                      'Are you sure you want to delete this task?',
                                    alertButtons: [
                                      {
                                        text: 'Cancel',
                                        onPress: () =>
                                          this.setState({ alertVisible: false }),
                                        type: 'cancel',
                                      },
                                      {
                                        text: 'Delete',
                                        onPress: () => {
                                          this.setState({ alertVisible: false });
                                          this.props.deleteTask({
                                            did: item.did,
                                          });
                                        },
                                      },
                                    ],
                                    alertIcon: null,
                                  });
                                  this.closeAll();
                                }}
                              />
                              <Text style={styles.iconStyle}>Delete</Text>
                            </TouchableOpacity>,
                          ]}
                          onRightButtonsOpenRelease={this.onOpen}
                          onRightButtonsCloseRelease={this.onClose}>
                          <TaskItem
                            title={item.title}
                            subtitle={item.date + ' ' + item.type}
                            active={item.status === '1'}
                            bgColor={this.props.settings.theme.bgPrimary}
                            textColor={this.props.settings.theme.textPrimary}
                            onPress={() =>{
                              console.log("itemitem",item)
                              this.props.navigation.navigate('NewTask', {
                                title: 'Edit Task',
                                contact: c,
                                task: item,
                                route: 'ContactDetails',
                                onNavigateBack: this.refresh.bind(this),
                              })
                            }
                            }
                            onPressCheckbox={() => {
                              let task = this.props.route.params.task;
                              let params = {
                                did: item.did,
                                title: item.title,
                                status: item.status === '1' ? '0' : '1',
                              };

                              this.props.editTask(params);
                            }}
                          />
                        </Swipeable>
                        {/* <SwipeRow
                        style={{}}
                        ref={(c) => { this.component[index] = c }}
                        leftOpenValue={75}
                        rightOpenValue={-75}
                        onRowOpen={() => {
                          if (this.selectedRow && this.selectedRow !== this.component[index]) { this.selectedRow._root.closeRow(); }
                          this.selectedRow = this.component[index]
                        }}
                        body={
                          <TaskItem
                            title={item.title}
                            subtitle={item.date}
                            active={item.status==='1'}
                            bgColor={this.props.settings.theme.bgPrimary}
                            textColor={this.props.settings.theme.textPrimary}
                            onPress={() => this.props.navigation.navigate('NewTask', {
                              title: 'Edit Task',
                              contact: c,
                              task: item,
                              route: 'ContactDetails',
                              onNavigateBack: this.refresh.bind(this)
                            })}
                            onPressCheckbox={() => {
                              let task = this.props.route.params.task;
                              let params = {
                                did: item.did,
                                title: item.title,
                                status: item.status==='1' ? '0' : '1'
                              };

                              this.props.editTask(params);
                            }}
                          />
                        } */}
                      </Collapsible>
                    );
                  }}
                />
              )
            ) : (
              <GroupsItemEmpty
                title={'No tasks'}
                textColor={this.props.settings.theme.textSecondary}
              />
            )}
          </View>

          <View
            style={[
              styles.segmentTitleContainer,
              { justifyContent: 'space-between' },
            ]}>
            <View style={global.styles.inlineBlock}>
              <Text
                style={[
                  styles.segmentTitle,
                  { color: this.props.settings.theme.textPrimary },
                ]}>
                Notes
              </Text>
              <PlusButton
                onPress={() => this.addIconPressed('notes')}
                tintColor={this.props.settings.theme.bgPrimary}
              />
            </View>
            {/*
              <MiniButton
              icon={global.icon_dots}
              size={25}
              style={{ backgroundColor: 'rgba(0,0,0,0.0)', alignSelf: 'flex-end'}} iconStyle={{ tintColor: this.props.settings.theme.textPrimary }} />
              */}
            <TouchableOpacity
              style={{
                padding: 5,
                borderRadius: 5,
                backgroundColor: global.color_theme,
              }}
              onPress={() =>
                this.setState({ notesViewMore: !this.state.notesViewMore })
              }>
              <Image
                style={{
                  width: 14,
                  height: 14,
                  resizeMode: 'contain',
                  tintColor: global.color_white,
                }}
                source={
                  this.state.notesViewMore
                    ? global.icon_dropdown
                    : global.icon_rightarrow
                }
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            {c.notes && c.notes.length > 0 ? (
              c.notes.length > 3 && !this.state.notesViewMore ? (
                <View style={{ marginHorizontal: -30 }}>
                  {c.notes.map((item, index) => {
                    if (index <= 2) {
                      return (
                        <Swipeable
                          ref={c => {
                            this.selectedRow = c;
                          }}
                          rightButtons={[
                            <TouchableOpacity
                              style={[
                                styles.rightSwipeItem,
                                { backgroundColor: global.color_purple },
                              ]}
                              onPress={() => {
                                this.props.navigation.navigate('NewNote', {
                                  cid: c.cid,
                                  note: item,
                                  onNavigateBack: this.refresh.bind(this),
                                });
                                this.closeAll();
                              }}>
                              <MiniButton
                                icon={global.icon_pencil}
                                color={global.color_purple}
                                style={{ marginLeft: 1, marginBottom: -5 }}
                                onPress={() => {
                                  this.props.navigation.navigate('NewNote', {
                                    cid: c.cid,
                                    note: item,
                                    onNavigateBack: this.refresh.bind(this),
                                  });
                                  this.closeAll();
                                }}
                              />
                              <Text
                                style={{
                                  color: global.color_white,
                                  marginLeft: 5,
                                  marginBottom: 5,
                                }}>
                                Edit
                              </Text>
                            </TouchableOpacity>,
                            <TouchableOpacity
                              style={[
                                styles.rightSwipeItem,
                                { backgroundColor: global.color_red },
                              ]}
                              onPress={() => {
                                this.setState({
                                  alertVisible: true,
                                  alertTitle: 'Delete Note',
                                  alertMessage:
                                    'Are you sure you want to delete this note?',
                                  alertButtons: [
                                    {
                                      text: 'Cancel',
                                      onPress: () =>
                                        this.setState({ alertVisible: false }),
                                      type: 'cancel',
                                    },
                                    {
                                      text: 'Delete',
                                      onPress: () => {
                                        this.setState({ alertVisible: false });
                                        this.props.deleteNote({
                                          cid: c.cid,
                                          nid: item.nid,
                                        });
                                        this.refresh();
                                      },
                                    },
                                  ],
                                  alertIcon: null,
                                });
                                this.closeAll();
                              }}>
                              <MiniButton
                                icon={global.icon_delete}
                                color={global.color_red}
                                style={{ marginLeft: -4, marginBottom: -4 }}
                                onPress={() => {
                                  this.setState({
                                    alertVisible: true,
                                    alertTitle: 'Delete Note',
                                    alertMessage:
                                      'Are you sure you want to delete this note?',
                                    alertButtons: [
                                      {
                                        text: 'Cancel',
                                        onPress: () =>
                                          this.setState({ alertVisible: false }),
                                        type: 'cancel',
                                      },
                                      {
                                        text: 'Delete',
                                        onPress: () => {
                                          this.setState({ alertVisible: false });
                                          this.props.deleteNote({
                                            cid: c.cid,
                                            nid: item.nid,
                                          });
                                          this.refresh();
                                        },
                                      },
                                    ],
                                    alertIcon: null,
                                  });
                                  this.closeAll();
                                }}
                              />
                              <Text style={styles.iconStyle}>Delete</Text>
                            </TouchableOpacity>,
                          ]}
                          onRightButtonsOpenRelease={this.onOpen}
                          onRightButtonsCloseRelease={this.onClose}>
                          <NoteItem
                            title={item.content}
                            subtitle={item.date}
                            textColor={this.props.settings.theme.textPrimary}
                            bgColor={this.props.settings.theme.bgPrimary}
                            onPress={() =>
                              this.props.navigation.navigate('NewNote', {
                                cid: c.cid,
                                note: item,
                                onNavigateBack: this.refresh.bind(this),
                              })
                            }
                          />
                        </Swipeable>
                      );
                    }
                  })}
                </View>
              ) : (
                <FlatList
                  style={{ marginHorizontal: -30 }}
                  contentContainerStyle={[{}]}
                  data={this.notesRender()}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => `list-item-${index}`}
                  renderItem={({ item, index }) => {
                    const active = index % 2 === 0;
                    return (
                      <Swipeable
                        ref={c => {
                          this.selectedRow = c;
                        }}
                        rightButtons={[
                          <TouchableOpacity
                            style={[
                              styles.rightSwipeItem,
                              { backgroundColor: global.color_purple },
                            ]}
                            onPress={() => {
                              this.props.navigation.navigate('NewNote', {
                                cid: c.cid,
                                note: item,
                                onNavigateBack: this.refresh.bind(this),
                              });
                              this.closeAll();
                            }}>
                            <MiniButton
                              icon={global.icon_pencil}
                              color={global.color_purple}
                              style={{ marginLeft: 1, marginBottom: -5 }}
                              onPress={() => {
                                this.props.navigation.navigate('NewNote', {
                                  cid: c.cid,
                                  note: item,
                                  onNavigateBack: this.refresh.bind(this),
                                });
                                this.closeAll();
                              }}
                            />
                            <Text
                              style={{
                                color: global.color_white,
                                marginLeft: 5,
                                marginBottom: 5,
                              }}>
                              Edit
                            </Text>
                          </TouchableOpacity>,
                          <TouchableOpacity
                            style={[
                              styles.rightSwipeItem,
                              { backgroundColor: global.color_red },
                            ]}
                            onPress={() => {
                              this.setState({
                                alertVisible: true,
                                alertTitle: 'Delete Note',
                                alertMessage:
                                  'Are you sure you want to delete this note?',
                                alertButtons: [
                                  {
                                    text: 'Cancel',
                                    onPress: () =>
                                      this.setState({ alertVisible: false }),
                                    type: 'cancel',
                                  },
                                  {
                                    text: 'Delete',
                                    onPress: () => {
                                      this.setState({ alertVisible: false });
                                      this.props.deleteNote({
                                        cid: c.cid,
                                        nid: item.nid,
                                      });
                                      this.refresh();
                                    },
                                  },
                                ],
                                alertIcon: null,
                              });
                              this.closeAll();
                            }}>
                            <MiniButton
                              icon={global.icon_delete}
                              color={global.color_red}
                              style={{ marginLeft: -4, marginBottom: -4 }}
                              onPress={() => {
                                this.setState({
                                  alertVisible: true,
                                  alertTitle: 'Delete Note',
                                  alertMessage:
                                    'Are you sure you want to delete this note?',
                                  alertButtons: [
                                    {
                                      text: 'Cancel',
                                      onPress: () =>
                                        this.setState({ alertVisible: false }),
                                      type: 'cancel',
                                    },
                                    {
                                      text: 'Delete',
                                      onPress: () => {
                                        this.setState({ alertVisible: false });
                                        this.props.deleteNote({
                                          cid: c.cid,
                                          nid: item.nid,
                                        });
                                        this.refresh();
                                      },
                                    },
                                  ],
                                  alertIcon: null,
                                });
                                this.closeAll();
                              }}
                            />
                            <Text style={styles.iconStyle}>Delete</Text>
                          </TouchableOpacity>,
                        ]}
                        onRightButtonsOpenRelease={this.onOpen}
                        onRightButtonsCloseRelease={this.onClose}>
                        <NoteItem
                          title={item.content}
                          subtitle={item.date}
                          textColor={this.props.settings.theme.textPrimary}
                          bgColor={this.props.settings.theme.bgPrimary}
                          onPress={() =>
                            this.props.navigation.navigate('NewNote', {
                              cid: c.cid,
                              note: item,
                              onNavigateBack: this.refresh.bind(this),
                            })
                          }
                        />
                      </Swipeable>
                    );
                  }}
                />
              )
            ) : (
              <GroupsItemEmpty
                title={'No notes'}
                textColor={this.props.settings.theme.textSecondary}
              />
            )}
          </View>

          <View
            style={[
              styles.segmentTitleContainer,
              { justifyContent: 'space-between' },
            ]}>
            <View style={global.styles.inlineBlock}>
              <Text
                style={[
                  styles.segmentTitle,
                  { color: this.props.settings.theme.textPrimary },
                ]}>
                Email History
              </Text>
            </View>
            <TouchableOpacity
              style={{
                padding: 5,
                borderRadius: 5,
                backgroundColor: global.color_theme,
              }}
              onPress={() =>
                this.setState({ emailViewMore: !this.state.emailViewMore })
              }>
              <Image
                style={{
                  width: 14,
                  height: 14,
                  resizeMode: 'contain',
                  tintColor: global.color_white,
                }}
                source={
                  this.state.emailViewMore
                    ? global.icon_dropdown
                    : global.icon_rightarrow
                }
              />
            </TouchableOpacity>
          </View>
          {c.history && c.history.emails && c.history.emails.length > 0 ? (
            c.history.emails.length > 3 && !this.state.emailViewMore ? (
              <View style={{ marginHorizontal: -30 }}>
                {c.history.emails.map((item, index) => {
                  if (index <= 2) {
                    const active = index % 2 === 0;
                    var swipeoutBtns = [
                      {
                        text: 'Delete',
                        backgroundColor: global.color_red,
                      },
                    ];
                    return (
                      <EmailItem
                        active={active}
                        sender={item.from}
                        title={
                          item.subject_preview
                            ? mimeWordsDecode(item.subject_preview)
                            : ''
                        }
                        subtitle={
                          item.body_preview
                            ? cleanEmailBodyPreview(item.body_preview)
                            : ''
                        }
                        // timestamp={timestampToMonthDayTime(item.date*1000)}
                        timestamp={this.setDateTimeFormatForEmail(
                          item.date * 1000,
                        )}
                        box
                        separatorColor={this.props.settings.theme.separator}
                        textColor={this.props.settings.theme.textPrimary}
                        checkColor={this.props.settings.theme.bgSecondary}
                        bgColor={this.props.settings.theme.bgPrimary}
                        onPress={() =>
                          this.props.navigation.navigate('EmailDetails', {
                            emailContent: { ...item, html_body: item.body },
                            box: 'Back',
                            emails: c.history.emails,
                            index: index,
                          })
                        }
                        unread={item.read === 0}
                      />
                    );
                  }
                })}
              </View>
            ) : (
              <FlatList
                style={{ marginHorizontal: -30 }}
                contentContainerStyle={[{}]}
                data={c.history.emails}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => `list-item-${index}`}
                renderItem={({ item, index }) => {
                  const active = index % 2 === 0;
                  var swipeoutBtns = [
                    {
                      text: 'Delete',
                      backgroundColor: global.color_red,
                    },
                  ];
                  return (
                    // <Swipeout right={swipeoutBtns} style={{ backgroundColor: 'transparent' }} autoClose >
                    //   <EmailItem
                    //   active={active}
                    //   sender={item.from}
                    //   title={item.subject_preview ? mimeWordsDecode(item.subject_preview) : ''}
                    //   subtitle={item.body_preview ? cleanEmailBodyPreview(item.body_preview) : ''}
                    //   // timestamp={timestampToMonthDayTime(item.date*1000)}
                    //   timestamp={this.setDateTimeFormatForEmail(item.date*1000)}
                    //   box
                    //   separatorColor={this.props.settings.theme.separator}
                    //   textColor={this.props.settings.theme.textPrimary}
                    //   checkColor={this.props.settings.theme.bgSecondary}
                    //   bgColor={this.props.settings.theme.bgPrimary}
                    //   onPress={() => this.props.navigation.navigate('EmailDetails', {
                    //     emailContent: {...item, html_body: item.body},
                    //     box: 'Back',
                    //     emails: c.history.emails,
                    //     index: index,
                    //   })}
                    //   unread={item.read===0} />
                    // </Swipeout>
                    <EmailItem
                      active={active}
                      sender={item.from}
                      title={
                        item.subject_preview
                          ? mimeWordsDecode(item.subject_preview)
                          : ''
                      }
                      subtitle={
                        item.body_preview
                          ? cleanEmailBodyPreview(item.body_preview)
                          : ''
                      }
                      // timestamp={timestampToMonthDayTime(item.date*1000)}
                      timestamp={this.setDateTimeFormatForEmail(
                        item.date * 1000,
                      )}
                      box
                      separatorColor={this.props.settings.theme.separator}
                      textColor={this.props.settings.theme.textPrimary}
                      checkColor={this.props.settings.theme.bgSecondary}
                      bgColor={this.props.settings.theme.bgPrimary}
                      onPress={() =>
                        this.props.navigation.navigate('EmailDetails', {
                          emailContent: { ...item, html_body: item.body },
                          box: 'Back',
                          emails: c.history.emails,
                          index: index,
                        })
                      }
                      unread={item.read === 0}
                    />
                  );
                }}
              />
            )
          ) : (
            <GroupsItemEmpty
              title={'No email history'}
              textColor={this.props.settings.theme.textSecondary}
            />
          )}
        </ScrollView>
        <Animated.View
          style={{
            backgroundColor: this.props.settings.theme.bgSecondary,
            position: 'absolute',
            height: global.headerHeight,
            top: 0,
            left: 0,
            right: 0,
            opacity: headerOpacity,
          }}>
          <Text
            numberOfLines={1}
            style={{
              position: 'absolute',
              bottom: 10,
              alignSelf: 'center',
              fontFamily: 'Montserrat-Regular',
              fontWeight: '700',
              fontSize: 18,
              color: this.props.settings.theme.textPrimary,
              marginHorizontal: 50,
            }}>
            {cd.fullname}
          </Text>
        </Animated.View>

        <ModalAlert
          onBackdropPress={() => this.setState({ alertVisible: false })}
          isVisible={this.state.alertVisible}
          title={this.state.alertTitle}
          message={this.state.alertMessage}
          alertIcon={this.state.alertIcon}
          buttons={this.state.alertButtons}
          dark={this.props.settings.theme.mode === 'dark'}
          bgColor={this.props.settings.theme.bgPrimary}
          textColor={this.props.settings.theme.textPrimary}
        />

        <ModalChecklist
          isVisible={
            this.state.alertListVisible && this.state.alertListType !== ''
          }
          title={this.state.alertListTitle}
          onBackdropPress={() => this.setState({ alertListVisible: false })}
          list={this.renderAlertList()}
          onPressSave={this.state.alertListSave}
          bgColor={this.props.settings.theme.bgTertiary}
          textColor={this.props.settings.theme.textPrimary}
        />
        <Toast
          ref={'toast'}
          style={[
            global.styles.toastStyle,
            { backgroundColor: this.props.settings.theme.bgPrimary },
          ]}
          textStyle={[
            global.styles.toastTextStyle,
            { color: this.props.settings.theme.textPrimary },
          ]}
        />
        {this.props.contactsStatus === CONTACT_DELETECONTACT_LOADING ||
          this.props.contactsStatus === CONTACT_GETCONTACTINFO_LOADING ? (
          <IndicatorBottom dark={this.props.settings.theme.mode === 'dark'} />
        ) : null}

        <ModalBottom
          onBackdropPress={() => this.setState({ showMenu: false })}
          isVisible={this.state.showMenu}
          dark={this.props.settings.theme.mode === 'dark'}
          list={this.renderMenuOptions()}
          title={cd.fullname}
          buttons={[
            {
              text: 'Cancel',
              type: 'cancel',
              onPress: () => this.setState({ showMenu: false }),
            },
          ]}
          bgColor={
            this.props.settings.theme.mode === 'light'
              ? this.props.settings.theme.bgPrimary
              : this.props.settings.theme.bgTertiary
          }
          textColor={this.props.settings.theme.textPrimary}
        //hideArrow
        />
      </View>
    );
  }
}

const PlusButton = ({ tintColor, onPress, size = 20, iconStyle, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ paddingVertical: 5, paddingLeft: 5, paddingRight: 10 }}>
      <View
        style={[
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            marginHorizontal: 6,
            padding: size / 4,
            backgroundColor: global.color_theme,
          },
          style,
        ]}>
        <Image
          source={global.icon_plus}
          style={[
            {
              width: '100%',
              height: '100%',
              tintColor: tintColor,
            },
            iconStyle,
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainInfoInnerContainer: {
    backgroundColor: global.color_white,
    alignItems: 'center',
    borderRadius: 30,
    shadowColor: '#432587',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
    paddingHorizontal: 30,
    paddingTop: 80,
    paddingBottom: 40,
  },
  avatarContainer: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: -60,
    width: 120,
    height: 120,
    borderRadius: 60,
    shadowColor: '#432587',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  avatarImgContainer: {
    borderRadius: 60,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '700',
    fontSize: 30,
    color: global.color_gray,
    textAlign: 'center',
  },
  mainInfoTitle: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '700',
    fontSize: 22,
    marginBottom: 2,
    color: global.color_darkgray,
  },
  mainInfoSubtitle: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '400',
    fontSize: 12,
    color: global.color_gray,
  },
  quickButtonsContainer: {
    marginTop: 20,
    flexDirection: 'row',
  },
  starsContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  segmentTitleContainer: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  segmentTitle: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '700',
    fontSize: 18,
    color: global.color_darkgray,
    marginRight: 0,
  },
  moreInfoBtn: {
    width: 100,
    height: 30,
    borderRadius: 15,
    backgroundColor: global.color_theme,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: -15,
  },
  moreInfoBtnText: {
    color: global.color_white,
    fontSize: 12,
    fontWeight: '700',
  },
  moreInfoContainer: {
    width: '100%',
    marginBottom: -20,
  },
  moreInfoItem: {
    width: '100%',
    paddingVertical: 15,
  },
  moreInfoItemTitle: {
    color: global.color_medgray,
    fontFamily: 'Montserrat-Regular',
    fontSize: 11,
  },
  moreInfoItemValue: {
    color: global.color_darkgray,
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Montserrat-Regular',
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  iconStyle: {
    color: global.color_white,
    marginLeft: -9,
    marginBottom: 6,
  },
});

const mapStateToProps = ({
  settings,
  contacts,
  groups,
  campaigns,
  tags,
  tasks,
}) => {
  const { contactInfo, contactsStatus, contactsError } = contacts;
  const { groupsStatus, groupsError, groupsList } = groups;
  const { campaignsStatus, campaignsError, campaignsList } = campaigns;
  const { tagsStatus, tagsError, tagsList } = tags;
  const { tasksStatus } = tasks;
  return {
    settings,
    contactInfo,
    contactsStatus,
    contactsError,
    groupsStatus,
    groupsError,
    groupsList,
    campaignsStatus,
    campaignsError,
    campaignsList,
    tagsStatus,
    tagsError,
    tagsList,
    tasksStatus,
  };
};

export default connect(mapStateToProps, {
  getContactList,
  getContactsWithRatings,
  getContactInfo,
  deleteContact,
  updateRatings,

  getGroups,
  addGroupsToContact,
  removeGroupToContact,

  getCampaigns,
  addCampaignsToContact,
  removeCampaignToContact,

  getTags,
  addTagsToContact,
  removeTagToContact,

  deleteNote,

  editTask,
  deleteTask,
  getMailboxes,
})(ContactDetails);


