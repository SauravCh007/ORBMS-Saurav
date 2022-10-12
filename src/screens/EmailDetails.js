import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  StatusBar,
  Alert,
  Linking,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {connect} from 'react-redux';
import {mimeWordsDecode} from 'emailjs-mime-codec';
import {
  timestampToMonthDayTime,
  timespan,
  cleanEmailBody,
  emailInfo,
} from '../utils/Helper';
import {
  HeaderButton,
  ModalBottom,
  QuickButton,
  ModalListItem,
  ModalAlert,
} from '../common';
import {moveEmail, markEmailAsSeen} from '../actions';
import {EMAIL_MOVEEMAIL_SUCCESS, EMAIL_MOVEEMAIL_FAIL} from '../actions/types';
import moment from 'moment';

class EmailDetails extends Component {
  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state;
    return params;
  };

  constructor(props) {
    super(props);
    this.state = {
      recepients: 'test rayvenz23@gmail.com',
      emails: ['test@test.com', 'test@test.com'],
      index: 0,
      showActions: false,
      showResponses: false,

      // MODAL ALERT
      alertVisible: false,
      alertTitle: '',
      alertMessage: '',
      alertButtons: [
        {text: 'OK', onPress: () => this.setState({alertVisible: false})},
      ],
      alertIcon: null,
    };
    //this.richText;
  }

  componentDidMount() {
    this.renderNav();
    this.setState({index: this.props.route.params.index}, () => {
      this.renderNav();
    });
  }

  componentWillReceiveProps(nextProps) {
    // Alert.alert(nextProps.emailStatus);
    if (nextProps.emailStatus === EMAIL_MOVEEMAIL_SUCCESS) {
      //
      setTimeout(() => {
        this.props.navigation.goBack();
        if (
          this.props.route.params &&
          this.props.route.params.toastRef &&
          this.props.route.params.toastRef.show
        ) {
          this.props.route.params.toastRef.show(
            `Email moved successfully`,
            6000,
          );
        }
      }, 500);
    }
  }

  renderNav() {
    const e = this.props.route.params?.emails[this.state.index];
    console.log(this.props.route.params.box, '+-+-+-+---+-+--+-+-+---+-+-+-');
    const eid = e?.eid;
    let from = 'INBOX';

    switch (this.props.route.params.box) {
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

    if (!e.seen) {
      this.props.markEmailAsSeen({
        eid: eid,
        box: this.props.route.params.box,
        email_account: this.props.emails.emailCurrentMailbox,
      });
    }

    this.props.navigation.setOptions({
      title: '',
      headerLeft: () => (
        <View style={global.styles.headerButtonsContainer}>
          <TouchableOpacity
            style={[
              global.styles.headerButtonsContainer,
              {
                alignItems: 'center',
                paddingRight: 15,
              },
            ]}
            onPress={() => {
              console.log(
                this.props.route.params.indexValue,
                'this.props.route.params',
              );
              AsyncStorage.setItem(
                'emailIndexValue',
                JSON.stringify({
                  emailIndex:
                    typeof this.props.route.params.indexValue != 'undefined'
                      ? this.props.route.params.indexValue
                      : 0,
                }),
              );
              // AsyncStorage.setItem('isEmailDetails', typeof(this.props.route.params.indexValue) != 'undefined' ? true : false);
              this.props.navigation.goBack();
              // this.props.navigation.navigate('EmailStack', {
              //   // onNavigateBack: this.refresh.bind(this)
              // })
            }}>
            <Image
              source={global.icon_leftarrow}
              style={{
                width: 22,
                height: 22,
                tintColor: this.props.settings.theme.textPrimary,
                marginRight: 8,
              }}
            />
            <Text
              style={{
                color: this.props.settings.theme.textPrimary,
                fontSize: 16,
                fontWeight: '700',
                fontFamily: global.font_main,
                paddingVertical: 10,
              }}>
              {this.props.route.params.box.charAt(0).toUpperCase() +
                this.props.route.params.box.slice(1)}
            </Text>
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={global.styles.headerButtonsContainer}>
          <HeaderButton
            icon={global.icon_arrowup}
            disabled={this.state.index === 0}
            style={{padding: 8}}
            mode={this.props.settings.theme.mode}
            onPress={() =>
              this.setState({index: this.state.index - 1}, () =>
                this.renderNav(),
              )
            }
          />
          <HeaderButton
            icon={global.icon_dropdown}
            disabled={
              this.state.index >= this.props.route.params.emails.length - 1
            }
            style={{padding: 8}}
            mode={this.props.settings.theme.mode}
            onPress={() =>
              this.setState({index: this.state.index + 1}, () =>
                this.renderNav(),
              )
            }
          />
        </View>
      ),
    });
  }

  moveEmailAction(action) {
    const e = this.props.route.params?.emails[this.state.index];
    const eids = parseInt(e.eid);
    let from = 'INBOX';

    switch (this.props.route.params.box) {
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

    switch (action) {
      case 'inbox':
        this.props.moveEmail({eids, cmd: 'move_imap_email', to: 'INBOX', from});
        break;
      case 'archived':
        this.setState({
          alertVisible: true,
          alertTitle: `Move email to Archive`,
          alertMessage: `Are you sure you want to move this email to Archive?`,
          alertButtons: [
            {
              text: 'YES',
              color: global.color_theme,
              onPress: () => {
                this.setState({alertVisible: false});
                this.props.moveEmail({
                  eids,
                  cmd: 'move_imap_email',
                  to: 'INBOX.Archive',
                  from,
                });
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
        break;
      case 'spam':
        this.setState({
          alertVisible: true,
          alertTitle: `Move email to Spam`,
          alertMessage: `Are you sure you want to move this email to Spam?`,
          alertButtons: [
            {
              text: 'YES',
              color: global.color_theme,
              onPress: () => {
                this.setState({alertVisible: false});
                this.props.moveEmail({
                  eids,
                  cmd: 'move_imap_email',
                  to: 'INBOX.spam',
                  from,
                });
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
        break;
      case 'trash':
        this.setState({
          alertVisible: true,
          alertTitle: `Move email to Trash`,
          alertMessage: `Are you sure you want to move this email to Trash?`,
          alertButtons: [
            {
              text: 'YES',
              onPress: () => {
                this.setState({alertVisible: false});
                this.props.moveEmail({
                  eids,
                  cmd: 'move_imap_email',
                  to: 'INBOX.Trash',
                  from,
                });
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
        break;
      default:
    }
  }

  renderEmailActions() {
    const e = this.props.route.params.emails[this.state.index];
    const eid = e.eid;
    let from = 'INBOX';

    switch (this.props.route.params.box) {
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
        box: 'trash',
        route: 5,
        icon: global.icon_delete,
        onPress: () => {
          this.setState({showActions: false});
          setTimeout(() => {
            this.moveEmailAction('inbox');
          }, 400);
          //this.props.moveEmail({ eid, cmd: 'move_imap_email', to: 'INBOX.Trash', from });
        },
      },
      {
        text: 'Move to Inbox',
        box: 'inbox',
        route: 0,
        icon: global.icon_inbox,
        onPress: () => {
          this.setState({showActions: false});
          setTimeout(() => {
            this.moveEmailAction('inbox');
          }, 400);
          //this.props.moveEmail({ eid, cmd: 'move_imap_email', to: 'INBOX', from });
        },
      },
      {
        text: 'Move to Spam',
        box: 'spam',
        route: 4,
        icon: global.icon_spam,
        onPress: () => {
          this.setState({showActions: false});
          setTimeout(() => {
            this.moveEmailAction('spam');
          }, 400);
          //this.props.moveEmail({ eid, cmd: 'move_imap_email', to: 'INBOX.spam', from });
        },
      },
      {
        text: 'Move to Archive',
        box: 'archived',
        icon: global.icon_archive,
        route: 3,
        onPress: () => {
          this.setState({showActions: false});
          setTimeout(() => {
            this.moveEmailAction('archived');
          }, 400);
          //this.props.moveEmail({ eid, cmd: 'move_imap_email', to: 'INBOX.Archive', from });
        },
      },
    ];

    let modalList = [];
    moveActions.forEach(item => {
      if (this.props.route.params?.box !== item.box) {
        modalList.push(item);
      }
    });
    return modalList;
  }

  renderEmailRespond() {
    const e = this.props.route.params.emails[this.state.index];
    const eid = e.eid;

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

  onEditorInitialized() {
    this.richText.current?.registerToolbar(function (items) {
      console.log(
        'Toolbar click, selected items (insert end callback):',
        items,
      );
    });
  }

  render() {
    //let e = this.props.route.params.emails[this.state.index];

    const e = this.props.route.params?.emails[this.state.index];
    console.log(e, 'eeeee');
    const eid = e?.eid;
    let from = 'INBOX';

    switch (this.props.route.params.box) {
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

    //let eid = e.eid;
    let c = emailInfo(e).from.split(' ');
    //let b = e.html_body;
    let b =
      '<head><meta name="viewport" content="width=device-width, initial-scale=1"></head>' +
      (e.html_body ? e.html_body : e.body ? e.body : '');
    let uri = '';

    // Alert.alert(b);
    return (
      <View
        style={[
          global.styles.screenContainer,
          {backgroundColor: this.props.settings.theme.bgSecondary},
        ]}>
        <View
          style={[
            styles.topItemContainer,
            {backgroundColor: this.props.settings.theme.bgSecondary},
          ]}>
          <View
            style={[
              styles.avatarContainer,
              {backgroundColor: this.props.settings.theme.textSecondary},
            ]}>
            <Text
              style={[
                styles.avatarInitials,
                {color: this.props.settings.theme.bgSecondary},
              ]}>
              {c && c.length > 0 && c[0].length > 0 ? c[0].charAt(0) : ''}
              {c && c.length > 1 && c[1].length > 0 ? c[1].charAt(0) : ''}
            </Text>
          </View>
          <View style={styles.senderContainer}>
            <Text
              style={[
                styles.senderText,
                {color: this.props.settings.theme.textPrimary},
              ]}>
              {e.from}
            </Text>
            {console.log('+++++++++++++++++++++++ time is as follows ', e)}
            <Text
              style={[
                styles.timestamp,
                {color: this.props.settings.theme.textPrimary, marginTop: 5},
              ]}>
              {moment(moment(e.date).format('YYYY-MM-DD HH:MM:SS'))
                .utc()
                .format('MMMM MM, YYYY at hh:mm A')}
            </Text>
          </View>
        </View>

        <View
          style={[
            {
              flexWrap: 'wrap',
              flexDirection: 'row',
              marginHorizontal: 20,
              marginTop: 10,
            },
          ]}>
          <Text style={[styles.topItemLabel, {marginTop: 5}]}>To: </Text>
          <View
            style={[
              styles.emailContainer,
              {backgroundColor: this.props.settings.theme.bgTertiary},
            ]}>
            <Text
              style={[
                styles.emailText,
                {color: this.props.settings.theme.textPrimary},
              ]}>
              {e.to}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.topItemContainer,
            {
              paddingVertical: 10,
              backgroundColor: this.props.settings.theme.bgSecondary,
            },
          ]}>
          <Text
            style={{
              fontSize: 16,
              color: this.props.settings.theme.textPrimary,
              fontWeight: '600',
            }}>
            {e.subject ? mimeWordsDecode(e.subject) : ''}
          </Text>
        </View>
        <View style={{marginTop: 0, flex: 1}}>
          <WebView
            ref={ref => {
              this.webview = ref;
            }}
            style={{
              flex: 1,
              resizeMode: 'cover',
              backgroundColor: this.props.settings.theme.bgSecondary,
            }}
            //initialScale={1}
            scalesPageToFit={Platform.OS === 'ios'}
            useWebKit={true}
            source={{html: b}}
          />
          <View
            style={{
              height: 80,
              paddingHorizontal: 10,
              paddingTop: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: this.props.settings.theme.bgSecondary,
              borderTopWidth: 1,
              borderColor: global.color_separator,
            }}>
            <BottomButton
              icon={global.icon_archive}
              mode={this.props.settings.theme.mode}
              onPress={() => this.moveEmailAction('archived')}
            />
            <BottomButton
              icon={global.icon_delete}
              mode={this.props.settings.theme.mode}
              onPress={() => this.moveEmailAction('trash')}
              //onPress={() => this.props.moveEmail({ eid, cmd: 'move_imap_email', to: 'INBOX.Trash', from })}
            />
            <BottomButton
              icon={global.icon_reply}
              mode={this.props.settings.theme.mode}
              onPress={() => this.setState({showActions: true})}
            />
            <BottomButton
              icon={global.icon_compose}
              mode={this.props.settings.theme.mode}
              onPress={() => {
                this.props.navigation.navigate('EmailComposeStack', {
                  currentMailbox: this.props.emails.emailCurrentMailbox,
                });
              }}
            />
          </View>
        </View>

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
          topContent={
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 20,
              }}>
              <QuickButton
                icon={global.icon_reply}
                color={this.props.settings.theme.bgSecondary}
                tintColor={this.props.settings.theme.textPrimary}
                onPress={() => {
                  this.setState({showActions: false});
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
                }}
              />
              <QuickButton
                icon={global.icon_replyall}
                color={this.props.settings.theme.bgSecondary}
                tintColor={this.props.settings.theme.textPrimary}
                onPress={() => {
                  this.setState({showActions: false});
                  this.props.navigation.navigate('EmailComposeStack', {
                    screen: 'EmailCompose',
                    params: {
                      title: 'Reply to all',
                      email: e,
                      from: e.from,
                      emails: [e.from],
                      type: 'reply',
                    },
                  });
                }}
              />
              <QuickButton
                icon={global.icon_forward}
                color={this.props.settings.theme.bgSecondary}
                tintColor={this.props.settings.theme.textPrimary}
                onPress={() => {
                  this.setState({showActions: false});
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
                }}
              />
            </View>
          }
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
          //hideArrow
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
  }
}

const BottomButton = ({
  icon,
  onPress,
  style,
  imgStyle,
  mode,
  active,
  size = 44,
}) => {
  return (
    <TouchableOpacity
      style={[{width: size, height: size, padding: 10}, style]}
      onPress={onPress}>
      <Image
        source={icon}
        style={[
          global.styles.imgContain,
          //{ tintColor: mode && mode === 'dark' ? global.color_ltgray : global.color_darkgray, },
          {tintColor: global.color_gray},
          imgStyle,
        ]}
      />
    </TouchableOpacity>
    /*
    <TouchableOpacity style={global.styles.headerButtonsContainer} 
      onPress={onPress} >
      <Text style={{ 
        color: color, 
        fontSize: 15,
        fontWeight: '600',
        fontFamily: global.font_main,  
        paddingVertical: 10,
      }}>{text}</Text>
    </TouchableOpacity>
    */
  );
};

/*
  <ScrollView>
    <Text>{e.body}</Text>
  </ScrollView>
*/

/*
  <WebView
    ref={(ref) => { this.webview = ref; }}
    style={{ flex: 1, resizeMode: 'cover' }}
    //initialScale={1}
    scalesPageToFit={Platform.OS === 'ios'}
    useWebKit={true}
    /*
    onNavigationStateChange={(event) => {
      if (event.url !== uri) {
        this.webview.stopLoading();
        Linking.openURL(event.url);
      }
    }}

    source={{ html: b }} />
    */

const styles = StyleSheet.create({
  topItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    minHeight: 50,
    backgroundColor: global.color_ltgray,
    borderBottomWidth: 1,
    borderColor: global.color_separator,
  },
  topItemContentContainer: {},
  topItemLabel: {
    color: global.color_medgray,
    fontSize: 14,
    marginRight: 5,
  },
  emailContainer: {
    height: 30,
    borderRadius: 15,
    backgroundColor: global.color_ltmedgray,
    marginHorizontal: 2,
    marginBottom: 2,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  emailText: {
    color: global.color_darkgray,
    fontSize: 13,
  },

  avatarContainer: {
    borderRadius: 20,
    width: 40,
    height: 40,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '700',
    fontSize: 16,
    color: global.color_gray,
    textAlign: 'center',
  },
  senderContainer: {
    marginHorizontal: 10,
  },
  senderText: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
    fontSize: 14,
    color: global.color_gray,
  },
  timestamp: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '300',
    fontSize: 11,
  },
});

const mapStateToProps = ({settings, emails}) => {
  const {emailStatus} = emails;
  return {
    settings,
    emails,
    emailStatus,
  };
};

export default connect(mapStateToProps, {moveEmail, markEmailAsSeen})(
  EmailDetails,
);
