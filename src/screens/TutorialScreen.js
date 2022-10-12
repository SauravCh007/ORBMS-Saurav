
import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  StatusBar
} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { connect } from 'react-redux';
import { FormButton, IndicatorBottom, HeaderButton } from '../common';

class TutorialScreen extends Component {

  static navigationOptions = ({ navigation }) => {
      const { params } = navigation.state;
      return params;
  };

  constructor(props) {
    super(props);
    this.state = {
      onboard: [
        global.img_tutorial1,
        global.img_tutorial2,
        global.img_tutorial3,
        global.img_tutorial4,
        global.img_tutorial5,
        global.img_tutorial6,
        global.img_tutorial7,
      ],
      index: 0,
    }
  }

  componentDidMount() {

    this.props.navigation.setOptions({
      headerLeft: () =>
        <View style={global.styles.headerButtonsContainer}>
          <HeaderButton icon={global.icon_leftarrow} mode={this.props.settings.theme.mode}
            onPress={() => this.props.navigation.goBack()}
          />
        </View>,
    });
  }

  render() {
    return (
      <View style={[global.styles.screenContainer, styles.screenContainer, { backgroundColor: '#eceaeb' }]} >
        <StatusBar backgroundColor={this.props.settings.theme.bgSecondary} barStyle={`${this.props.settings.theme.mode==='dark' ? 'light' : 'dark'}-content`} />
        <View style={styles.swiperContainer}>
          <SwiperFlatList
            ref={(r) => this.swiper = r}
            //autoplay
            //autoplayDelay={5}
            onChangeIndex={({ index }) => this.setState({ index })}
            showPagination
            data={this.state.onboard}
            renderItem={({ item }) => {
              return (
                <View style={styles.sliderItem}>
                  <Image style={styles.sliderImg} source={item} />
                </View>
              )
            }}
            paginationStyle={styles.indicatorContainer}
            paginationDefaultColor={global.color_nblue}
            paginationActiveColor={global.color_theme}
            paginationStyleItem={{ width: 8, height: 8, marginHorizontal: 5, marginBottom: 5 }}
          />
        </View>
        {
        <View style={styles.bottomContainer}>
          {
            this.props.route && this.props.route.params && this.props.route.params.hideLoginButton ? null :
            <FormButton 
              //text={`${this.state.index}`}
              text={this.state.index >= this.state.onboard.length - 1 ? 'Got It' : 'Next'}
              textColor={this.props.settings.theme.bgPrimary}
              onPress={() => {
                if (this.state.index >= this.state.onboard.length - 1) {
                  this.props.navigation.goBack();
                } else {
                  this.swiper.scrollToIndex({ index: this.state.index + 1 });
                }
              }} />
          }
        </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eceaeb',
  },
  swiperContainer: {
    width: '100%',
    flex: 1,
    backgroundColor: '#eceaeb',
  },
  sliderItem: {
    width: global.deviceWidth,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  sliderImg: {
    width: global.deviceWidth,
    height: global.deviceWidth,
    resizeMode: 'contain',
    flex: 1,
  },
  bottomContainer: {
    width: '100%',
    paddingBottom: 10,
    marginTop: -20,
  },
  bottomButton: {
    marginHorizontal: 30,
    alignItems: 'center',
    height: 40,
  },
  bottomButtonText: {
    color: global.color_theme,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '500',
    fontSize: 18,
  }
});

const mapStateToProps = ({ settings, auth }) => {
  const { authStatus, authError } = auth;
  return {
    settings,
    authStatus, authError,
  };
};

export default connect(mapStateToProps, { })(TutorialScreen);
