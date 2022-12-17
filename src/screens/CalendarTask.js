// import _ from 'lodash';
// import React, { Component, PureComponent } from 'react';
// import AsyncStorage from '@react-native-community/async-storage';
// import moment from 'moment';
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
//   Platform,
//   Button,
//   Image,
//   TextInput,
//   RefreshControl,
//   ScrollView,
// } from 'react-native';
// import Swipeable from 'react-native-swipeable';
// import { useIsFocused } from '@react-navigation/native'
// import {
//   ExpandableCalendar,
//   AgendaList,
//   CalendarProvider,
//   WeekCalendar,
//   Calendar,
// } from 'react-native-calendars';
// import Swipeout from 'react-native-swipeout';
// import { connect } from 'react-redux';
// import Modal from 'react-native-modal';
// import {
//   HeaderButton,
//   MiniButton,
//   IndicatorBottom,
//   CalendarTaskItem,
//   ModalChecklist,
//   TaskItem,
//   ModalAlert,
//   FormDropdown,
//   FilterButton,
// } from '../common';
// import { getCalendarTasks, editTask, deleteTask, getTaskTypes } from '../actions';
// import {
//   TASK_EDITTASK_SUCCESS,
//   TASK_DELETETASK_SUCCESS,
//   TASK_IDLE,
// } from '../actions/types';
// import { FormatTime } from '../utils/Helper';
// import { backgroundColor, marginRight } from 'styled-system';
// import { useFocusEffect } from '@react-navigation/native';
// const testIDs = require('../testIDs');

// const today = new Date().toISOString().split('T')[0];
// const fastDate = getPastDate(3);
// const futureDates = getFutureDates(9);
// const dates = [fastDate, today].concat(futureDates);
// const themeColor = 'red'; //'#00AAAF';
// const lightThemeColor = 'transparent'; // '#EBF9F9';

// function getFutureDates(days) {
//   const array = [];
//   for (let index = 1; index <= days; index++) {
//     const date = new Date(Date.now() + 864e5 * index); // 864e5 == 86400000 == 24*60*60*1000
//     const dateString = date.toISOString().split('T')[0];
//     array.push(dateString);
//   }
//   return array;
// }



// function getPastDate(days) {
//   return new Date(Date.now() - 864e5 * days).toISOString().split('T')[0];
// }

// const ITEMS = [
//   {
//     title: dates[0],
//     data: [{ hour: '12am', duration: '1h', title: 'First Yoga' }],
//   },
//   {
//     title: dates[1],
//     data: [
//       { hour: '4pm', duration: '1h', title: 'Pilates ABC' },
//       { hour: '5pm', duration: '1h', title: 'Vinyasa Yoga' },
//     ],
//   },
//   {
//     title: dates[2],
//     data: [
//       { hour: '1pm', duration: '1h', title: 'Ashtanga Yoga' },
//       { hour: '2pm', duration: '1h', title: 'Deep Streches' },
//       { hour: '3pm', duration: '1h', title: 'Private Yoga' },
//     ],
//   },
//   {
//     title: dates[3],
//     data: [{ hour: '12am', duration: '1h', title: 'Ashtanga Yoga' }],
//   },
//   { title: dates[4], data: [{}] },
//   {
//     title: dates[5],
//     data: [
//       { hour: '9pm', duration: '1h', title: 'Middle Yoga' },
//       { hour: '10pm', duration: '1h', title: 'Ashtanga' },
//       { hour: '11pm', duration: '1h', title: 'TRX' },
//       { hour: '12pm', duration: '1h', title: 'Running Group' },
//     ],
//   },
//   {
//     title: dates[6],
//     data: [{ hour: '12am', duration: '1h', title: 'Ashtanga Yoga' }],
//   },
//   { title: dates[7], data: [{}] },
//   {
//     title: dates[8],
//     data: [
//       { hour: '9pm', duration: '1h', title: 'Pilates Reformer' },
//       { hour: '10pm', duration: '1h', title: 'Ashtanga' },
//       { hour: '11pm', duration: '1h', title: 'TRX' },
//       { hour: '12pm', duration: '1h', title: 'Running Group' },
//     ],
//   },
//   {
//     title: dates[9],
//     data: [
//       { hour: '1pm', duration: '1h', title: 'Ashtanga Yoga' },
//       { hour: '2pm', duration: '1h', title: 'Deep Streches' },
//       { hour: '3pm', duration: '1h', title: 'Private Yoga' },
//     ],
//   },
//   {
//     title: dates[10],
//     data: [{ hour: '12am', duration: '1h', title: 'Last Yoga' }],
//   },
// ];


// class CalendarTask extends Component {

//   constructor(props) {
//     console.log("propsC", props)

//     // useFocusEffect(
//     //   React.useCallback(() => {
//     //     const unsubscribe = CalendarTask();
//     //     return () => unsubscribe;
//     //   }, []),
//     // ),
//     super(props);
//     console.log("props", props)
//     this.state = {
//       calendarItems: [],
//       agendaCalendarItem: [],
//       selectedDate: new Date(),
//       weekView: false,
//       calendarMonth: '',
//       calendarYear: '',
//       calendarDate: new Date(),
//       showModalDelete: false,
//       showCalander: false,
//       didToDelete: '',
//       agenda: '',
//       todayDate: '',

//       showFilter: false,

//       currentlyOpenSwipeable: null,
//       agendaApiTimeoutObj: undefined,
//       refreshing: true,
//       isVisible: false,
//     };
//     this.selectedRow;
//     this.component = [];
//     console.log("first", this.props.settings)
//     this.render();
//     this.refresh()
//   }

//   componentDidMount() {
//     // this.render()
//     // this.refresh()
//     this.props.getCalendarTasks
//     this.props.navigation.setOptions({
//       title: 'Calendar Tasks',
//       headerLeft: () => (
//         <View
//           style={[
//             global.styles.headerButtonsContainer,
//             { balignItems: 'center', },
//           ]}>
//           <TouchableOpacity
//             style={global.styles.headerButtonsContainer}
//             onPress={() =>
//               this.props.navigation.navigate('TaskList', {
//                 title: 'Task List',
//                 route: 'CalendarStack',
//                 month: this.state.calendarMonth,
//                 year: this.state.calendarYear,
//               })
//             }>
//             <Text
//               style={{
//                 color: this.props.settings.theme.textPrimary,
//                 fontSize: 16,
//                 fontWeight: '700',
//                 fontFamily: global.font_main,
//                 paddingVertical: 10,
//               }}>
//               {'All'}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       ),
//       headerRight: () => (
//         <View style={global.styles.headerButtonsContainer}>
//           <HeaderButton
//             icon={global.icon_plus}
//             style={{ padding: 10 }}
//             mode={this.props.settings.theme.mode}
//             //onPress={() => this.addContact()}
//             onPress={() =>
//               this.props.navigation.navigate('NewTask', {
//                 title: 'New Task',
//                 route: 'CalendarStack',
//               })
//             }
//           />
//         </View>
//       ),
//     });
//     let now = new Date();
//     this.setState(
//       {
//         calendarMonth: now.getMonth() + 1,
//         calendarYear: new Date().getFullYear(),
//       },
//       () => {
//         setTimeout(() => {
//           this.refresh();
//         }, 500);
//       },
//     );
//   }


//   // refresh() {
//   //   // this.props.getCalendarTasks({ month: `${now.getMonth() + 1}`, year: `${now.getFullYear()}` });
//   //   this.props.getCalendarTasks({ month: `${this.state.calendarMonth}`, year: `${this.state.calendarYear}` });

//   // }

//   deleteTask() {
//     if (this.state.didToDelete && this.state.didToDelete !== '') {
//       this.props.deleteTask({
//         did: this.state.didToDelete,
//       });
//       this.onRefresh();
//     }
//   }

//   componentWillReceiveProps(nextProps) {
//     this.refresh()
//     setTimeout(() => {
//       this.setState({ showCalander: true })
//     }, 500);
//     if (nextProps.tasksStatus === TASK_DELETETASK_SUCCESS) {
//       // console.log(nextProps, 'nextProps nextProps')
//       this.refresh();
//     }
//     console.log("show", this.state.showCalander)
//   }

//   componentWillReceiveProps(nextProps) {
//     console.log(nextProps.tasksCalendarTasks, 'nextProps.tasksCalendarTasks');
//     this.render();
//     let newItems = [];
//     let lastItem = null;
//     this.setTodayDate();
//     if (nextProps.tasksCalendarTasks.length > 0) {
//       let tasks = nextProps.tasksCalendarTasks.keySort('date');
//       console.log('calender task is as follows ', tasks);
//       tasks.map((item, index) => {
//         let momentDate = moment(item.date);
//         console.log('data of moment is ', momentDate);
//         let newTitle = moment(item.date).format('YYYY-MM-DD');
//         console.log('new title is as follows ', newTitle);
//         if (lastItem) {
//           if (lastItem.title === newTitle) {
//             let newData = lastItem.data;
//             newData.push({
//               hour: momentDate.format('hh:mm A'),
//               duration: '1h',
//               title: item.title,
//               dateString: momentDate.format('YYYY-MM-DD'),
//               contact: item.contact,
//               item: item,
//             });
//             lastItem = {
//               ...lastItem,
//               data: newData,
//             };
//           } else {
//             newItems.push(lastItem);
//             lastItem = null;

