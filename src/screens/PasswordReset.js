import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

import {connect} from 'react-redux';
import {resetPasswordLink} from '../actions';
import {
  HeaderButton,
  ModalAlert,
  ModalChecklist,
  FormInput,
  FormButton,
  FormDropdown,
  MiniButton,
  IndicatorBottom,
} from '../common';
import {
  AUTH_RESETPASSWORDLINK_LOADING,
  AUTH_RESETPASSWORDLINK_SUCCESS,
  AUTH_RESETPASSWORDLINK_FAIL,
} from '../actions/types';

class PasswordReset extends Component {
  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state;
    return params;
  };

  constructor(props) {
    super(props);
    this.state = {
      // PARAMS
      email: '',

      // MODAL ALERT
      alertVisible: false,
      alertTitle: '',
      alertMessage: '',
      alertButtons: [
        {text: 'OK', onPress: () => this.setState({alertVisible: false})},
      ],
      alertIcon: null,
    };
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      title:
        this.props.route.params && this.props.route.params.title
          ? this.props.route.params.title
          : 'Reset Password',
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

    this.setState({email: this.props.auth.user.email});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.authStatus === AUTH_RESETPASSWORDLINK_SUCCESS) {
      this.setState({
        alertVisible: true,
        alertTitle: 'Reset Password',
        alertMessage: 'A Reset Password link has been sent to your email',
        //alertButtons: [{ text: 'OK', onPress: () => this.setState({ alertVisible: false })}],
        alertButtons: [
          {
            text: 'OK',
            color: global.color_theme,

            onPress: () => {
              this.setState({alertVisible: false});
              setTimeout(() => {
                this.props.navigation.goBack();
              }, 1000);
            },
          },
        ],
      });
    } else if (nextProps.auth.authStatus === AUTH_RESETPASSWORDLINK_FAIL) {
      this.setState({
        alertVisible: true,
        alertTitle: 'An error has occured',
        alertMessage: nextProps.auth.authError,
        alertButtons: [
          {text: 'OK', onPress: () => this.setState({alertVisible: false})},
        ],
      });
    }
  }

  submit() {
    this.props.resetPasswordLink({email: this.state.email});
  }

  render() {
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
            placeholder={'Email Address'}
            label={'Login Email'}
            editable={false}
            value={this.state.email}
            onChangeText={email => this.setState({email})}
            keyboardType={'email-address'}
            textColor={this.props.settings.theme.textPrimary}
            bgColor={this.props.settings.theme.inputBg}
          />
          <FormButton
            text={'Reset Password'}
            // style={global.styles.quickButtonsContainer}
            textColor={this.props.settings.theme.bgPrimary}
            onPress={() => this.submit()}
          />
        </KeyboardAwareScrollView>

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
        {this.props.auth.authStatus === AUTH_RESETPASSWORDLINK_LOADING ? (
          <IndicatorBottom dark={this.props.settings.theme.mode === 'dark'} />
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = ({settings, auth}) => {
  return {
    settings,
    auth,
  };
};

export default connect(mapStateToProps, {resetPasswordLink})(PasswordReset);
