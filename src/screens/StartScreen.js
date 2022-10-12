import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";
import { connect } from "react-redux";
import { FormButton, IndicatorBottom } from "../common";
import { checkIfLogged, getUserInfo } from "../actions";
import {
  AUTH_CHECKLOGGED_LOADING,
  AUTH_CHECKLOGGED_SUCCESS,
} from "../actions/types";

class StartScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return params;
  };

  constructor(props) {
    super(props);
    this.state = {
      onboard: [
        global.img_onboard1,
        global.img_onboard2,
        global.img_onboard3,
        global.img_onboard4,
        global.img_onboard5,
      ],
    };
  }

  componentDidMount() {
    this.props.checkIfLogged();
    /*

    this.props.updateContactInfo({
      uid: '16128',
      cid: '708064',
      first_name:"Marcus",
      last_name:"Payne",
      phone:"8016912070",
      phone_alt:"",
      address:"",
      city: '',
      state:"",
      zip:"",
      email:"Marcus.payne8@gmail.com",
      facebook_url:"",
      companyname:"Testing company ",
    });
    */
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authStatus === AUTH_CHECKLOGGED_SUCCESS) {
      // this.props.navigation.navigate('MainStack')

      this.props.navigation.navigate("MainStack", {
        screen: "MainTabs",
        params: {
          screen: "MenuStack",
        },
      });
      setTimeout(() => {
        this.props.navigation.navigate("CalendarStack");
      }, 1000);

      setTimeout(() => {
        this.props.navigation.navigate("EmailStack");
      }, 3000);

      setTimeout(() => {
        this.props.navigation.navigate("ContactsStack");
      }, 4000);
    }
  }

  render() {
    return (
      <View
        style={[
          global.styles.screenContainer,
          styles.screenContainer,
          { backgroundColor: this.props.settings.theme.bgSecondary },
        ]}
      >
        <StatusBar
          backgroundColor={this.props.settings.theme.bgSecondary}
          barStyle={`${
            this.props.settings.theme.mode === "dark" ? "light" : "dark"
          }-content`}
        />
        <Image source={global.img_logoicon} style={global.styles.bottomLogo} />
        <View style={styles.swiperContainer}>
          <SwiperFlatList
            // ref={(r) => this.swiper = r}
            autoplay
            autoplayDelay={5}
            showPagination
            data={this.state.onboard}
            renderItem={({ item }) => {
              return (
                <View style={styles.sliderItem}>
                  <Image style={styles.sliderImg} source={item} />
                </View>
              );
            }}
            paginationStyle={styles.indicatorContainer}
            paginationDefaultColor={global.color_nblue}
            paginationActiveColor={global.color_theme}
            paginationStyleItem={{ width: 8, height: 8, marginHorizontal: 5 }}
          />
        </View>
        <View style={styles.bottomContainer}>
          {this.props.route &&
          this.props.route.params &&
          this.props.route.params.hideLoginButton ? null : (
            <FormButton
              text={"Log In"}
              textColor={this.props.settings.theme.bgPrimary}
              onPress={() => this.props.navigation.navigate("Login")}
            />
          )}
          {/*
            // TEMPORARY UNAVAILABLE
            <TouchableOpacity style={styles.bottomButton}
            >
              <Text style={styles.bottomButtonText}>Sign Up</Text>
            </TouchableOpacity>
            */}
        </View>
        {this.props.authStatus === AUTH_CHECKLOGGED_LOADING ? (
          <IndicatorBottom
            dark={this.props.settings.theme.mode === "dark"}
            style={{ bottom: 200 }}
          />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  swiperContainer: {
    width: "100%",
    flex: 1,
  },
  sliderItem: {
    width: global.deviceWidth,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sliderImg: {
    width: global.deviceWidth,
    height: global.deviceWidth,
    resizeMode: "contain",
  },
  bottomContainer: {
    width: "100%",
    paddingBottom: 30,
  },
  bottomButton: {
    marginHorizontal: 30,
    alignItems: "center",
    height: 40,
  },
  bottomButtonText: {
    color: global.color_theme,
    fontFamily: "Montserrat-Regular",
    fontWeight: "500",
    fontSize: 18,
  },
});

const mapStateToProps = ({ settings, auth }) => {
  const { authStatus, authError } = auth;
  return {
    settings,
    authStatus,
    authError,
  };
};

export default connect(mapStateToProps, {
  checkIfLogged,
  getUserInfo,
})(StartScreen);