//             lastItem = {
//               title: newTitle,
//               dateString: momentDate.format('YYYY-MM-DD'),
//               data: [
//                 {
//                   hour: momentDate.format('hh:mm A'),
//                   duration: '1h',
//                   title: item.title,
//                   dateString: momentDate.format('YYYY-MM-DD'),
//                   contact: item.contact,
//                   item: item,
//                 },
//               ],
//             };
//             console.log('');
//           }
//         } else {
//           lastItem = {
//             title: newTitle,
//             dateString: momentDate.format('YYYY-MM-DD'),
//             data: [
//               {
//                 hour: momentDate.format('hh:mm A'),
//                 duration: '1h',
//                 title: item.title,
//                 dateString: momentDate.format('YYYY-MM-DD'),
//                 contact: item.contact,
//                 item: item,
//               },
//             ],
//           };
//         }

//         if (index >= tasks.length - 1) {
//           newItems.push(lastItem);
//         }
//       });
//       this.setState({
//         calendarItems: newItems,
//         agendaCalendarItem: newItems,
//       });
//     } else {
//       let momentDate = moment(this.state.calendarDate);
//       let newTitle = momentDate.toISOString().split('T')[0];

//       lastItem = {
//         title: newTitle,
//         dateString: momentDate.format('YYYY-MM-DD'),
//         data: [],
//       };
//       newItems.push(lastItem);
//       this.setState({
//         calendarItems: newItems,
//         todayDate: `${new Date().getFullYear()}-${(
//           '0' +
//           (new Date().getMonth() + 1)
//         ).slice(-2)}-${('0' + new Date().getDate()).slice(-2)}`,
//         agendaCalendarItem: newItems,
//       });
//       {
//         console.log('xxxpp', this.state.todayDate);
//       }
//     }

//     if (
//       this.props.tasksStatus === TASK_EDITTASK_SUCCESS &&
//       nextProps.tasksStatus === TASK_IDLE
//     ) {
//       this.refresh();
//     }

//     console.log(newItems, '1');
//   }

//   onDateChanged = (date, updateSource) => {
//     // console.log(date, 'date', updateSource);
//     if (updateSource == 'dayPress') {
//       let task = this.state.calendarItems;
//       let filterTask = task.filter(e => e.dateString == date);

//       // console.warn('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
//       // fetch and set data for date + week ahead
//       this.setState({
//         selectedDate: date,
//         agendaCalendarItem: filterTask,
//       });
//       console.log(date, '18558');
//       console.log(filterTask, '5252');
//       console.log(task, '52412');
//     } else {
//       this.setState({
//         selectedDate: date,
//       });
//     }
//   };

//   onMonthChange = (month, updateSource) => {
//     if (typeof this.state.agendaApiTimeoutObj !== 'undefined') {
//       clearTimeout(this.state.agendaApiTimeoutObj);
//     }
//     this.state.agendaApiTimeoutObj = setTimeout(() => {
//       if (month) {
//         AsyncStorage.getItem('newTask').then(response => {
//           if (response != '' && response != null) {
//             if (JSON.parse(response)) {
//               this.props.getCalendarTasks({
//                 month: `${month.month}`,
//                 year: `${month.year}`,
//                 flag: 1,
//               });
//               this.setState({
//                 calendarMonth: month.month,
//                 calendarYear: month.year,
//                 calendarDate: new Date(month.timestamp),
//               });
//               //  AsyncStorage.setItem('newTask', JSON.stringify(false));
//             } else {
//               this.props.getCalendarTasks({
//                 month: `${month.month}`,
//                 year: `${month.year}`,
//               });
//               this.setState({
//                 calendarMonth: month.month,
//                 calendarYear: month.year,
//                 calendarDate: new Date(month.timestamp),
//               });
//             }
//           } else {
//             this.props.getCalendarTasks({
//               month: `${month.month}`,
//               year: `${month.year}`,
//             });
//             this.setState({
//               calendarMonth: month.month,
//               calendarYear: month.year,
//               calendarDate: new Date(month.timestamp),
//             });
//           }
//         });
//       }
//     }, 400);
//   };

//   buttonPressed() {
//     Alert.alert('show more');
//   }

//   itemPressed(id) {
//     Alert.alert(id);
//   }
//   renderEmptyItem() {
//     return (
//       <View
//         style={[
//           styles.emptyItem,
//           { backgroundColor: this.props.settings.theme.bgSecondary },
//         ]}>
//         <Text
//           style={[
//             styles.emptyItemText,
//             { color: this.props.settings.theme.textPrimary },
//           ]}>
//           No Events Planned
//         </Text>
//       </View>
//     );
//   }

//   refresh() {
//     // AsyncStorage.getItem('newTask').then((response) => {
//     //   if (response != '' && response != null) {
//     //     console.log(JSON.parse(response), 'response');
//     //     if (JSON.parse(response)) {
//     //       console.log(JSON.parse(response), 'response1');
//     //       this.props.getCalendarTasks({ month: `${this.state.calendarMonth}`, year: `${this.state.calendarYear}`, flag: 1 });
//     //       //  AsyncStorage.setItem('newTask', JSON.stringify(false));
//     //     } else {
//     //       this.props.getCalendarTasks({ month: `${this.state.calendarMonth}`, year: `${this.state.calendarYear}` });
//     //     }
//     //   } else {
//     //     this.props.getCalendarTasks({ month: `${this.state.calendarMonth}`, year: `${this.state.calendarYear}` });
//     //   }
//     // });
//     this.props.getCalendarTasks({
//       month: `${this.state.calendarMonth}`,
//       year: `${this.state.calendarYear}`,
//       flag: 1,
//     });
//     setTimeout(() => {
//       this.setState({
//         refreshing: false,
//       });
//     }, 500);
//   }

//   setDateTimeFormat = date => {
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

//   renderItem = ({ item }) => {
//     if (_.isEmpty(item)) {
//       return this.renderEmptyItem();
//     }

//     // console.log(item, '*******************');
//     // var swipeoutBtns = [
//     //   {
//     //     text: 'Edit',
//     //     color: global.color_white,
//     //     backgroundColor: global.color_purple,
//     //     onPress: () => this.props.navigation.navigate('NewTask', {
//     //       title: 'Edit Task',
//     //       // contact: c,
//     //       cid: item.item.cid,
//     //       task: item,
//     //       route: 'CalendarStack',
//     //       onNavigateBack: this.refresh.bind(this)
//     //     })
//     //   },
//     //   {
//     //     text: 'Delete',
//     //     backgroundColor: global.color_red,
//     //     onPress: () => {
//     //       this.setState({ showModalDelete: true, didToDelete: item.item.did });
//     //     }
//     //   },
//     // ]

//     return (
//       // <Swipeout right={swipeoutBtns} style={{ backgroundColor: 'transparent' }}>

//       //   <CalendarTaskItem
//       //     title={item.item.title}
//       //     // subtitle={item.item.contact.first_name ? item.item.contact.first_name : '' + ' ' +
//       //     // item.item.contact.last_name ? item.item.contact.last_name : ''}
//       //     active={item.item.status === '1'}
//       //     bgColor={this.props.settings.theme.bgPrimary}
//       //     textColor={this.props.settings.theme.textPrimary}
//       //     onPress={() => {
//       //       console.log('task item - ' + JSON.stringify(item));
//       //       this.props.navigation.navigate('NewTask', {
//       //         title: 'Edit Task',
//       //         contact: item.item.contact,
//       //         //cid: item.item.cid,
//       //         task: item.item,
//       //         route: 'CalendarStack',
//       //         month: this.state.calendarMonth,
//       //         year: this.state.calendarYear,
//       //         onNavigateBack: this.refresh.bind(this)
//       //       });
//       //     }}
//       //     onPressCheckbox={() => {
//       //       // let task = this.props.route.params.task;
//       //       let params = {
//       //         did: item.item.did,
//       //         title: item.item.title,
//       //         status: item.item.status === '1' ? '0' : '1'
//       //       };

