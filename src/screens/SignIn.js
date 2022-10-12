
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import { FormInput, FormButton, IndicatorBottom, ModalAlert } from '../common';
import { loginUser, getUserInfo, resetPasswordLink } from '../actions';
import {
  AUTH_LOGIN_LOADING,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL,
  AUTH_RESETPASSWORDLINK_LOADING,
  AUTH_RESETPASSWORDLINK_SUCCESS,
  AUTH_RESETPASSWORDLINK_FAIL,
} from '../actions/types';

class SignIn extends Component {

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

      // MODAL ALERT
      alertVisible: false,
      alertTitle: '',
      alertMessage: '',
      alertButtons: [{ text: 'OK', onPress: () => this.setState({ alertVisible: false })}],
      alertIcon: null,

      showForgotPassword: false,

      showLoading: false,
      loginSuccess: false,
    };
    this.inputAccessoryViewID = 'uniqueID';
  }


  loginUser() {
    // this.props.navigation.navigate('MainStack');
    Keyboard.dismiss();

    if (this.state.showForgotPassword) {
      this.props.resetPasswordLink({ email: this.state.email });
    } else {
      this.props.loginUser({ email: this.state.email, password: this.state.password });
    }
  }

  componentWillReceiveProps(nextProps) {
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
        alertButtons: [{ text: 'OK', onPress: () => this.setState({ alertVisible: false, showForgotPassword: false }), color: global.color_theme }],
      }); 
    } else if (nextProps.authStatus === AUTH_LOGIN_FAIL) {
     this.setState({
        alertVisible: true,
        alertTitle: 'Login Failed',
        alertMessage: nextProps.authError,
        alertButtons: [{ text: 'OK', onPress: () => this.setState({ alertVisible: false })}],
      });
    } else if (nextProps.authStatus === AUTH_RESETPASSWORDLINK_FAIL) {
      this.setState({
        alertVisible: true,
        alertTitle: 'An error has occured',
        alertMessage: nextProps.authError,
        alertButtons: [{ text: 'OK', onPress: () => this.setState({ alertVisible: false })}],
      });
    }
  }

  forgotPassword() {
    // this.props.resetPasswordLink({ email: this.state.email });

    // this.props.navigation.navigate('PasswordResetStack');

    this.setState({ showForgotPassword: true });
  }

  render() {
    return (
      <View style={[global.styles.screenContainer, styles.screenContainer, { backgroundColor: this.props.settings.theme.bgSecondary }]} onStartShouldSetResponder={() =>  Keyboard.dismiss()}>
        <Image source={global.img_logoicon} style={global.styles.bottomLogo} />
        <Image source={global.img_logo} style={[global.styles.logo, { position: 'relative', top: 0 }]} />
        <View style={global.styles.signInFormContainer}>
          <FormInput
            placeholder={'Email'}
            // keyboardType={'email-address'}
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
            hideLabel
            textColor={this.props.settings.theme.textPrimary}
            bgColor={this.props.settings.theme.inputBg}
            style={{ flex: 0, marginBottom: 5 }} 
            // textStyle={{ paddingTop: 0,paddingBottom: 0 }}
          />
          {
              this.state.showForgotPassword ? null :
              <FormInput
              placeholder={'Password'}
              secureTextEntry
              hideLabel
              value={this.state.password}
              onChangeText={(password) => this.setState({ password })}
              secureTextEntry
              textColor={this.props.settings.theme.textPrimary}
              bgColor={this.props.settings.theme.inputBg}
              style={{ flex: 0, marginBottom: 5 }} />
          }
          {
              this.state.showLoading ? null:
              <FormButton 
              text={this.state.showForgotPassword ? 'Reset Password' : 'Log In'} 
              onPress={() => this.loginUser() } textColor={this.props.settings.theme.bgPrimary} />
          }
          
          {
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
          }
        </View>
        <ModalAlert
        onBackdropPress={() => this.setState({ alertVisible: false })}
        isVisible={this.state.alertVisible}
        title={this.state.alertTitle}
        message={this.state.alertMessage}
        alertIcon={this.state.alertIcon}
        buttons={this.state.alertButtons}
        dark={this.props.settings.theme.mode==='dark'}
        bgColor={this.props.settings.theme.bgPrimary}
        textColor={this.props.settings.theme.textPrimary}
        />
        {
          /*
          // TEMPORARY UNAVAILABLE
          <View style={global.styles.signInBottomContainer}>
            <Text style={[global.styles.signInBottomText, { color: this.props.settings.theme.textPrimary }]}>Don't have an account?</Text>
            <TouchableOpacity
              style={global.styles.signInBottomButton}>
              <Text style={[global.styles.signInBottomButtonText, styles.textOrange]}>Sign Up Now</Text>
            </TouchableOpacity>
          </View>
          */
        }
        {
       
           this.props.authStatus === AUTH_LOGIN_LOADING || this.props.authStatus === AUTH_RESETPASSWORDLINK_LOADING ?
          //this.props.authStatus === AUTH_RESETPASSWORDLINK_LOADING ?
          <IndicatorBottom dark={this.props.settings.theme.mode==='dark'}/> : null
        }
        {
          this.state.showLoading ?
          <View style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: global.color_white, }}>
            <Image source={global.logo_gif} style={{ width: 200, height: 200 }} resizeMode='contain' />
          </View>
          : null
        }
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
    fontWeight: '700'
  }
});

const mapStateToProps = ({ settings, auth }) => {
  const { authStatus, authError } = auth;
  return {
    settings,
    authStatus, authError
  };
};

export default connect(mapStateToProps, { loginUser, getUserInfo, resetPasswordLink })(SignIn);
