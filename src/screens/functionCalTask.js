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
import { useState } from 'react';

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


const CalendarTask = (props) => {
    

    const [refreshing,setRefreshing] = useState(true)
    const [calendarItems,setCalendarItems] = useState([])

   const onDateChanged = (date, updateSource) => {
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
    
      const  onMonthChange = (month, updateSource) => {
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
    
      function  buttonPressed() {
        Alert.alert('show more');
      }
    
      function itemPressed(id) {
        Alert.alert(id);
      }
     function renderEmptyItem() {
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
    
    return (
        <ScrollView
        style={{
          backgroundColor:props.settings?.theme?.bgPrimary
        }}
          refreshControl={
            <RefreshControl
              tintColor={global.color_theme2}
              onRefresh={() => onRefresh()}
              refreshing={refreshing}
            />
          }>
          <View
            style={{ paddingBottom: 35, height: 350, overflow: 'hidden', }}
            onStartShouldSetResponder={() => closeAll()}>
            <CalendarProvider
              style={{
                // backgroundColor: props.settings.theme.bgSecondary,
                
                backgroundColor: props?.settings?.theme?.bgPrimary,
                
                position: 'relative',
              }}
              date={
                calendarItems.length > 0 ? state.todayDate : ''
              }
              onDateChanged={onDateChanged}
              onMonthChange={onMonthChange}
              showTodayButton
              disabledOpacity={0.6}
              theme={{
                // calendarBackground: props.settings.theme.bgSecondary,
                calendarBackground: props?.settings?.theme?.bgPrimary,
                todayButtonTextColor: global?.color_theme,
              }}
              horizontal={true}
              // Enable paging on horizontal, default = false
              pagingEnabled={true}
              todayBottomMargin={15}>
              {
                //props.weekView ?
                state.weekView ? (
                  <WeekCalendar
                    testID={testIDs.weekCalendar.CONTAINER}
                    firstDay={1}
                    markedDates={getMarkedDates()}
                    style={[
                      styles.item,
                      {
                        // backgroundColor: props.settings.theme.bgPrimary
                        backgroundColor: props?.settings?.theme?.bgSecondary,
                      },
                    ]}
                  />
                ) : (
                  <ExpandableCalendar
                    testID={testIDs.expandableCalendar.CONTAINER}
                    theme={{
                      calendarBackground:props?.settings?.theme?.bgPrimary,
                      selectedDayBackgroundColor: global?.color_theme,
                      selectedDayTextColor: props?.settings?.theme?.bgPrimary,
                      selectedDotColor: props?.settings?.theme?.bgPrimary,
                      monthTextColor: props.settings.theme.textPrimary,
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
                    // theme={getTheme()}
                    disableAllTouchEventsForDisabledDays
                    firstDay={1}
                    disablePan={true}
                    markedDates={getMarkedDates()} // {'2019-06-01': {marked: true}, '2019-06-02': {marked: true}, '2019-06-03': {marked: true}};
                    leftArrowImageSource={require('../img/previous.png')}
                    rightArrowImageSource={require('../img/next.png')}
                    
                  />
                )
              }
              {/* <View style={styles.fixToText}>
                <Button
                  title="Today"
                  onPress={() => setTodayDate()}
                  color={global.color_theme}
                />
              </View> */}
              {/* <AgendaList
                sections={state.agendaCalendarItem}
                extraData={state}
                renderItem={renderItem}
                theme={{
                  calendarBackground: props.settings.theme.bgSecondary,
                }}
                sectionStyle={(section) => [
                  section.dateString === state.selectedDate ? { backgroundColor: 'red' } : {}
                ]}
                hideKnob={true}
              />
              <ModalAlert
                onBackdropPress={() => setState({ showModalDelete: false })}
                isVisible={state.showModalDelete}
                title={'Delete Task'}
                message={'Are you sure you want to delete this Task?'}
                alertIcon={state.alertIcon}
                buttons={[
                  { text: 'Cancel', onPress: () => setState({ showModalDelete: false }), type: 'cancel' },
                  {
                    text: 'Delete', onPress: () => {
                      setState({ showModalDelete: false });
                      deleteTask();
                    }
                  },
                ]}
                dark={props.settings.theme.mode === 'dark'}
                bgColor={props.settings.theme.bgPrimary}
                textColor={props.settings.theme.textPrimary}
              /> */}
            </CalendarProvider>
          </View>
  
          <View onStartShouldSetResponder={() => closeAll()}>
            <CalendarProvider>
              <AgendaList
                sections={state.agendaCalendarItem}
                extraData={state}
                renderItem={renderItem}
                theme={{
                  // calendarBackground:props.settings.theme.bgSecondary,
                  calendarBackground:props.settings.theme.bgPrimary,
                }}
                sectionStyle={section => [
                  section.dateString === state.selectedDate
                    ? { backgroundColor: 'red' }
                    : {},
                ]}
                hideKnob={true}
              />
              <ModalAlert
                onBackdropPress={() => setState({ showModalDelete: false })}
                isVisible={state.showModalDelete}
                title={'Delete Task'}
                message={'Are you sure you want to delete this Task?'}
                alertIcon={state.alertIcon}
                buttons={[
                  {
                    text: 'Cancel',
                    onPress: () => setState({ showModalDelete: false }),
                    type: 'cancel',
                  },
                  {
                    text: 'Delete',
                    onPress: () => {
                      setState({ showModalDelete: false });
                      deleteTask();
                    },
                  },
                ]}
                dark={props.settings.theme.mode === 'dark'}
                bgColor={props.settings.theme.bgPrimary}
                textColor={props.settings.theme.textPrimary}
              />
            </CalendarProvider>
            <Modal
              isVisible={state.isVisible}
              style={{ padding: 0, margin: 0 }}>
              <View
                style={[
                  styles.modalBottom,
                  {
                    backgroundColor: props.settings.theme.bgPrimary,
                  },
                ]}>
                <FormDropdown
                  value={state.type}
                  textColor={props.settings.theme.textPrimary}
                  bgColor={props.settings.theme.inputBg}
                  label={'Type'}
                  icon={global.icon_dropdown}
                  onPress={() => {
                    setState({
                      alertListVisible: true,
                      alertListTitle: 'Select Task Type',
                      alertListData: [],
                      alertListSave: () => {
                        setState({ alertListVisible: false });
                      },
                    });
                    props.getTaskTypes({ alertListVisible: false });
                  }}
                />
              </View>
            </Modal>
          </View>
        </ScrollView>
      );
}

export default CalendarTask

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