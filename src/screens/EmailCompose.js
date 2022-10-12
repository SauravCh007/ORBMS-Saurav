import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  StatusBar,
  ScrollView,
  Alert,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  actions,
  defaultActions,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';
import {connect} from 'react-redux';
import DatePicker from 'react-native-datepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  MiniButton,
  EmailChip,
  EmailInputChip,
  HeaderButton,
  ModalBottom,
  ModalAlert,
  IndicatorBottom,
  ContactItem,
} from '../common';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {FormatTime} from '../utils/Helper';
import EmailChipInput from '@arelstone/react-native-email-chip';
import {getEmailTemplates, sendEmail, getContactList} from '../actions';
import {
  EMAIL_SENDEMAIL_SUCCESS,
  EMAIL_SENDEMAIL_FAIL,
  EMAIL_SENDEMAIL_LOADING,
  CONTACT_CONTACTLIST_LOADING,
  CONTACT_CONTACTSWITHRATINGS_LOADING,
  LISTTYPE_GROUPS,
  LISTTYPE_CAMPAIGNS,
  LISTTYPE_TAGS,
} from '../actions/types';
import moment from 'moment';

class EmailCompose extends Component {
  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state;
    return params;
  };

  constructor(props) {
    super(props);
    this.state = {
      recipients:
        'test rayvenz23@gmail.com rayvenz23@gmail.com rayvenz23@gmail.com',
      emails: [],
      selected: [],
      newChip: '',
      //body: 'Hello <b>World</b> <p>this is a new paragraph</p> <p>this is another new paragraph</p>',
      body: '\n',
      subject: '',
      schedule: null,
      scheduleDateTime: '',
      isVisible: false,
      isVisibleDate: false,
      emojiVisible: false,
      disabled: false,
      editorReady: false,
      currentMailbox: '',
      currentTemplate: null,
      showMailboxes: false,
      showTemplates: false,
      showActions: false,
      selectSchedule: false,

      // MODAL ALERT
      alertVisible: false,
      alertTitle: '',
      alertMessage: '',
      alertButtons: [
        {text: 'OK', onPress: () => this.setState({alertVisible: false})},
      ],
      alertIcon: null,

      contactsLimit: 20,
      searchKeyword: '',
      compressedRecipients: false,
      isSend: false,

      // showContactList: false,
    };
    //this.richText;
    // this.richText = null;
    // this.richText = React.createRef();

    this.richtext = React.createRef();
  }

  componentDidMount() {
    this.renderNav();

    if (this.props.route.params && this.props.route.params.currentMailbox) {
      this.setState({currentMailbox: this.props.route.params.currentMailbox});
    } else {
      this.setState({currentMailbox: this.props.emails.emailCurrentMailbox});
    }

    if (this.props.route.params?.contacts) {
      this.addContacts(this.props.route.params.contacts);
    }

    if (this.props.route.params?.emails) {
      this.addEmails(this.props.route.params.emails);
    }

    if (this.props.route.params?.type && this.props.route.params?.email) {
      let e = this.props.route.params.email;
      switch (this.props.route.params.type) {
        case 'reply':
          this.setState({
            subject: 'Re: ' + e.subject,
            body: `
              <br>
              <br>
              <div style="border-left: 4px solid orange; padding-left: 10px;">
                <span>On ${e.date}, &lt;${e.from}&gt; wrote:</span>
                <br>
                <br>
                ${e.body}
              </div>
            `,
          });
          break;
        case 'forward':
          this.setState({
            subject: 'Fwd: ' + e.subject,
            body: `
              <br>
              <br>
              <div style="border-left: 4px solid orange; padding-left: 10px;">
                <span>Begin forwarded message:</span><br><br>
                <span><b>From:</b> &lt;${e.from}&gt;</span><br>
                <span><b>Subject:</b> ${e.subject}</span><br>
                <span><b>Date:</b> ${e.date}</span><br>
                <span><b>To:</b> ${e.to}</span><br>
                <br>
                <br>
                ${e.body}
              </div>
            `,
          });
          break;

        default:
          break;
      }
    }

    this.props.getEmailTemplates();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps, 'nextProps');
    let isSchedule = this.state.selectSchedule;
    console.log(isSchedule, 'isSchedule', this.state.isSend);
    if (nextProps.emails.emailStatus === EMAIL_SENDEMAIL_SUCCESS) {
      this.setState({
        alertVisible: true,
        alertTitle: '',
        isSend: false,
        alertMessage: isSchedule
          ? 'Email Scheduled'
          : nextProps.emails.emailError,
        alertButtons: [
          {
            text: 'OK',
            onPress: () => {
              this.setState({alertVisible: false});
              this.props.navigation.goBack();
            },
            color: global.color_theme,
          },
        ],
      });
    } else if (nextProps.emails.emailStatus === EMAIL_SENDEMAIL_FAIL) {
      this.setState({
        alertVisible: true,
        alertTitle: '',
        alertMessage: nextProps.emails.emailError,
        alertButtons: [
          {
            text: 'OK',
            onPress: () => this.setState({alertVisible: false}),
            color: global.color_theme,
          },
        ],
      });
    }
    // this.setState({ selectSchedule: false });
    console.log(this.state.alertMessage, 'alertMessage+++');
  }

  renderNav() {
    this.props.navigation.setOptions({
      title:
        this.props.route.params && this.props.route.params.title
          ? this.props.route.params.title
          : 'New Email',
      headerLeft: () => (
        <View style={global.styles.headerButtonsContainer}>
          <HeaderButton
            icon={global.icon_wrong}
            style={{padding: 10}}
            mode={this.props.settings.theme.mode}
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
      ),
      headerRight: () => (
        <View style={global.styles.headerButtonsContainer}>
          <HeaderButton
            icon={global.icon_calendar}
            //style={{ padding: 8, marginRight: -3 }}
            style={[
              {borderRadius: 20},
              this.state.schedule
                ? {backgroundColor: global.color_theme, padding: 10}
                : {},
            ]}
            mode={this.props.settings.theme.mode}
            onPress={() => {
              this.state.selectSchedule = !this.state.selectSchedule;
              if (Platform.OS == 'ios') {
                this.datePicker.onPressDate();
              } else {
                console.log('hittt123');
                this.setState({
                  isVisibleDate: true,
                });
              }
            }}
          />
          <HeaderButton
            icon={global.icon_send}
            style={{padding: 8}}
            mode={this.props.settings.theme.mode}
            disabled={this.state.isSend}
            onPress={() => {
              this.setState({isSend: true});
              this.sendEmail();
              Keyboard.dismiss();
              this.richtext.blurContentEditor();
            }}
          />
        </View>
      ),
    });
  }

  sendEmail() {
    console.log('hiitttt maillll', this.state.isSend);
    if (!this.state.isSend) {
      const {subject, body, currentMailbox} = this.state;
      console.log(body, 'bodybody');
      let email = {
        email_from: currentMailbox,
        email_body: body,
        email_subject: subject,
      };
      let to = '';
      this.state.emails.forEach((item, index) => {
        to += index > 0 ? ',' : '';
        to += item.email;
      });
      if (this.state.newChip !== '') {
        if (to !== '') {
          to += ',';
        }
        to += this.state.newChip;
      }
      email['email_to'] = to;
      if (this.state.schedule) {
        email['send_date'] = this.state.schedule
          ? this.state.schedule
          : moment().format('YYYY-MM-DD  h:mm:ss');
      }

      console.log('email to send - ' + JSON.stringify(email));

      this.props.sendEmail({email});
    }
  }

  onEditorInitialized() {
    // Alert.alert('test');

    /*
       this._richText.current?.registerToolbar(function (items) {
          // console.log('Toolbar click, selected items (insert end callback):', items);
          Alert.alert('Toolbar ' + JSON.stringify(items));
       });
       */
    this.setState({editorReady: true});
  }

  validate(text) {
    if (text.includes(' ')) {
      text = text.split(' ')[0];

      console.log(text);
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      if (reg.test(text) === false) {
        console.log('Email is Not Correct');

        this.setState({newChip: text, searchKeyword: text});

        if (this.searchWaiting) {
          clearTimeout(this.searchWaiting);
        }
        this.searchWaiting = setTimeout(() => {
          this.getContacts(1);
        }, 600);
      } else {
        console.log('Email is Correct');

        if (!this.state.emails.some(x => x.email === text)) {
          this.setState({
            emails: [...this.state.emails, {email: text}],
            newChip: '',
            searchKeyword: '',
          });
        } else {
          this.setState({newChip: '', searchKeyword: ''});
        }
      }
    } else {
      this.setState({newChip: text, searchKeyword: text});

      if (this.searchWaiting) {
        clearTimeout(this.searchWaiting);
      }
      this.searchWaiting = setTimeout(() => {
        this.getContacts(1);
      }, 600);
    }
  }

  addEmails(emails) {
    emails.forEach(item => {
      this.validate(item + ' ');
    });
  }

  addContacts(contacts) {
    let newEmails = [];
    contacts.forEach(item => {
      if (!this.state.emails.some(x => x.email === item.email)) {
        newEmails.push({
          fullname: item.fullname,
          email: item.email,
        });
      }
    });

    this.setState({emails: [...this.state.emails, ...newEmails]});
  }

  toggleItem(c) {
    let emails = this.state.emails;
    if (emails.some(x => x.email === c.email)) {
      // const indexToDelete = selected.findIndex(x => x.cid === cid);
      // selected.splice(indexToDelete, 1);
    } else {
      this.addContacts([c]);
      this.setState({searchKeyword: '', newChip: ''});
    }
  }

  renderModalList() {
    let modalList = [];
    console.log(this.props.emails, 'this.props.emails');
    this.props.emails.emailMailboxes.forEach(item => {
      let name = '';
      modalList.push({
        text: item.email,
        onPress: () => {
          //if (item.email !== this.state.currentMailbox) {
          // this.loadBoxes(item.email);
          //}
          this.setState({currentMailbox: item.email, showMailboxes: false});
        },
        checked: this.state.currentMailbox === item.email,
      });
    });
    return modalList;
  }

  renderTemplatesList() {
    let modalList = [];
    this.props.emails.emailTemplates.forEach(item => {
      let name = '';
      modalList.push({
        text: item.subject,
        onPress: () => {
          //if (item.email !== this.state.currentMailbox) {
          // this.loadBoxes(item.email);
          //}
          this.setState({
            currentTemplate: item,
            showTemplates: false,
            body: item.body,
            subject: item.subject,
          });

          this.richtext.setContentHTML(item.body);
        },
        checked:
          this.state.currentTemplate &&
          this.state.currentTemplate.tid === item.tid,
      });
    });
    return modalList;
  }

  getContacts(flag = 0) {
    let filter = {};
    if (
      this.state.alertListType === LISTTYPE_GROUPS &&
      this.state.alertListSelected.length > 0
    ) {
      filter = {groups: this.state.alertListSelected};
    } else if (
      this.state.alertListType === LISTTYPE_CAMPAIGNS &&
      this.state.alertListSelected.length > 0
    ) {
      filter = {campaigns: this.state.alertListSelected};
    } else if (
      this.state.alertListType === LISTTYPE_TAGS &&
      this.state.alertListSelected.length > 0
    ) {
      filter = {tags: this.state.alertListSelected};
    }

    filter = {
      ...filter,
      limit: this.state.contactsLimit,
      searchKeyword: this.state.searchKeyword,
    };
    console.log(filter);
    this.props.getContactList(filter, flag);
  }

  onEndReached() {
    let limitDiff = 10;
    let list = [];
    list = this.props.contactsList;
    if (list.length >= this.state.contactsLimit) {
      this.setState(
        {contactsLimit: this.state.contactsLimit + limitDiff},
        () => {
          this.getContacts(1);
        },
      );
    }
  }

  hideDatePicker = () => {
    this.setState({
      isVisibleDate: false,
    });
  };

  handleConfirm = date => {
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
    console.log('A date has been picked: ', date, dateTime);
    this.state.scheduleDateTime =
      dateTime.split(' ')[0] + ' ' + FormatTime(dateTime.split(' ')[1]);
    this.state.schedule = dateTime;
    this.renderNav();
    this.hideDatePicker();
  };

  render() {
    let that = this;
    const {emojiVisible, disabled} = that.state;
    // const {backgroundColor, color, placeholderColor} = contentStyle;
    const dark = this.props.settings.theme.mode; //theme === 'dark';
    let list = this.props.contactsList;

    return (
      <View
        style={[
          global.styles.screenContainer,
          {backgroundColor: this.props.settings.theme.bgSecondary},
        ]}>
        <View
          style={[
            styles.topItemContainer,
            {
              backgroundColor: this.props.settings.theme.bgSecondary,
            },
          ]}>
          <Text style={styles.topItemLabel}>To: </Text>
          <View style={{flex: 1}}>
            {
              <ScrollView style={{flex: 0, maxHeight: 100, marginTop: 0}}>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}>
                  {this.state.emails.map((item, index) => {
                    return this.state.compressedRecipients &&
                      this.state.emails.length > 1 &&
                      index > 0 ? (
                      index === 1 ? (
                        <EmailChip
                          textColor={this.props.settings.theme.textPrimary}
                          bgColor={this.props.settings.theme.bgTertiary}
                          otherText={`${this.state.emails.length - 1} more`}
                          onPress={() =>
                            this.setState({compressedRecipients: false})
                          }
                        />
                      ) : null
                    ) : (
                      <EmailChip
                        textColor={this.props.settings.theme.textPrimary}
                        name={item.fullname}
                        email={item.email}
                        bgColor={this.props.settings.theme.bgTertiary}
                        onPressDelete={() => {
                          let e = this.state.emails;
                          e.splice(index, 1);
                          this.setState({emails: e});
                          // Alert.alert('works')
                        }}
                      />
                    );
                  })}
                </View>
              </ScrollView>
              /*
              <TextInput
                style={{ display: 'flex', flex: 1, backgroundColor: 'green', height: 30}}
                placeholder={''}
                placeholderTextColor={global.color_medgray}
                onChangeText={(recipients) => this.setState({ recipients })}
                keyboardType={'email-address'}
              >
                <ParsedText
                  style={global.styles.parsedTextBase}
                  parse={
                    [
                      {
                        type: 'email', 
                        style: { backgroundColor: 'red', padding: 20, }, 
                        onPress: this.handleEmailPress
                      },
                    ]
                  }
                  >
                  {this.state.recipients}
                  </ParsedText>
              </TextInput>
              */
            }

            <EmailInputChip
              textColor={this.props.settings.theme.textPrimary}
              placeholder={'Enter recipients'}
              value={this.state.newChip}
              keyboardType={'email-address'}
              onChangeText={value => this.validate(value)}
              onSubmitEditing={() => this.validate(this.state.newChip + ' ')}
              onBlur={() => {
                this.setState({compressedRecipients: true});
              }}
            />
          </View>

          <MiniButton
            style={{marginTop: 0, marginRight: -4, marginLeft: 0}}
            onPress={() =>
              this.props.navigation.navigate('EmailContactList', {
                title: 'New Email',
                onAddContacts: contacts => this.addContacts(contacts),
              })
            }
            icon={global.icon_plus}
            size={24}
            tintColor={this.props.settings.theme.bgPrimary}
          />
        </View>
        {this.state.searchKeyword !== '' ? (
          <View style={{height: '100%', width: '100%'}}>
            <FlatList
              keyboardShouldPersistTaps={'handled'}
              contentContainerStyle={{paddingBottom: 300}}
              data={list}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => `list-item-${index}`}
              removeClippedSubviews={false}
              onEndReached={() => this.onEndReached()}
              onEndReachedThreshold={0.5}
              renderItem={({item}) => {
                return (
                  <ContactItem
                    disabled={!item.email || this.email === ''}
                    textColor={this.props.settings.theme.textPrimary}
                    checkColor={this.props.settings.theme.bgSecondary}
                    active={this.state.emails.some(x => x.email === item.email)}
                    title={item.first_name + ' ' + item.last_name}
                    separatorColor={this.props.settings.theme.separator}
                    onPress={() => this.toggleItem(item)}
                    onPressCheckbox={() => {
                      this.toggleItem(item);
                    }}
                    // showRatings={item.rating && item.rating > 0}
                    // rating={item.rating}
                    email={item.email}
                    hideArrow
                  />
                );
              }}
            />
          </View>
        ) : null}
        <TouchableOpacity
          style={{paddingRight: 40}}
          onPress={() => this.setState({showMailboxes: true})}>
          <View
            style={[
              styles.topItemContainer,
              {
                alignItems: 'center',
                paddingVertical: 10,
                width: '100%',
                backgroundColor: this.props.settings.theme.bgSecondary,
              },
            ]}>
            <Text
              style={[
                styles.topItemLabel,
                {marginTop: 0, color: this.props.settings.theme.textPrimary},
              ]}>
              From:{' '}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: global.color_darkgray,
                flex: 1,
                color: this.props.settings.theme.textPrimary,
              }}>
              {this.state.currentMailbox}
            </Text>
            <Image source={global.icon_dropdown} style={[styles.iconStyle]} />
          </View>
        </TouchableOpacity>
        <View
          style={[
            styles.topItemContainer,
            {
              marginRight: 20,
              alignItems: 'center',
              paddingVertical: 10,
              backgroundColor: this.props.settings.theme.bgSecondary,
            },
          ]}>
          <Text
            style={
              (styles.topItemLabel,
              {color: this.props.settings.theme.textPrimary})
            }>
            Subject:{' '}
          </Text>
          <TextInput
            style={{
              fontSize: 14,
              color: global.color_darkgray,
              flex: 1,
              color: this.props.settings.theme.textPrimary,
            }}
            placeholder={'Email Subject'}
            placeholderTextColor={global.color_medgray}
            onChangeText={subject => this.setState({subject})}
            clearButtonMode={'while-editing'}
            value={this.state.subject}
          />
        </View>
        {this.props.route.params?.type ? null : (
          <TouchableOpacity
            style={{paddingRight: 40}}
            onPress={() => this.setState({showTemplates: true})}>
            <View
              style={[
                styles.topItemContainer,
                {
                  alignItems: 'center',
                  paddingVertical: 10,
                  width: '100%',
                  backgroundColor: this.props.settings.theme.bgSecondary,
                },
              ]}>
              <Text
                style={[
                  styles.topItemLabel,
                  {marginTop: 0, color: this.props.settings.theme.textPrimary},
                ]}>
                Template:{' '}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: global.color_darkgray,
                  flex: 1,
                  color: this.props.settings.theme.textPrimary,
                }}>
                {this.state.currentTemplate
                  ? this.state.currentTemplate.subject
                  : 'Select Template'}
              </Text>
              <Image source={global.icon_dropdown} style={[styles.iconStyle]} />
            </View>
          </TouchableOpacity>
        )}
        <View
          style={[
            styles.topItemContainer,
            {marginRight: 20, alignItems: 'center', paddingVertical: 10},
            this.state.schedule
              ? {}
              : {
                  minHeight: 0,
                  height: 0,
                  padding: 0,
                  margin: 0,
                  paddingTop: 0,
                  paddingBottom: 0,
                  borderBottomWidth: 0,
                  backgroundColor: 'red',
                  overflow: 'hidden',
                },
          ]}>
          {Platform.OS == 'ios' ? (
            <Text style={styles.topItemLabel}>Schedule: </Text>
          ) : (
            <Text style={styles.topItemLabel}>
              Schedule:{' '}
              {this.state.scheduleDateTime == null
                ? ''
                : this.state.scheduleDateTime}
            </Text>
          )}

          {Platform.OS == 'ios' ? (
            <View style={{flex: 1, height: 20}}>
              <TouchableOpacity
                style={{width: '100%', height: '100%'}}
                onPress={() => {
                  this.datePicker.onPressDate();
                }}>
                <DatePicker
                  ref={r => (this.datePicker = r)}
                  style={[styles.inputText, {flex: 1, marginVertical: -7}]}
                  date={this.state.schedule}
                  mode={'datetime'}
                  placeholder={'Schedule'}
                  //format="YYYY-MM-DD h:mm A"
                  format={'YYYY-MM-DD hh:mm:ss'}
                  confirmBtnText={'Confirm'}
                  cancelBtnText={'Cancel'}
                  customStyles={{
                    ...styles.datePickerStyle,
                    ...{
                      datePickerCon: {
                        backgroundColor: this.props.settings.theme.bgSecondary,
                        borderTopRightRadius: 30,
                        borderTopLeftRadius: 30,
                      },
                      placeholderText: {
                        fontSize: 14,
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
                        fontSize: 14,
                        color: this.props.settings.theme.textPrimary,
                      },
                    },
                  }}
                  onDateChange={schedule => {
                    this.setState({schedule}, () => this.renderNav());
                  }}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{flex: 1, height: 20}}>
              <TouchableOpacity
                style={{width: '100%', height: '100%'}}
                onPress={() => {
                  console.log('hit+++');
                  this.state.isVisibleDate = true;
                }}>
                <DateTimePickerModal
                  // ref={r =>this.datePicker = r}
                  isVisible={this.state.isVisibleDate}
                  mode="datetime"
                  date={
                    this.state.schedule == null
                      ? new Date()
                      : new Date(this.state.schedule)
                  }
                  // date = {new Date()}
                  onConfirm={this.handleConfirm}
                  onCancel={this.hideDatePicker}
                />
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            style={[
              {padding: 6, width: 24, height: 24, marginRight: -6},
              this.state.schedule
                ? {}
                : {minHeight: 0, height: 0, overflow: 'hidden'},
            ]}
            onPress={() =>
              this.setState({schedule: null}, () => this.renderNav())
            }>
            <Image
              style={global.styles.tagCloseImg}
              source={global.icon_wrong}
            />
          </TouchableOpacity>
        </View>

        {/*
            this.state.editorReady && this.richtext ?

        <View style={{ height: 50 }}>
            <RichToolbar
            editor={() => this.richtext}
            actions={[
              actions.setBold,
              actions.setItalic,
              actions.setStrikethrough,
              actions.insertBulletsList,
              actions.insertOrderedList,
            ]}
            />
        </View>
            : null
            */}
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <RichEditor
            style={{backgroundColor: this.props.settings.theme.bgSecondary}}
            onFocus={
              () => {}
              // this.setState({ compressedRecipients: true });
            }
            editorStyle={{
              backgroundColor: this.props.settings.theme.bgSecondary,
              color: this.props.settings.theme.textPrimary,
            }}
            ref={r => (this.richtext = r)}
            placeholder={this.props.placeholder}
            onChange={body => {
              this.setState({body});
            }}
            initialContentHTML={this.state.body}
            // onInput={this.state.body}
            editorInitializedCallback={() => this.onEditorInitialized()}
          />
        </KeyboardAwareScrollView>

        <ModalBottom
          isVisible={this.state.showMailboxes || this.state.showTemplates}
          dark={this.props.settings.theme.mode === 'dark'}
          list={
            this.state.showMailboxes
              ? this.renderModalList()
              : this.renderTemplatesList()
          }
          title={this.state.showMailboxes ? 'Mailboxes' : 'Templates'}
          buttons={[
            //{ text: 'Select Mailbox', color: global.color_theme, onPress: () => this.setState({ showMailboxes: false }) },
            {
              text: 'Cancel',
              type: 'cancel',
              onPress: () =>
                this.setState({showMailboxes: false, showTemplates: false}),
            },
          ]}
          bgColor={
            this.props.settings.theme.mode === 'light'
              ? this.props.settings.theme.bgPrimary
              : this.props.settings.theme.bgTertiary
          }
          textColor={this.props.settings.theme.textPrimary}
          hideArrow
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
        {this.props.emails.emailStatus === EMAIL_SENDEMAIL_LOADING ? (
          <IndicatorBottom dark={this.props.settings.theme.mode === 'dark'} />
        ) : null}
      </View>
    );
  }
}

