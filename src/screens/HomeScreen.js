
import React, { Component } from 'react';
import { View, Text } from 'react-native';

class HomeScreen extends Component {

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
        <Text>Home</Text>
      </View>
    );
  }
}

export default HomeScreen;