//       //       this.props.editTask(params);
//       //     }}
//       //     time={item.hour}
//       //     type={item.item.type}
//       //   />
//       // </Swipeout>
//       <Swipeable
//         ref={c => {
//           this.selectedRow = c;
//         }}
//         rightButtons={[
//           <TouchableOpacity
//             style={[
//               styles.rightSwipeItem,
//               { backgroundColor: global.color_purple },
//             ]}
//             onPress={() => {
//               this.props.navigation.navigate('NewTask', {
//                 title: 'Edit Task',
//                 contact: item.item.contact,
//                 //cid: item.item.cid,
//                 task: item.item,
//                 route: 'CalendarStack',
//                 month: this.state.calendarMonth,
//                 year: this.state.calendarYear,
//                 onNavigateBack: this.refresh.bind(this),
//               });
//               this.closeAll();
//             }}>
//             <MiniButton
//               icon={global.icon_pencil}
//               color={global.color_purple}
//               style={{ marginLeft: 1, marginBottom: -5 }}
//               onPress={() => {
//                 this.props.navigation.navigate('NewTask', {
//                   title: 'Edit Task',
//                   contact: item.item.contact,
//                   //cid: item.item.cid,
//                   task: item.item,
//                   route: 'CalendarStack',
//                   month: this.state.calendarMonth,
//                   year: this.state.calendarYear,
//                   onNavigateBack: this.refresh.bind(this),
//                 });
//                 this.closeAll();
//               }}
//             />
//             <Text
//               style={{
//                 color: global.color_white,
//                 marginLeft: 5,
//                 marginBottom: 5,
//               }}>
//               Edit
//             </Text>
//           </TouchableOpacity>,
//           <TouchableOpacity
//             style={[styles.rightSwipeItem, { backgroundColor: global.color_red }]}
//             onPress={() => {
//               this.setState({
//                 showModalDelete: true,
//                 didToDelete: item.item.did,
//               });
//               this.closeAll();
//             }}>
//             <MiniButton
//               icon={global.icon_delete}
//               color={global.color_red}
//               style={{ marginLeft: -1, marginBottom: -4 }}
//               onPress={() => {
//                 this.setState({
//                   showModalDelete: true,
//                   didToDelete: item.item.did,
//                 });
//                 this.closeAll();
//               }}
//             />
//             <Text style={styles.iconStyle}>Delete</Text>
//           </TouchableOpacity>,
//         ]}
//         onRightButtonsOpenRelease={this.onOpen}
//         onRightButtonsCloseRelease={this.onClose}>
//         {/* <CalendarTaskItem
//           title={item.item.title}
//           // subtitle={item.item.contact.first_name ? item.item.contact.first_name : '' + ' ' + 
//           // item.item.contact.last_name ? item.item.contact.last_name : ''}
//           active={item.item.status === '1'}
//           bgColor={this.props.settings.theme.bgPrimary}
//           textColor={this.props.settings.theme.textPrimary}
//           onPress={() => {
//             console.log('task item - ' + JSON.stringify(item));
//             this.props.navigation.navigate('NewTask', {
//               title: 'Edit Task',
//               contact: item.item.contact,
//               //cid: item.item.cid,
//               task: item.item,
//               route: 'CalendarStack',
//               month: this.state.calendarMonth,
//               year: this.state.calendarYear,
//               onNavigateBack: this.refresh.bind(this)
//             });
//           }}
//           onPressCheckbox={() => {
//             // let task = this.props.route.params.task;
//             let params = {
//               did: item.item.did,
//               title: item.item.title,
//               status: item.item.status === '1' ? '0' : '1'
//             };

//             this.props.editTask(params);
//           }}
//           time={item.hour}
//           type={item.item.type}
//         /> */}
//         <TaskItem
//           title={item.item.title}
//           subtitle={
//             this.setDateTimeFormat(item.item.date) + ' ' + item.item.type
//           }
//           active={item.item.status === '1'}
//           bgColor={this.props.settings.theme.bgPrimary}
//           textColor={this.props.settings.theme.textPrimary}
//           onPress={() => {
//             // console.log('task item - ' + JSON.stringify(item));
//             this.props.navigation.navigate('NewTask', {
//               title: 'Edit Task',
//               contact: item.item.contact,
//               //cid: item.item.cid,
//               task: item.item,
//               route: 'CalendarStack',
//               onNavigateBack: this.refresh.bind(this),
//             });
//           }}
//           onPressCheckbox={() => {
//             // let task = this.props.route.params.task;
//             let params = {
//               did: item.item.did,
//               title: item.item.title,
//               status: item.item.status === '1' ? '0' : '1',
//             };

//             this.props.editTask(params);
//           }}
//         />
//       </Swipeable>

//     );
//   };

//   getMarkedDates = () => {
//     const marked = {};
//     this.state.calendarItems.forEach(item => {
//       // NOTE: only mark dates with data
//       if (item.data && item.data.length > 0 && !_.isEmpty(item.data[0])) {
//         marked[item.dateString] = { marked: true };
//       } else {
//         marked[item.dateString] = { disabled: true };
//       }
//     });
//     return marked;
//   };

//   getTheme = () => {
//     const disabledColor = 'grey';
//     // const disabledColor = 'grey';
//     return {
//       // arrows
//       arrowColor: 'black',
//       arrowStyle: { padding: 0 },
//       // month
//       monthTextColor: 'black',
//       textMonthFontSize: 16,
//       textMonthFontFamily: 'HelveticaNeue',
//       textMonthFontWeight: 'bold',
//       // day names
//       textSectionTitleColor: 'black',
//       textDayHeaderFontSize: 12,
//       textDayHeaderFontFamily: 'HelveticaNeue',
//       textDayHeaderFontWeight: 'normal',
//       // dates
//       dayTextColor: themeColor,
//       textDayFontSize: 18,
//       textDayFontFamily: 'HelveticaNeue',
//       textDayFontWeight: '500',
//       textDayStyle: { marginTop: Platform.OS === 'android' ? 2 : 4 },
//       // selected date
//       selectedDayBackgroundColor: themeColor,
//       selectedDayTextColor: 'white',
//       // disabled date
//       textDisabledColor: disabledColor,
//       // dot (marked date)
//       dotColor: themeColor,
//       selectedDotColor: 'white',
//       disabledDotColor: disabledColor,
//       dotStyle: { marginTop: -2 },
//     };
//   };

//   onRefresh = () => {
//     console.log('refresh', {
//       month: `${this.state.calendarMonth}`,
//       year: `${this.state.calendarYear}`,
//       flag: 1,
//     });
//     this.props.getCalendarTasks({
//       month: `${this.state.calendarMonth}`,
//       year: `${this.state.calendarYear}`,
//       flag: 1,
//     });
//     this.render();
//   };

//   setTodayDate = () => {
//     let date = `${new Date().getFullYear()}-${(
//       '0' +
//       (new Date().getMonth() + 1)
//     ).slice(-2)}-${('0' + new Date().getDate()).slice(-2)}`;
//     this.setState({ todayDate: date });
//     // this.render();
//   };

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
//     console.log('renderrrr', this.props.settings.theme.bgPrimary);
//     return (


//       this.props.settings.theme.bgPrimary=="#ffffff"?
// //      <ScrollView style={{backgroundColor:'#ffffff'}}>
// //  <Text>hi</Text>
// //      </ScrollView>:
// //       <ScrollView style={{backgroundColor:'#000'}}>
// //        <Text>hlo</Text>
// //           </ScrollView>

//         (
//           <ScrollView
//             style={{
//               backgroundColor: '#ffffff'
//               // backgroundColor: this.props.settings.theme.bgPrimary
//             }}
//             refreshControl={
//               <RefreshControl
//                 tintColor={global.color_theme2}
//                 onRefresh={() => this.onRefresh()}
//                 refreshing={this.state.refreshing}
//               />
//             }>
//             <View
//               style={{ paddingBottom: 35, height: 350, overflow: 'hidden', }}
//               onStartShouldSetResponder={() => this.closeAll()}>
//               {/* <Text style={{color:'red'}}>{this.props.settings.theme.bgPrimary}</Text> */}



//               <CalendarProvider

//                 style={{
//                   // backgroundColor: this.props.settings.theme.bgSecondary,

//                   backgroundColor: '#ffffff',

//                   position: 'relative',
//                 }}
//                 date={
//                   this.state.calendarItems.length > 0 ? this.state.todayDate : ''
//                 }
//                 onDateChanged={this.onDateChanged}
//                 onMonthChange={this.onMonthChange}
//                 showTodayButton
//                 disabledOpacity={0.6}
//                 theme={{
//                   // calendarBackground: this.props.settings.theme.bgSecondary,
//                   calendarBackground: '#ffffff',
//                   todayButtonTextColor: global.color_theme,
//                 }}
//                 horizontal={true}
//                 // Enable paging on horizontal, default = false
//                 pagingEnabled={true}
//                 todayBottomMargin={15}>
//                 {
//                   //this.props.weekView ?
//                   this.state.weekView ? (
//                     <WeekCalendar
//                       testID={testIDs.weekCalendar.CONTAINER}
//                       firstDay={1}
//                       markedDates={this.getMarkedDates()}
//                       style={[
//                         styles.item,
//                         {
//                           backgroundColor: "#ffffff"
//                           // backgroundColor: this.props.settings.theme.bgSecondary,
//                         },
//                       ]}
//                     />
//                   ) : (
//                     <ExpandableCalendar
//                       testID={testIDs.expandableCalendar.CONTAINER}
//                       theme={{
//                         calendarBackground: "#ffffff",
//                         selectedDayBackgroundColor: global.color_theme,
//                         selectedDayTextColor: this.props.settings.theme.bgPrimary,
//                         selectedDotColor: this.props.settings.theme.bgPrimary,
//                         monthTextColor: this.props.settings.theme.textPrimary,
//                         arrowColor: global.color_theme,
//                         indicatorColor: global.color_theme,
//                         dotColor: global.color_theme,
//                         todayTextColor: global.color_theme,

