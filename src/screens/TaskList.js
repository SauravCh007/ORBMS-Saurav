import React, {Component, useRef} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  StyleSheet,
  BackHandler,
  RefreshControl,
} from 'react-native';
import Swipeable from 'react-native-swipeable';

import {FormatTime} from '../utils/Helper';

import {connect} from 'react-redux';
import {TabView, TabBar} from 'react-native-tab-view';

import {
  MiniButton,
  ModalBottom,
  FilterButton,
  HeaderButton,
  TaskCheckBox,
  ImageTaskItem,
  ModalChecklist,
  IndicatorBottom,
} from '../common';
import {
  editTask,
  deleteTask,
  getTaskTypes,
  getAscendingList,
  getDesendingList,
  setTaskSearchKey,
} from '../actions';
import {
  ALL_TASK_LOADING,
  LISTTYPE_ALL_TASK,
  LISTTYPE_TASK_TYPE,
  ALL_DSC_TASK_LOADING,
  LISTTYPE_ACTIVE_TASK,
  LISTTYPE_COMPLETE_TASK,
} from '../actions/types';
import {TouchableOpacity} from 'react-native-gesture-handler';

let yearStr = '',
  monthStr = '';
class TaskList extends Component {
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
      comments: '',
      status: '',
      onChangeCheck: false,
      datePickerRef: null,
      showModalDelete: false,

