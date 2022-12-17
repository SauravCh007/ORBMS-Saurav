// import React, {Component} from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TextInput,
//   Alert,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   InputAccessoryView,
//   Keyboard,
//   Button,
//   Platform,
// } from 'react-native';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
// import {connect} from 'react-redux';
// import {addContact, updateContactInfo} from '../actions';
// import {formatMobileNumber} from '../utils/Helper';
// import {
//   HeaderButton,
//   ModalAlert,
//   ModalChecklist,
//   FormInput,
//   FormButton,
//   FormDropdown,
//   MiniButton,
//   GroupsItem,
//   GroupsItemEmpty,
// } from '../common';
// import {
//   CONTACT_ADDCONTACT_LOADING,
//   CONTACT_ADDCONTACT_SUCCESS,
//   CONTACT_ADDCONTACT_FAIL,
//   CONTACT_UPDATECONTACTINFO_SUCCESS,
//   CONTACT_UPDATECONTACTINFO_FAIL,
// } from '../actions/types';

// class ContactAdd extends Component {
//   static navigationOptions = ({navigation}) => {
//     const {params} = navigation.state;
//     return params;
//   };

//   constructor(props) {
//     super(props);
//     this.state = {
//       listGroups: [
//         'Team Member',
//         'Manufacturer',
//         'Retailer',
//         'Marketing Launch Company',
//       ],

//       // MODAL ALERT
//       alertVisible: false,
//       alertTitle: '',
//       alertMessage: '',
//       alertButtons: [
//         {text: 'OK', onPress: () => this.setState({alertVisible: false})},
//       ],
//       alertIcon: null,

//       alertListVisible: false,
//       alertListData: [],
//       alertListButtons: [],

//       // PARAMS
//       first_name: '',
//       last_name: '',
//       company_name: '',
//       phone: '',
//       email: '',
//       website: '',
//       address: '',
//       facebook_url: '',
//       // old
//       phone_alt: '',
//       city: '',
//       state: '',
//       zip: '',

//       // UNAVAILABALE
//       birthdate: '',
//       special_date: '',
//       instant_message: '',

//       prevInput: null,
//       nextInput: null,
//       btnDisable: true,
//       showLoading: false,
//     };
//     this.inputAccessoryViewID = 'uniqueID';
//   }

  
//   componentDidMount() {
//     console.log("this.state",this.state)
//     this.props.navigation.setOptions({
//       title: this.props.route.params.title
//         ? this.props.route.params.title
//         : 'Edit Contact',
//       headerLeft: () => (
//         <View style={global.styles.headerButtonsContainer}>
//           <HeaderButton
//             icon={global.icon_leftarrow}
//             mode={this.props.settings.theme.mode}
//             onPress={() => this.props.navigation.goBack()}
//           />
//         </View>
//       ),
//       headerRight: () => <View />,
//     });

//     if (this.props.route.params && this.props.route.params.contact) {
//       console.log(
//         this.props.route.params.contact,
//         'this.props.route.params.contact',
//       );
//       let c = this.props.route.params.contact;
//       console.log("eee",c)
//       const {
//         first_name,
//         last_name,
//         company_name,
//         phone,
//         email,
//         website,
//         address,
//         facebook_url,
//         city,
//         state,
//         zip,
//       } = c;
//       this.setState({
//         first_name,
//         last_name,
//         company_name,
//         phone: formatMobileNumber(phone),
//         email,
//         website,
//         address,
//         facebook_url,
//         city,
//         state,
//         zip,
//       });
//     }
//   }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.contactsStatus === CONTACT_ADDCONTACT_SUCCESS) {
//       // this.props.navigation.goBack();
//       this.setState({showLoading: true});

