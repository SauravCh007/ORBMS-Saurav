import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  View,
  Text,
  FlatList,
  Alert,
  StyleSheet,
  Image,
  TextInput,
  RefreshControl,
  TouchableOpacity,
  Touchable,
  Platform,
  ScrollView,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {connect} from 'react-redux';
import {
  timestampToMonthDayTime,
  timespan,
  cleanEmailBodyPreview,
  emailInfo,
} from '../utils/Helper';
import {
  HeaderButton,
  HeaderToggleButton,
  QuickButton,
  EmailItem,
  IndicatorBottom,
  EmptyList,
  ModalBottom,
  ModalAlert,
} from '../common';
import Collapsible from 'react-native-collapsible';
import {mimeWordsDecode} from 'emailjs-mime-codec';
import Toast, {DURATION} from 'react-native-easy-toast';
import {
  getEmailInbox,
  getEmailSent,
  getEmailTrash,
  getImapEmails,
  getMailboxes,
  moveEmail,
  moveAllEmail,
  toggleSeenFilter,
  setCurrentMailbox,
} from '../actions';
import {
  EMAIL_INBOXMAIL_LOADING,
  EMAIL_SENTMAIL_LOADING,
  EMAIL_TRASHMAIL_LOADING,
  EMAIL_GETMAILBOXES_LOADING,
  EMAIL_GETMAILBOXES_SUCCESS,
  EMAIL_GETMAILBOXES_FAIL,
  EMAIL_MOVEEMAIL_SUCCESS,
  EMAIL_MOVEEMAIL_FAIL,
  EMAIL_MOVEALLEMAIL_SUCCESS,
  API_CMD_IMAPMOVETRASH,
  API_CMD_IMAPMOVEINBOX,
  API_CMD_IMAPMOVESPAM,
  API_CMD_IMAPMOVEARCHIVE,
  EMAIL_SCHEDULED_SUCCESS,
} from '../actions/types';
import {event} from 'react-native-reanimated';
import EmailDetails from './EmailDetails';

