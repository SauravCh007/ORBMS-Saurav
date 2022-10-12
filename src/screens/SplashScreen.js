
import React, { Component } from 'react';
import { View, Text, Image, Alert, Modal, Platform } from 'react-native';
import { connect } from 'react-redux';
import {
  checkIfLogged,
} from '../actions';

class SplashScreen extends Component {

  static navigationOptions = ({ navigation }) => {
      const { params } = navigation.state;
      return params;
  };

  constructor(props) {
    super(props);
    this.state = {
      showModal: true,
    }
  }

  componentDidMount() {
    this.props.checkIfLogged();

    setTimeout(() => {
      this.checkIfLogged();
    }, 1000);
  }

  checkIfLogged() {
    if (this.props.auth.user) {
      if (Platform.OS === 'ios') {
        setTimeout(() => {
          this.props.navigation.navigate('MainStack', {
            screen: 'MainTabs',
            params: {
              screen: 'ContactsStack'
            }
          });
          this.setState({ showModal: false });
        }, 3000);
      } else {
        // ANDROID
        this.props.navigation.navigate('MainStack', {
          screen: 'MainTabs',
          params: {
            screen: 'MenuStack'
          }
        });
        setTimeout(() => {
          this.props.navigation.navigate('CalendarStack');
        }, 1000);

        setTimeout(() => {
          this.props.navigation.navigate('EmailStack');
        }, 3000);

        setTimeout(() => {
          this.props.navigation.navigate('ContactsStack');
        }, 4000);

        setTimeout(() => {
          this.setState({ showModal: false });
        }, 7000);
      }
    } else {
      this.props.navigation.navigate('StartScreen');

      setTimeout(() => {
        this.setState({ showModal: false });
      }, 3000);
    }
  }

  render() {
    return (
      <Modal
        animationType='fade'
        visible={this.state.showModal}
        >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: global.color_white, }}>
          <Image source={global.logo_gif} style={{ width: 200, height: 200 }} resizeMode='contain' />
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps, { checkIfLogged })(SplashScreen);