      didToDelete: '',
      index: 0,
      routes: [
        {index: 0, key: 'des', title: 'Descending'},
        {index: 1, key: 'asc', title: 'Ascending'},
      ],
      searchKeyword: '',
      selected: [],
      alertListVisible: false,
      alertListTitle: '',
      alertListData: [],
      alertListSelected: [],
      alertListSave: () => {},
      alertListType: '',
      type: '',
      month: props.route.params.month,
      year: props.route.params.year,
      currentlyOpenSwipeable: null,
      taskFilterType: {},
    };
    this.inputAccessoryViewID = 'uniqueID';
    this.scrollRef = React.createRef();
    this.selectedRow;
  }

  componentDidMount() {
    console.log("type",this.state)
    this.setNavbar();
    this.props.getTaskTypes();
    // this.pageRefresh()
    yearStr = this.props.route.params.year;
    monthStr = this.props.route.params.month;
    // this.setState({ year: this.props.route.params.year });
    //this.setState({ month: monthStr })

    let dscParams = {
      year: yearStr,
      month: '',
      type: this.state.type,
      sort: 'desc',
      search_key: this.props.tasks.taskSearchKey,
      complete_task: '',
      active_task: '',
    };
    let params = {
      year: yearStr,
      month: '',
      type: this.state.type,
      sort: 'asc',
      search_key: this.props.tasks.taskSearchKey,
      complete_task: '',
      active_task: '',
    };
    this.props.getAscendingList(params);

    this.props.getDesendingList(dscParams);
  }

  componentWillReceiveProps(nextProps) {
    console.log('gogogo', nextProps);
    console.log('gogogo', nextProps.allTaskList);
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
  onRefresh = () => {
    console.log('refresh');
    let params = {
      year: yearStr,
      month: '',
      type: this.state.type,
      sort: 'asc',
      search_key: this.props.tasks.taskSearchKey,
      complete_task: '',
      active_task: '',
    };
    this.props.getAscendingList(params);
    this.render();
  };

  renderAlertList() {
    let list = [];
    const all = 'All';
    const newArray = [all].concat(this.props.taskTypes); // [ 4, 3, 2, 1 ]

    newArray.map(item => {
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
  toggleItem(item) {
    let selected = this.state.selected;
    //if (selected.includes(cid)) {
    if (selected.some(x => x.cid === item.cid)) {
      const indexToDelete = selected.findIndex(x => x.cid === item.cid);
      selected.splice(indexToDelete, 1);
    } else {
      selected.push(item);
    }
    this.setState({selected});
  }
  onOpen = (event, gestureState, swipeable) => {
    if (
      this.state.currentlyOpenSwipeable &&
      this.state.currentlyOpenSwipeable !== swipeable
    ) {
      this.state.currentlyOpenSwipeable.recenter();
    }
    this.setState({currentlyOpenSwipeable: swipeable});
  };

  onClose = () => {
    this.setState({currentlyOpenSwipeable: null});
  };

  closeAll = () => {
    if (this.state.currentlyOpenSwipeable) {
      this.state.currentlyOpenSwipeable.recenter();
    }
  };
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
    let dscParams = {
      year: yearStr,
      month: '',
      type: this.state.type,
      sort: 'desc',
      search_key: this.props.tasks.taskSearchKey,
      complete_task: '',
      active_task: '',
    };
    let params = {
      year: yearStr,
      month: '',
      type: this.state.type,
      sort: 'asc',
      search_key: this.props.tasks.taskSearchKey,
      complete_task: '',
      active_task: '',
    };
    this.props.getAscendingList(params);

    this.props.getDesendingList(dscParams);

    setTimeout(() => {
      this.setState({
        refreshing: false,
      });
    }, 2000);
  }
  setFilter(type) {
    let title = '';
    switch (type) {
      case LISTTYPE_TASK_TYPE:
        title = 'By Task Types';
        this.props.getTaskTypes();
        setTimeout(() => {
          this.setState({
            alertListVisible: true,
            alertListTitle: 'Select Task Type',
            alertListData: [],
            alertListSave: () => {
              this.setState({alertListVisible: false});
            },
          });
        }, 1000);

        this.setState({taskFilterType: {cmd: 'task_types'}});
        break;
      case LISTTYPE_ACTIVE_TASK:
        title = 'By Active Tasks';
        this.activeTaskList();
        this.setState({taskFilterType: {active_task: 1}});
        break;
      case LISTTYPE_COMPLETE_TASK:
        title = 'By Completed Tasks';
        this.completeTaskList();
        this.setState({taskFilterType: {complete_task: 1}});
        break;
      case LISTTYPE_ALL_TASK:
        title = 'By All Tasks';
        this.allTaskList();
        this.setState({taskFilterType: {complete_task: '', active_task: ''}});
        break;
      default:
    }
    this.setState({
      showFilter: false,
      alertListData:
        type !== this.state.alertListType ? [] : this.state.alertListData,
    });
    setTimeout(() => {
      this.setState({
        alertListData: [],
        alertListSave: () => {
          this.setState({alertListVisible: false});
        },
        alertListTitle: title,
        alertListData: [],
        alertListSelected:
          this.state.alertListType === type ? this.state.alertListSelected : [],
        alertListType: type,
        alertListSave: () => {},
      });
    }, 500);
  }

  clearFilter() {
    this.setState(
      {
        showFilter: false,
        alertListVisible: false,
        alertListTitle: '',
        alertListData: [],
        alertListSelected: [],
        alertListSave: () => {},
        alertListType: '',
        searchKeyword: '',
      },
      () => this.decendingList(),
    );
  }

  applyFilter() {
    let dscParams, params;
    if (this.state.type === 'All') {
      this.setState({type: ''});
      dscParams = {
        year: this.state.year,
        month: '',
        type: '',
        sort: 'desc',
        search_key: this.props.tasks.taskSearchKey,
        complete_task: '',
        active_task: '',
      };
      params = {
        year: this.state.year,
        month: '',
        type: '',
        sort: 'asc',
        search_key: this.props.tasks.taskSearchKey,
        complete_task: '',
        active_task: '',
      };
    } else {
      dscParams = {
        year: this.state.year,
        month: '',
        type: this.state.type,
        sort: 'desc',
        search_key: this.props.tasks.taskSearchKey,
        complete_task: '',
        active_task: '',
      };
      params = {
        year: this.state.year,
        month: '',
        type: this.state.type,
        sort: 'asc',
        search_key: this.props.tasks.taskSearchKey,
        complete_task: '',
        active_task: '',
      };
    }

    this.props.getAscendingList(params);

    this.props.getDesendingList(dscParams);

    this.setState({alertListVisible: false});
  }
  applySearch() {
    console.log('apply search');
    let dscParams, params;
    if (this.state.type === 'All') {
      this.setState({type: ''});
      dscParams = {
        year: this.state.year,
        month: '',
        type: '',
        sort: 'desc',
        search_key: this.props.tasks.taskSearchKey,
        complete_task: '',
        active_task: '',
      };
      params = {
        year: this.state.year,
        month: '',
        type: '',
        sort: 'asc',
        search_key: this.props.tasks.taskSearchKey,
        complete_task: '',
        active_task: '',
      };
      dscParams = {
        ...dscParams,
        ...this.state.taskFilterType,
      };
      params = {
        ...params,
        ...this.state.taskFilterType,
      };
    } else {
      dscParams = {
        year: this.state.year,
        month: '',
        type: this.state.type,
        sort: 'desc',
        search_key: this.props.tasks.taskSearchKey,
        complete_task: '',
        active_task: '',
      };
      params = {
        year: this.state.year,
        month: '',
        type: this.state.type,
        sort: 'asc',
        search_key: this.props.tasks.taskSearchKey,
        complete_task: '',
        active_task: '',
      };
      dscParams = {
        ...dscParams,
        ...this.state.taskFilterType,
      };
      params = {
        ...params,
        ...this.state.taskFilterType,
      };
    }

    this.props.getAscendingList(params);

    this.props.getDesendingList(dscParams);
  }

  decendingList() {
    let dscParams, params;
    if (this.state.type === 'All') {
      this.setState({type: ''});
      dscParams = {
        year: this.state.year,
        month: '',
        type: '',
        sort: 'desc',
        search_key: this.props.tasks.taskSearchKey,
        complete_task: '',
        active_task: '',
      };
      params = {
        year: this.state.year,
        month: '',
        type: '',
        sort: 'asc',
        search_key: this.props.tasks.taskSearchKey,
        complete_task: '',
        active_task: '',
      };
    } else {
      dscParams = {
        year: this.state.year,
        month: '',
        type: this.state.type,
        sort: 'desc',
        search_key: this.props.tasks.taskSearchKey,
        complete_task: '',
        active_task: '',
      };
      params = {
        year: this.state.year,
        month: '',
        type: this.state.type,
        sort: 'asc',
        search_key: this.props.tasks.taskSearchKey,
        complete_task: '',
        active_task: '',
      };
    }

    // this.props.getAscendingList(params);

    this.props.getDesendingList(dscParams);
  }

  allTaskList() {
    let dscParams, params;
    dscParams = {
      year: this.state.year,
      month: '',
      type: '',
      sort: 'desc',
      search_key: this.props.tasks.taskSearchKey,
      complete_task: '',
      active_task: '',
    };
    params = {
      year: this.state.year,
      month: '',
      type: '',
      sort: 'asc',
      search_key: this.props.tasks.taskSearchKey,
      complete_task: '',
      active_task: '',
    };

    this.props.getAscendingList(params);

    this.props.getDesendingList(dscParams);
  }

  completeTaskList() {
    let dscParams, params;
    dscParams = {
      year: this.state.year,
      month: '',
      type: '',
      sort: 'desc',
      search_key: this.props.tasks.taskSearchKey,
      complete_task: 1,
      active_task: '',
    };
    params = {
      year: this.state.year,
      month: '',
      type: '',
      sort: 'asc',
      search_key: this.props.tasks.taskSearchKey,
      complete_task: 1,
      active_task: '',
    };

    this.props.getAscendingList(params);

    this.props.getDesendingList(dscParams);
  }
  activeTaskList() {
    let dscParams, params;
    dscParams = {
      year: this.state.year,
      month: '',
      type: '',
      sort: 'desc',
      search_key: this.props.tasks.taskSearchKey,
      complete_task: '',
      active_task: 1,
    };
    params = {
      year: this.state.year,
      month: '',
      type: '',
      sort: 'asc',
      search_key: this.props.tasks.taskSearchKey,
      complete_task: '',
      active_task: 1,
    };

    console.log('ASASE', params);
    console.log('DSCE', dscParams);

    this.props.getAscendingList(params);

    this.props.getDesendingList(dscParams);
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
            : 'Task List',
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

  ImageType(type) {
    if (type.toLowerCase() === 'call') {
      return global.icon_task_call;
    } else if (type.toLowerCase() === 'personal') {
      return global.icon_task_personal;
    } else if (type.toLowerCase() === 'follow up') {
      return global.icon_task_follow_up;
    } else if (type.toLowerCase() === 'email') {
      return global.icon_task_email;
    } else if (type.toLowerCase() === 'appointment') {
      return global.icon_task_appointment;
    } else if (type.toLowerCase() === 'application follow up') {
      return global.icon_task_application_follow_up;
    } else if (type.toLowerCase() === 'request catalog') {
      return global.icon_task_request_catalog;
    } else if (type.toLowerCase() === 'purchase order update') {
      return global.icon_task_purchase_order;
    } else if (type.toLowerCase() === 'shipment update') {
      return global.icon_task_shipment_update;
    } else if (type.toLowerCase() === 'send gift') {
      return global.icon_task_send_gift;
    } else {
      return global.icon_task_other;
    }
  }

  deleteSelected() {
    this.setState({multiActionsCount: this.state.selected.length});
    this.state.selected.forEach(item => {
      this.props.deleteContact({cid: item.cid});
    });
    this.setState({selected: []});
  }

  emailSelected() {
    let contactsWithEmails = [];
    this.state.selected.forEach(item => {
      if (item.email && item.email !== '') {
        contactsWithEmails.push(item);
      }
    });
    if (contactsWithEmails.length > 0) {
      this.props.navigation.navigate('EmailComposeStack', {
        screen: 'EmailCompose',
        params: {contacts: contactsWithEmails},
      });
    }
  }

  handleBackButtonClick() {
    this.props.navigation.navigate(this.props.route.params.route, {});
    return true;
  }

  onEndReached() {
    let limitDiff = 10;
    let list = [];
    switch (this.state.index) {
      case 0:
        // list = this.props.contactsList;
        // if (list.length >= this.state.contactsLimit) {
        //   this.setState({ contactsLimit: this.state.contactsLimit + limitDiff }, () => {
        //     this.getContacts();
        //   });
        // }
        break;
      case 1:
        // list = this.props.contactsWithRatings;
        // if (list.length >= this.state.contactsWithRatingsLimit) {
        //   this.setState({ contactsWithRatingsLimit: this.state.contactsWithRatingsLimit + limitDiff }, () => {
        //     this.getContactsWithRatings();
        //   });
        // }

        break;
      default:
    }
  }

  pageRefresh() {
    let dscParams = {
      year: yearStr,
      month: '',
      type: this.state.type,
      sort: 'desc',
      search_key: this.props.tasks.taskSearchKey,
      complete_task: '',
      active_task: 1,
    };
    let params = {
      year: yearStr,
      month: '',
      type: this.state.type,
      sort: 'asc',
      search_key: this.props.tasks.taskSearchKey,
      complete_task: '',
      active_task: 1,
    };
    this.props.getAscendingList(params);

    this.props.getDesendingList(dscParams);
  }

  renderScene = ({route}) => {
    let allTaskList = []
    let dscTaskList = []
    this.props.allTaskList.map((item)=>{
       return(
        item.status==='0'?  
         allTaskList.push(item):null)
    })
    this.props.dscTaskList.map((item)=>{
       return(
        item.status==='0'?  
        dscTaskList.push(item):null)
    })
    let list = [];
    console.log("filter",this.state.showFilter)
    switch (route.key) {
      case 'asc':
        list =  this.state.showFilter === undefined ? allTaskList: this.props.allTaskList;
        break;
      case 'des':
        list =this.state.showFilter === undefined ? dscTaskList: this.props.dscTaskList;
        break;
      default:
    }
    return (
      <View style={{flex: 1}}>
        <FlatList
          refreshControl={
            <RefreshControl
              tintColor={global.color_theme2}
              onRefresh={() => this.pageRefresh()}
              refreshing={false}
              progressViewOffset={1}
            />
          }
          contentContainerStyle={{paddingBottom: 30}}
          data={list}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => `list-item-${index}`}
          removeClippedSubviews={false}
          onEndReached={() => this.onEndReached()}
          onEndReachedThreshold={0.5}
          renderItem={({item}) => {
            // console.log(item, '1',this.state.selected, '2', contactFilter, '3', contactRatingFilter, 'contactRatingFilter');
            return (
              <Swipeable
                ref={c => {
                  this.selectedRow = c;
                }}
                rightButtons={[
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      backgroundColor: global.color_purple,
                      paddingTop: 10,
                      paddingLeft: 20,
                      paddingBottom: 3,
                    }}
                    onPress={() => {
                      this.props.navigation.navigate('NewTask', {
                        title: 'Edit Task',
                        contact: item.contact,
                        //cid: item.item.cid,
                        task: item,
                        route: 'TaskList',
                        month: this.state.month,
                        year: this.state.year,
                        onNavigateBack: this.refresh.bind(this),
                      });
                      this.closeAll();
                    }}>
                    <MiniButton
                      icon={global.icon_pencil}
                      color={global.color_purple}
                      style={{marginLeft: 1, marginBottom: -5}}
                      onPress={() => {
                        this.props.navigation.navigate('NewTask', {
                          title: 'Edit Task',
                          contact: item.contact,
                          //cid: item.item.cid,
                          task: item,
                          route: 'TaskList',
                          month: this.state.month,
                          year: this.state.year,
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
                      {backgroundColor: global.color_red},
                    ]}
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
                      style={{marginLeft: -1, marginBottom: -4}}
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
                <ImageTaskItem
                  title={item.title}
                  subtitle={this.setDateTimeFormat(item.date) + ' ' + item.type}
                  active={item.status === '1'}
                  bgColor={this.props.settings.theme.bgPrimary}
                  textColor={this.props.settings.theme.textPrimary}
                  onPress={() => {
                    // console.log('task item - ' + JSON.stringify(item));
                    this.props.navigation.navigate('NewTask', {
                      title: 'Edit Task',
                      contact: item.contact,
                      cid: item.cid,
                      task: item,
                      route: 'TaskList',
                      onNavigateBack: this.refresh.bind(this),
                    });
                  }}
                  onPressCheckbox={() => {
                    // let task = this.props.route.params.task;
                    let params = {
                      did: item.did,
                      title: item.title,
                      status: item.status === '1' ? '0' : '1',
                    };

                    this.props.editTask(params);
                  }}
                  icon={this.ImageType(item.type)}
                />
              </Swipeable>
            );
          }}
        />
      </View>
    );
  };
  renderTabBar = (props: SceneRendererProps & {navigationState: State}) => (
    <TabBar
      {...props}
      scrollEnabled
      onTabLongPress={scene => {
        const {route} = scene;
        props.jumpTo(route.key);
      }}
      indicatorStyle={{
        backgroundColor: global.color_theme,
        height: 40,
        borderRadius: 20,
      }}
      style={{
        marginHorizontal: 20,
        backgroundColor: 'transparent',
        height: 44,
        marginBottom: 15,
      }}
      tabStyle={{paddingHorizontal: 20, width: 'auto'}}
      labelStyle={{
        fontSize: 14,
        fontWeight: '600',
        fontFamily: 'Montserrat-Regular',
        textTransform: 'capitalize',
        margin: 0,
      }}
      activeColor={this.props.settings.theme.bgPrimary}
      inactiveColor={this.props.settings.theme.textSecondary}
    />
  );

  hasFilter() {
    const {alertListSelected, alertListType} = this.state;

    if (alertListType && alertListType !== '') {
      return true;
    }
    return false;
  }

  render() {
    return (
      <View
        style={[
          global.styles.screenContainer,
          {backgroundColor: this.props.settings.theme.bgSecondary},
        ]}>
        <View style={styles.searchContainer}>
          <View
            style={[
              styles.searchBoxContainer,
              {backgroundColor: this.props.settings.theme.inputBg},
            ]}>
            <Image style={styles.searchIcon} source={global.icon_search} />
            <TextInput
              style={styles.textInput}
              placeholder={'Search'}
              placeholderTextColor={global.color_medgray}
              onChangeText={searchKeyword => {
                //this.setState({ searchKeyword });
                this.props.setTaskSearchKey(searchKeyword);
                if (this.searchWaiting) {
                  clearTimeout(this.searchWaiting);
                }
                this.searchWaiting = setTimeout(() => {
                  this.applySearch();
                }, 600);
              }}
              value={this.props.tasks.taskSearchKey}
              returnKeyType={'search'}
              autoCapitalize={'none'}
              autoCorrect={false}
              onSubmitEditing={() => this.applySearch()}
              clearButtonMode={'always'}
            />
          </View>
          <FilterButton
            bgColor={this.hasFilter() ? global.color_theme : 'rgba(0,0,0,0.05)'}
            tintColor={
              this.hasFilter()
                ? this.props.settings.theme.bgPrimary
                : this.props.settings.theme.textSecondary
            }
            onPress={() => {
              this.setState({showFilter: true});
            }}
            icon={global.icon_filter}
          />
        </View>

        <TabView
          navigationState={{index: this.state.index, routes: this.state.routes}}
          swipeEnabled={false}
          renderScene={this.renderScene}
          renderTabBar={this.renderTabBar}
          onIndexChange={index => this.setState({index})} //this.changeIndex(index)}
        />

        <ModalBottom
          isVisible={this.state.showFilter}
          dark={this.props.settings.theme.mode === 'dark'}
          list={[
            {
              text: 'By Task Types',
              onPress: () => this.setFilter(LISTTYPE_TASK_TYPE),
              checked: this.state.alertListType === LISTTYPE_TASK_TYPE,
            },
            {
              text: 'By Active Tasks',
              onPress: () => this.setFilter(LISTTYPE_ACTIVE_TASK),
              checked: this.state.alertListType === LISTTYPE_ACTIVE_TASK,
            },
            {
              text: 'By Completed Tasks',
              onPress: () => this.setFilter(LISTTYPE_COMPLETE_TASK),
              checked: this.state.alertListType === LISTTYPE_COMPLETE_TASK,
            },
            {
              text: 'By All Tasks',
              onPress: () => this.setFilter(LISTTYPE_ALL_TASK),
              checked: this.state.alertListType === LISTTYPE_ALL_TASK,
            },
          ]}
          title={'Filter Options'}
          buttons={[
            {
              text: 'Clear Filter',
              color: global.color_theme,
              onPress: () => this.clearFilter(),
            },
            {
              text: 'Cancel',
              type: 'cancel',
              onPress: () => this.setState({showFilter: false}),
            },
          ]}
          bgColor={
            this.props.settings.theme.mode === 'light'
              ? this.props.settings.theme.bgPrimary
              : this.props.settings.theme.bgTertiary
          }
          textColor={this.props.settings.theme.textPrimary}
        />

        <ModalChecklist
          isVisible={this.state.alertListVisible}
          title={this.state.alertListTitle}
          onBackdropPress={() => this.setState({alertListVisible: false})}
          list={this.renderAlertList()}
          onPressSave={() => this.applyFilter()}
          saveText={'Apply Filter'}
          bgColor={
            this.props.settings.theme.mode === 'light'
              ? this.props.settings.theme.bgPrimary
              : this.props.settings.theme.bgTertiary
          }
          textColor={this.props.settings.theme.textPrimary}
        />

        {this.props.tasksStatus === ALL_TASK_LOADING ||
        this.props.tasksStatus === ALL_DSC_TASK_LOADING ? (
          <IndicatorBottom dark={this.props.settings.theme.mode === 'dark'} />
        ) : null}
      </View>
    );
  }
}
const styles = StyleSheet.create({
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
  rightSwipeItem: {
    justifyContent: 'center',
    paddingTop: 10,
    paddingLeft: 20,
  },
  iconStyle: {
    color: global.color_white,
    marginLeft: -3,
    marginBottom: 6,
  },
});

const mapStateToProps = ({settings, tasks}) => {
  const {
    tasksStatus,
    tasksError,
    tasksList,
    tasksCalendarTask,
    taskTypes,

    allTaskList,
    dscTaskList,
  } = tasks;
  return {
    settings,
    tasksStatus,
    tasksError,
    tasksList,
    tasksCalendarTask,
    taskTypes,
    tasks,
    allTaskList,
    dscTaskList,
  };
};

export default connect(mapStateToProps, {
  getTaskTypes,
  getAscendingList,
  editTask,
  deleteTask,
  getDesendingList,
  setTaskSearchKey,
})(TaskList);
