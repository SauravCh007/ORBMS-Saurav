import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {
  actions,
  defaultActions,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';

import {connect} from 'react-redux';
import {updateUserInfo} from '../actions';
import {HeaderButton, FormButton, IndicatorBottom} from '../common';
import {
  AUTH_UPDATEUSERINFO_LOADING,
  AUTH_UPDATEUSERINFO_SUCCESS,
} from '../actions/types';

class EditSignature extends Component {
  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state;
    return params;
  };

  constructor(props) {
    super(props);
    this.state = {
      // PARAMS
      signature: '',
      editorReady: false,
    };
    this._richEditor = React.createRef();
  }

  componentDidMount() {
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
    if (this.props.auth.user && this.props.auth.user.signature) {
      this.setState({signature: this.props.auth.user.signature});
    }
  }

  onEditorInitialized() {
    this.setState({editorReady: true});
  }

  onChange(html) {
    this.setState({signature: html});
  }

  checkFields() {
    console.log(this.state.signature);

    this.props.updateUserInfo({updates: {signature: this.state.signature}});
  }

  render() {
    return (
      <View
        style={[
          global.styles.screenContainer,
          {backgroundColor: this.props.settings.theme.bgSecondary},
        ]}>
        <View
          style={{
            height: 50,
            marginVertical: 15,
            marginHorizontal: 20,
            borderRadius: 10,
            overflow: 'hidden',
          }}>
          {this.state.editorReady ? (
            <RichToolbar
              style={{backgroundColor: this.props.settings.theme.inputBg}}
              editor={this._richEditor}
              actions={[
                //actions.insertImage,
                actions.setBold,
                actions.setItalic,
                actions.insertBulletsList,
                actions.insertOrderedList,
                actions.insertLink,
                //  actions.keyboard,
                // actions.setStrikethrough,
                // actions.setUnderline,
                // actions.removeFormat,
                // actions.insertVideo,
                // actions.checkboxList,
                // actions.undo,
                //actions.redo,
              ]}
            />
          ) : null}
        </View>
        <View style={{paddingHorizontal: 20, height: 240}}>
          <RichEditor
            ref={this._richEditor}
            placeholder={this.props.placeholder}
            onChange={html => this.onChange(html)}
            initialContentHTML={this.state.signature}
            editorInitializedCallback={() => this.onEditorInitialized()}
            style={{borderRadius: 20, overflow: 'scroll', flex: 1}}
            // editorStyle={{ height: 240, overflow: 'scroll' }}
            // initialHeight={240}
            useContainer={false}
            scrollEnabled={true}
          />
        </View>
        <FormButton
          text={'Save'}
          // style={global.styles.quickButtonsContainer}
          textColor={this.props.settings.theme.bgPrimary}
          onPress={() => this.checkFields()}
        />
        {this.props.auth.authStatus === AUTH_UPDATEUSERINFO_LOADING ? (
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

export default connect(mapStateToProps, {updateUserInfo})(EditSignature);