class Emails extends Component {
  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state;
    return params;
  };

  constructor(props) {
   console.log("sheduleemail",props)
    super(props);
    this.state = {
      index: 0,
      routes: [
        {index: 0, key: 'inbox', title: 'Inbox'},
        {index: 1, key: 'sent', title: 'Sent'},
        {index: 2, key: 'scheduled', title: 'Scheduled'},
        {index: 3, key: 'archived', title: 'Archived'},
        {index: 4, key: 'spam', title: 'SPAM'},
        {index: 5, key: 'trash', title: 'Trash'},
      ],
      dummyData: [1, 0, 1, 0, 0, 0, 0, 1, 1, 1],
      selected: [],
      selectedEmail: null,
      selectClicked: false,
      hideSeen: false,
      currentMailbox: '',
      currentSelectMailBox: '',
      showMailboxes: false,
      showActions: false,
      showResponses: false,
      isEditing: false,
      eid: '',
      scrollValue: 0,
      initialYOffset: 0,
      previousYOffset: 0,

      // MODAL ALERT
      alertVisible: false,
      alertTitle: '',
      alertMessage: '',
      alertButtons: [
        {text: 'OK', onPress: () => this.setState({alertVisible: false})},
      ],
      alertIcon: null,

      searchKeyword: '',
      showSearch: Platform.OS == 'android' ? true : false,

      multiActionsCount: 0,
      boxToMove: '',

      showToast: false,
      isLoading: false,
    };
    this.toast = React.createRef();
  }

  componentDidMount() {
    this.refresh();
    console.log("EmailCompMount",)
    AsyncStorage.getItem('emailIndexValue').then(response => {
      if (response != '' && response != null) {
        console.log(response, 'response');
        let responseData = JSON.parse(response);
        this.setState({
          index: responseData.emailIndex,
          isLoading: true,
        });
        this.renderNav();
        if (
          this.props.emails.emailCurrentMailbox &&
          this.props.emails.emailCurrentMailbox !== ''
        ) {
          this.setState({
            currentMailbox: this.props.emails.emailCurrentMailbox,
          });
          this.loadBoxes(this.props.emails.emailCurrentMailbox);
        }
      } else {
        this.setState({
          isLoading: true,
        });
        this.renderNav();
        if (
          this.props.emails.emailCurrentMailbox &&
          this.props.emails.emailCurrentMailbox !== ''
        ) {
          this.setState({
            currentMailbox: this.props.emails.emailCurrentMailbox,
          });
          this.loadBoxes(this.props.emails.emailCurrentMailbox);
        }
      }
    });
  }

  showToast() {
    this.setState({
      selectClicked: false,
    });
    setTimeout(() => {
      this.toast.show(`Email moved successfully`, 6000);
    }, 1000);
  }

  renderNav() {
    console.log(this.state.index, 'index+++++++++++');
    this.props.navigation.setOptions({
      title: 'Email',
      headerLeft: () => (
        <View
          style={[
            global.styles.headerButtonsContainer,
            {alignItems: 'center'},
          ]}>
          <TouchableOpacity
            style={global.styles.headerButtonsContainer}
            onPress={() => {
              this.setState(
                {
                  isEditing: !this.state.isEditing,
                  selected: this.state.isEditing ? [] : this.state.selected,
                  selectClicked: false,
                },
                () => this.renderNav(),
              );
            }}>
            <Text
              style={{
                color: this.props.settings.theme.textPrimary,
                fontSize: 16,
                fontWeight: '700',
                fontFamily: global.font_main,
                paddingVertical: 10,
              }}>
              {this.state.isEditing ? 'Cancel' : 'Edit'}
            </Text>
          </TouchableOpacity>
        </View>
      ),
      headerRight: () =>
        this.state.isEditing ? (
          <View style={global.styles.headerButtonsContainer}>
            <TouchableOpacity
              style={global.styles.headerButtonsContainer}
              onPress={() => {
                if (
                  this.state.selected.length >=
                  this.getCurrentBoxEmails().length
                ) {
                  this.deselectAll();
                } else {
                  this.selectAll();
                }
                setTimeout(() => {
                  this.renderNav();
                }, 200);
              }}>
              <Text
                style={{
                  color: this.props.settings.theme.textPrimary,
                  fontSize: 16,
                  fontWeight: '700',
                  fontFamily: global.font_main,
                  paddingVertical: 10,
                }}>
                {this.state.selected.length >= this.getCurrentBoxEmails().length
                  ? 'Deselect All'
                  : 'Select All'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={global.styles.headerButtonsContainer}>
            <HeaderToggleButton
              // imgStyle={{ tintColor: this.props.settings.theme.textPrimary, backgroundColor: global.color_theme }}
              icon={global.icon_emailfilter}
              mode={this.props.settings.theme.mode}
              active={this.props.emails.emailHideSeen}
              onPress={() => {
                this.props.toggleSeenFilter();
                this.searchWaiting = setTimeout(() => {
                  this.renderNav();
                }, 300);
                /*
              this.setState({ hideSeen: !this.state.hideSeen }, () => {
                this.renderNav();
              });
              */
              }}
              imgStyle={{
                tintColor: this.props.emails.emailHideSeen
                  ? this.props.settings.theme.bgPrimary
                  : this.props.settings.theme.textPrimary,
              }}
            />
            <HeaderButton
              icon={global.icon_compose}
              // mode={this.props.settings.theme.mode}
              onPress={() => {
                this.props.navigation.navigate('EmailComposeStack', {
                  currentMailbox: this.state.currentMailbox,
                });
              }}
              mode={this.props.settings.theme.mode==="dark"? '#ffff' : "#696969"}
            />
          </View>
        ),
    });

    this.props.getMailboxes();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.emailStatus === EMAIL_GETMAILBOXES_SUCCESS) {
      if (
        nextProps.emailMailboxes.length > 0 &&
        this.state.currentMailbox === ''
      ) {
        let newMailbox = nextProps.emailMailboxes[0].email;
        this.props.setCurrentMailbox({email: newMailbox});
        this.setState({currentMailbox: newMailbox});
        this.loadBoxes(newMailbox);

        if (nextProps.emailMailboxes.length > 1) {
          nextProps.emailMailboxes.forEach((item, index) => {
            if (index > 0) {
              this.props.getImapEmails({
                box: global.box_inbox,
                email: item.email,
                searchkey: '',
              });
            }
          });
        }
      }
    } else if (nextProps.emailStatus === EMAIL_MOVEEMAIL_SUCCESS) {
      if (this.state.multiActionsCount - 1 > 0) {
        this.setState({multiActionsCount: this.state.multiActionsCount - 1});
      } else {
        setTimeout(() => {
          this.refresh();
          // this.toast.show(`Email${this.state.selected.length === 1 ? '' : 's'} moved successfully`, 7000);
          this.toast.show(
            `Successfully Moved to ${this.state.currentSelectMailBox}`,
            3000,
            // 7000,
          );
          this.setState(
            {
              selected: [],
              multiActionsCount: 0,
              selectClicked: false,
              isEditing: false,
            },
            () => this.renderNav(),
          );
        }, 300);
      }
    } else if (nextProps.emailStatus === EMAIL_MOVEEMAIL_FAIL) {
      if (this.state.multiActionsCount - 1 > 0) {
        this.setState({multiActionsCount: this.state.multiActionsCount - 1});
      } else {
        setTimeout(() => {
          this.refresh();
          // this.toast.show('Emails moved successfully', 2000);
          this.setState(
            {selected: [], multiActionsCount: 0, isEditing: false},
            () => this.renderNav(),
          );
        }, 300);
      }
    } else if (nextProps.emailStatus === EMAIL_MOVEALLEMAIL_SUCCESS) {
      setTimeout(() => {
        this.refresh();
        // this.toast.show(`Email${this.state.selected.length === 1 ? '' : 's'} moved successfully`, 7000);
        this.toast.show(
          `Successfully Moved to ${this.state.currentSelectMailBox}`,
          3000
          // 7000,
        );
        this.setState(
          {
            selected: [],
            multiActionsCount: 0,
            selectClicked: false,
            isEditing: false,
          },
          () => this.renderNav(),
        );
      }, 300);
    }
  }

  applySearch() {
    this.refresh();
  }

  refresh() {
    console.log("emailefresh")
    //this.props.getEmailInbox({ start: 0, size: 10 });
    //this.props.getEmailSent({ start: 0, size: 10 });
    //this.props.getEmailTrash({ start: 0, size: 10 });

    /*
    this.props.getImapEmails({ box: 'INBOX' });
    this.props.getImapEmails({ box: 'SENT' });
    this.props.getImapEmails({ box: 'TRASH' });
    this.props.getImapEmails({ box: 'ARCHIVE' });
    */

    this.loadBoxes(this.props.emails.emailCurrentMailbox, 1);
  }

  loadBoxes(e, apiFlag = 2) {
    console.log(this.props.emails, 'this.props.emails');
    this.props.getImapEmails({
      box: global.box_inbox,
      email: e,
      searchkey: this.state.searchKeyword,
      flag: apiFlag,
    });
    this.props.getImapEmails({
      box: global.box_sent,
      email: e,
      searchkey: this.state.searchKeyword,
      flag: apiFlag,
    });
    this.props.getImapEmails({
      box: global.box_scheduled,
      email: e,
      searchkey: this.state.searchKeyword,
      flag: apiFlag,
    });
    this.props.getImapEmails({
      box: global.box_archive,
      email: e,
      searchkey: this.state.searchKeyword,
      flag: apiFlag,
    });
    this.props.getImapEmails({
      box: global.box_spam,
      email: e,
      searchkey: this.state.searchKeyword,
      flag: apiFlag,
    });
    this.props.getImapEmails({
      box: global.box_trash,
      email: e,
      searchkey: this.state.searchKeyword,
      flag: apiFlag,
    });
  }

  renderTabBar = (props: SceneRendererProps & {navigationState: State}) => (
    <TabBar
      {...props}
      scrollEnabled
      onTabLongPress={scene => {
        this.render()
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
        marginBottom: 10,
      }}
      tabStyle={{paddingHorizontal: 24, width: 'auto'}}
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

  renderScene = ({route}) => {
    let emails = [];
    let cm = this.props.emails.emailCurrentMailbox;
    switch (route.key) {
      case 'inbox':
        emails = this.props.emailInbox[cm] ? this.props.emailInbox[cm] : [];
        break;
      case 'sent':
        emails = this.props.emailSent[cm] ? this.props.emailSent[cm] : [];
        break;
      case 'scheduled':
        emails = this.props.emailScheduled[cm]
        console.log('scheduled',this.props.emailScheduled)
          ? this.props.emailScheduled[cm]
          : [];
        break;
      case 'archived':
        emails = this.props.emailArchived[cm]
          ? this.props.emailArchived[cm]
          : [];
        break;
      case 'spam':
        emails = this.props.emailSpam[cm] ? this.props.emailSpam[cm] : [];
        break;
      case 'trash':
        emails = this.props.emailTrash[cm] ? this.props.emailTrash[cm] : [];
        break;
      default:
    }

    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            tintColor={global.color_theme2}
            onRefresh={() => this.refresh(), console.log("this.props.emailStatus",this.props.emailStatus)}
            
            refreshing={
              this.props.emailStatus === EMAIL_INBOXMAIL_LOADING ||
              this.props.emailStatus === EMAIL_SENTMAIL_LOADING ||
              this.props.emailStatus === EMAIL_TRASHMAIL_LOADING ||
              this.props.emailStatus === EMAIL_GETMAILBOXES_LOADING||
              this.props.emailStatus === EMAIL_SCHEDULED_SUCCESS
            }
            progressViewOffset={1}
          />
        }
        onScroll={event => {
          // console.log('hit+++++++')
          const yOffset = event.nativeEvent.contentOffset.y;
          if (yOffset < -60 && Platform.OS == 'ios') {
            this.setState({showSearch: true});
          } else if (
            yOffset > 50 &&
            this.state.searchKeyword === '' &&
            Platform.OS == 'ios'
          ) {
            this.setState({showSearch: false});
          }
        }}
        scrollEventThrottle={160}>
        {emails?.length <= 0 ? (
          <EmptyList
            text={'No emails'}
            textColor={this.props.settings.theme.textSecondary}
          />
        ) : null}
        <FlatList
          contentContainerStyle={{paddingBottom: 30}}
          data={emails}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => `list-item-${index}`}
          removeClippedSubviews={false}
          renderItem={({item, index}) => {
            const active = item && item === 1;
            return this.props.emails.emailHideSeen && item.seen ? null : (
              <EmailItem
                active={this.state.selected.includes(item.eid)}
                //timestamp={timestampToMonthDayTime(item.date)}
                timestamp={item.date_mmddyy}
                unread={!item.seen}
                //unread={true}
                sender={route.key == 'sent' ? item.to : item.from}
                // sender={`${item.seen}`}
                subtitle={
                  item.html_body ? cleanEmailBodyPreview(item.body_preview) : ''
                }
                title={
                  item.subject ? mimeWordsDecode(item.subject_preview) : ''
                }
                // subtitle={item.html_body}
                // title={item.subject}

                separatorColor={this.props.settings.theme.separator}
                textColor={this.props.settings.theme.textPrimary}
                checkColor={this.props.settings.theme.bgSecondary}
                onPressCheckbox={() => {
                  let selected = this.state.selected;
                  if (selected.includes(item.eid)) {
                    const index = selected.indexOf(item.eid);
                    selected.splice(index, 1);
                  } else {
                    selected.push(item.eid);
                  }
                  this.setState({
                    selected,
                    selectedEmail: selected.length === 1 ? item : null,
                  });
                }}
                onPress={() => {
                  if (this.state.isEditing) {
                    this.toggleEmailSelect(item);
                  } else {
                    this.props.navigation.navigate('EmailDetails', {
                      emailContent: item,
                      emails: emails,
                      index: index,
                      indexValue: this.state.index,
                      box: this.state.routes[this.state.index].key,
                      emailMoved: () => {
                        this.showToast();
                      },
                      toastRef: this.toast,
                    });
                  }
                }}
                hideCheckbox={!this.state.isEditing}
                //sender={route.key === 'sent' ? item.to : item.from}
                /*
              // 
              */
              />
            );
          }}
        />
      </ScrollView>
    );
  };

  getCurrentBoxEmails() {
    let emails = [];
    let cm = this.props.emails.emailCurrentMailbox;
    console.log("cmmessase",this.props.emails.emailCurrentMailbox)
    switch (this.state.routes[this.state.index].key) {
      case 'inbox':
        emails = this.props.emailInbox[cm] ? this.props.emailInbox[cm] : [];
        break;
      case 'sent':
        emails = this.props.emailSent[cm] ? this.props.emailSent[cm] : [];
        console.log("getCurrentBoxEmails",emails)
        break;
      case 'scheduled':
        emails = this.props.emailScheduled[cm]
          ? this.props.emailScheduled[cm]
          : [];
        break;
      case 'archived':
        emails = this.props.emailArchived[cm]
          ? this.props.emailArchived[cm]
          : [];
        break;
      case 'spam':
        emails = this.props.emailSpam[cm] ? this.props.emailSpam[cm] : [];
        break;
      case 'trash':
        emails = this.props.emailTrash[cm] ? this.props.emailTrash[cm] : [];
        break;
      default:
    }
    return emails;
  }

  selectAll() {
    let emails = this.getCurrentBoxEmails();
    console.log(emails, 'EMAIL+++++++++++++++++++++++');
    let selected = [];
    emails.forEach(item => {
      selected.push(item.eid);
    });
    this.setState({
      selected,
      selectClicked: true,
      selectedEmail: selected.length === 1 ? emails[0] : null,
    });
  }

  deselectAll() {
    this.setState({selected: [], selectClicked: false, selectedEmail: null});
  }

  toggleEmailSelect(item) {
    let selected = this.state.selected;
    if (selected.includes(item.eid)) {
      const index = selected.indexOf(item.eid);
      selected.splice(index, 1);
    } else {
      selected.push(item.eid);
    }
    this.setState({
      selected,
      selectedEmail: selected.length === 1 ? item : null,
    });
  }

  renderModalList() {
    let modalList = [];
    this.props.emailMailboxes.forEach(item => {
      let name = '';
      modalList.push({
        text: item.email,
        onPress: () => {
          this.props.setCurrentMailbox({email: item.email});
          //if (item.email !== this.state.currentMailbox) {
          this.loadBoxes(item.email);
          //}
          this.setState({currentMailbox: item.email, showMailboxes: false});
        },
        checked: this.state.currentMailbox === item.email,
        badge: this.props.emails.emailNotifs[item.email]
          ? this.props.emails.emailNotifs[item.email]
          : 0,
      });
    });
    return modalList;
  }

  renderEmailActions() {
    // const eid = this.state.selected[0];
    let from = 'INBOX';
    const route = this.state.routes[this.state.index];

    switch (route.key) {
      case 'inbox':
        from = 'INBOX';
        break;
      case 'archived':
        from = 'INBOX.Archive';
        break;
      case 'spam':
        from = 'INBOX.spam';
        break;
      case 'trash':
        from = 'INBOX.Trash';
        break;
      default:
    }

    const moveActions = [
      {
        text: 'Move to Trash',
        route: 5,
        onPress: () => {
          this.setState({showActions: false});
          console.log('1selected item is as follows', this.state.selected);
          this.state.selected.forEach(item => {
            this.props.moveEmail({
              eids: [item],
              cmd: 'move_imap_email',
              to: 'INBOX.Trash',
              from,
            });
          });
        },
      },
      {
        text: 'Move to Inbox',
        route: 0,
        onPress: () => {
          this.setState({showActions: false});
          this.state.selected.forEach(item => {
            this.props.moveEmail({
              eids: [item],
              cmd: 'move_imap_email',
              to: 'INBOX',
              from,
            });
          });
        },
      },
      {
        text: 'Move to Spam',
        route: 4,
        onPress: () => {
          this.setState({showActions: false});
          this.state.selected.forEach(item => {
            this.props.moveEmail({
              eids: [item],
              cmd: 'move_imap_email',
              to: 'INBOX.spam',
              from,
            });
          });
        },
      },
      {
        text: 'Move to Archive',
        route: 3,
        onPress: () => {
          this.setState({showActions: false});
          this.state.selected.forEach(item => {
            this.props.moveEmail({
              eids: [item],
              cmd: 'move_imap_email',
              to: 'INBOX.Archive',
              from,
            });
          });
        },
      },
    ];

    let modalList = [];
    moveActions.forEach(item => {
      if (this.state.index !== item.route) {
        modalList.push(item);
      }
    });
    return modalList;
  }

  moveEmails(box) {
    this.setState({
      multiActionsCount: this.state.selected.length,
      boxToMove: box,
    });

    let from = 'INBOX';
    const route = this.state.routes[this.state.index];

    switch (route.key) {
      case 'inbox':
        from = 'INBOX';
        break;
      case 'archived':
        from = 'INBOX.Archive';
        break;
      case 'spam':
        from = 'INBOX.spam';
        break;
      case 'trash':
        from = 'INBOX.Trash';
        break;
      default:
    }
    console.log(this.state.selected, 'this.state.selected');
    let to = 'INBOX.Trash';
    // console.log(this.props.emails.emailCurrentMailbox, this.props.emails, 'hit+++++++++')
    let email_account = this.props.emails.emailCurrentMailbox;
    this.state.selected.forEach(item => {
      switch (box) {
        case 'inbox':
          to = 'INBOX';
          break;
        case 'archived':
          to = 'INBOX.Archive';
          break;
        case 'spam':
          to = 'INBOX.spam';
          break;
        case 'trash':
          to = 'INBOX.Trash';
          break;
        default:
      }
      if (!this.state.selectClicked) {
        this.props.moveEmail({eids: item, cmd: 'move_imap_email', to, from});
      }
    });
    if (this.state.selectClicked) {
      this.props.moveAllEmail({
        cmd: 'email_mass_move',
        to,
        from,
        email_account,
      });
    }
  }

  renderEmailRespond() {
    const eid = this.state.selected[0];
    let e = this.state.selectedEmail;

    let options = [
      {
        text: 'Reply',
        onPress: () => {
          this.setState({showResponses: false});
          this.props.navigation.navigate('EmailComposeStack', {
            screen: 'EmailCompose',
            params: {
              title: 'Reply Email',
              email: e,
              from: e.from,
              emails: [e.from],
              type: 'reply',
            },
          });
        },
      },
      {
        text: 'Forward',
        onPress: () => {
          this.setState({showResponses: false});
          this.props.navigation.navigate('EmailComposeStack', {
            screen: 'EmailCompose',
            params: {
              title: 'Forward Email',
              email: e,
              from: e.from,
              cc: e.cc,
              type: 'forward',
            },
          });
        },
      },
    ];
    return options;
  }

  hasUnread() {
    let keys = Object.keys(this.props.emails.emailNotifs);
    // console.log('email notifs ' + JSON.stringify(this.props.emails.emailNotifs));
    let hasUnread = false;
    keys.forEach(item => {
      if (
        item !== this.state.currentMailbox &&
        this.props.emails.emailNotifs[item] > 0
      ) {
        hasUnread = true;
      }
    });
    return hasUnread;
  }

  render() {
    if (this.state.isLoading) {
      let route = this.state.routes[this.state.index];
      return (
        <View
          style={[
            global.styles.screenContainer,
            {backgroundColor: this.props.settings.theme.bgSecondary},
          ]}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              marginBottom: 5,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => this.setState({showMailboxes: true})}>
            {this.hasUnread() ? (
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: global.color_theme,
                  marginRight: 6,
                  marginLeft: -4,
                }}
              />
            ) : null}
            <Text
              style={{
                color: this.props.settings.theme.textPrimary,
                fontSize: 12,
                fontWeight: '700',
              }}>
              {this.state.currentMailbox}
            </Text>
            <View
              style={{
                width: 20,
                height: 20,
                padding: 3,
                marginLeft: 5,
                marginRight: -10,
              }}>
              <Image
                source={icon_dropdown}
                style={[
                  global.styles.imgContain,
                  {tintColor: this.props.settings.theme.textPrimary},
                ]}
              />
            </View>
          </TouchableOpacity>

          <Toast
            ref={toast => (this.toast = toast)}
            position={'bottom'}
            positionValue={250}
            style={[
              global.styles.toastStyle,
              {
                backgroundColor: this.props.settings.theme.bgPrimary,
                position: 'absolute',
              },
            ]}
            textStyle={[
              global.styles.toastTextStyle,
              {color: this.props.settings.theme.textPrimary},
            ]}
          />

          <Collapsible
            collapsed={!this.state.showSearch}
            style={styles.searchContainer}>
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
                  this.setState({searchKeyword});
                  if (this.searchWaiting) {
                    clearTimeout(this.searchWaiting);
                  }
                  this.searchWaiting = setTimeout(() => {
                    this.applySearch();
                  }, 600);
                }}
                value={this.state.searchKeyword}
                returnKeyType={'search'}
                autoCapitalize={'none'}
                autoCorrect={false}
                onSubmitEditing={() => this.applySearch()}
                clearButtonMode={'always'}
              />
            </View>
          </Collapsible>
          <TabView
            navigationState={{
              index: this.state.index,
              routes: this.state.routes,
            }}
            renderScene={this.renderScene}
            renderTabBar={this.renderTabBar}
            style={{marginTop: 10}}
            onIndexChange={index => {
              if (this.props.emails.emailHideSeen) {
                console.log('came in if condition');
                this.props.toggleSeenFilter();
                this.searchWaiting = setTimeout(() => {
                  this.renderNav();
                }, 300);
              }
              this.setState({index, selected: []});
            }} //this.changeIndex(index)}
          />
          {this.state.selected.length > 0 ? (
            <View style={global.styles.quickButtonsContainer}>
              {route.key === 'trash' ||
              route.key === 'archived' ||
              route.key === 'spam' ? (
                <QuickButton
                  icon={global.icon_inbox}
                  color={global.color_green}
                  onPress={() => {
                    this.setState({
                      currentSelectMailBox: 'Inbox',
                    });
                    this.moveEmails('inbox');
                    //this.deselectAll();
                  }}
                />
              ) : null}
              {route.key === 'trash' ||
              route.key === 'inbox' ||
              route.key === 'spam' ? (
                <QuickButton
                  icon={global.icon_archive}
                  color={global.color_blue}
                  onPress={() => {
                    this.setState({
                      alertVisible: true,
                      alertTitle: `Move email${
                        this.state.selected.length === 1 ? '' : 's'
                      } to Archive`,
                      alertMessage: `Are you sure you want to move ${
                        this.state.selected.length === 1
                          ? 'this email'
                          : 'these emails'
                      } to Archive?`,
                      alertButtons: [
                        {
                          text: 'YES',
                          color: global.color_theme,
                          onPress: () => {
                            this.setState({
                              alertVisible: false,
                              currentSelectMailBox: 'Archive',
                            });
                            this.moveEmails('archived');
                          },
                        },
                        {
                          text: 'Cancel',
                          onPress: () => this.setState({alertVisible: false}),
                          type: 'cancel',
                        },
                      ],
                      alertIcon: null,
                    });
                  }}
                />
              ) : null}
              {route.key === 'trash' ||
              route.key === 'inbox' ||
              route.key === 'archive' ? (
                <QuickButton
                  icon={global.icon_spam}
                  color={global.color_purple}
                  onPress={() => {
                    this.setState({
                      alertVisible: true,
                      alertTitle: `Move email${
                        this.state.selected.length === 1 ? '' : 's'
                      } to Spam`,
                      alertMessage: `Are you sure you want to move ${
                        this.state.selected.length === 1
                          ? 'this email'
                          : 'these emails'
                      } to Spam?`,
                      alertButtons: [
                        {
                          text: 'YES',
                          color: global.color_theme,
                          onPress: () => {
                            this.setState({
                              alertVisible: false,
                              currentSelectMailBox: 'Spam',
                            });
                            this.moveEmails('spam');
                          },
                        },
                        {
                          text: 'Cancel',
                          onPress: () => this.setState({alertVisible: false}),
                          type: 'cancel',
                        },
                      ],
                      alertIcon: null,
                    });
                  }}
                />
              ) : null}
              {route.key !== 'trash' ? (
                <QuickButton
                  icon={global.icon_delete}
                  color={global.color_red}
                  onPress={() => {
                    this.setState({
                      alertVisible: true,
                      alertTitle: `Move email${
                        this.state.selected.length === 1 ? '' : 's'
                      } to Trash`,
                      alertMessage: `Are you sure you want to move ${
                        this.state.selected.length === 1
                          ? 'this email'
                          : 'these emails'
                      } to Trash?`,
                      alertButtons: [
                        {
                          text: 'YES',
                          onPress: () => {
                            this.setState({
                              alertVisible: false,
                              currentSelectMailBox: 'Trash',
                            });
                            this.moveEmails('trash');
                          },
                        },
                        {
                          text: 'Cancel',
                          onPress: () => this.setState({alertVisible: false}),
                          type: 'cancel',
                        },
                      ],
                      alertIcon: null,
                    });
                  }}
                />
              ) : null}
            </View>
          ) : null}
          {/*
            this.props.emailStatus === EMAIL_INBOXMAIL_LOADING ||
            this.props.emailStatus === EMAIL_SENTMAIL_LOADING ||
            this.props.emailStatus === EMAIL_TRASHMAIL_LOADING || 
            this.props.emailStatus === EMAIL_GETMAILBOXES_LOADING ?
            <IndicatorBottom dark={this.props.settings.theme.mode==='dark'} /> : null
            */}

          <ModalBottom
            onBackdropPress={() => this.setState({showMailboxes: false})}
            isVisible={this.state.showMailboxes}
            dark={this.props.settings.theme.mode === 'dark'}
            list={this.renderModalList()}
            title={'Mailboxes'}
            buttons={[
              //{ text: 'Select Mailbox', color: global.color_theme, onPress: () => this.setState({ showMailboxes: false }) },
              {
                text: 'Cancel',
                type: 'cancel',
                onPress: () => this.setState({showMailboxes: false}),
              },
            ]}
            bgColor={
              this.props.settings.theme.mode === 'light'
                ? this.props.settings.theme.bgPrimary
                : this.props.settings.theme.bgTertiary
            }
            textColor={this.props.settings.theme.textPrimary}
            hideArrow
            //hideArrow
            reverseItem
          />

          <ModalBottom
            onBackdropPress={() => this.setState({showActions: false})}
            isVisible={this.state.showActions}
            dark={this.props.settings.theme.mode === 'dark'}
            list={this.renderEmailActions()}
            title={'Email Actions'}
            buttons={[
              //{ text: 'Select Mailbox', color: global.color_theme, onPress: () => this.setState({ showMailboxes: false }) },
              {
                text: 'Cancel',
                type: 'cancel',
                onPress: () => this.setState({showActions: false}),
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

          <ModalBottom
            onBackdropPress={() => this.setState({showResponses: false})}
            isVisible={this.state.showResponses}
            dark={this.props.settings.theme.mode === 'dark'}
            list={this.renderEmailRespond()}
            title={'Respond to Email'}
            buttons={[
              {
                text: 'Cancel',
                type: 'cancel',
                onPress: () => this.setState({showResponses: false}),
              },
            ]}
            bgColor={
              this.props.settings.theme.mode === 'light'
                ? this.props.settings.theme.bgPrimary
                : this.props.settings.theme.bgTertiary
            }
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
        </View>
      );
    } else {
      return <View />;
    }
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
});

const mapStateToProps = ({auth, settings, emails}) => {
  const {user} = auth;
  const {
    emailInbox,
    emailSent,
    emailScheduled,
    emailArchived,
    emailSpam,
    emailTrash,
    emailRead,
    emailStatus,
    emailError,
    emailMailboxes,
  } = emails;
  return {
    settings,
    emailInbox,
    emailSent,
    emailScheduled,
    emailArchived,
    emailSpam,
    emailTrash,
    emailRead,
    emailStatus,
    emailError,
    emailMailboxes,
    emails,
    user,
  };
};

export default connect(mapStateToProps, {
  getEmailInbox,
  getEmailSent,
  getEmailTrash,
  getImapEmails,
  getMailboxes,
  moveEmail,
  moveAllEmail,
  toggleSeenFilter,
  setCurrentMailbox,
})(Emails);
