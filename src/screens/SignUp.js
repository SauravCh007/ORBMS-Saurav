
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class SignUp extends Component {

  static navigationOptions = ({ navigation }) => {
      const { params } = navigation.state;
      return params;
  };

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <View style={{ }}>
        <Text>SignUp</Text>
      </View>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  return {
    settings
  };
};

export default connect(mapStateToProps, { })(SignUp);