//                       }}
//                       // horizontal={false}
//                       // hideArrows
//                       // disablePan
//                       // hideKnob
//                       initialPosition={ExpandableCalendar.positions.OPEN}
//                       // calendarStyle={styles.calendar}
//                       // headerStyle={styles.calendar} // for horizontal only
//                       disableWeekScroll
//                       // theme={this.getTheme()}
//                       disableAllTouchEventsForDisabledDays
//                       firstDay={1}
//                       disablePan={true}
//                       markedDates={this.getMarkedDates()} // {'2019-06-01': {marked: true}, '2019-06-02': {marked: true}, '2019-06-03': {marked: true}};
//                       leftArrowImageSource={require('../img/previous.png')}
//                       rightArrowImageSource={require('../img/next.png')}

//                     />
//                   )
//                 }
//                 {/* <View style={styles.fixToText}>
//             <Button
//               title="Today"
//               onPress={() => this.setTodayDate()}
//               color={global.color_theme}
//             />
//           </View> */}
//                 {/* <AgendaList
//             sections={this.state.agendaCalendarItem}
//             extraData={this.state}
//             renderItem={this.renderItem}
//             theme={{
//               calendarBackground: this.props.settings.theme.bgSecondary,
//             }}
//             sectionStyle={(section) => [
//               section.dateString === this.state.selectedDate ? { backgroundColor: 'red' } : {}
//             ]}
//             hideKnob={true}
//           />
//           <ModalAlert
//             onBackdropPress={() => this.setState({ showModalDelete: false })}
//             isVisible={this.state.showModalDelete}
//             title={'Delete Task'}
//             message={'Are you sure you want to delete this Task?'}
//             alertIcon={this.state.alertIcon}
//             buttons={[
//               { text: 'Cancel', onPress: () => this.setState({ showModalDelete: false }), type: 'cancel' },
//               {
//                 text: 'Delete', onPress: () => {
//                   this.setState({ showModalDelete: false });
//                   this.deleteTask();
//                 }
//               },
//             ]}
//             dark={this.props.settings.theme.mode === 'dark'}
//             bgColor={this.props.settings.theme.bgPrimary}
//             textColor={this.props.settings.theme.textPrimary}
//           /> */}
//               </CalendarProvider>
//             </View>

//             <View onStartShouldSetResponder={() => this.closeAll()}>
//               <CalendarProvider>
//                 <AgendaList
//                   sections={this.state.agendaCalendarItem}
//                   extraData={this.state}
//                   renderItem={this.renderItem}
//                   theme={{
//                     // calendarBackground:this.props.settings.theme.bgSecondary,
//                     calendarBackground: "#ffffff",
//                   }}
//                   sectionStyle={section => [
//                     section.dateString === this.state.selectedDate
//                       ? { backgroundColor: 'red' }
//                       : {},
//                   ]}
//                   hideKnob={true}
//                 />
//                 <ModalAlert
//                   onBackdropPress={() => this.setState({ showModalDelete: false })}
//                   isVisible={this.state.showModalDelete}
//                   title={'Delete Task'}
//                   message={'Are you sure you want to delete this Task?'}
//                   alertIcon={this.state.alertIcon}
//                   buttons={[
//                     {
//                       text: 'Cancel',
//                       onPress: () => this.setState({ showModalDelete: false }),
//                       type: 'cancel',
//                     },
//                     {
//                       text: 'Delete',
//                       onPress: () => {
//                         this.setState({ showModalDelete: false });
//                         this.deleteTask();
//                       },
//                     },
//                   ]}
//                   dark={this.props.settings.theme.mode === 'dark'}
//                   bgColor={this.props.settings.theme.bgPrimary}
//                   textColor={this.props.settings.theme.textPrimary}
//                 />
//               </CalendarProvider>
//               <Modal
//                 isVisible={this.state.isVisible}
//                 style={{ padding: 0, margin: 0 }}>
//                 <View
//                   style={[
//                     styles.modalBottom,
//                     {
//                       backgroundColor: "#ffffff",
//                     },
//                   ]}>
//                   <FormDropdown
//                     value={this.state.type}
//                     textColor={this.props.settings.theme.textPrimary}
//                     bgColor={this.props.settings.theme.inputBg}
//                     label={'Type'}
//                     icon={global.icon_dropdown}
//                     onPress={() => {
//                       this.setState({
//                         alertListVisible: true,
//                         alertListTitle: 'Select Task Type',
//                         alertListData: [],
//                         alertListSave: () => {
//                           this.setState({ alertListVisible: false });
//                         },
//                       });
//                       this.props.getTaskTypes({ alertListVisible: false });
//                     }}
//                   />
//                 </View>
//               </Modal>
//             </View>
//           </ScrollView>
//         ) : (
//           <ScrollView
//             style={{
//               backgroundColor: "#000"
//             }}
//             refreshControl={
//               <RefreshControl
//                 tintColor={global.color_theme2}
//                 onRefresh={() => this.onRefresh()}
//                 refreshing={this.state.refreshing}
//               />
//             }>
//             <View
//               style={{ paddingBottom: 35, height: 350, overflow: 'hidden', }}
//               onStartShouldSetResponder={() => this.closeAll()}>
//               {/* <Text style={{color:'red'}}>{this.props.settings.theme.bgPrimary}</Text> */}



//               <CalendarProvider

//                 style={{
//                   // backgroundColor: this.props.settings.theme.bgSecondary,

//                   backgroundColor: "#000",

//                   position: 'relative',
//                 }}
//                 date={
//                   this.state.calendarItems.length > 0 ? this.state.todayDate : ''
//                 }
//                 onDateChanged={this.onDateChanged}
//                 onMonthChange={this.onMonthChange}
//                 showTodayButton
//                 disabledOpacity={0.6}
//                 theme={{
//                   // calendarBackground: this.props.settings.theme.bgSecondary,
//                   backgroundColor: "#000",
//                   todayButtonTextColor: global.color_theme,
//                 }}
//                 horizontal={true}
//                 // Enable paging on horizontal, default = false
//                 pagingEnabled={true}
//                 todayBottomMargin={15}>
//                 {
//                   //this.props.weekView ?
//                   this.state.weekView ? (
//                     <WeekCalendar
//                       testID={testIDs.weekCalendar.CONTAINER}
//                       firstDay={1}
//                       markedDates={this.getMarkedDates()}
//                       style={[
//                         styles.item,
//                         {
//                           backgroundColor: "#000"
//                           // backgroundColor: this.props.settings.theme.bgSecondary,
//                         },
//                       ]}
//                     />
//                   ) : (
//                     <ExpandableCalendar
//                       testID={testIDs.expandableCalendar.CONTAINER}
//                       theme={{
//                         calendarBackground: '#000',
//                         selectedDayBackgroundColor: global.color_theme,
//                         selectedDayTextColor: this.props.settings.theme.bgPrimary,
//                         selectedDotColor: this.props.settings.theme.bgPrimary,
//                         monthTextColor: this.props.settings.theme.textPrimary,
//                         arrowColor: global.color_theme,
//                         indicatorColor: global.color_theme,
//                         dotColor: global.color_theme,
//                         todayTextColor: global.color_theme,

//                       }}
//                       // horizontal={false}
//                       // hideArrows
//                       // disablePan
//                       // hideKnob
//                       initialPosition={ExpandableCalendar.positions.OPEN}
//                       // calendarStyle={styles.calendar}
//                       // headerStyle={styles.calendar} // for horizontal only
//                       disableWeekScroll
//                       // theme={this.getTheme()}
//                       disableAllTouchEventsForDisabledDays
//                       firstDay={1}
//                       disablePan={true}
//                       markedDates={this.getMarkedDates()} // {'2019-06-01': {marked: true}, '2019-06-02': {marked: true}, '2019-06-03': {marked: true}};
//                       leftArrowImageSource={require('../img/previous.png')}
//                       rightArrowImageSource={require('../img/next.png')}

//                     />
//                   )
//                 }
//                 {/* <View style={styles.fixToText}>
//             <Button
//               title="Today"
//               onPress={() => this.setTodayDate()}
//               color={global.color_theme}
//             />
//           </View> */}
//                 {/* <AgendaList
//             sections={this.state.agendaCalendarItem}
//             extraData={this.state}
//             renderItem={this.renderItem}
//             theme={{
//               calendarBackground: this.props.settings.theme.bgSecondary,
//             }}
//             sectionStyle={(section) => [
//               section.dateString === this.state.selectedDate ? { backgroundColor: 'red' } : {}
//             ]}
//             hideKnob={true}
//           />
//           <ModalAlert
//             onBackdropPress={() => this.setState({ showModalDelete: false })}
//             isVisible={this.state.showModalDelete}
//             title={'Delete Task'}
//             message={'Are you sure you want to delete this Task?'}
//             alertIcon={this.state.alertIcon}
//             buttons={[
//               { text: 'Cancel', onPress: () => this.setState({ showModalDelete: false }), type: 'cancel' },
//               {
//                 text: 'Delete', onPress: () => {
//                   this.setState({ showModalDelete: false });
//                   this.deleteTask();
//                 }
//               },
//             ]}
//             dark={this.props.settings.theme.mode === 'dark'}
//             bgColor={this.props.settings.theme.bgPrimary}
//             textColor={this.props.settings.theme.textPrimary}
//           /> */}
//               </CalendarProvider>
//             </View>