//       let contact = nextProps.contactAddedData.contact_details;
//       Object.assign(contact, {
//         cid: nextProps.contactAddedData.cid,
//         groups: nextProps.contactAddedData.groups,
//         tags: nextProps.contactAddedData.tags,
//         campaigns: nextProps.contactAddedData.campaigns,
//         history: nextProps.contactAddedData.history,
//         tasks: nextProps.contactAddedData.tasks,
//         notes: nextProps.contactAddedData.notes,
//       });
//       console.log(contact, 'contact==>>>>>>>');
//       this.props.navigation.navigate('ContactDetails', {
//         contactInfo: contact,
//         selectInfo: {},
//       });
//       this.setState({btnDisable: true});

//       setTimeout(() => {
//         this.setState({showLoading: false});
//       }, 3500);
//       // this.props.route.params.onNavigateBack();
//     } else if (nextProps.contactsStatus === CONTACT_UPDATECONTACTINFO_SUCCESS) {
//       console.log(this.props.route.params, 'this.props.route.params');
//       this.props.route.params.onNavigateBack();
//       this.props.navigation.goBack();
//     }
//   }

//   checkFields() {
//     let errorMessage = '';
//     this.setState({btnDisable: false});
//     if (this.state.first_name === '') {
//       errorMessage = 'Please enter your first name';
//     }

//     if (errorMessage !== '') {
//       this.setState({
//         alertVisible: true,
//         alertTitle: 'Unable to Save',
//         alertMessage: errorMessage,
//         alertButtons: [
//           {text: 'OK', onPress: () => this.setState({alertVisible: false})},
//         ],
//         alertIcon: null,
//       });
//     } else {
//       // SUBMIT
//       const {
//         first_name,
//         last_name,
//         company_name,
//         phone,
//         email,
//         website,
//         address,
//         facebook_url,
//         // old
//         phone_alt,
//         city,
//         state,
//         zip,
//       } = this.state;
//       if (this.state.btnDisable == true) {
//         if (this.props.route.params && this.props.route.params.contact) {
//           let c = this.props.route.params.contact;
//           this.props.updateContactInfo({
//             cid: c.cid,
//             first_name,
//             last_name,
//             company_name,
//             phone,
//             email,
//             website,
//             address,
//             facebook_url,
//             // old
//             phone_alt,
//             city,
//             state,
//             zip,
//           });
//         } else {
//           this.props.addContact({
//             first_name,
//             last_name,
//             company_name,
//             phone,
//             email,
//             website,
//             address,
//             facebook_url,
//             // old
//             phone_alt,
//             city,
//             state,
//             zip,
//           });
//         }
//       }
//     }
//   }

//   render() {
//     let newContact = true;
//     return (
//       <View
//         style={[
//           global.styles.screenContainer,
//           {backgroundColor: this.props.settings.theme.bgSecondary},
//         ]}>
//         <KeyboardAwareScrollView
//           style={styles.container}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{
//             paddingHorizontal: 30,
//             paddingTop: 20,
//             paddingBottom: 150,
//           }}>
//           <FormInput
//             placeholder={'First Name'}
//             label={'First Name'}
//             value={this.state.first_name}
//             onChangeText={first_name => this.setState({first_name})}
//             autoCapitalize={'words'}
//             textColor={this.props.settings.theme.textPrimary}
//             bgColor={this.props.settings.theme.inputBg}
//             inputAccessoryViewID={this.inputAccessoryViewID}
//             onFocus={() => this.setState({nextInput: this.inputLastname})}
//             inputRef={ref => {
//               this.inputFirstname = ref;
//             }}
//           />
//           <FormInput
//             placeholder={'Last Name'}
//             label={'Last Name'}
//             value={this.state.last_name}
//             onChangeText={last_name => this.setState({last_name})}
//             autoCapitalize={'words'}
//             textColor={this.props.settings.theme.textPrimary}
//             bgColor={this.props.settings.theme.inputBg}
//             inputAccessoryViewID={this.inputAccessoryViewID}
//             onFocus={() =>
//               this.setState({
//                 prevInput: this.inputFirstname,
//                 nextInput: this.inputcompany_name,
//               })
//             }
//             inputRef={ref => {
//               this.inputLastname = ref;
//             }}
//           />
//           <FormInput
//             placeholder={'Company Name'}
//             label={'Company Name'}
//             value={this.state.company_name}
//             onChangeText={company_name => this.setState({company_name})}
//             autoCapitalize={'words'}
//             textColor={this.props.settings.theme.textPrimary}
           
