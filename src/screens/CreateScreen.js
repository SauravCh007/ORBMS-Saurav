
import React, { Component } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

class CreateScreen extends Component {

  static navigationOptions = ({ navigation }) => {
      const { params } = navigation.state;
      return params;
  };

  constructor(props) {
    super(props);
    this.state = {
      showed: false,
    }
  }

  componentDidMount() {
    if (this.state.showed === false) {
      setTimeout(() => {
        this.openScreen();
      }, 1000);
      this.setState({ showed: true });
    }
  }

  openScreen() {

    this.props.navigation.push('ContactAdd', {
      title: 'Add New Contact',
      user: null,
    });

    // Alert.alert('test');
  }

  render() {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <TouchableOpacity onPress={() => this.openScreen()} >
          <Text>CreateScreen</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  return {
    settings
  };
};

export default connect(mapStateToProps, { })(CreateScreen);