//             <View onStartShouldSetResponder={() => this.closeAll()}>
//               {/* <CalendarProvider> */}
//                 <AgendaList
//                   sections={this.state.agendaCalendarItem}
//                   extraData={this.state}
//                   renderItem={this.renderItem}
//                   theme={{
//                     calendarBackground: "#000",
//                     // calendarBackground: this.props.settings.theme.bgPrimary,


//                   }}
//                   sectionStyle={section => [
//                     section.dateString === this.state.selectedDate
//                       ? { backgroundColor: 'red' }
//                       : {},
//                   ]}
//                   hideKnob={true}
//                 />
//                 <ModalAlert
//                   onBackdropPress={() => this.setState({ showModalDelete: false })}
//                   isVisible={this.state.showModalDelete}
//                   title={'Delete Task'}
//                   message={'Are you sure you want to delete this Task?'}
//                   alertIcon={this.state.alertIcon}
//                   buttons={[
//                     {
//                       text: 'Cancel',
//                       onPress: () => this.setState({ showModalDelete: false }),
//                       type: 'cancel',
//                     },
//                     {
//                       text: 'Delete',
//                       onPress: () => {
//                         this.setState({ showModalDelete: false });
//                         this.deleteTask();
//                       },
//                     },
//                   ]}
//                   dark={this.props.settings.theme.mode === 'dark'}
//                   bgColor={this.props.settings.theme.bgPrimary}
//                   textColor={this.props.settings.theme.textPrimary}
//                 />
//               {/* </CalendarProvider> */}
//               <Modal
//                 isVisible={this.state.isVisible}
//                 style={{ padding: 0, margin: 0 }}>
//                 <View
//                   style={[
//                     styles.modalBottom,
//                     {
//                       backgroundColor: this.props.settings.theme.bgPrimary,
//                     },
//                   ]}>
//                   <FormDropdown
//                     value={this.state.type}
//                     textColor={this.props.settings.theme.textPrimary}
//                     bgColor={this.props.settings.theme.inputBg}
//                     label={'Type'}
//                     icon={global.icon_dropdown}
//                     onPress={() => {
//                       this.setState({
//                         alertListVisible: true,
//                         alertListTitle: 'Select Task Type',
//                         alertListData: [],
//                         alertListSave: () => {
//                           this.setState({ alertListVisible: false });
//                         },
//                       });
//                       this.props.getTaskTypes({ alertListVisible: false });
//                     }}
//                   />
//                 </View>
//               </Modal>
//             </View>
//           </ScrollView>
//         )
//     );
//   }
// }

// const styles = StyleSheet.create({
//   calendar: {
//     paddingLeft: 20,
//     paddingRight: 20,
//   },
//   fixToText: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   section: {
//     backgroundColor: 'red', //lightThemeColor,
//     color: 'grey',
//     textTransform: 'capitalize',
//   },
//   item: {
//     padding: 20,
//     backgroundColor: 'transparent',
//     borderBottomWidth: 1,
//     borderBottomColor: 'lightgrey',
//     flexDirection: 'row',
//   },
//   itemHourText: {
//     color: 'black',
//   },
//   itemDurationText: {
//     color: 'grey',
//     fontSize: 10,
//     marginTop: 8,
//     textTransform: 'capitalize',
//   },
//   itemTitleText: {
//     color: 'black',
//     fontWeight: 'bold',
//     fontSize: 14,
//   },
//   itemButtonContainer: {
//     flex: 1,
//     alignItems: 'flex-end',
//   },
//   emptyItem: {
//     paddingLeft: 20,
//     height: 52,
//     justifyContent: 'center',
//     borderBottomWidth: 1,
//     borderBottomColor: 'lightgrey',
//   },
//   emptyItemText: {
//     color: 'lightgrey',
//     fontSize: 14,
//   },
//   rightSwipeItem: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingLeft: 20,
//   },
//   iconStyle: {
//     color: global.color_white,
//     marginLeft: -3,
//     marginBottom: 6,
//   },
//   searchContainer: {
//     paddingTop: 10,
//     paddingHorizontal: 20,
//     marginBottom: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   searchBoxContainer: {
//     backgroundColor: 'rgba(0,0,0,0.08)',
//     flex: 1,
//     height: 50,
//     borderRadius: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   searchIcon: {
//     width: 20,
//     height: 20,
//     tintColor: global.color_medgray,
//     marginLeft: 15,
//     marginRight: 10,
//     position: 'absolute',
//   },
//   textInput: {
//     fontFamily: global.font_main,
//     fontSize: 18,
//     color: global.color_darkgray,
//     paddingLeft: 40,
//     flex: 1,
//   },
//   filterButton: {
//     width: 50,
//     height: 50,
//     padding: 13,
//     borderRadius: 13,
//     backgroundColor: global.color_theme,
//     marginLeft: 10,
//   },
//   filterIcon: {
//     tintColor: global.color_white,
//     width: '100%',
//     height: '100%',
//     resizeMode: 'contain',
//   },
//   modalBottom: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     padding: 30,
//     paddingBottom: 0,
//     width: '100%',
//     backgroundColor: global.color_white,
//     borderTopLeftRadius: 40,
//     borderTopRightRadius: 40,
//   },
// });

// const mapStateToProps = ({ settings, tasks }) => {
//   const { tasksStatus, tasksError, tasksList, tasksCalendarTasks } = tasks;
//   return {
//     settings,
//     tasksStatus,
//     tasksError,
//     tasksList,
//     tasksCalendarTasks,
//   };
// };

// export default connect(mapStateToProps, {
//   getCalendarTasks,
//   editTask,
//   deleteTask,
// })(CalendarTask);












import _ from 'lodash';
import React, { Component, PureComponent } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  Button,
  Image,
  TextInput,
  RefreshControl,
  ScrollView,
} from 'react-native';
import Swipeable from 'react-native-swipeable';
import { useIsFocused } from '@react-navigation/native'
import {
  ExpandableCalendar,
  AgendaList,
  CalendarProvider,
  WeekCalendar,
} from 'react-native-calendars';
import Swipeout from 'react-native-swipeout';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import {
  HeaderButton,
  MiniButton,
  IndicatorBottom,
  CalendarTaskItem,
  ModalChecklist,
  TaskItem,
  ModalAlert,
  FormDropdown,
  FilterButton,
} from '../common';
import { getCalendarTasks, editTask, deleteTask, getTaskTypes } from '../actions';
import {
  TASK_EDITTASK_SUCCESS,
  TASK_DELETETASK_SUCCESS,
  TASK_IDLE,
} from '../actions/types';
import { FormatTime } from '../utils/Helper';
import { backgroundColor, marginRight } from 'styled-system';
import { useFocusEffect } from '@react-navigation/native';
const testIDs = require('../testIDs');

const today = new Date().toISOString().split('T')[0];
const fastDate = getPastDate(3);
const futureDates = getFutureDates(9);
const dates = [fastDate, today].concat(futureDates);
const themeColor = 'red'; //'#00AAAF';
const lightThemeColor = 'transparent'; // '#EBF9F9';

function getFutureDates(days) {
  const array = [];
  for (let index = 1; index <= days; index++) {
    const date = new Date(Date.now() + 864e5 * index); // 864e5 == 86400000 == 24*60*60*1000
    const dateString = date.toISOString().split('T')[0];
    array.push(dateString);
  }
  return array;
}



function getPastDate(days) {
  return new Date(Date.now() - 864e5 * days).toISOString().split('T')[0];
}

const ITEMS = [
  {
    title: dates[0],
    data: [{ hour: '12am', duration: '1h', title: 'First Yoga' }],
  },
  {
    title: dates[1],
    data: [
      { hour: '4pm', duration: '1h', title: 'Pilates ABC' },
      { hour: '5pm', duration: '1h', title: 'Vinyasa Yoga' },
    ],
  },
  {
    title: dates[2],
    data: [
      { hour: '1pm', duration: '1h', title: 'Ashtanga Yoga' },
      { hour: '2pm', duration: '1h', title: 'Deep Streches' },
      { hour: '3pm', duration: '1h', title: 'Private Yoga' },
    ],
  },
  {
    title: dates[3],
    data: [{ hour: '12am', duration: '1h', title: 'Ashtanga Yoga' }],
  },
  { title: dates[4], data: [{}] },
  {
    title: dates[5],
    data: [
      { hour: '9pm', duration: '1h', title: 'Middle Yoga' },
      { hour: '10pm', duration: '1h', title: 'Ashtanga' },
      { hour: '11pm', duration: '1h', title: 'TRX' },
      { hour: '12pm', duration: '1h', title: 'Running Group' },
    ],
  },
  {
    title: dates[6],
    data: [{ hour: '12am', duration: '1h', title: 'Ashtanga Yoga' }],
  },
  { title: dates[7], data: [{}] },
  {
    title: dates[8],
    data: [
      { hour: '9pm', duration: '1h', title: 'Pilates Reformer' },
      { hour: '10pm', duration: '1h', title: 'Ashtanga' },
      { hour: '11pm', duration: '1h', title: 'TRX' },
      { hour: '12pm', duration: '1h', title: 'Running Group' },
    ],
  },
  {
    title: dates[9],
    data: [
      { hour: '1pm', duration: '1h', title: 'Ashtanga Yoga' },
      { hour: '2pm', duration: '1h', title: 'Deep Streches' },
      { hour: '3pm', duration: '1h', title: 'Private Yoga' },
    ],
  },
  {
    title: dates[10],
    data: [{ hour: '12am', duration: '1h', title: 'Last Yoga' }],
  },
];