const styles = {
  topItemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginHorizontal: 20,
    paddingTop: 10,
    minHeight: 40,
    backgroundColor: global.color_ltgray,
    borderBottomWidth: 1,
    borderColor: global.color_separator,
  },
  topItemContentContainer: {},
  topItemLabel: {
    color: global.color_medgray,
    fontSize: 14,
    marginRight: 5,
    marginTop: 5,
  },
  emailContainer: {
    height: 30,
    borderRadius: 15,
    backgroundColor: global.color_ltmedgray,
    marginHorizontal: 2,
    marginBottom: 4,
    justifyContent: 'center',
    paddingHorizontal: 10,
    alignSelf: 'baseline',
  },
  emailText: {
    color: global.color_darkgray,
    fontSize: 14,
  },
  iconStyle: {
    width: 12,
    height: 12,
    tintColor: global.color_darkgray,
    resizeMode: 'contain',
  },
  datePickerStyle: {
    datePicker: {
      paddingLeft: (global.deviceWidth - 200) / 2,
    },
    placeholderText: {fontSize: 16, color: global.color_white_3, margin: 0},
    dateIcon: {width: 0, height: 0, margin: 0},

    btnTextConfirm: {color: global.color_theme, fontWeight: '700'},
  },
};

const mapStateToProps = ({settings, emails, contacts}) => {
  const {
    contactsStatus,
    contactsError,
    contactsList,
    contactInfo,
    contactsWithRatings,
  } = contacts;
  return {
    settings,
    emails,
    contactsStatus,
    contactsError,
    contactsList,
    contactInfo,
    contactsWithRatings,
  };
};

export default connect(mapStateToProps, {
  getEmailTemplates,
  sendEmail,
  getContactList,
})(EmailCompose);