//             bgColor={this.props.settings.theme.inputBg}
//             inputAccessoryViewID={this.inputAccessoryViewID}
//             onFocus={() =>
//               this.setState({
//                 prevInput: this.inputLastname,
//                 nextInput: this.inputPhone,
//               })
//             }
//             inputRef={ref => {
//               this.inputcompany_name = ref;
//             }}
//           />
//           <FormInput
//             placeholder={'Phone'}
//             label={'Phone'}
//             value={this.state.phone}
//             maxLength={10}
//             onChangeText={text =>
//               this.setState({phone: formatMobileNumber(text)})
//             }
//             keyboardType={'phone-pad'}
//             textColor={this.props.settings.theme.textPrimary}
//             bgColor={this.props.settings.theme.inputBg}
//             inputAccessoryViewID={this.inputAccessoryViewID}
//             onFocus={() =>
//               this.setState({
//                 prevInput: this.inputcompany_name,
//                 nextInput: this.inputEmail,
//               })
//             }
//             inputRef={ref => {
//               this.inputPhone = ref;
//             }}
//           />
//           <FormInput
//             placeholder={'Email Address'}
//             label={'Email Address'}
//             value={this.state.email}
//             onChangeText={email => this.setState({email})}
//             keyboardType={'email-address'}
//             textColor={this.props.settings.theme.textPrimary}
//             bgColor={this.props.settings.theme.inputBg}
//             inputAccessoryViewID={this.inputAccessoryViewID}
//             onFocus={() =>
//               this.setState({
//                 prevInput: this.inputPhone,
//                 nextInput: this.inputWebsite,
//               })
//             }
//             inputRef={ref => {
//               this.inputEmail = ref;
//             }}
//           />
//           <FormInput
//             placeholder={'Website'}
//             label={'Website'}
//             value={this.state.website}
//             onChangeText={website => this.setState({website})}
//             textColor={this.props.settings.theme.textPrimary}
//             bgColor={this.props.settings.theme.inputBg}
//             inputAccessoryViewID={this.inputAccessoryViewID}
//             onFocus={() =>
//               this.setState({
//                 prevInput: this.inputEmail,
//                 nextInput: this.inputAddress,
//               })
//             }
//             inputRef={ref => {
//               this.inputWebsite = ref;
//             }}
//           />
//           <FormInput
//             placeholder={'Address'}
//             label={'Address'}
//             value={this.state.address}
//             onChangeText={address => this.setState({address})}
//             autoCapitalize={'words'}
//             textColor={this.props.settings.theme.textPrimary}
//             bgColor={this.props.settings.theme.inputBg}
//             inputAccessoryViewID={this.inputAccessoryViewID}
//             onFocus={() =>
//               this.setState({
//                 prevInput: this.inputWebsite,
//                 nextInput: this.inputCity,
//               })
//             }
//             inputRef={ref => {
//               this.inputAddress = ref;
//             }}
//           />
//           <FormInput
//             placeholder={'City'}
//             label={'City'}
//             value={this.state.city}
//             onChangeText={city => this.setState({city})}
//             autoCapitalize={'words'}
//             textColor={this.props.settings.theme.textPrimary}
//             bgColor={this.props.settings.theme.inputBg}
//             inputAccessoryViewID={this.inputAccessoryViewID}
//             onFocus={() =>
//               this.setState({
//                 prevInput: this.inputWebsite,
//                 nextInput: this.inputState,
//               })
//             }
//             inputRef={ref => {
//               this.inputCity = ref;
//             }}
//           />
//           <FormInput
//             placeholder={'State'}
//             label={'State'}
//             value={this.state.state}
//             onChangeText={x => this.setState({state: x})}
//             maxLength={15}
//             autoCapitalize={'characters'}
//             textColor={this.props.settings.theme.textPrimary}
//             bgColor={this.props.settings.theme.inputBg}
//             inputAccessoryViewID={this.inputAccessoryViewID}
//             onFocus={() =>
//               this.setState({
//                 prevInput: this.inputCity,
//                 nextInput: this.inputZip,
//               })
//             }
//             inputRef={ref => {
//               this.inputState = ref;
//             }}
//           />
//           <FormInput
//             placeholder={'Zip'}
//             label={'Zip'}
//             value={this.state.zip}
//             onChangeText={zip => this.setState({zip})}
//             keyboardType={'number-pad'}
//             textColor={this.props.settings.theme.textPrimary}
//             bgColor={this.props.settings.theme.inputBg}
//             inputAccessoryViewID={this.inputAccessoryViewID}
//             onFocus={() =>
//               this.setState({prevInput: this.inputState, nextInput: null})
//             }
//             inputRef={ref => {
//               this.inputZip = ref;
//             }}
//           />