class CalendarTask extends Component {

  constructor(props) {
    console.log("propsC", props)

    // useFocusEffect(
    //   React.useCallback(() => {
    //     const unsubscribe = CalendarTask();
    //     return () => unsubscribe;
    //   }, []),
    // ),
    super(props);
    console.log("props", props)
    this.state = {
      calendarItems: [],
      agendaCalendarItem: [],
      selectedDate: new Date(),
      weekView: false,
      calendarMonth: '',
      calendarYear: '',
      calendarDate: new Date(),
      showModalDelete: false,
      showCalander: true,
      didToDelete: '',
      agenda: '',
      todayDate: '',
      themMode :'',

      showFilter: false,

      currentlyOpenSwipeable: null,
      agendaApiTimeoutObj: undefined,
      refreshing: true,
      isVisible: false,
    };
    this.selectedRow;
    this.component = [];
    console.log("first", this.props.settings)
    // this.render();
  }


  componentDidMount() {
    this.header()
  }

  header () {
    this.props.getCalendarTasks
    this.props.navigation.setOptions({
      title: 'Calendar Tasks',
      headerLeft: () => (
        <View
          style={[
            global.styles.headerButtonsContainer,
            { balignItems: 'center', },
          ]}>
          <TouchableOpacity
            style={global.styles.headerButtonsContainer}
            onPress={() =>
              this.props.navigation.navigate('TaskList', {
                title: 'Task List',
                route: 'CalendarStack',
                month: this.state.calendarMonth,
                year: this.state.calendarYear,
              })
            }>
            <Text
              style={{
                color: '#696969',
                fontSize: 16,
                fontWeight: '700',
                fontFamily: global.font_main,
                paddingVertical: 10,
              }}>
              {'All'}
            </Text>
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        console.log("first",this.props.settings.theme.mode),
        <View style={global.styles.headerButtonsContainer}>
          <HeaderButton
            icon={global.icon_plus}
            style={{ padding: 10 }}
            mode={this.props.settings.theme.mode==="dark"? '#ffff' : "#696969"}
            //onPress={() => this.addContact()}
            onPress={() =>
              this.props.navigation.navigate('NewTask', {
                title: 'New Task',
                route: 'CalendarStack',
              })
            }
          />
        </View>
      ),
    });
    let now = new Date();
    this.setState(
      {
        calendarMonth: now.getMonth() + 1,
        calendarYear: new Date().getFullYear(),
      },
      () => {
        setTimeout(() => {
          this.refresh();
        }, 500);
      },
    );
  }


  // refresh() {
  //   // this.props.getCalendarTasks({ month: `${now.getMonth() + 1}`, year: `${now.getFullYear()}` });
  //   this.props.getCalendarTasks({ month: `${this.state.calendarMonth}`, year: `${this.state.calendarYear}` });

  // }

  deleteTask() {
    if (this.state.didToDelete && this.state.didToDelete !== '') {
      this.props.deleteTask({
        did: this.state.didToDelete,
      });
      this.onRefresh();
    }
  }
  

  componentWillReceiveProps(nextProps) {
    // console.log("show", this.props.settings)
    // console.log("nextProps", nextProps.settings)
   

    

    // if(this.props.settings.theme.mode!==nextProps.settings.theme.mode){
    //   this.setState({ showCalander: false })
    //   setTimeout(() => {
    //     this.setState({ showCalander: true })
    //   }, 1000);
    // }

    if(nextProps.settings.theme.mode!== this.props.settings.theme.mode){
      this.setState({ showCalander: false })
      this.header()
    setTimeout(() => {
      this.setState({ showCalander: true })
    }, 1000);
    }

   
   

    if (nextProps.tasksStatus === TASK_DELETETASK_SUCCESS) {
      // console.log(nextProps, 'nextProps nextProps')
      this.refresh();
    }
    // console.log("show", this.props)
    // }

    // componentWillReceiveProps(nextProps) {
    // console.log(nextProps.tasksCalendarTasks, 'nextProps.tasksCalendarTasks');

    let newItems = [];
    let lastItem = null;
    this.setTodayDate();
    if (nextProps.tasksCalendarTasks.length > 0) {
      let tasks = nextProps.tasksCalendarTasks.keySort('date');
      console.log('calender task is as follows ', tasks);
      tasks.map((item, index) => {
        let momentDate = moment(item.date);
        console.log('data of moment is ', momentDate);
        console.log('data of moment is ', item.date);
        let newTitle = moment(item.date).format('YYYY-MM-DD');
        console.log('new title is as follows ', newTitle);
        if (lastItem) {
          if (lastItem.title === newTitle) {
            let newData = lastItem.data;
            newData.push({
              hour: momentDate.format('hh:mm A'),
              duration: '1h',
              title: item.title,
              dateString: momentDate.format('YYYY-MM-DD'),
              contact: item.contact,
              item: item,
            });
            lastItem = {
              ...lastItem,
              data: newData,
            };
          } else {
            newItems.push(lastItem);
            lastItem = null;

            lastItem = {
              title: newTitle,
              dateString: momentDate.format('YYYY-MM-DD'),
              data: [
                {
                  hour: momentDate.format('hh:mm A'),
                  duration: '1h',
                  title: item.title,
                  dateString: momentDate.format('YYYY-MM-DD'),
                  contact: item.contact,
                  item: item,
                },
              ],
            };
            console.log('');
          }
        } else {
          lastItem = {
            title: newTitle,
            dateString: momentDate.format('YYYY-MM-DD'),
            data: [
              {
                hour: momentDate.format('hh:mm A'),
                duration: '1h',
                title: item.title,
                dateString: momentDate.format('YYYY-MM-DD'),
                contact: item.contact,
                item: item,
              },
            ],
          };
        }

        if (index >= tasks.length - 1) {
          newItems.push(lastItem);
        }
      });
      this.setState({
        calendarItems: newItems,
        agendaCalendarItem: newItems,
        
      });
    } else {
      let momentDate = moment(this.state.calendarDate);
      let newTitle = momentDate.toISOString().split('T')[0];

      lastItem = {
        title: newTitle,
        dateString: momentDate.format('YYYY-MM-DD'),
        data: [],
      };
      newItems.push(lastItem);
      this.setState({
        calendarItems: newItems,
        todayDate: `${new Date().getFullYear()}-${(
          '0' +
          (new Date().getMonth() + 1)
        ).slice(-2)}-${('0' + new Date().getDate()).slice(-2)}`,
        agendaCalendarItem: newItems,
      });
      {
        console.log('xxxpp', this.state.todayDate);
      }
    }

    if (
      this.props.tasksStatus === TASK_EDITTASK_SUCCESS &&
      nextProps.tasksStatus === TASK_IDLE
    ) {
      this.refresh();
    }

    console.log(newItems, '1');
  }

  onDateChanged = (date, updateSource) => {
    // console.log(date, 'date', updateSource);
    if (updateSource == 'dayPress') {
      let task = this.state.calendarItems;
      let filterTask = task.filter(e => e.dateString == date);

      // console.warn('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
      // fetch and set data for date + week ahead
      this.setState({
        selectedDate: date,
        agendaCalendarItem: filterTask,
      });
      console.log(date, '18558');
      console.log(filterTask, '5252');
      console.log(task, '52412');
    } else {
      this.setState({
        selectedDate: date,
      });
    }
  };

  onMonthChange = (month, updateSource) => {
    if (typeof this.state.agendaApiTimeoutObj !== 'undefined') {
      clearTimeout(this.state.agendaApiTimeoutObj);
    }
    this.state.agendaApiTimeoutObj = setTimeout(() => {
      if (month) {
        AsyncStorage.getItem('newTask').then(response => {
          if (response != '' && response != null) {
            if (JSON.parse(response)) {
              this.props.getCalendarTasks({
                month: `${month.month}`,
                year: `${month.year}`,
                flag: 1,
              });
              this.setState({
                calendarMonth: month.month,
                calendarYear: month.year,
                calendarDate: new Date(month.timestamp),
              });
              //  AsyncStorage.setItem('newTask', JSON.stringify(false));
            } else {
              this.props.getCalendarTasks({
                month: `${month.month}`,
                year: `${month.year}`,
              });
              this.setState({
                calendarMonth: month.month,
                calendarYear: month.year,
                calendarDate: new Date(month.timestamp),
              });
            }
          } else {
            this.props.getCalendarTasks({
              month: `${month.month}`,
              year: `${month.year}`,
            });
            this.setState({
              calendarMonth: month.month,
              calendarYear: month.year,
              calendarDate: new Date(month.timestamp),
            });
          }
        });
      }
    }, 400);
  };

