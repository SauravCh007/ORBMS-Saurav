import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { connect } from 'react-redux';
import { updateUserInfo, getUserInfo } from '../actions';
import { HeaderButton, FormInput, FormButton, IndicatorBottom } from '../common';
import { formatMobileNumber } from '../utils/Helper';
import {
  AUTH_UPDATEUSERINFO_LOADING,
  AUTH_UPDATEUSERINFO_SUCCESS,
} from '../actions/types';

class EditAccountInfo extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return params;
  };

  constructor(props) {
    super(props);
    this.state = {
      // PARAMS
      first_name: '',
      last_name: '',
      companyname: '',
      phone: '',
      email: '',
      website: '',
      address: '',
      city: '',
      state: '',
      zip: '',

      // facebook_url: '',
    };
  }

  componentWillUnmount() {
    this.props.getUserInfo();
  }

  componentDidMount() {
    this.props.getUserInfo();
    this.props.navigation.setOptions({
      title:
        this.props.route.params && this.props.route.params.title
          ? this.props.route.params.title
          : 'Edit Account Info',
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
    console.log('props of params is as follows ,', this.props);
    if (this.props.route.params && this.props.route.params.contact) {
      let c = this.props.route.params.contact;
      const {
        first_name,
        last_name,
        companyname,
        phone,
        email,
        website,
        address,
        facebook_url,
      } = c;
      this.setState({
        first_name,
        last_name,
        companyname,
        phone,
        email,
        website,
        address,
        facebook_url,
      });
    }

    console.log('auth user ' + JSON.stringify(this.props.auth.user));

    this.preFillFields();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.authStatus === AUTH_UPDATEUSERINFO_SUCCESS) {
      this.props.route.params.onNavigateBack();
      this.props.navigation.goBack();
    }
  }

  preFillFields() {
    let newState = {};
    let fields = [
      'first_name',
      'last_name',
      'companyname',
      'phone',
      'email',
      'website',
      'address',
      'city',
      'state',
      'zip',
    ];
    let user = this.props.auth.user;
    fields.forEach(item => {
      if (user[item] && user[item] !== '') {
        newState[item] = user[item];
      }
    });
    this.setState({ ...this.state, ...newState });
  }

  checkFields() {
    let updates = {};
    let fields = [
      'first_name',
      'last_name',
      'companyname',
      'phone',
      'email',
      'website',
      'address',
      'city',
      'state',
      'zip',
    ];
    fields.forEach(item => {
      updates[item] = this.state[item];
    });
    console.log('updated data we are sending is ', updates);
    this.props.updateUserInfo({ updates });
  }

  render() {
    return (
      <View
        style={[
          global.styles.screenContainer,
          { backgroundColor: this.props.settings.theme.bgSecondary },
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
            onChangeText={first_name => this.setState({ first_name })}
            autoCapitalize={'words'}
            textColor={this.props.settings.theme.textPrimary}
            bgColor={this.props.settings.theme.inputBg}
          />
          <FormInput
            placeholder={'Last Name'}
            label={'Last Name'}
            value={this.state.last_name}
            onChangeText={last_name => this.setState({ last_name })}
            autoCapitalize={'words'}
            textColor={this.props.settings.theme.textPrimary}
            bgColor={this.props.settings.theme.inputBg}
          />
          <FormInput
            placeholder={'Company Name'}
            label={'Company Name'}
            value={this.state.companyname}
            onChangeText={companyname => this.setState({ companyname })}
            autoCapitalize={'words'}
            textColor={this.props.settings.theme.textPrimary}
            bgColor={this.props.settings.theme.inputBg}
          />
          <FormInput
            placeholder={'Phone'}
            label={'Phone'}
            value={this.state.phone}
            onChangeText={text =>
              this.setState({ phone: formatMobileNumber(text) })
            }
            keyboardType={'phone-pad'}
            textColor={this.props.settings.theme.textPrimary}
            bgColor={this.props.settings.theme.inputBg}
          />
          <FormInput
            placeholder={'Login Email'}
            label={'Login Email'}
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            keyboardType={'email-address'}
            editable={false}
            textColor={this.props.settings.theme.textPrimary}
            bgColor={this.props.settings.theme.inputBg}
          />
          <FormInput
            placeholder={'Website'}
            label={'Website'}
            value={this.state.website}
            onChangeText={website => {
              this.setState({ website })
              console.log("website", website)
            }}
            textColor={this.props.settings.theme.textPrimary}
            bgColor={this.props.settings.theme.inputBg}
          />
          <FormInput
            placeholder={'Address'}
            label={'Address'}
            value={this.state.address}
            onChangeText={address => this.setState({ address })}
            autoCapitalize={'words'}
            textColor={this.props.settings.theme.textPrimary}
            bgColor={this.props.settings.theme.inputBg}
          />
          <FormInput
            placeholder={'City'}
            label={'City'}
            value={this.state.city}
            onChangeText={city => this.setState({ city })}
            autoCapitalize={'words'}
            textColor={this.props.settings.theme.textPrimary}
            bgColor={this.props.settings.theme.inputBg}
          />
          <FormInput
            placeholder={'State'}
            label={'State'}
            value={this.state.state}
            onChangeText={state => this.setState({ state })}
            autoCapitalize={'characters'}
            textColor={this.props.settings.theme.textPrimary}
            bgColor={this.props.settings.theme.inputBg}
          />
          <FormInput
            placeholder={'Zip'}
            label={'Zip'}
            value={this.state.zip}
            onChangeText={zip => this.setState({ zip })}
            keyboardType={'number-pad'}
            textColor={this.props.settings.theme.textPrimary}
            bgColor={this.props.settings.theme.inputBg}
          />
          <FormButton
            text={'Save'}
            style={global.styles.quickButtonsContainer}
            textColor={this.props.settings.theme.bgPrimary}
            onPress={() => this.checkFields()}
          />
        </KeyboardAwareScrollView>

        {this.props.auth.authStatus === AUTH_UPDATEUSERINFO_LOADING ? (
          <IndicatorBottom dark={this.props.settings.theme.mode === 'dark'} />
        ) : null}
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

export default connect(mapStateToProps, { updateUserInfo, getUserInfo })(
  EditAccountInfo,
);
