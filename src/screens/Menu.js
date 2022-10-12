import React, {Component} from 'react';
import {
  View,
  Text,
  SectionList,
  Image,
  TouchableOpacity,
  Switch,
  Linking,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {setAppMode, signOutUser} from '../actions';
import {AUTH_SIGNOUT_SUCCESS} from '../actions/types';

class Menu extends Component {
  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state;
    return params;
  };

  constructor(props) {
    super(props);
    this.state = {
      menuAccountSettings: [
        {
          title: 'Edit Account Information',
          action: 'edit-account',
          icon: global.icon_editaccount,
          onPress: () => this.menuAction('edit-account'),
        },
        {
          title: 'Edit Email Signature',
          action: 'edit-signature',
          icon: global.icon_signature,
          onPress: () => this.menuAction('edit-signature'),
        },
        // { title: 'Reset Password', action: 'reset-password', icon: global.icon_changepass, onPress: () => this.menuAction('reset-password') },
        {
          title: 'Sign Out',
          action: 'signout',
          icon: global.icon_signout,
          color: global.color_red,
          onPress: () => this.props.signOutUser(),
        },
      ],
      menuHelp: [
        {
          title: 'Features Help',
          action: 'features-help',
          icon: global.icon_questionmark,
          onPress: () => this.menuAction('features-help'),
        },
        {
          title: 'Help Center',
          action: 'help-center',
          icon: global.icon_intercom,
          onPress: () => this.menuAction('help-center'),
        },
        {
          title: 'Email Support',
          action: 'email-support',
          icon: global.icon_contact,
          onPress: () => this.menuAction('email-support'),
        },
        {
          title: 'Dark Mode',
          action: 'app-mode',
          icon: global.icon_questionmark,
          type: 'switch',
          value: this.appModeValue(),
        },
      ],
      menuAppSettings: [
        {
          title: 'Dark Mode',
          action: 'app-mode',
          icon: global.icon_questionmark,
          type: 'switch',
          value: this.appModeValue(),
        },
      ],
    };
  }

  toggleAppMode() {
    this.props.setAppMode({
      mode: this.props.settings.theme.mode === 'dark' ? 'light' : 'dark',
    });

    /*

    setTimeout(() => {
      this.props.navigation.navigate('MenuStack');
    }, 3000);
    
    this.props.navigation.navigate('SplashScreen');
    setTimeout(() => {
      this.props.navigation.navigate('MainStack');
      setTimeout(() => {
        this.props.navigation.navigate('MenuStack');
      }, 1000);
    }, 2000);
    */

    setTimeout(() => {
      // this.props.navigation.navigate('MenuStack');
    }, 3000);
  }

  appModeValue() {
    return this.props.settings.theme.mode === 'dark';
    // return false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authStatus === AUTH_SIGNOUT_SUCCESS) {
      this.props.navigation.navigate('StartScreen');
    }
  }

  refresh() {}

  menuAction(action) {
    switch (action) {
      case 'edit-account':
        this.props.navigation.navigate('EditAccountInfo', {
          onNavigateBack: () => this.refresh(),
        });
        break;
      case 'edit-signature':
        this.props.navigation.navigate('EditSignature', {
          onNavigateBack: () => this.refresh(),
        });
        break;
      case 'reset-password':
        this.props.navigation.push('PasswordResetStack', {
          title: 'Reset Password',
        });
        break;
      case 'features-help':
        this.props.navigation.navigate('TutorialScreen');
        // Linking.openURL('mailto:support@onlineretailstartup.com?subject=Online Retail BMS App Support&body=\n\nSent from Online Retail BMS App')
        break;
      case 'help-center':
        Linking.openURL('https://intercom.help/onlineretailstartup/en/');
        break;
      case 'email-support':
        Linking.openURL(
          'mailto:support@onlineretailstartup.com?subject=Online Retail BMS App Support&body=\n\nSent from Online Retail BMS App',
        );
        break;
      default:
    }
  }

  menuSections() {
    let sections = [
      {
        index: 0,
        title: 'Account Settings',
        data: this.state.menuAccountSettings,
      },
      {index: 1, title: 'Help and Support', data: this.state.menuHelp},
    ];

    if (Platform.OS === 'ios') {
      sections.push({
        index: 2,
        title: 'App Settings',
        data: this.state.menuAppSettings,
      });
    }

    return sections;
  }

  render() {
    return (
      <View
        style={[
          global.styles.screenContainer,
          {backgroundColor: this.props.settings.theme.bgSecondary},
        ]}>
        <SectionList
          contentContainerStyle={{paddingBottom: 3}}
          keyExtractor={(item, index) => `list-item-${index}`}
          removeClippedSubviews={false}
          showsVerticalScrollIndicator={false}
          sections={this.menuSections()}
          renderSectionHeader={({section}) => {
            return (
              <View
                style={{
                  paddingHorizontal: 20,
                  backgroundColor: this.props.settings.theme.bgSecondary,
                }}>
                <Text
                  style={{
                    flex: 1,
                    fontFamily: 'Montserrat-Regular',
                    fontWeight: '700',
                    fontSize: 18,
                    marginTop: 30,
                    marginBottom: 15,
                    color: this.props.settings.theme.textPrimary,
                  }}>
                  {section.title}
                </Text>
              </View>
            );
          }}
          renderItem={({section, item}) => {
            return (
              <TouchableOpacity
                onPress={item.onPress}
                style={{
                  paddingHorizontal: 20,
                }}>
                <View
                  style={{
                    height: 50,
                    alignItems: 'center',
                    flexDirection: 'row',
                    borderColor: this.props.settings.theme.separator,
                    borderTopWidth: 1,
                  }}>
                  <Image
                    style={{
                      width: 18,
                      height: 18,
                      resizeMode: 'contain',
                      marginRight: 15,
                      tintColor: item.color
                        ? item.color
                        : this.props.settings.theme.textPrimary,
                    }}
                    source={item.icon}
                  />
                  <Text
                    style={{
                      color: item.color
                        ? item.color
                        : this.props.settings.theme.textPrimary,
                      fontFamily: 'Montserrat-Regular',
                      fontWeight: '600',
                      fontSize: 14,
                      flex: 1,
                    }}>
                    {item.title}
                  </Text>
                  {item.type && item.type === 'switch' ? (
                    <Switch
                      trackColor={{
                        false: global.color_gray,
                        true: global.color_theme,
                      }}
                      thumbColor={global.color_gray} //true ? global.color_black : global.color_gray}
                      ios_backgroundColor={global.color_ltgray}
                      onValueChange={() => this.toggleAppMode()}
                      value={item.value}
                    />
                  ) : (
                    <Image
                      style={{
                        width: 14,
                        height: 14,
                        resizeMode: 'contain',
                        marginLeft: 5,
                        tintColor: global.color_arrowgray,
                      }}
                      source={global.icon_rightarrow}
                    />
                  )}
                </View>
              </TouchableOpacity>
            );
          }}
          ListFooterComponent={() => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  paddingVertical: 30,
                }}>
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    resizeMode: 'contain',
                  }}
                  source={global.img_logo}
                />
                <Text
                  style={{
                    color: global.color_darkgray,
                    fontFamily: 'Montserrat-Regular',
                    fontWeight: '400',
                    fontSize: 10,
                    marginHorizontal: 5,
                  }}>
                  Version 1.0.0 (build 1)
                </Text>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = ({settings, auth}) => {
  const {authStatus} = auth;
  return {
    settings,
    authStatus,
  };
};

export default connect(mapStateToProps, {setAppMode, signOutUser})(Menu);