  buttonPressed() {
    Alert.alert('show more');
  }

  itemPressed(id) {
    Alert.alert(id);
  }
  renderEmptyItem() {
    return (
      <View
        style={[
          styles.emptyItem,
          { backgroundColor: this.props.settings.theme.bgSecondary },
        ]}>
        <Text
          style={[
            styles.emptyItemText,
            { color: this.props.settings.theme.textPrimary },
          ]}>
          No Events Planned
        </Text>
      </View>
    );
  }

  refresh() {
    // AsyncStorage.getItem('newTask').then((response) => {
    //   if (response != '' && response != null) {
    //     console.log(JSON.parse(response), 'response');
    //     if (JSON.parse(response)) {
    //       console.log(JSON.parse(response), 'response1');
    //       this.props.getCalendarTasks({ month: `${this.state.calendarMonth}`, year: `${this.state.calendarYear}`, flag: 1 });
    //       //  AsyncStorage.setItem('newTask', JSON.stringify(false));
    //     } else {
    //       this.props.getCalendarTasks({ month: `${this.state.calendarMonth}`, year: `${this.state.calendarYear}` });
    //     }
    //   } else {
    //     this.props.getCalendarTasks({ month: `${this.state.calendarMonth}`, year: `${this.state.calendarYear}` });
    //   }
    // });
    this.props.getCalendarTasks({
      month: `${this.state.calendarMonth}`,
      year: `${this.state.calendarYear}`,
      flag: 1,
    });
    setTimeout(() => {
      this.setState({
        refreshing: false,
      });
    }, 2000);
  }

