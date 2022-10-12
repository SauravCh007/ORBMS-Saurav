import React, {Component} from 'react';
import {Dimensions, Text, Platform, StatusBar, DeviceInfo} from 'react-native';
import {Header} from 'react-navigation-stack';
import {getInset} from 'react-native-safe-area-view';
import './Global';

const LANDSCAPE = 'landscape';
const PORTRAIT = 'portrait';

const getHeaderHeight = () => {
  let height;
  const orientation = getOrientation();
  height = getHeaderSafeAreaHeight();
  height +=
    isIphoneWithNotch() && //DeviceInfo.isIPhoneX_deprecated
    orientation === PORTRAIT
      ? 24
      : 0;
  return height;
};

const isIphoneWithNotch = () => {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 780 ||
      dimen.width === 780 ||
      dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 844 ||
      dimen.width === 844 ||
      dimen.height === 896 ||
      dimen.width === 896 ||
      dimen.height === 926 ||
      dimen.width === 926)
  );
};

// This does not include the new bar area in the iPhone X, so I use this when I need a custom headerTitle component
const getHeaderSafeAreaHeight = () => {
  const orientation = getOrientation();
  if (Platform.OS === 'ios' && orientation === LANDSCAPE && !Platform.isPad) {
    return 32;
  }
  return Header.HEIGHT;
};

const getOrientation = () => {
  const {width, height} = Dimensions.get('window');
  return width > height ? LANDSCAPE : PORTRAIT;
};

global.deviceWidth = Dimensions.get('window').width;
global.deviceHeight = Dimensions.get('window').height;
global.headerHeight = getHeaderHeight(); // Header.HEIGHT - (Platform.OS === 'android' ? StatusBar.currentHeight : 0);
global.contentHeight = global.deviceHeight - global.headerHeight;
global.bottomHeight = getInset('bottom');

// MAIN COLORS
global.color_theme = '#f29f52';
global.color_theme2 = '#ffcfa3';
global.color_darkgray = '#494949';
global.color_gray = '#7d7d7d';
global.color_medgray = '#a1a1a1';
global.color_ltmedgray = '#dedede';
global.color_arrowgray = '#959595';
global.color_ltgray = '#f7f7f7';
global.color_white = '#ffffff';
global.color_separator = '#d7d7d7';
global.color_separator_dark = '#303030';

global.color_green = '#7bba67';
global.color_turquoise = '#66bab1';
global.color_blue = '#749df6';
global.color_purple = '#9980b5';
global.color_red = '#e47a74';
global.color_yellow = '#f6bf3a';

global.color_black = '#000';
global.color_black2 = '#101010';
global.color_black3 = '#1f1f1f';

global.color_whitish1 = 'rgba(255,255,255,0.1)';
global.color_whitish2 = 'rgba(255,255,255,0.2)';
global.color_whitish3 = 'rgba(255,255,255,0.3)';
global.color_whitish4 = 'rgba(255,255,255,0.4)';
global.color_whitish5 = 'rgba(255,255,255,0.5)';
global.color_whitish6 = 'rgba(255,255,255,0.6)';
global.color_whitish7 = 'rgba(255,255,255,0.7)';
global.color_whitish8 = 'rgba(255,255,255,0.8)';
global.color_whitish9 = 'rgba(255,255,255,0.9)';

global.color_blackish1 = 'rgba(0,0,0,0.1)';
global.color_blackish2 = 'rgba(0,0,0,0.2)';
global.color_blackish3 = 'rgba(0,0,0,0.3)';
global.color_blackish4 = 'rgba(0,0,0,0.4)';
global.color_blackish5 = 'rgba(0,0,0,0.5)';
global.color_blackish6 = 'rgba(0,0,0,0.6)';
global.color_blackish7 = 'rgba(0,0,0,0.7)';
global.color_blackish8 = 'rgba(0,0,0,0.8)';
global.color_blackish9 = 'rgba(0,0,0,0.9)';

global.styles = {
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  screenContainer: {
    backgroundColor: global.color_ltgray,
    flex: 1,
  },

  quickButtonsContainer: {
    bottom: 20,
    position: 'absolute',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },

  imgContain: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  imgCover: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerButtonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  rowSeparator: {
    width: 20,
  },
  inlineBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  // tags
  tagsContainer: {
    backgroundColor: 'rgba(0,0,0,0.08)',
    padding: 10,
    borderRadius: 15,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  tagItem: {
    paddingHorizontal: 10,
    height: 30,
    borderRadius: 6,
    backgroundColor: global.color_white,
    margin: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagItemText: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '500',
    fontSize: 11,
    color: global.color_darkgray,
  },
  tagCloseBtn: {
    padding: 6,
    width: 20,
    height: 20,
    marginRight: -5,
    marginLeft: 0,
  },
  tagCloseImg: {
    width: '100%',
    height: '100%',
    tintColor: global.color_red,
    resizeMode: 'contain',
  },

  //
  bottomLogo: {
    width: global.deviceWidth - 20,
    height: global.deviceWidth - 20,
    resizeMode: 'contain',
    opacity: 0.1,
    position: 'absolute',
    bottom: -global.deviceWidth * 0.25,
    alignSelf: 'center',
  },
  logo: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
    top: global.headerHeight,
    position: 'absolute',
  },
  signInFormContainer: {
    width: 300,
    height: 300,
    justifyContent: 'center',
  },
  forgotPassButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginTop: -10,
  },
  forgotPassButtonText: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '500',
    fontSize: 15,
    color: global.color_darkgray,
  },
  loginOtpText: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '500',
    fontSize: 15,
    color: global.color_black,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  signInBottomContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signInBottomText: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '400',
    fontSize: 12,
  },
  signInBottomButton: {
    marginRight: 5,
  },
  signInBottomButtonText: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '500',
    fontSize: 12,
  },

  // PARSEDTEXT
  parsedTextBase: {
    fontSize: 16,
    color: global.color_darkgray,
  },
  parsedTextEmail: {
    fontWeight: '700',
    backgroundColor: global.color_theme,
    paddingLeft: 10,
    borderRadius: 20,
    padding: 10,
    lineHeight: 30,
  },

  //

  toastStyle: {
    backgroundColor: global.color_white,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: '#432587',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
  },
  toastTextStyle: {
    color: global.color_darkgray,
    fontWeight: '500',
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
};
