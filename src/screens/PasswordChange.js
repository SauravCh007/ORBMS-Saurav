
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import { connect } from 'react-redux';
import { changePassword } from '../actions';
import {
  HeaderButton,
  ModalAlert,
  ModalChecklist,
  FormInput,
  FormButton,
  FormDropdown,
  MiniButton,
} from '../common';
import {
  AUTH_CHANGEPASSWORD_SUCCESS,
  AUTH_CHANGEPASSWORD_FAIL,
} from '../actions/types';

class PasswordChange extends Component {

  static navigationOptions = ({ navigation }) => {
      const { params } = navigation.state;
      return params;
  };

  constructor(props) {
    super(props);
    this.state = {

      // PARAMS
      oldPassword: '',
      newPassword: '',
      newPasswordRetype: '',

      // MODAL ALERT
      alertVisible: false,
      alertTitle: '',
      alertMessage: '',
      alertButtons: [{ text: 'OK', onPress: () => this.setState({ alertVisible: false })}],
      alertIcon: null,
    }
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      title: this.props.route.params && this.props.route.params.title ? this.props.route.params.title : 'Change Password',
      headerLeft: () =>
        <View style={global.styles.headerButtonsContainer}>
          <HeaderButton icon={global.icon_leftarrow} mode={this.props.settings.theme.mode}
            onPress={() => this.props.navigation.goBack()}
          />
        </View>,
    });
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.authStatus === AUTH_CHANGEPASSWORD_SUCCESS) {
      this.setState({
        alertVisible: true,
        alertTitle: 'Change Password',
        alertMessage: 'Password has been changed successfully', 
        //alertButtons: [{ text: 'OK', onPress: () => this.setState({ alertVisible: false })}],
        alertButtons: [{ 
          text: 'OK', 
          color: global.color_theme, 

          onPress: () => {
            this.setState({ alertVisible: false });
            setTimeout(() => {
              this.props.navigation.goBack();
            }, 500);
          } 
        }],
      });
    } else if (nextProps.authStatus === AUTH_CHANGEPASSWORD_FAIL) {
      this.setState({
        alertVisible: true,
        alertTitle: 'An error has occured',
        alertMessage: nextProps.authError,
        alertButtons: [{ text: 'OK', onPress: () => this.setState({ alertVisible: false })}],
      });
    }
  }

  submit() {
    if (this.state.oldPassword === '') {
      this.setState({
        alertVisible: true,
        alertTitle: 'Unable to proceed',
        alertMessage: 'Please enter the old password',
        alertButtons: [{ text: 'OK', onPress: () => this.setState({ alertVisible: false })}],
      });
    } else if (this.state.newPassword === '') {
      this.setState({
        alertVisible: true,
        alertTitle: 'Unable to proceed',
        alertMessage: 'Please enter new password',
        alertButtons: [{ text: 'OK', onPress: () => this.setState({ alertVisible: false })}],
      });
    } else if (this.state.newPasswordRetype === '') {
      this.setState({
        alertVisible: true,
        alertTitle: 'Unable to proceed',
        alertMessage: 'Please re-type the new password ',
        alertButtons: [{ text: 'OK', onPress: () => this.setState({ alertVisible: false })}],
      });
    } else if (this.state.newPassword !== this.state.newPasswordRetype) {
      this.setState({
        alertVisible: true,
        alertTitle: 'Unable to proceed',
        alertMessage: 'The new password and re-typed password did not match',
        alertButtons: [{ text: 'OK', onPress: () => this.setState({ alertVisible: false })}],
      });
    } else {
      this.props.changePassword({ oldPassword: this.state.oldPassword, newPassword: this.state.newPassword });
    }
  }

  render() {
    return (
      <View style={[global.styles.screenContainer, { backgroundColor: this.props.settings.theme.bgSecondary }]} >
        <KeyboardAwareScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 30, paddingTop: 20, paddingBottom: 150 }}
        >
          <FormInput
            label={'Current Password'}
            placeholder={'Enter Password'}
            value={this.state.oldPassword}
            onChangeText={(oldPassword) => this.setState({ oldPassword })}
            textColor={this.props.settings.theme.textPrimary}
            bgColor={this.props.settings.theme.inputBg}
            secureTextEntry
            onSubmitEditing={() => { this.newPass.focus(); }}
            blurOnSubmit={false}
          />
          <FormInput
            inputRef={(input) => { this.newPass = input; }}
            label={'New Password'}
            placeholder={'Enter Password'}
            value={this.state.newPassword}
            onChangeText={(newPassword) => this.setState({ newPassword })}
            textColor={this.props.settings.theme.textPrimary}
            bgColor={this.props.settings.theme.inputBg}
            secureTextEntry
            onSubmitEditing={() => { this.newPassRetype.focus(); }}
            blurOnSubmit={false}
          />
          <FormInput
            inputRef={(input) => { this.newPassRetype = input; }}
            label={'Re-type New Password'}
            placeholder={'Enter Password'}
            value={this.state.newPasswordRetype}
            onChangeText={(newPasswordRetype) => this.setState({ newPasswordRetype })}
            textColor={this.props.settings.theme.textPrimary}
            bgColor={this.props.settings.theme.inputBg}
            secureTextEntry
            onSubmitEditing={() => { this.submit(); }}
          />
          <FormButton
            text={'Reset Password'}
            // style={global.styles.quickButtonsContainer}
            textColor={this.props.settings.theme.bgPrimary}
            onPress={() => this.submit()}/>

        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ settings, auth }) => {
  return {
    settings,
    auth,
  };
};

export default connect(mapStateToProps, { changePassword })(PasswordChange);