  setDateTimeFormat = date => {
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

  renderItem = ({ item }) => {
    if (_.isEmpty(item)) {
      return this.renderEmptyItem();
    }

    // console.log(item, '*******************');
    // var swipeoutBtns = [
    //   {
    //     text: 'Edit',
    //     color: global.color_white,
    //     backgroundColor: global.color_purple,
    //     onPress: () => this.props.navigation.navigate('NewTask', {
    //       title: 'Edit Task',
    //       // contact: c,
    //       cid: item.item.cid,
    //       task: item,
    //       route: 'CalendarStack',
    //       onNavigateBack: this.refresh.bind(this)
    //     })
    //   },
    //   {
    //     text: 'Delete',
    //     backgroundColor: global.color_red,
    //     onPress: () => {
    //       this.setState({ showModalDelete: true, didToDelete: item.item.did });
    //     }
    //   },
    // ]

    return (
      // <Swipeout right={swipeoutBtns} style={{ backgroundColor: 'transparent' }}>

      //   <CalendarTaskItem
      //     title={item.item.title}
      //     // subtitle={item.item.contact.first_name ? item.item.contact.first_name : '' + ' ' +
      //     // item.item.contact.last_name ? item.item.contact.last_name : ''}
      //     active={item.item.status === '1'}
      //     bgColor={this.props.settings.theme.bgPrimary}
      //     textColor={this.props.settings.theme.textPrimary}
      //     onPress={() => {
      //       console.log('task item - ' + JSON.stringify(item));
      //       this.props.navigation.navigate('NewTask', {
      //         title: 'Edit Task',
      //         contact: item.item.contact,
      //         //cid: item.item.cid,
      //         task: item.item,
      //         route: 'CalendarStack',
      //         month: this.state.calendarMonth,
      //         year: this.state.calendarYear,
      //         onNavigateBack: this.refresh.bind(this)
      //       });
      //     }}
      //     onPressCheckbox={() => {
      //       // let task = this.props.route.params.task;
      //       let params = {
      //         did: item.item.did,
      //         title: item.item.title,
      //         status: item.item.status === '1' ? '0' : '1'
      //       };

      //       this.props.editTask(params);
      //     }}
      //     time={item.hour}
      //     type={item.item.type}
      //   />
      // </Swipeout>
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
              this.props.navigation.navigate('NewTask', {
                title: 'Edit Task',
                contact: item.item.contact,
                //cid: item.item.cid,
                task: item.item,
                route: 'CalendarStack',
                month: this.state.calendarMonth,
                year: this.state.calendarYear,
                onNavigateBack: this.refresh.bind(this),
              });
              this.closeAll();
            }}>
            <MiniButton
              icon={global.icon_pencil}
              color={global.color_purple}
              style={{ marginLeft: 1, marginBottom: -5 }}
              onPress={() => {
                this.props.navigation.navigate('NewTask', {
                  title: 'Edit Task',
                  contact: item.item.contact,
                  //cid: item.item.cid,
                  task: item.item,
                  route: 'CalendarStack',
                  month: this.state.calendarMonth,
                  year: this.state.calendarYear,
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
            style={[styles.rightSwipeItem, { backgroundColor: global.color_red }]}
            onPress={() => {
              this.setState({
                showModalDelete: true,
                didToDelete: item.item.did,
              });
              this.closeAll();
            }}>
            <MiniButton
              icon={global.icon_delete}
              color={global.color_red}
              style={{ marginLeft: -1, marginBottom: -4 }}
              onPress={() => {
                this.setState({
                  showModalDelete: true,
                  didToDelete: item.item.did,
                });
                this.closeAll();
              }}
            />
            <Text style={styles.iconStyle}>Delete</Text>
          </TouchableOpacity>,
        ]}
        onRightButtonsOpenRelease={this.onOpen}
        onRightButtonsCloseRelease={this.onClose}>
        {/* <CalendarTaskItem
          title={item.item.title}
          // subtitle={item.item.contact.first_name ? item.item.contact.first_name : '' + ' ' + 
          // item.item.contact.last_name ? item.item.contact.last_name : ''}
          active={item.item.status === '1'}
          bgColor={this.props.settings.theme.bgPrimary}
          textColor={this.props.settings.theme.textPrimary}
          onPress={() => {
            console.log('task item - ' + JSON.stringify(item));
            this.props.navigation.navigate('NewTask', {
              title: 'Edit Task',
              contact: item.item.contact,
              //cid: item.item.cid,
              task: item.item,
              route: 'CalendarStack',
              month: this.state.calendarMonth,
              year: this.state.calendarYear,
              onNavigateBack: this.refresh.bind(this)
            });
          }}
          onPressCheckbox={() => {
            // let task = this.props.route.params.task;
            let params = {
              did: item.item.did,
              title: item.item.title,
              status: item.item.status === '1' ? '0' : '1'
            };

            this.props.editTask(params);
          }}
          time={item.hour}
          type={item.item.type}
        /> */}
        <TaskItem
          title={item.item.title}
          subtitle={
            this.setDateTimeFormat(item.item.date) + ' ' + item.item.type
          }
          active={item.item.status === '1'}
          bgColor={this.props.settings.theme.bgPrimary}
          textColor={this.props.settings.theme.textPrimary}
          onPress={() => {
            // console.log('task item - ' + JSON.stringify(item));
            this.props.navigation.navigate('NewTask', {
              title: 'Edit Task',
              contact: item.item.contact,
              //cid: item.item.cid,
              task: item.item,
              route: 'CalendarStack',
              onNavigateBack: this.refresh.bind(this),
            });
          }}
          onPressCheckbox={() => {
            // let task = this.props.route.params.task;
            let params = {
              did: item.item.did,
              title: item.item.title,
              status: item.item.status === '1' ? '0' : '1',
            };

            this.props.editTask(params);
          }}
        />
      </Swipeable>

    );
  };

  getMarkedDates = () => {
    const marked = {};
    this.state.calendarItems.forEach(item => {
      // NOTE: only mark dates with data
      if (item.data && item.data.length > 0 && !_.isEmpty(item.data[0])) {
        marked[item.dateString] = { marked: true };
      } else {
        marked[item.dateString] = { disabled: true };
      }
    });
    return marked;
  };

  getTheme = () => {
    const disabledColor = 'grey';
    // const disabledColor = 'grey';
    return {
      // arrows
      arrowColor: 'black',
      arrowStyle: { padding: 0 },
      // month
      monthTextColor: 'black',
      textMonthFontSize: 16,
      textMonthFontFamily: 'HelveticaNeue',
      textMonthFontWeight: 'bold',
      // day names
      textSectionTitleColor: 'black',
      textDayHeaderFontSize: 12,
      textDayHeaderFontFamily: 'HelveticaNeue',
      textDayHeaderFontWeight: 'normal',
      // dates
      dayTextColor: themeColor,
      textDayFontSize: 18,
      textDayFontFamily: 'HelveticaNeue',
      textDayFontWeight: '500',
      textDayStyle: { marginTop: Platform.OS === 'android' ? 2 : 4 },
      // selected date
      selectedDayBackgroundColor: themeColor,
      selectedDayTextColor: 'white',
      // disabled date
      textDisabledColor: disabledColor,
      // dot (marked date)
      dotColor: themeColor,
      selectedDotColor: 'white',
      disabledDotColor: disabledColor,
      dotStyle: { marginTop: -2 },
    };
  };

  onRefresh = () => {
    console.log('refresh', {
      month: `${this.state.calendarMonth}`,
      year: `${this.state.calendarYear}`,
      flag: 1,
    });
    this.props.getCalendarTasks({
      month: `${this.state.calendarMonth}`,
      year: `${this.state.calendarYear}`,
      flag: 1,
    });
    // this.render();
  };

  setTodayDate = () => {
    let date = `${new Date().getFullYear()}-${(
      '0' +
      (new Date().getMonth() + 1)
    ).slice(-2)}-${('0' + new Date().getDate()).slice(-2)}`;
    this.setState({ todayDate: date });
    // this.render();
  };

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


  scrollData = () => {
    return (
      this.state.showCalander &&
      <ScrollView
        style={{
          backgroundColor: this.props.settings.theme.mode === 'light' ? '#fff' : '#000'
        }}
        refreshControl={
          <RefreshControl
            tintColor={global.color_theme2}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.refreshing}
          />
        }>
        <View
          style={{ paddingBottom: 35, height: 350, overflow: 'hidden', }}
          onStartShouldSetResponder={() => this.closeAll()}>
          <CalendarProvider

            style={{
              // backgroundColor: this.props.settings.theme.bgSecondary,

              backgroundColor: this.props.settings.theme.bgPrimary,

              position: 'relative',
            }}
            date={
              this.state?.calendarItems?.length > 0 ? this.state?.todayDate : ''
            }
            onDateChanged={this.onDateChanged}
            onMonthChange={this.onMonthChange}
            showTodayButton
            disabledOpacity={0.6}
            theme={{
              // calendarBackground: this.props.settings.theme.bgSecondary,
              calendarBackground: this.props.settings.theme.bgPrimary,
              todayButtonTextColor: global.color_theme,
            }}
            horizontal={true}
            // Enable paging on horizontal, default = false
            pagingEnabled={true}
            todayBottomMargin={15}>
            {
              //this.props.weekView ?
              this.state.weekView ? (
                <WeekCalendar
                  testID={testIDs.weekCalendar.CONTAINER}
                  firstDay={1}
                  markedDates={this.getMarkedDates()}
                  style={[
                    styles.item,
                    {
                      backgroundColor: this.props.settings.theme.bgPrimary
                      // backgroundColor: this.props.settings.theme.bgSecondary,
                    },
                  ]}
                />
              ) : (
                <ExpandableCalendar
                  testID={testIDs.expandableCalendar.CONTAINER}
                  theme={{
                    calendarBackground: this.props.settings.theme.bgPrimary,
                    selectedDayBackgroundColor: global.color_theme,
                    selectedDayTextColor: this.props.settings.theme.bgPrimary,
                    selectedDotColor: this.props.settings.theme.bgPrimary,
                    monthTextColor: this.props.settings.theme.textPrimary,
                    arrowColor: global.color_theme,
                    indicatorColor: global.color_theme,
                    dotColor: global.color_theme,
                    todayTextColor: global.color_theme,

                  }}
                  // horizontal={false}
                  // hideArrows
                  // disablePan
                  // hideKnob
                  initialPosition={ExpandableCalendar.positions.OPEN}
                  // calendarStyle={styles.calendar}
                  // headerStyle={styles.calendar} // for horizontal only
                  disableWeekScroll
                  // theme={this.getTheme()}
                  disableAllTouchEventsForDisabledDays
                  firstDay={1}
                  disablePan={true}
                  markedDates={this.getMarkedDates()} // {'2019-06-01': {marked: true}, '2019-06-02': {marked: true}, '2019-06-03': {marked: true}};
                  leftArrowImageSource={require('../img/previous.png')}
                  rightArrowImageSource={require('../img/next.png')}

                />
              )
            }
            {/* <View style={styles.fixToText}>
          <Button
            title="Today"
            onPress={() => this.setTodayDate()}
            color={global.color_theme}
          />
        </View> */}
            {/* <AgendaList
          sections={this.state.agendaCalendarItem}
          extraData={this.state}
          renderItem={this.renderItem}
          theme={{
            calendarBackground: this.props.settings.theme.bgSecondary,
          }}
          sectionStyle={(section) => [
            section.dateString === this.state.selectedDate ? { backgroundColor: 'red' } : {}
          ]}
          hideKnob={true}
        />
        <ModalAlert
          onBackdropPress={() => this.setState({ showModalDelete: false })}
          isVisible={this.state.showModalDelete}
          title={'Delete Task'}
          message={'Are you sure you want to delete this Task?'}
          alertIcon={this.state.alertIcon}
          buttons={[
            { text: 'Cancel', onPress: () => this.setState({ showModalDelete: false }), type: 'cancel' },
            {
              text: 'Delete', onPress: () => {
                this.setState({ showModalDelete: false });
                this.deleteTask();
              }
            },
          ]}
          dark={this.props.settings.theme.mode === 'dark'}
          bgColor={this.props.settings.theme.bgPrimary}
          textColor={this.props.settings.theme.textPrimary}
        /> */}
          </CalendarProvider>


        </View>

        <View onStartShouldSetResponder={() => this.closeAll()}>
          <CalendarProvider>
            <AgendaList
              sections={this.state.agendaCalendarItem}
              extraData={this.state}
              renderItem={this.renderItem}
              theme={{
                calendarBackground: this.props.settings.theme.bgSecondary,
                // calendarBackground: this.props.settings.theme.bgPrimary,
              }}
              sectionStyle={section => [
                section.dateString === this.state.selectedDate
                  ? { backgroundColor: 'red' }
                  : {},
              ]}
              hideKnob={true}
            />
            <ModalAlert
              onBackdropPress={() => this.setState({ showModalDelete: false })}
              isVisible={this.state.showModalDelete}
              title={'Delete Task'}
              message={'Are you sure you want to delete this Task?'}
              alertIcon={this.state.alertIcon}
              buttons={[
                {
                  text: 'Cancel',
                  onPress: () => this.setState({ showModalDelete: false }),
                  type: 'cancel',
                },
                {
                  text: 'Delete',
                  onPress: () => {
                    this.setState({ showModalDelete: false });
                    this.deleteTask();
                  },
                },
              ]}
              dark={this.props.settings.theme.mode === 'dark'}
              bgColor={this.props.settings.theme.bgPrimary}
              textColor={this.props.settings.theme.textPrimary}
            />
          </CalendarProvider>
          <Modal
            isVisible={this.state.isVisible}
            style={{ padding: 0, margin: 0 }}>
            <View
              style={[
                styles.modalBottom,
                {
                  backgroundColor: this.props.settings.theme.bgPrimary,
                },
              ]}>
              <FormDropdown
                value={this.state.type}
                textColor={this.props.settings.theme.textPrimary}
                bgColor={this.props.settings.theme.inputBg}
                label={'Type'}
                icon={global.icon_dropdown}
                onPress={() => {
                  this.setState({
                    alertListVisible: true,
                    alertListTitle: 'Select Task Type',
                    alertListData: [],
                    alertListSave: () => {
                      this.setState({ alertListVisible: false });
                    },
                  });
                  this.props.getTaskTypes({ alertListVisible: false });
                }}
              />
            </View>
          </Modal>
        </View>
      </ScrollView>
    )
  }

  render() {
    return (
      this.scrollData()
    );
  }
}

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  section: {
    backgroundColor: 'red', //lightThemeColor,
    color: 'grey',
    textTransform: 'capitalize',
  },
  item: {
    padding: 20,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    flexDirection: 'row',
  },
  itemHourText: {
    color: 'black',
  },
  itemDurationText: {
    color: 'grey',
    fontSize: 10,
    marginTop: 8,
    textTransform: 'capitalize',
  },
  itemTitleText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  emptyItemText: {
    color: 'lightgrey',
    fontSize: 14,
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  iconStyle: {
    color: global.color_white,
    marginLeft: -3,
    marginBottom: 6,
  },
  searchContainer: {
    paddingTop: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBoxContainer: {
    backgroundColor: 'rgba(0,0,0,0.08)',
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: global.color_medgray,
    marginLeft: 15,
    marginRight: 10,
    position: 'absolute',
  },
  textInput: {
    fontFamily: global.font_main,
    fontSize: 18,
    color: global.color_darkgray,
    paddingLeft: 40,
    flex: 1,
  },
  filterButton: {
    width: 50,
    height: 50,
    padding: 13,
    borderRadius: 13,
    backgroundColor: global.color_theme,
    marginLeft: 10,
  },
  filterIcon: {
    tintColor: global.color_white,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  modalBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 30,
    paddingBottom: 0,
    width: '100%',
    backgroundColor: global.color_white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});

const mapStateToProps = ({ settings, tasks }) => {
  const { tasksStatus, tasksError, tasksList, tasksCalendarTasks } = tasks;
  return {
    settings,
    tasksStatus,
    tasksError,
    tasksList,
    tasksCalendarTasks,
  };
};

export default connect(mapStateToProps, {
  getCalendarTasks,
  editTask,
  deleteTask,
})(CalendarTask);