//           {newContact ? null : (
//             <View>
//               <View style={styles.segmentTitleContainer}>
//                 <Text style={styles.segmentTitle}>Groups</Text>
//                 <MiniButton icon={global.icon_plus} size={20} />
//               </View>
//               <View style={[global.styles.tagsContainer, {marginBottom: 10}]}>
//                 {this.state.groups.length > 0 ? (
//                   this.state.groups.map(item => {
//                     return (
//                       <View style={global.styles.tagItem}>
//                         <Text style={global.styles.tagItemText}>{item}</Text>
//                         <TouchableOpacity style={global.styles.tagCloseBtn}>
//                           <Image
//                             style={global.styles.tagCloseImg}
//                             source={global.icon_wrong}
//                           />
//                         </TouchableOpacity>
//                       </View>
//                     );
//                   })
//                 ) : (
//                   <GroupsItemEmpty
//                     title={'No Groups'}
//                     textColor={this.props.settings.theme.textSecondary}
//                   />
//                 )}
//               </View>
//             </View>
//           )}
//         </KeyboardAwareScrollView>
//         <FormButton
//           text={'Save'}
//           style={global.styles.quickButtonsContainer}
//           textColor={this.props.settings.theme.bgPrimary}
//           onPress={() => this.checkFields()}
//         />
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
//         <ModalChecklist isVisible={false} title={'Select Tags'} list={[]} />
//         {Platform.OS === 'android' ? null : (
//           <InputAccessoryView nativeID={this.inputAccessoryViewID}>
//             <View
//               style={{
//                 backgroundColor: this.props.settings.theme.bgSecondary,
//                 justifyContent: 'space-between',
//                 paddingHorizontal: 10,
//                 flexDirection: 'row',
//               }}>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                 }}>
//                 <HeaderButton
//                   icon={global.icon_arrowup}
//                   disabled={this.state.prevInput === null}
//                   style={{padding: 8, marginRight: -4}}
//                   mode={this.props.settings.theme.mode}
//                   onPress={() => this.state.prevInput.focus()}
//                 />
//                 <HeaderButton
//                   icon={global.icon_dropdown}
//                   disabled={this.state.nextInput === null}
//                   style={{padding: 8}}
//                   mode={this.props.settings.theme.mode}
//                   onPress={() => this.state.nextInput.focus()}
//                 />
//               </View>
//               <Button
//                 onPress={() => {
//                   Keyboard.dismiss();
//                   this.setState({prevInput: null, nextInput: null});
//                 }}
//                 title="Done"
//                 color={global.color_theme}
//               />
//             </View>
//           </InputAccessoryView>
//         )}
//         {this.state.showLoading ? (
//           <View
//             style={{
//               position: 'absolute',
//               top: 0,
//               bottom: 0,
//               right: 0,
//               left: 0,
//               flex: 1,
//               justifyContent: 'center',
//               alignItems: 'center',
//               backgroundColor: global.color_white,
//             }}>
//             <Image
//               source={global.logo_gif}
//               style={{width: 200, height: 200}}
//               resizeMode="contain"
//             />
//           </View>
//         ) : null}
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   segmentTitleContainer: {
//     marginTop: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   segmentTitle: {
//     fontFamily: 'Montserrat-Regular',
//     fontWeight: '600',
//     fontSize: 14,
//     color: global.color_darkgray,
//     marginRight: 5,
//   },
// });

// const mapStateToProps = ({settings, contacts}) => {
//   const {contactsStatus, contactsError, contactAddedData} = contacts;
//   return {
//     settings,
//     contactsStatus,
//     contactsError,
//     contactAddedData,
//   };
// };

// export default connect(mapStateToProps, {addContact, updateContactInfo})(
//   ContactAdd,
// );


import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
  StyleSheet,
  InputAccessoryView,
  Keyboard,
  Button,
  Platform,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {connect} from 'react-redux';
import {addContact, updateContactInfo} from '../actions';
import {formatMobileNumber} from '../utils/Helper';
import {
  HeaderButton,
  ModalAlert,
  ModalChecklist,
  FormInput,
  FormButton,
  FormDropdown,
  MiniButton,
  GroupsItem,
  GroupsItemEmpty,
} from '../common';
import {
  CONTACT_ADDCONTACT_LOADING,
  CONTACT_ADDCONTACT_SUCCESS,
  CONTACT_ADDCONTACT_FAIL,
  CONTACT_UPDATECONTACTINFO_SUCCESS,
  CONTACT_UPDATECONTACTINFO_FAIL,
} from '../actions/types';

class ContactAdd extends Component {
  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state;
    return params;
  };

  constructor(props) {
    super(props);
    this.state = {
      listGroups: [
        'Team Member',
        'Manufacturer',
        'Retailer',
        'Marketing Launch Company',
      ],

      // MODAL ALERT
      alertVisible: false,
      alertTitle: '',
      alertMessage: '',
      alertButtons: [
        {text: 'OK', onPress: () => this.setState({alertVisible: false})},
      ],
      alertIcon: null,

      alertListVisible: false,
      alertListData: [],
      alertListButtons: [],

      // PARAMS
      first_name: '',
      last_name: '',
      companyname: '',
      phone: '',
      email: '',
      website: '',
      address: '',
      facebook_url: '',
      // old
      phone_alt: '',
      city: '',
      state: '',
      zip: '',

      // UNAVAILABALE
      birthdate: '',
      special_date: '',
      instant_message: '',

      prevInput: null,
      nextInput: null,
      btnDisable: true,
      showLoading: false,
    };
    this.inputAccessoryViewID = 'uniqueID';
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      title: this.props.route.params.title
        ? this.props.route.params.title
        : 'Edit Contact',
      headerLeft: () => (
        <View style={global.styles.headerButtonsContainer}>
          <HeaderButton
            icon={global.icon_leftarrow}
            mode={this.props.settings.theme.mode}
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
      ),
      headerRight: () => <View />,
    });

    if (this.props.route.params && this.props.route.params.contact) {
      console.log(
        this.props.route.params.contact,
        'this.props.route.params.contact',
      );
      let c = this.props.route.params.contact;
      console.log("cccccccccccccccccccccccccccc",c)
      const {
        first_name,
        last_name,
        companyname,
        phone,
        email,
        website,
        address,
        facebook_url,
        city,
        state,
        zip,
      } = c;
      console.log("cccccccccccccccccccccccccccc",first_name , last_name , companyname)
      this.setState({
        first_name,
        last_name,
        companyname,
        phone: formatMobileNumber(phone),
        email,
        website,
        address,
        facebook_url,
        city,
        state,
        zip,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.contactsStatus === CONTACT_ADDCONTACT_SUCCESS) {
      // this.props.navigation.goBack();
      this.setState({showLoading: true});

      let contact = nextProps.contactAddedData.contact_details;
      Object.assign(contact, {
        cid: nextProps.contactAddedData.cid,
        groups: nextProps.contactAddedData.groups,
        tags: nextProps.contactAddedData.tags,
        campaigns: nextProps.contactAddedData.campaigns,
        history: nextProps.contactAddedData.history,
        tasks: nextProps.contactAddedData.tasks,
        notes: nextProps.contactAddedData.notes,
      });
      console.log(contact, 'contact==>>>>>>>');
      this.props.navigation.navigate('ContactDetails', {
        contactInfo: contact,
        selectInfo: {},
      });
      this.setState({btnDisable: true});

      setTimeout(() => {
        this.setState({showLoading: false});
      }, 3500);
      // this.props.route.params.onNavigateBack();
    } else if (nextProps.contactsStatus === CONTACT_UPDATECONTACTINFO_SUCCESS) {
      console.log(this.props.route.params, 'this.props.route.params');
      this.props.route.params.onNavigateBack();
      this.props.navigation.goBack();
    }
  }

  checkFields() {
    let errorMessage = '';
    this.setState({btnDisable: false});
    if (this.state.first_name === '') {
      errorMessage = 'Please enter your first name';
    }

    if (errorMessage !== '') {
      this.setState({
        alertVisible: true,
        alertTitle: 'Unable to Save',
        alertMessage: errorMessage,
        alertButtons: [
          {text: 'OK', onPress: () => this.setState({alertVisible: false})},
        ],
        alertIcon: null,
      });
    } else {
      // SUBMIT
      const {
        first_name,
        last_name,
        companyname,
        phone,
        email,
        website,
        address,
        facebook_url,
        // old
        phone_alt,
        city,
        state,
        zip,
      } = this.state;
      if (this.state.btnDisable == true) {
        if (this.props.route.params && this.props.route.params.contact) {
          let c = this.props.route.params.contact;
          console.log("sending=====>",c)
          this.props.updateContactInfo({
            cid: c.cid,
            first_name,
            last_name,
            companyname,
            phone,
            email,
            website,
            address,
            facebook_url,
            // old
            phone_alt,
            city,
            state,
            zip,
          });
        } else {
          this.props.addContact({
            first_name,
            last_name,
            companyname,
            phone,
            email,
            website,
            address,
            facebook_url,
            // old
            phone_alt,
            city,
            state,
            zip,
          });
        }
      }
    }
  }

  render() {
    let newContact = true;
    return (
      <View
        style={[
          global.styles.screenContainer,
          {backgroundColor: this.props.settings.theme.bgSecondary},
        ]}>
        <KeyboardAwareScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 30,
            paddingTop: 20,
            paddingBottom: 150,
          }}>
          <FormInput
            placeholder={'First Name'}
            label={'First Name'}
            value={this.state.first_name}
            onChangeText={first_name => this.setState({first_name})}
            autoCapitalize={'words'}
            textColor={this.props.settings.theme.textPrimary}
            bgColor={this.props.settings.theme.inputBg}
            inputAccessoryViewID={this.inputAccessoryViewID}
            onFocus={() => this.setState({nextInput: this.inputLastname})}
            inputRef={ref => {
              this.inputFirstname = ref;
            }}
          />
          <FormInput
            placeholder={'Last Name'}
            label={'Last Name'}
            value={this.state.last_name}
            onChangeText={last_name => this.setState({last_name})}
            autoCapitalize={'words'}
            textColor={this.props.settings.theme.textPrimary}
            bgColor={this.props.settings.theme.inputBg}
            inputAccessoryViewID={this.inputAccessoryViewID}
            onFocus={() =>
              this.setState({
                prevInput: this.inputFirstname,
                nextInput: this.inputcompany_name,
              })
            }
            inputRef={ref => {
              this.inputLastname = ref;
            }}
          />
          <FormInput
            placeholder={'Company Name'}
            label={'Company Name'}
            value={this.state.companyname}
            onChangeText={companyname => this.setState({companyname})}
            autoCapitalize={'words'}
            textColor={this.props.settings.theme.textPrimary}
            bgColor={this.props.settings.theme.inputBg}
            inputAccessoryViewID={this.inputAccessoryViewID}
            onFocus={() =>
              this.setState({
                prevInput: this.inputLastname,
                nextInput: this.inputPhone,
              })
            }
            inputRef={ref => {
              this.inputcompany_name = ref;
            }}
          />
          <FormInput
            placeholder={'Phone'}
            label={'Phone'}
            value={this.state.phone}
            onChangeText={text =>
              this.setState({phone: formatMobileNumber(text)})
            }
            keyboardType={'phone-pad'}
            textColor={this.props.settings.theme.textPrimary}
            bgColor={this.props.settings.theme.inputBg}
            inputAccessoryViewID={this.inputAccessoryViewID}
            onFocus={() =>
              this.setState({
                prevInput: this.inputcompany_name,
                nextInput: this.inputEmail,
              })
            }
            inputRef={ref => {
              this.inputPhone = ref;
            }}
          />
          <FormInput
            placeholder={'Email Address'}
            label={'Email Address'}
            value={this.state.email}
            onChangeText={email => this.setState({email})}
            keyboardType={'email-address'}
            textColor={this.props.settings.theme.textPrimary}
            bgColor={this.props.settings.theme.inputBg}
            inputAccessoryViewID={this.inputAccessoryViewID}
            onFocus={() =>
              this.setState({
                prevInput: this.inputPhone,
                nextInput: this.inputWebsite,
              })
            }
            inputRef={ref => {
              this.inputEmail = ref;
            }}
          />
          <FormInput
            placeholder={'Website'}
            label={'Website'}
            value={this.state.website}
            onChangeText={website => this.setState({website})}
            textColor={this.props.settings.theme.textPrimary}
            bgColor={this.props.settings.theme.inputBg}
            inputAccessoryViewID={this.inputAccessoryViewID}
            onFocus={() =>
              this.setState({
                prevInput: this.inputEmail,
                nextInput: this.inputAddress,
              })
            }
            inputRef={ref => {
              this.inputWebsite = ref;
            }}
          />
          <FormInput
            placeholder={'Address'}
            label={'Address'}
            value={this.state.address}
            onChangeText={address => this.setState({address})}
            autoCapitalize={'words'}
            textColor={this.props.settings.theme.textPrimary}
            bgColor={this.props.settings.theme.inputBg}
            inputAccessoryViewID={this.inputAccessoryViewID}
            onFocus={() =>
              this.setState({
                prevInput: this.inputWebsite,
                nextInput: this.inputCity,
              })
            }
            inputRef={ref => {
              this.inputAddress = ref;
            }}
          />
          <FormInput
            placeholder={'City'}
            label={'City'}
            value={this.state.city}
            onChangeText={city => this.setState({city})}
            autoCapitalize={'words'}
            textColor={this.props.settings.theme.textPrimary}
            bgColor={this.props.settings.theme.inputBg}
            inputAccessoryViewID={this.inputAccessoryViewID}
            onFocus={() =>
              this.setState({
                prevInput: this.inputWebsite,
                nextInput: this.inputState,
              })
            }
            inputRef={ref => {
              this.inputCity = ref;
            }}
          />
          <FormInput
            placeholder={'State'}
            label={'State'}
            value={this.state.state}
            onChangeText={x => this.setState({state: x})}
            maxLength={15}
            autoCapitalize={'characters'}
            textColor={this.props.settings.theme.textPrimary}
            bgColor={this.props.settings.theme.inputBg}
            inputAccessoryViewID={this.inputAccessoryViewID}
            onFocus={() =>
              this.setState({
                prevInput: this.inputCity,
                nextInput: this.inputZip,
              })
            }
            inputRef={ref => {
              this.inputState = ref;
            }}
          />
          <FormInput
            placeholder={'Zip'}
            label={'Zip'}
            value={this.state.zip}
            onChangeText={zip => this.setState({zip})}
            keyboardType={'number-pad'}
            textColor={this.props.settings.theme.textPrimary}
            bgColor={this.props.settings.theme.inputBg}
            inputAccessoryViewID={this.inputAccessoryViewID}
            onFocus={() =>
              this.setState({prevInput: this.inputState, nextInput: null})
            }
            inputRef={ref => {
              this.inputZip = ref;
            }}
          />

          {newContact ? null : (
            <View>
              <View style={styles.segmentTitleContainer}>
                <Text style={styles.segmentTitle}>Groups</Text>
                <MiniButton icon={global.icon_plus} size={20} />
              </View>
              <View style={[global.styles.tagsContainer, {marginBottom: 10}]}>
                {this.state.groups.length > 0 ? (
                  this.state.groups.map(item => {
                    return (
                      <View style={global.styles.tagItem}>
                        <Text style={global.styles.tagItemText}>{item}</Text>
                        <TouchableOpacity style={global.styles.tagCloseBtn}>
                          <Image
                            style={global.styles.tagCloseImg}
                            source={global.icon_wrong}
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  })
                ) : (
                  <GroupsItemEmpty
                    title={'No Groups'}
                    textColor={this.props.settings.theme.textSecondary}
                  />
                )}
              </View>
            </View>
          )}
        </KeyboardAwareScrollView>
        <FormButton
          text={'Save'}
          style={global.styles.quickButtonsContainer}
          textColor={this.props.settings.theme.bgPrimary}
          onPress={() => this.checkFields()}
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
        <ModalChecklist isVisible={false} title={'Select Tags'} list={[]} />
        {Platform.OS === 'android' ? null : (
          <InputAccessoryView nativeID={this.inputAccessoryViewID}>
            <View
              style={{
                backgroundColor: this.props.settings.theme.bgSecondary,
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <HeaderButton
                  icon={global.icon_arrowup}
                  disabled={this.state.prevInput === null}
                  style={{padding: 8, marginRight: -4}}
                  mode={this.props.settings.theme.mode}
                  onPress={() => this.state.prevInput.focus()}
                />
                <HeaderButton
                  icon={global.icon_dropdown}
                  disabled={this.state.nextInput === null}
                  style={{padding: 8}}
                  mode={this.props.settings.theme.mode}
                  onPress={() => this.state.nextInput.focus()}
                />
              </View>
              <Button
                onPress={() => {
                  Keyboard.dismiss();
                  this.setState({prevInput: null, nextInput: null});
                }}
                title="Done"
                color={global.color_theme}
              />
            </View>
          </InputAccessoryView>
        )}
        {this.state.showLoading ? (
          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: global.color_white,
            }}>
            <Image
              source={global.logo_gif}
              style={{width: 200, height: 200}}
              resizeMode="contain"
            />
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  segmentTitleContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  segmentTitle: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
    fontSize: 14,
    color: global.color_darkgray,
    marginRight: 5,
  },
});

const mapStateToProps = ({settings, contacts}) => {
  const {contactsStatus, contactsError, contactAddedData} = contacts;
  return {
    settings,
    contactsStatus,
    contactsError,
    contactAddedData,
  };
};

export default connect(mapStateToProps, {addContact, updateContactInfo})(
  ContactAdd,
);
