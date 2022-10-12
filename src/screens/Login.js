import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Keyboard,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { FormInput, FormButton, IndicatorBottom, ModalAlert } from '../common';
import {
  loginUser,
  getUserInfo,
  resetPasswordLink,
  checkLoginAuthUser,
  checkOTPAuthUser,
  loginPasswordLess,
} from '../actions';
import {
  AUTH_LOGIN_LOADING,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL,
  AUTH_RESETPASSWORDLINK_LOADING,
  AUTH_RESETPASSWORDLINK_SUCCESS,
  AUTH_RESETPASSWORDLINK_FAIL,
  CLIENT_ID,
  CONNECTION,
  SEND_TEXT,
  AUTH_SIGNIN_SUCCESS,
  AUTH_SIGNIN_LOADING,
  GRAND_TYPE,
  AUDIENCE,
  SCOPE,
  AUTH_OTP_LOADING,
  AUTH_OTP_SUCCESS,
  AUTH_OTP_FAIL,
  AUTH_PASSWORDLESS_LOADING,
  AUTH_PASSWORDLESS_SUCCESS,
  AUTH_PASSWORDLESS_FAIL,
} from '../actions/types';
import AsyncStorage from '@react-native-community/async-storage';

class Login extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return params;
  };







  constructor(props) {
    super(props);
    this.state = {
      email: '', //'support@onlineretailstartup.com', // 'onlineretailbms@gmail.com',
      password: '', //'Password123!', // 'Password123*',
      emailToReset: '',
      phone_number: '',

      // MODAL ALERT
      alertVisible: false,
      alertTitle: '',
      alertMessage: '',
      alertButtons: [
        { text: 'OK', onPress: () => this.setState({ alertVisible: false }) },
      ],
      alertIcon: null,

      showForgotPassword: false,
      showOTPScreen: false,
      showLoading: false,
      loginSuccess: false,
    };
    this.inputAccessoryViewID = 'uniqueID';
  }

  onTextChange(text) {
    var cleaned = ('' + text).replace(/\D/g, '')
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      var intlCode = (match[1] ? '+1 ' : ''),
        number = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');

      this.setState({
        email: number
      });

      return;
    }

    this.setState({
      email: text
    });
  }


  loginUser() {
    // this.props.navigation.navigate('MainStack');
    Keyboard.dismiss();
    var number = '+1' + this.state.phone_number;
    console.log("number", number)

    // first +1484848585
    if (this.state.showOTPScreen) {
      this.props.checkOTPAuthUser({
        grant_type: GRAND_TYPE,
        client_id: CLIENT_ID,
        username: number,
        otp: this.state.password,
        realm: CONNECTION,
        audience: AUDIENCE,
        scope: SCOPE,
      });
    } else {
      //this.props.loginUser({ email: this.state.email, password: this.state.password });

      this.props.checkLoginAuthUser({
        client_id: CLIENT_ID,
        connection: CONNECTION,
        phone_number: number,
        send: SEND_TEXT,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    {
      console.log('NEXTPROPS', nextProps.authStatus);
    }
    if (nextProps.authStatus === AUTH_SIGNIN_SUCCESS) {
      this.setState({ showLoading: true });
      setTimeout(() => {
        this.setState({ showLoading: false });
      }, 3500);
      if (nextProps.authUserToken.error) {
        this.setState({
          alertVisible: true,
          alertTitle: 'Log In Failed',
          alertMessage: 'Please check the phone number',
          // nextProps.authUserToken.error_description
          alertButtons: [
            {
              text: 'OK3',
              onPress: () => this.setState({ alertVisible: false }),
            },
          ],
        });
      } else {
        this.setState({ showOTPScreen: true });
        {
          console.log('LOGELSE', nextProps.authUserToken.phone_number);
        }
      }
    }
    if (nextProps.authStatus === AUTH_OTP_SUCCESS) {
      {
        console.log('xxx', nextProps.authOTP);
      }
      AsyncStorage.setItem(
        'userIdToken',
        JSON.stringify(nextProps?.authOTP?.id_token),
      );
      this.props.loginPasswordLess({ token: nextProps.authOTP.id_token });
    } else if (nextProps.authStatus == AUTH_OTP_FAIL) {
      this.setState({
        alertVisible: true,
        alertTitle: 'An error has occured',
        alertMessage: nextProps.authError,
        alertButtons: [
          { text: 'Ok1', onPress: () => this.setState({ alertVisible: false })},
        ],
      });
    } else if (nextProps.authStatus === AUTH_PASSWORDLESS_SUCCESS) {
      this.setState({ showLoading: true });
      setTimeout(() => {
        this.props.navigation.navigate('MainStack');
        this.props.getUserInfo();
      }, 3000);
      setTimeout(() => {
        this.setState({ showLoading: false });
      }, 3500);
      this.setState({ loginSuccess: true });
    }

    if (nextProps.authStatus === AUTH_LOGIN_SUCCESS) {
      this.setState({ showLoading: true });
      setTimeout(() => {
        this.props.navigation.navigate('MainStack');
        this.props.getUserInfo();
      }, 3000);
      setTimeout(() => {
        this.setState({ showLoading: false });
      }, 3500);
      this.setState({ loginSuccess: true });
    } else if (nextProps.authStatus === AUTH_RESETPASSWORDLINK_SUCCESS) {
      this.setState({
        alertVisible: true,
        alertTitle: 'Reset Password',
        alertMessage: 'A Reset Password link has been sent to your email',
        alertButtons: [
          {
            text: 'OK',
            onPress: () =>
              this.setState({ alertVisible: false, showForgotPassword: false }),
            color: global.color_theme,
          },
        ],
      });
    } else if (nextProps.authStatus === AUTH_LOGIN_FAIL) {
      this.setState({
        alertVisible: true,
        alertTitle: 'Login Failed',
        alertMessage: nextProps.authError,
        alertButtons: [
          { text: 'OK2', onPress: () => this.setState({ alertVisible: false }) },
        ],
      });
    } else if (nextProps.authStatus === AUTH_RESETPASSWORDLINK_FAIL) {
      this.setState({
        alertVisible: true,
        alertTitle: 'An error has occured',
        alertMessage: nextProps.authError,
        alertButtons: [
          { text: 'OK', onPress: () => this.setState({ alertVisible: false }) },
        ],
      });
    }
    // else {
    //   this.setState({
    //     alertVisible: true,
    //     alertTitle: 'An error has occured',
    //     alertMessage: nextProps.authStatus + "/" + nextProps.authError,
    //     alertButtons: [
    //       { text: 'OK', onPress: () => this.setState({ alertVisible: false }) },
    //     ],
    //   });
    // }
  }

  forgotPassword() {
    // this.props.resetPasswordLink({ email: this.state.email });

    // this.props.navigation.navigate('PasswordResetStack');
    this.setState({ showOTPScreen: false });
  }

  render() {
    console.log('global variable is ', global);
    return (
      <View
        style={[
          global.styles.screenContainer,
          styles.screenContainer,
          { flex: 1 },
        ]}
        onStartShouldSetResponder={() => Keyboard.dismiss()}>
        <Image
          source={global.img_logo}
          style={{
            height: 150,
            width: 150,
            resizeMode: 'contain',
            marginTop: 100,
          }}
        />
        {/* <Image
          source={global.img_logo}
          style={[global.styles.logo, { position: "relative", top: 0 }]}
        /> */}
        {this.state.showOTPScreen ? (
          <Text
            style={[
              global.styles.forgotPassButtonText,
              {
                color: this.props.settings.theme.textPrimary,
                fontSize: 18,
                fontWeight: '600',
                fontFamily: 'Montserrat-Medium',
                top: 15,
              },
            ]}>
            Enter your one-time password
          </Text>
        ) : (
          <Text
            style={[
              global.styles.forgotPassButtonText,
              {
                color: this.props.settings.theme.textPrimary,
                fontSize: 18,
                fontWeight: '600',
                fontFamily: 'Montserrat-Medium',
                top: 15,
              },
            ]}>
            Enter your phone number to log in
          </Text>
        )}

        <View style={[global.styles.signInFormContainer, { top: -10 }]}>
          {this.state.showOTPScreen ? (
            <FormInput
              placeholder={'Your One-Time Password'}
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              textColor={this.props.settings.theme.textPrimary}
              bgColor={this.props.settings.theme.inputBg}
              style={{ flex: 0, marginBottom: 5 }}
              maxLength={6}
            />
          ) : (
            <FormInput
              placeholder={'(555) 555-5555'}
              keyboardType={'number-pad'}
              value={this.state.email}
              onChangeText={(text) => {
                this.onTextChange(text),
                this.setState({phone_number:text})
              }}
              hideLabel
              textColor={this.props.settings.theme.textPrimary}
              bgColor={this.props.settings.theme.inputBg}
              style={{ flex: 0 }}
              textContentType='telephoneNumber'
              dataDetectorTypes='phoneNumber'
              maxLength={14}
            // textStyle={{ paddingTop: 0,paddingBottom: 0 }}
            />
          )}
          {this.state.showOTPScreen ? (
            <Text
              style={[
                global.styles.loginOtpText,
                {
                  color: this.props.settings.theme.textPrimary,
                  fontSize: 14,
                  letterSpacing: 0.7,
                  textAlign: 'center',
                },
              ]}>
              A one-time password was sent to your phone number via text
            </Text>
          ) : (
            <Text
              style={[
                global.styles.loginOtpText,
                {
                  color: this.props.settings.theme.textPrimary,
                  fontSize: 14,
                  letterSpacing: 0.7,
                  textAlign: 'center',
                },
              ]}>
              A one-time password will be sent to your phone number via text
            </Text>
          )}
          {this.state.showLoading ? null : (
            <View style={{}}>
              <FormButton
                text={this.state.showOTPScreen ? 'Log In' : 'Submit'}
                onPress={() => this.loginUser()}
                textColor={this.props.settings.theme.bgPrimary}
              />
            </View>
          )}

          {this.state.showOTPScreen ? (
            <TouchableOpacity
              onPress={() => this.forgotPassword()}
              style={global.styles.forgotPassButton}>
              <Text style={styles.textOrange}>
                Did not get the code<Text style={styles.textOrange}>?</Text>
              </Text>
            </TouchableOpacity>
          ) : null}

          {/* {
            this.state.showForgotPassword ?
            <TouchableOpacity
            onPress={() => this.setState({ showForgotPassword: false})}
            style={global.styles.forgotPassButton}>
            <Text style={[global.styles.forgotPassButtonText, { color: this.props.settings.theme.textSecondary }]}>Cancel</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity
            onPress={() => this.forgotPassword()}
            style={global.styles.forgotPassButton}>
            <Text style={[global.styles.forgotPassButtonText, { color: this.props.settings.theme.textSecondary }]}>Forgot password? <Text style={styles.textOrange}>click here</Text></Text>
          </TouchableOpacity>
          } */}
        </View>
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
        {/*
          // TEMPORARY UNAVAILABLE
          <View style={global.styles.signInBottomContainer}>
            <Text style={[global.styles.signInBottomText, { color: this.props.settings.theme.textPrimary }]}>Don't have an account?</Text>
            <TouchableOpacity
              style={global.styles.signInBottomButton}>
              <Text style={[global.styles.signInBottomButtonText, styles.textOrange]}>Sign Up Now</Text>
            </TouchableOpacity>
          </View>
          */}
        {this.props.authStatus === AUTH_LOGIN_LOADING ||
          this.props.authStatus === AUTH_SIGNIN_LOADING ? (
          //this.props.authStatus === AUTH_RESETPASSWORDLINK_LOADING ?
          <IndicatorBottom dark={this.props.settings.theme.mode === 'dark'} />
        ) : null}
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
              style={{ width: 200, height: 200 }}
              resizeMode="contain"
            />
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textOrange: {
    color: global.color_theme,
    fontWeight: '700',
  },
  textBlack: {
    color: global.color_black2,
    fontWeight: '700',
  },
});

const mapStateToProps = ({ settings, auth }) => {
  const { authStatus, authError, authUserToken, authOTP } = auth;
  return {
    settings,
    authStatus,
    authError,
    authUserToken,
    authOTP,
  };
};

export default connect(mapStateToProps, {
  loginUser,
  getUserInfo,
  resetPasswordLink,
  checkLoginAuthUser,
  checkOTPAuthUser,
  loginPasswordLess,
})(Login);
