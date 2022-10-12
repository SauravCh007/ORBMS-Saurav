import React, {Component, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  findNodeHandle,
  InputAccessoryView,
  Button,
  Keyboard,
  Platform,
  BackHandler,
  KeyboardAvoidingView,
  Image,
  ScrollView,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import InputScrollView from 'react-native-input-scroll-view';
import DatePickerIOS from 'react-native-datepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {timestrToSec, formatTime, tConvert, FormatTime} from '../utils/Helper';
import {connect} from 'react-redux';
import {
  FormInput,
  FormButton,
  HeaderButton,
  FormDropdown,
  FormDatePicker,
  ModalChecklist,
  ModalAlert,
  IndicatorBottom,
  TaskCheckBox,
} from '../common';
import {
  getTaskTypes,
  saveTask,
  editTask,
  deleteTask,
  getCalendarTasks,
} from '../actions';
import {
  TASK_ADDTASK_LOADING,
  TASK_ADDTASK_SUCCESS,
  TASK_ADDTASK_FAIL,
  TASK_EDITTASK_LOADING,
  TASK_EDITTASK_SUCCESS,
  TASK_EDITTASK_FAIL,
  TASK_DELETETASK_LOADING,
  TASK_DELETETASK_SUCCESS,
  TASK_DELETETASK_FAIL,
} from '../actions/types';
import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';

class NewTask extends Component {
  _isMounted = false;
  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state;
    return params;
  };

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      dateTime: '',
      isVisible: false,
      type: '',
      comments: '',
      status: '',
      onChangeCheck: false,
      datePickerRef: null,

      // MODAL ALERT
      alertVisible: false,
      alertTitle: '',
      alertMessage: '',
      alertButtons: [
        {text: 'OK', onPress: () => this.setState({alertVisible: false})},
      ],
      alertIcon: null,

      alertListVisible: false,
      alertListTitle: '',
      alertListData: [],
      alertListSelected: [],
      alertListSave: () => {},
      alertListType: '',

      showModalDelete: false,

      contact: {fullname: '', cid: ''},
      allowAddContact: true,
    };
    this.inputAccessoryViewID = 'uniqueID';
    this.scrollRef = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.tasksStatus === TASK_ADDTASK_SUCCESS ||
      nextProps.tasksStatus === TASK_EDITTASK_SUCCESS ||
      nextProps.tasksStatus === TASK_DELETETASK_SUCCESS
    ) {
      if (this.props.route?.params?.onNavigateBack) {
        this.props.route.params.onNavigateBack();
      }
      this.props.navigation.goBack();
    }
  }

  setDate = date => {
    return (
      ('0' + (new Date(date).getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + new Date(date).getDate()).slice(-2) +
      '-' +
      new Date(date).getFullYear()
    );
    // return (new Date(date).getFullYear())+'-'+('0'+(new Date(date).getMonth() + 1)).slice(-2)+'-'+('0'+(new Date(date).getDate())).slice(-2);
  };

  setDateForTask = date => {
    return (
      new Date(date).getFullYear() +
      '-' +
      ('0' + (new Date(date).getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + new Date(date).getDate()).slice(-2)
    );
  };

  componentDidMount() {
    console.log(
      '08-08-2022 05:45 PM08-08-2022 05:45 PM08-08-2022 05:45 PM08-08-2022 05:45 PM',
      moment('08-08-2022 05:53 PM'.split(' ')[0], 'DD-MM-YYYY').format('MM'),
    );
    this.setNavbar();

    this.props.getTaskTypes();

    let contact =
      this.props.route.params && this.props.route.params.contact
        ? this.props.route.params.contact
        : {fullname: '', cid: ''};

    console.log('vvv', this.props.route.params.task);
    if (this.props.route.params && this.props.route.params.task) {
      // console.log(this.props.route.params.task, 'this.props.route.params.route');
      let task = this.props.route.params.task;
      console.log('######', task.date);
      // console.log(task, 'task+++++++++++++++++++++',this.props.route.params.contact);
      setTimeout(() => {
        this.props.route.params.route == 'CalendarStack' || 'TaskList'
          ? this.setState({
              title: task.title,
              dateTime:
                typeof task.dateString == 'undefined'
                  ? moment(task.date.split(' ')[0]).format('MM-DD-YYYY') +
                    ' ' +
                    FormatTime(task.date.split(' ')[1])
                  : task.dateString + ' ' + task.hour,
              type: task.type ? task.type : '',
              comments: task.comment ? task.comment : '',
              status: task.status ? task.status : '',
              contact: task.contact,
            })
          : this.setState({
              title: task.title,
              dateTime: task.dateTime,
              type: task.type ? task.type : '',
              comments: task.comment ? task.comment : '',
              status: task.status ? task.status : '',
              contact,
            });
      }, 200);

      // console.log('contact task - ' +JSON.stringify(this.props.route.params.contact));
    } else {
      this.setState({
        contact,
        allowAddContact: !(
          this.props.route.params && this.props.route.params.contact
        ),
      });
    }
  }

  handleBackButtonClick() {
    // this.props.navigation.goBack(null);
    this.props.navigation.navigate(this.props.route.params.route, {});
    return true;
  }

  setNavbar() {
    this._isMounted = true;
    if (this._isMounted) {
      BackHandler.addEventListener(
        'hardwareBackPress',
        this.handleBackButtonClick,
      );
      this.props.navigation.setOptions({
        title:
          this.props.route.params && this.props.route.params.title
            ? this.props.route.params.title
            : 'New Note',
        headerLeft: () => (
          <View style={global.styles.headerButtonsContainer}>
            <HeaderButton
              icon={global.icon_leftarrow}
              mode={this.props.settings.theme.mode}
              onPress={() => this.handleBackButtonClick()}
            />
          </View>
        ),

        headerRight:
          this.props.route.params && this.props.route.params.task
            ? () => (
                <View style={{paddingHorizontal: 20}}>
                  <TaskCheckBox
                    size={40}
                    icon={global.icon_check}
                    active={this.state.status === '1'}
                    onPress={() => {
                      this.setState({
                        status: this.state.status === '1' ? '0' : '1',
                      });
                      this.setNavbar();

                      let task = this.props.route.params.task;
                      let params = {
                        did: task.did,
                        title: task.title,
                        status: this.state.status === '1' ? '0' : '1',
                      };

                      this.props.editTask(params);
                    }}
                  />
                </View>
              )
            : () => <View />,
      });
    }
  }

  updateContact(contact) {
    //Alert.alert(JSON.stringify(contact));
    this.setState({contact});
  }

  componentWillUnmount() {
    this._isMounted = false;
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  renderAlertList() {
    let list = [];

    this.props.taskTypes.map(item => {
      list.push({
        text: item,
        checked: this.state.type === item,
        onPress: () => this.toggleAlertList(item),
      });
    });
    // Alert.alert(JSON.stringify(list));
    return list;
  }

  toggleAlertList(id) {
    this.setState({type: id});
  }

  checkFields() {
    const {title, dateTime, type, comments, contact} = this.state;
    let c = contact;
    // if(typeof dateTime.split(' ')[2] == 'undefined') {
    //   dateTimeNew = this.setDateForTask(dateTime.split(' ')[0])+' '+dateTime.split(' ')[1];
    // } else {
    //   dateTimeNew = this.setDateForTask(dateTime.split(' ')[0])+' '+dateTime.split(' ')[1]+' '+ dateTime.split(' ')[2];
    // }
    // if(dateTime.indexOf('AM') > 0 || dateTime.indexOf('PM') > 0) {
    //   dateTime = dateTime.split(' ')[0]+ ' '+(dateTime.split(' ')[2] == 'PM' ? (formatTime(timestrToSec(dateTime.split(' ')[1]) + timestrToSec('12:00'))) : dateTime.split(' ')[1]);
    // }
    // console.log('button hit++++++++++++++++++++++++++++++++++++', dateTime);
    if (!c.cid || c.cid === '') {
      this.setState({
        alertVisible: true,
        alertTitle: 'Unable to Save Task',
        alertMessage: 'Please make sure to select a Contact',
      });
    } else if (title === '') {
      this.setState({
        alertVisible: true,
        alertTitle: 'Unable to Save Task',
        alertMessage: 'Please enter a Task Title',
      });
    } else if (dateTime === '') {
      this.setState({
        alertVisible: true,
        alertTitle: 'Unable to Save Task',
        alertMessage: 'Please set a date & time for the task',
      });
    } else {
      if (this.props.route.params && this.props.route.params.task) {
        let task = this.props.route.params.task;
        let params = {
          did: task.did,
          title,
          comment: comments,
          date: dateTime,
          type,
        };
        console.log(params, 'this.props.route.params.task');
        console.log('XXXXXXXXXXX', params);
        this.props.editTask(params);
        setTimeout(() => {
          console.log('()()()()()()()()() data is ', date, {
            month: moment(dateTime.split(' ')[0], 'MM-DD-YYYY').format('MM'),
            year: moment(dateTime.split(' ')[0], 'MM-DD-YYYY').format('YYYY'),
            flag: 1,
          });
          this.props.getCalendarTasks({
            month: moment(dateTime.split(' ')[0], 'MM-DD-YYYY').format('MM'),
            year: moment(dateTime.split(' ')[0], 'MM-DD-YYYY').format('YYYY'),
            flag: 1,
          });
        }, 1000);
      } else {
        console.log('XXXXXXXXXXX', dateTime);
        console.log(
          'XXXXXXXXXXX',
          dateTime.split(' ')[0] +
            ' ' +
            this.timeConvert(dateTime.split(' ')[1]),
        );
        this.props.saveTask({
          cid: c.cid,
          title,
          comment: comments,
          date:
            dateTime.split(' ')[0] +
            ' ' +
            this.timeConvert(dateTime.split(' ')[1]),
          type,
        });

        let date = dateTime.split(' ')[0];
        setTimeout(() => {
          console.log(
            '()()()()(9999999999999)()()()() data is ',
            date,
            dateTime,
            {
              month: moment(dateTime.split(' ')[0], 'MM-DD-YYYY').format('MM'),
              year: moment(dateTime.split(' ')[0], 'MM-DD-YYYY').format('YYYY'),
              flag: 1,
            },
          );
          this.props.getCalendarTasks({
            month: moment(dateTime.split(' ')[0], 'MM-DD-YYYY').format('MM'),
            year: moment(dateTime.split(' ')[0], 'MM-DD-YYYY').format('YYYY'),
            flag: 1,
          });
        }, 1000);
      }
    }
  }

  timeConvert(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
  }

  deleteTask() {
    if (this.props.route.params && this.props.route.params.task) {
      this.props.deleteTask({
        did: this.props.route.params.task.did,
      });
    }
  }

  hideDatePicker = () => {
    this.setState({
      isVisible: false,
    });
    // if(Platform.OS == 'ios') {
    //   this.state.onChangeCheck = true;
    // }
  };

  Capitalize = str => {
    // return str.charAt(0).toUpperCase() + str.slice(1);
    return str.slice(0, 1).toUpperCase() + str.slice(1, str.length);
  };

  handleConfirm = date => {
    // console.log("A date has been picked: ", date);
    // this.setState({ dateTime: new Date(date).toLocaleString() });
    let dateTime =
      new Date(date).getFullYear() +
      '-' +
      ('0' + (new Date(date).getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + new Date(date).getDate()).slice(-2) +
      ' ' +
      ('0' + new Date(date).getHours()).slice(-2) +
      ':' +
      ('0' + new Date().getMinutes(date)).slice(-2);
    this.state.dateTime = dateTime;

    this.state.dateTime =
      dateTime.split(' ')[0].split('-')[1] +
      '-' +
      dateTime.split(' ')[0].split('-')[2] +
      '-' +
      dateTime.split(' ')[0].split('-')[0] +
      ' ' +
      dateTime.split(' ')[1];

    this.hideDatePicker();
  };

  datePick = () => {
    //console.log(this.state.dateTime,' this.state.dateTime');

    let dateTime =
      this.state.dateTime == ''
        ? new Date()
        : this.state.dateTime.split(' ')[0].split('-')[1] +
          '-' +
          this.state.dateTime.split(' ')[0].split('-')[2] +
          '-' +
          this.state.dateTime.split(' ')[0].split('-')[0] +
          ' ' +
          (this.state.dateTime.split(' ')[2] == 'PM'
            ? formatTime(
                timestrToSec(this.state.dateTime.split(' ')[1]) +
                  timestrToSec('12:00'),
              )
            : this.state.dateTime.split(' ')[1]);
    console.log(new Date(dateTime), 'dateTime');
    return new Date(dateTime);
  };

  setDateFormat = date => {
    return `${date.split('-')[1]}-${date.split('-')[2]}-${date.split('-')[0]}`;
  };

  render() {
    let contactName = '';
    let test = '';
    let c = this.state.contact;
    // console.log(c, 'cccccccc', this.state.dateTime, JSON.stringify(this.props.route.params.task));
    return (
      <View
        style={[
          global.styles.screenContainer,
          {backgroundColor: this.props.settings.theme.bgSecondary},
        ]}>
        <KeyboardAwareScrollView
          innerRef={ref => {
            this.scroll = ref;
          }}
          enableOnAndroid={true}
          extraHeight={100}
          enableAutomaticScroll={true}
          extraScrollHeight={100}
          style={styles.container}
          showsVerticalScrollIndicator={false}
          animated={true}
          // contentContainerStyle={{ paddingHorizontal: 30, paddingTop: 20, paddingBottom: 200 }}
        >
          <ScrollView
            ref={this.scrollRef}
            onContentSizeChange={() => {
              this.scrollRef.current?.scrollToEnd({
                animated: true,
              });
            }}
            style={{paddingHorizontal: 30, paddingTop: 20, paddingBottom: 200}}>
            <FormDropdown
              value={
                c && c.cid !== ''
                  ? typeof c.contact_details !== 'undefined'
                    ? c.contact_details.first_name +
                      ' ' +
                      c.contact_details.last_name
                    : c.first_name + ' ' + c.last_name
                  : 'Select a contact'
              }
              //value={c && c.cid !== '' ? c.fullname : 'Select a contact'}
              textColor={this.props.settings.theme.textPrimary}
              bgColor={this.props.settings.theme.inputBg}
              label={'Contact'}
              onPress={() =>
                this.props.navigation.navigate('NewTaskContacts', {
                  onSelectContact: contact => this.updateContact(contact),
                })
              }
              disabled={!this.state.allowAddContact} //c && c.cid !== ''}
            />
            <FormInput
              placeholder={'Task Title'}
              label={'Title'}
              value={this.state.title}
              onChangeText={title => this.setState({title})}
              // keyboardType={'email-address'}
              textColor={this.props.settings.theme.textPrimary}
              bgColor={this.props.settings.theme.inputBg}
              inputAccessoryViewID={this.inputAccessoryViewID}
              // onFocus={() => this.setState({ prevInput: this.inputPhone, nextInput: this.inputWebsite })}
              // inputRef={(ref) => { this.inputEmail = ref }}

              // multiline
              // scrollEnabled={false}
              // inputContainerStyle={{ height: 80}}
              // textColor={this.props.settings.theme.textPrimary}
              // bgColor={this.props.settings.theme.inputBg}
              // placeholder={'Task Title'}
              // label={'Title'}
              // value={this.state.title}
              // onChangeText={(title) =>this.setState({ title })}
              // inputAccessoryViewID={this.inputAccessoryViewID}
              // keyboardAppearance={this.props.settings.theme.mode==='dark' ? 'dark' : 'light'}
            />

            {Platform.OS == 'ios' ? (
              <>
                <FormDatePicker
                  format={'MM-DD-YYYY hh:mm A'}
                  value={this.state.dateTime}
                  textColor={this.props.settings.theme.textPrimary}
                  bgColor={this.props.settings.theme.inputBg}
                  label={'Date & Time'}
                  icon={global.icon_calendar2}
                  datePickerStyle={{
                    datePickerCon: {
                      backgroundColor: this.props.settings.theme.bgSecondary,
                      borderTopRightRadius: 30,
                      borderTopLeftRadius: 30,
                    },
                    placeholderText: {
                      fontSize: 16,
                      color: global.color_white_3,
                      margin: 0,
                      color: this.props.settings.theme.textPrimary,
                    },
                    dateInput: {
                      marginRight: -10,
                      padding: 0,
                      borderWidth: 0,
                      alignItems: 'flex-start',
                      width: '100%',
                      color: this.props.settings.theme.textPrimary,
                    },
                    dateText: {
                      textAlign: 'left',
                      fontSize: 16,
                      color: this.props.settings.theme.textPrimary,
                    },
                  }}
                  onDateChange={dateTime => {
                    console.log('data we have picked is as follows ', dateTime);
                    this.setState({dateTime});
                  }}
                />
              </>
            ) : (
              <FormDatePicker
                placeholder={'Date & Time'}
                label={'Date & Time'}
                value={
                  this.state.dateTime == ''
                    ? ''
                    : this.setDateFormat(
                        this.state.dateTime.split(' ')[0],
                      ).split('-')[2] +
                      '-' +
                      this.setDateFormat(
                        this.state.dateTime.split(' ')[0],
                      ).split('-')[0] +
                      '-' +
                      this.setDateFormat(
                        this.state.dateTime.split(' ')[0],
                      ).split('-')[1] +
                      ' ' +
                      (this.state.dateTime.split(' ')[2] == 'PM'
                        ? formatTime(
                            timestrToSec(this.state.dateTime.split(' ')[1]) +
                              timestrToSec('12:00'),
                          )
                        : this.state.dateTime.split(' ')[1])
                }
                onChangeText={title => this.setState({title})}
                // keyboardType={'email-address'}
                textColor={this.props.settings.theme.textPrimary}
                bgColor={this.props.settings.theme.inputBg}
                inputAccessoryViewID={this.inputAccessoryViewID}
                icon={global.icon_calendar2}
                datePickerRef={this.state.datePickerRef}
                onDateChange={() => {
                  this.setState({
                    isVisible: true,
                  });
                }}
              />
            )}
            {Platform.OS == 'android' ? (
              <DateTimePickerModal
                ref={ref => (this.state.datePickerRef = ref)}
                isVisible={this.state.isVisible}
                mode="datetime"
                date={this.datePick()}
                is24Hour={true}
                // date = {new Date()}
                onConfirm={this.handleConfirm}
                onCancel={this.hideDatePicker}
              />
            ) : (
              <View />
            )}

            {/* <FormDatePicker
                format={'YYYY-MM-DD h:mm:ss'}
                value={this.state.dateTime}
                isDatePickerVisible ={this.state.isVisible}
                textColor={this.props.settings.theme.textPrimary}
                bgColor={this.props.settings.theme.inputBg}
                label={'Date & Time'} icon={global.icon_calendar2}

                datePickerStyle={{
                  datePickerCon: {
                    backgroundColor: this.props.settings.theme.bgPrimary,
                    borderTopRightRadius: 30,
                    borderTopLeftRadius: 30,
                  },
                  placeholderText: { fontSize: 16, color: global.color_white_3, margin: 0, color: this.props.settings.theme.textPrimary },
                  dateInput: { marginRight: -10, padding: 0, borderWidth: 0, alignItems: 'flex-start', width: '100%', color: this.props.settings.theme.textPrimary },
                  dateText: { textAlign: 'left', fontSize: 16, color: this.props.settings.theme.textPrimary }

                }}
                onDateChange={(date) => {
                  console.log(date, '++++++++++++++++++++++++');
                  this.setState({ dateTime: date });
                }}
                onCancel={() => {
                  this.setState({ isVisible: false });
                }}
              /> */}
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
                    this.setState({alertListVisible: false});
                  },
                });
                this.props.getTaskTypes({alertListVisible: false});
              }}
            />
            {/* <InputScrollView> */}
            <FormInput
              label={'Comments'}
              multiline={true}
              isComment={true}
              scrollEnabled={true}
              value={this.Capitalize(this.state.comments)}
              onChangeText={comments => this.setState({comments})}
              placeholder={'Write a comment for this task'}
              // autoCapitalize={'characters'}
              textColor={this.props.settings.theme.textPrimary}
              bgColor={this.props.settings.theme.inputBg}
              inputContainerStyle={{height: null, minHeight: 140}}
              // style={{ marginBottom: 100 }}
              //returnKeyType={'done'}

              inputAccessoryViewID={this.inputAccessoryViewID}
              keyboardAppearance={
                this.props.settings.theme.mode === 'dark' ? 'dark' : 'light'
              }
            />
            <FormButton
              text={'Save'}
              style={{}}
              textColor={this.props.settings.theme.bgPrimary}
              onPress={() => this.checkFields()}
            />
            {this.props.route.params && c && this.props.route.params.task ? (
              <FormButton
                text={'Delete'}
                style={[{backgroundColor: global.color_red, marginTop: 0}]}
                textColor={this.props.settings.theme.bgPrimary}
                onPress={() => this.setState({showModalDelete: true})}
              />
            ) : null}
          </ScrollView>
          {/* <View style={[global.styles.quickButtonsContainer, { flexDirection: 'column', width: '100%' }]} >
              
              </View> */}
        </KeyboardAwareScrollView>

        {/* <View style={[global.styles.quickButtonsContainer, { flexDirection: 'column', width: '100%',  }]} >
            <FormButton
              text={'Save'}
              style={{ }}
              textColor={this.props.settings.theme.bgPrimary}
              onPress={() => this.checkFields()}/>
              {
                this.props.route.params && c && this.props.route.params.task ?
                <FormButton
                  text={'Delete'}
                  style={[{ backgroundColor: global.color_red, marginTop: 0 }]}
                  textColor={this.props.settings.theme.bgPrimary}
                  onPress={() => this.setState({ showModalDelete: true })}/>
                  : null
              }
          </View> */}

        <ModalChecklist
          isVisible={this.state.alertListVisible}
          title={this.state.alertListTitle}
          onBackdropPress={() => this.setState({alertListVisible: false})}
          list={this.renderAlertList()}
          onPressSave={this.state.alertListSave}
          saveText={'Select'}
          saveDisabled={this.state.type === ''}
          bgColor={this.props.settings.theme.bgSecondary}
          textColor={this.props.settings.theme.textPrimary}
        />

        <ModalAlert
          onBackdropPress={() => this.setState({alertVisible: false})}
          isVisible={this.state.alertVisible}
          title={this.state.alertTitle}
          message={this.state.alertMessage}
          alertIcon={this.state.alertIcon}
          buttons={this.state.alertButtons}
          dark={this.props.settings.theme.mode === 'dark'}
          bgColor={this.props.settings.theme.bgPrimary}
          textColor={this.props.settings.theme.textPrimary}
        />

        <ModalAlert
          onBackdropPress={() => this.setState({showModalDelete: false})}
          isVisible={this.state.showModalDelete}
          title={'Delete Task'}
          message={'Are you sure you want to delete this Task?'}
          alertIcon={this.state.alertIcon}
          buttons={[
            {
              text: 'Cancel',
              onPress: () => this.setState({showModalDelete: false}),
              type: 'cancel',
            },
            {
              text: 'Delete',
              onPress: () => {
                this.setState({showModalDelete: false});
                this.deleteTask();
              },
            },
          ]}
          dark={this.props.settings.theme.mode === 'dark'}
          bgColor={this.props.settings.theme.bgPrimary}
          textColor={this.props.settings.theme.textPrimary}
        />
        {this.props.tasksStatus === TASK_ADDTASK_LOADING ||
        this.props.tasksStatus === TASK_EDITTASK_LOADING ? (
          <IndicatorBottom dark={this.props.settings.theme.mode === 'dark'} />
        ) : null}
        {Platform.OS === 'android' ? null : (
          <InputAccessoryView nativeID={this.inputAccessoryViewID}>
            <View
              style={{
                backgroundColor: this.props.settings.theme.bgSecondary,
                justifyContent: 'flex-end',
                paddingHorizontal: 10,
                flexDirection: 'row',
              }}>
              {/*
  
                <View style={{
                  flexDirection: 'row',
                }}>
                  <HeaderButton
                    icon={global.icon_arrowup}
                    // disabled={this.state.index === 0}
                    style={{ padding: 8, marginRight: -4}}
                    mode={this.props.settings.theme.mode}
                    onPress={() => this.setState({ index: this.state.index - 1 }, () => this.renderNav() )}
                  />
                  <HeaderButton
                    icon={global.icon_dropdown}
                    // disabled={this.state.index >= this.props.route.params.emails.length-1}
                    style={{ padding: 8}}
                    mode={this.props.settings.theme.mode}
                    onPress={() => this.setState({ index: this.state.index + 1 }, () => this.renderNav() )}
                  />
                </View>
                */}
              <Button
                onPress={() => Keyboard.dismiss()}
                title="Done"
                color={global.color_theme}
              />
            </View>
          </InputAccessoryView>
        )}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  iconStyle: {
    width: 16,
    height: 16,
    tintColor: global.color_darkgray,
    resizeMode: 'contain',
  },
};

const mapStateToProps = ({settings, tasks}) => {
  const {tasksStatus, tasksError, tasksList, tasksCalendarTask, taskTypes} =
    tasks;
  return {
    settings,
    tasksStatus,
    tasksError,
    tasksList,
    tasksCalendarTask,
    taskTypes,
  };
};

export default connect(mapStateToProps, {
  getTaskTypes,
  saveTask,
  editTask,
  deleteTask,
  getCalendarTasks,
})(NewTask);
